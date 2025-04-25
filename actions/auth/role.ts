"use server";
import { getAllRoles } from "@/data/role";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { AddRoleSchema } from "@/schemas";
import { z } from "zod";

// Get all roles
export const getRoles = async () => {
  const res = await getAllRoles();
  return {
    code: CODE.SUCCESS,
    data: res,
  };
};

// Delete role
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
      message: "Foreign key constraint",
    };
  }
  return {
    code: CODE.SUCCESS,
    message: "Delete successful",
  };
};

// Add role
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

// Edit role
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
