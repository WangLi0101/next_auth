"use server";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { TagSchema } from "@/schemas";
import { z } from "zod";

// 获取所有标签
export const getTags = async () => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            BlogsOnTags: true,
          },
        },
      },
    });
    return {
      code: CODE.SUCCESS,
      data: tags,
    };
  } catch {
    return {
      code: CODE.ERROR,
      message: "获取标签列表失败",
    };
  }
};

// 添加标签
export const addTag = async (values: z.infer<typeof TagSchema>) => {
  const validate = TagSchema.safeParse(values);
  if (!validate.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "输入数据无效",
    };
  }

  const { name } = validate.data;

  try {
    // 检查标签名是否已存在
    const existingTag = await prisma.tag.findFirst({
      where: {
        name,
      },
    });

    if (existingTag) {
      return {
        code: CODE.ERROR,
        message: "标签名称已存在",
      };
    }

    await prisma.tag.create({
      data: {
        name,
      },
    });

    return {
      code: CODE.SUCCESS,
      message: "标签添加成功",
    };
  } catch {
    return {
      code: CODE.ERROR,
      message: "添加标签失败",
    };
  }
};

// 更新标签
export const updateTag = async (values: z.infer<typeof TagSchema>) => {
  const validate = TagSchema.safeParse(values);
  if (!validate.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "输入数据无效",
    };
  }

  const { id, name } = validate.data;

  if (!id) {
    return {
      code: CODE.VALIDATEERROR,
      message: "标签ID不能为空",
    };
  }

  try {
    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: {
        id,
      },
    });

    if (!existingTag) {
      return {
        code: CODE.ERROR,
        message: "标签不存在",
      };
    }

    // 检查新名称是否与其他标签重复
    const duplicateTag = await prisma.tag.findFirst({
      where: {
        name,
        NOT: {
          id,
        },
      },
    });

    if (duplicateTag) {
      return {
        code: CODE.ERROR,
        message: "标签名称已存在",
      };
    }

    await prisma.tag.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return {
      code: CODE.SUCCESS,
      message: "标签更新成功",
    };
  } catch {
    return {
      code: CODE.ERROR,
      message: "更新标签失败",
    };
  }
};

// 删除标签
export const deleteTag = async (id: string) => {
  if (!id) {
    return {
      code: CODE.VALIDATEERROR,
      message: "标签ID不能为空",
    };
  }

  try {
    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            BlogsOnTags: true,
          },
        },
      },
    });

    if (!existingTag) {
      return {
        code: CODE.ERROR,
        message: "标签不存在",
      };
    }

    // 检查是否有博客使用此标签
    if (existingTag._count.BlogsOnTags > 0) {
      return {
        code: CODE.ERROR,
        message: `该标签正在被 ${existingTag._count.BlogsOnTags} 篇博客使用，无法删除`,
      };
    }

    await prisma.tag.delete({
      where: {
        id,
      },
    });

    return {
      code: CODE.SUCCESS,
      message: "标签删除成功",
    };
  } catch {
    return {
      code: CODE.ERROR,
      message: "删除标签失败",
    };
  }
};

// 根据ID获取单个标签
export const getTagById = async (id: string) => {
  if (!id) {
    return {
      code: CODE.VALIDATEERROR,
      message: "标签ID不能为空",
    };
  }

  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            BlogsOnTags: true,
          },
        },
      },
    });

    if (!tag) {
      return {
        code: CODE.ERROR,
        message: "标签不存在",
      };
    }

    return {
      code: CODE.SUCCESS,
      data: tag,
    };
  } catch {
    return {
      code: CODE.ERROR,
      message: "获取标签失败",
    };
  }
};
