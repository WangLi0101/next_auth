"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
export const Social = () => {
  const handlerClick = (provider: "google" | "github") => {
    signIn(provider, { redirectTo: "/" });
  };
  return (
    <div className="flex items-center justify-between w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-[45%]"
        onClick={() => handlerClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-[45%]"
        variant="outline"
        size="lg"
        onClick={() => handlerClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
