"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/index";
import { Button } from "../ui/button";
import { register } from "@/actions/auth/register";
import { CODE } from "@/lib/code";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(async () => {
      const res = await register(data);
      if (res.code === CODE.SUCCESS) {
        setSuccessMessage(res.message!);
      } else {
        setErrorMessage(res.message!);
      }
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Welcome Back!"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={successMessage} />
            <FormError message={errorMessage} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
