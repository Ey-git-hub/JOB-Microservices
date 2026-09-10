import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      // On initial sign-in, Keycloak profile includes realm_access.roles
      if (profile) {
        const keycloakProfile = profile as { realm_access?: { roles?: string[] } };
        token.roles = keycloakProfile.realm_access?.roles ?? [];
      }
      return token;
    },
    async session({ session, token }) {
      // Expose roles on the session object for server components
      session.user.roles = (token.roles as string[]) ?? [];
      return session;
    },
  },
});

