"use server";
import { getAllRoles } from "@/data/role";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";

// 获取所有角色
export const getRoles = async () => {
  const res = await getAllRoles();
  return {
    code: CODE.SUCCESS,
    data: res,
  };
};

// 删除角色
export const delRole = async (roleKey: string) => {
  try {
    await prisma.role.delete({
      where: {
        roleKey,
      },
    });
  } catch {
    return {
      code: CODE.ERROR,
      message: "外键约束",
    };
  }
  return {
    code: CODE.SUCCESS,
    message: "删除成功",
  };
};
