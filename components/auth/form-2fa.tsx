"use client";
import React, { useState } from "react";
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
import { Form2faSchema } from "@/schemas/index";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { CODE } from "@/lib/code";
import { login2fa } from "@/actions/auth/login";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
export const Form2fa = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const form = useForm<z.infer<typeof Form2faSchema>>({
    resolver: zodResolver(Form2faSchema),
    defaultValues: {
      code: "",
      email: email!,
    },
  });

  const onSubmit = async (data: z.infer<typeof Form2faSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");
    const res = await login2fa(data);
    if (res.code === CODE.SUCCESS) {
      router.push(DEFAULT_LOGIN_REDIRECT);
    } else {
      setErrorMessage(res.message);
    }
  };
  return (
    <div>
      <CardWrapper
        headerLabel="2FA"
        backButtonLabel="go to the login page"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={successMessage} />
            <FormError message={errorMessage} />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
