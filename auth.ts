import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
import { getRolesByUserId } from "./data/role";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    error: "auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      const sub = token.sub;
      const roles = await getRolesByUserId(sub!);
      return {
        ...session,
        user: {
          ...session.user,
          id: sub!,
          roles: roles?.map((el) => el.roleKey),
        },
      };
    },
  },
  ...authConfig,
});
