import React from "react";
import { useForm } from "react-hook-form";
import UserAuth from "../../Hooks/UserAuth";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location?.state || '/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #8a05ff 0%, #2a014f 60%, #120025 100%)",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-2xl shadow-2xl p-8 animate__animated animate__fadeIn">
        {/* Header */}
        <h3 className="text-3xl font-bold text-purple-300 text-center drop-shadow-lg">
          Welcome Back
        </h3>
        <p className="text-purple-200 text-center mb-4">
          Please Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label text-purple-200">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300 focus:outline-none"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-purple-200">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <a className="text-purple-300 hover:text-purple-100 cursor-pointer text-sm">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="btn w-full bg-purple-600 hover:bg-purple-700 border-none text-white shadow-lg hover:shadow-purple-800/50 transition">
            Login
          </button>

          <p className="text-purple-200 text-center mt-2">
            New to City Fix?{" "}
            <Link
            state={location?.state}
              to="/register"
              className="text-green-300 hover:text-green-200"
            >
              Register
            </Link>
          </p>
        </form>

        <div className="mt-4 text-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
