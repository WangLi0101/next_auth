import { prisma } from "@/lib/db";
export const getBlogsByPage = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const [list, total] = await Promise.all([
    prisma.blog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        // 2. 关系字段：用 select/include 嵌套，把子关联里需要的都列出来
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        BlogsOnTags: {
          include: {
            tag: true,
          },
        },
      },
    }),
    prisma.blog.count(),
  ]);

  return { list, total };
};

export const getBlogById = async (id: string) => {
  const res = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      BlogsOnTags: {
        include: {
          tag: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return res;
};
