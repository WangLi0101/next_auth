import { prisma } from "@/lib/db";

export const getRoleByRoleKey = async (roleKey: string) => {
  const role = await prisma.role.findUnique({
    where: { roleKey },
  });
  return role;
};

export const getRolesByUserId = async (userId: string) => {
  const roles = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: true,
    },
  });
  return roles?.roles;
};

export const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};
