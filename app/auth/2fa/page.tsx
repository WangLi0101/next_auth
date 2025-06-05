import { Form2fa } from "@/components/auth/form-2fa";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <Suspense>
        <Form2fa />
      </Suspense>
    </div>
  );
};
export default Page;
