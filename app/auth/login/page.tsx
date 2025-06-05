import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
