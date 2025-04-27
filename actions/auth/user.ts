"use server";

import { getUserById, getUsersByPage } from "@/data/user";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
// 获取用户
export const getAllUsers = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const res = await getUsersByPage({ page, pageSize });
  return {
    code: CODE.SUCCESS,
    data: res,
  };
};

// 更改二次验证
export const changeUser2fa = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    return {
      code: CODE.USERNOTFOUND,
      message: "User not found",
    };
  }
  await prisma.user.update({
    where: { id },
    data: {
      is2fa: !user.is2fa,
    },
  });
  return {
    code: CODE.SUCCESS,
    data: null,
  };
};
