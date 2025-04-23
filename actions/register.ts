"use server";
import { getUserByEmail } from "@/data/user";
import { ecode } from "@/lib/argon2";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  const { email, name, password } = validateFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return {
      code: CODE.USEREXIST,
      message: "User already exists",
    };
  }
  const ecodedPassword = await ecode(password);
  console.log(ecodedPassword);
  // 存储用户
  await prisma.user.create({
    data: {
      email,
      name,
      password: ecodedPassword,
    },
  });
  return {
    code: CODE.SUCCESS,
    data: "success",
    message: "Register success",
  };
};
