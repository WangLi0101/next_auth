import { auth } from "@/auth";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const session = await auth();
  return (
    <div className="demo">
      <p>user:{session?.user?.name}</p>
      <p>expire:{formatDate(session?.expires)}</p>
    </div>
  );
}
