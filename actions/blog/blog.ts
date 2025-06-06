"use server";
import { getBlogsByPage, getBlogById } from "@/data/blog";
import { CODE } from "@/lib/code";
import { prisma } from "@/lib/db";
import { BlogSchema } from "@/schemas";
import { z } from "zod";

// 获取博客列表
export const getAllBlogs = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const res = await getBlogsByPage({ page, pageSize });
  return {
    code: CODE.SUCCESS,
    data: res,
  };
};

export const getBlogDetail = async (id: string) => {
  const res = await getBlogById(id);
  return {
    code: CODE.SUCCESS,
    data: res,
  };
};

// 新增博客
export const addBlog = async (values: z.infer<typeof BlogSchema>) => {
  const validateFields = BlogSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      code: CODE.VALIDATEERROR,
      message: "Invalid fields",
    };
  }
  const { tags, ...data } = validateFields.data;
  const tagsList = await prisma.tag.findMany({
    where: {
      id: {
        in: tags,
      },
    },
  });
  const res = await prisma.blog.create({
    data: {
      ...data,
      BlogsOnTags: {
        create: tagsList.map((tag) => ({ tagId: tag.id })),
      },
    },
  });
  return {
    code: CODE.SUCCESS,
    data: res,
    message: "Add success",
  };
};

// 删除博客
export const deleteBlog = async (id: string) => {
  const res = await prisma.blog.delete({
    where: { id },
  });
  return {
    code: CODE.SUCCESS,
    data: res,
    message: "Delete success",
  };
};
