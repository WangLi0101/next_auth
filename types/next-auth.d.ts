import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * 扩展 next-auth 中的 Session 类型
   */
  interface Session {
    user: {
      id: string;
      roles: string[];
    } & DefaultSession["user"];
  }
}
