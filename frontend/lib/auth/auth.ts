import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type KeycloakTokenResponse = {
  access_token: string;
};

type KeycloakClaims = {
  realm_access?: {  
    roles?: string[];
  };
  email?: string;
  preferred_username?: string;
  name?: string;
};  

function decodeTokenClaims(token: string): KeycloakClaims {
  const payload = token.split(".")[1];

  if (!payload) {
    throw new Error("Keycloak returned an invalid access token");
  }

  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
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

        const { access_token }: KeycloakTokenResponse = await response.json();
        const claims = decodeTokenClaims(access_token);

        return {
          id: claims.preferred_username ?? claims.email ?? email,
          email: claims.email ?? email,
          name: claims.name ?? claims.preferred_username ?? email,
          roles: claims.realm_access?.roles ?? [],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = (user.roles as string[]) ?? [];
      }

      return token;
    },
    async session({ session, token }) {
      session.user.roles = (token.roles as string[]) ?? [];
      return session;
    },
  },
});

