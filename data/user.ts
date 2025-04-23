import { prisma } from "@/lib/db";
export const getUserByEmail = async (email: string) => {
  const res = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return res;
};
