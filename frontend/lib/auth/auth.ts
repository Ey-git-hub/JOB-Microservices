import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type KeycloakTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type KeycloakClaims = {
  realm_access?: {  
    roles?: string[];
  };
  email?: string;
  preferred_username?: string;
  name?: string;
};  

type RefreshableToken = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
};

function decodeTokenClaims(token: string): KeycloakClaims {
  const payload = token.split(".")[1];

  if (!payload) {
    throw new Error("Keycloak returned an invalid access token");
  }

  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}

async function refreshAccessToken(token: RefreshableToken): Promise<RefreshableToken> {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER;

  if (!issuer) {
    return token;
  }

  const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.AUTH_KEYCLOAK_ID ?? "",
      client_secret: process.env.AUTH_KEYCLOAK_SECRET ?? "",
      refresh_token: token.refreshToken,
    }),
  });

  if (!response.ok) {
    return token;
  }

  const refreshed: KeycloakTokenResponse = await response.json();

  return {
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token ?? token.refreshToken,
    accessTokenExpiresAt: Date.now() + refreshed.expires_in * 1000,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Keycloak",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const issuer = process.env.AUTH_KEYCLOAK_ISSUER;

        if (!email || !password || !issuer) {
          return null;
        }

        const response = await fetch(
          `${issuer}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "password",
              client_id: process.env.AUTH_KEYCLOAK_ID ?? "",
              client_secret: process.env.AUTH_KEYCLOAK_SECRET ?? "",
              username: email,
              password,
              scope: "openid profile email",
            }),
          }
        );

        if (!response.ok) {
          return null;
        }

        const {
          access_token,
          refresh_token,
          expires_in,
        }: KeycloakTokenResponse = await response.json();
        const claims = decodeTokenClaims(access_token);

        return {
          id: claims.preferred_username ?? claims.email ?? email,
          email: claims.email ?? email,
          name: claims.name ?? claims.preferred_username ?? email,
          roles: claims.realm_access?.roles ?? [],
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpiresAt: Date.now() + expires_in * 1000,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = (user.roles as string[]) ?? [];
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
      } else if (
        token.accessToken &&
        token.refreshToken &&
        token.accessTokenExpiresAt &&
        Date.now() >= (token.accessTokenExpiresAt as number) - 30_000
      ) {
        const refreshedToken = await refreshAccessToken({
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          accessTokenExpiresAt: token.accessTokenExpiresAt as number,
        });
        token.accessToken = refreshedToken.accessToken;
        token.refreshToken = refreshedToken.refreshToken;
        token.accessTokenExpiresAt = refreshedToken.accessTokenExpiresAt;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.roles = (token.roles as string[]) ?? [];
      session.accessToken = (token.accessToken as string) ?? "";
      return session;
    },
  },
});

