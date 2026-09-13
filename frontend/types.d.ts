  import { DefaultSession, DefaultJWT } from "next-auth";

  declare module "next-auth" {
    interface User {
      roles: string[];
      accessToken: string;
    }

    interface Session {
      accessToken: string;
      user: {
        roles: string[];
      } & DefaultSession["user"];
    }
  }
 
  declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
      roles: string[];
      accessToken: string;
    }
  }

