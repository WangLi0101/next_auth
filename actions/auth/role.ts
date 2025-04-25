"use server";
import { getAllRoles } from "@/data/role";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { AddRoleSchema } from "@/schemas";
import { z } from "zod";

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

// 新增角色
export const addRole = async (values: z.infer<typeof AddRoleSchema>) => {
  const isValidate = AddRoleSchema.safeParse(values);
  if (!isValidate) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  try {
    await prisma.role.create({
      data: values,
    });
  } catch {
    return {
      code: CODE.ERROR,
      message: "error",
    };
  }
  return {
    code: CODE.SUCCESS,
  };
};

// 编辑角色
export const editRole = async (values: z.infer<typeof AddRoleSchema>) => {
  const validate = AddRoleSchema.safeParse(values);
  if (!validate.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  const { roleKey, name } = validate.data;
  try {
    await prisma.role.update({
      where: {
        roleKey,
      },
      data: {
        name,
      },
    });
  } catch {
    return {
      code: CODE.ERROR,
      message: "error",
    };
  }
  return {
    code: CODE.SUCCESS,
  };
};
