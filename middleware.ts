import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, whiteList } from "./route";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isAuth = !!req.auth;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const referer = req.headers.get("referer");

  if (pathname.startsWith(apiAuthPrefix)) {
    return;
  }
  if (!isAuth && !whiteList.includes(pathname)) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  if (isAuth && whiteList.includes(pathname)) {
    return Response.redirect(
      new URL(referer || DEFAULT_LOGIN_REDIRECT, nextUrl)
    );
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
