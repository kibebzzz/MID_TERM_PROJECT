import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await login(credentials);

      if (response.success) {
        toast.success("Login successful!");

        loginUser(
          response.data.user,
          response.data.token
        );

        switch (response.data.user.role) {
          case "ADMIN":
            navigate("/admin");
            break;

          case "ARTIST":
            navigate("/artist");
            break;

          case "BUYER":
          default:
            navigate("/buyer");
            break;
        }
      } else {
        toast.error(response.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

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
            name="email"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-cyan-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>
    </section>
  );
};

export default Login;