import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

// 获取session信息
export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const getSessionInfo = async () => {
    const res = await getSession();
    if (res) {
      setSession(res);
    }
  };
  useEffect(() => {
    getSessionInfo();
  }, []);
  return { session: session };
};
