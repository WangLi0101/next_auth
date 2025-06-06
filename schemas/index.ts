import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3, {
    message: "Name is required",
  }),
});

export const Form2faSchema = z.object({
  code: z.string().min(6, {
    message: "Code is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
});

export const AddRoleSchema = z.object({
  roleKey: z.string().min(3, {
    message: "RoleKey is required",
  }),
  name: z.string().min(3, {
    message: "Name is required",
  }),
});

export const TagSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, {
      message: "标签名称不能为空",
    })
    .max(50, {
      message: "标签名称不能超过50个字符",
    }),
});

export const BlogSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, {
      message: "标题不能为空",
    })
    .max(50, {
      message: "标题不能超过50个字符",
    }),
  description: z
    .string()
    .min(1, {
      message: "描述不能为空",
    })
    .max(500, {
      message: "描述不能超过500个字符",
    }),
  content: z.string().min(1, {
    message: "内容不能为空",
  }),
  tags: z.string().array().min(1, {
    message: "标签不能为空",
  }),
  thumbnail: z.string().min(1, {
    message: "封面不能为空",
  }),
  authorId: z.string().min(1, {
    message: "作者不能为空",
  }),
});
