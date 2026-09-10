import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    // runs when a JWT is created/updated — this is where we grab roles
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Keycloak puts realm roles here
        token.roles = profile.realm_access?.roles ?? []
        token.accessToken = account.access_token
      }
      return token
    },
    // runs whenever session is checked — expose roles to the app
    async session({ session, token }) {
      session.user.roles = token.roles
      session.accessToken = token.accessToken // useful later for calling your Spring Boot API
      return session
    },
  },
})