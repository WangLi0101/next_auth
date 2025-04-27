import { prisma } from "@/lib/db";
export const getUserByEmail = async (email: string) => {
  const res = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return res;
};

export const getUserById = async (id: string) => {
  const res = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      roles: true,
    },
  });
  return res;
};

export const getUsersByPage = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const [list, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);
  return { list, total };
};
