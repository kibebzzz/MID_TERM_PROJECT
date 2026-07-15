import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const ForgotPassword = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-black text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Enter your email address and we'll send you a password reset link.
        </p>

        <div className="mt-10 space-y-5">

          <Input
            type="email"
            placeholder="Email Address"
          />

          <Button className="w-full">
            Send Reset Link
          </Button>

        </div>

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="text-cyan-500 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </section>
  );
};

export default ForgotPassword;