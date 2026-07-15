import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-black text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Sign in to your Palette account.
        </p>

        <div className="space-y-5 mt-10">

          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Password"
          />

          <div className="flex justify-end">

  <Link
    to="/forgot-password"
    className="text-sm text-cyan-500 hover:underline"
  >
    Forgot Password?
  </Link>

</div>

          <Button className="w-full">
            Login
          </Button>

        </div>

      </div>

    </section>
  );
};

export default Login;