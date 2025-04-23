import { getUserByEmail } from "@/data/user";
import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("credentials", credentials);

        const { email } = credentials;
        const user = await getUserByEmail(email as string);
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
