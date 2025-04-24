"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { verify } from "@/lib/argon2";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { sendTwoFactoryEmail } from "@/lib/email";
import { delRedies, getRedis, setRedis } from "@/lib/redies";
import { generateCode } from "@/lib/utils";
import { Form2faSchema, LoginSchema } from "@/schemas";
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
  // 如果需要2次认证
  if (user.is2fa) {
    const token = generateCode();
    await sendTwoFactoryEmail(email, token);
    // 将token存储到redis
    await setRedis(email, token, 5 * 60);
    return {
      code: CODE.TWOFA,
      message: "Login success",
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

export const login2fa = async (values: z.infer<typeof Form2faSchema>) => {
  const validateFields = Form2faSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  const { email, code } = validateFields.data;
  const token = await getRedis(email);
  if (!token) {
    return {
      code: CODE.ERROR,
      message: "2FA code is expired",
    };
  }
  if (token !== code) {
    return {
      code: CODE.ERROR,
      message: "2FA code is incorrect",
    };
  }
  const user = await getUserByEmail(email);
  if (!user) {
    return {
      code: CODE.USERNOTFOUND,
      message: "User not found",
    };
  }
  const { password } = user;
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
  await delRedies(email);
  return {
    code: CODE.SUCCESS,
    message: "Login success",
  };
};
