import * as z from "zod";
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
