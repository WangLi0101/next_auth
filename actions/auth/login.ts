"use server";
import { signIn } from "@/auth";
import { verify } from "@/lib/argon2";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  const { email, password } = validateFields.data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      code: CODE.USERNOTFOUND,
      message: "User not found",
    };
  }
  const valifyPassword = await verify(password, user.password!);
  if (!valifyPassword) {
    return {
      code: CODE.PASSWORDINCORRECT,
      message: "Password incorrect",
    };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch {
    return {
      code: CODE.LOGINERROR,
      message: "error",
    };
  }
  return {
    code: CODE.SUCCESS,
    message: "Login success",
  };
};
