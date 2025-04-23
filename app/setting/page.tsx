"use client";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import { useSession } from "@/hooks/useSession";
export default function Page() {
  const quit = () => signOut();
  const { session } = useSession();
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <p className="text-lg mb-2">
        用户: <span className="font-medium">{session?.user?.name}</span>
      </p>
      <p className="text-sm text-gray-600 mb-4">
        过期时间: {formatDate(session?.expires)}
      </p>
      <Button onClick={quit} className="bg-red-500 hover:bg-red-600 text-white">
        退出
      </Button>
    </div>
  );
}
