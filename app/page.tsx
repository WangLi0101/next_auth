"use client";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  const quite = () => {
    signOut();
  };
  return (
    <div className="demo">
      <p>user:{session?.user?.name}</p>
      <p>expire:{formatDate(session?.expires)}</p>
      <Button onClick={quite}>退出</Button>
    </div>
  );
}
