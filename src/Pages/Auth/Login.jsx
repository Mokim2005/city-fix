import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UserAuth from "../../Hooks/UserAuth";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/28/24/19/360_F_228241978_A0fCb310dVpIxcc20icBRYO6JqCA8nb8.jpg')",
      }}
    >
      <title>Login</title>

      {/* ✅ FIXED Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* ✅ Glass Card */}
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 z-10">
        <h3 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h3>
        <p className="text-gray-300 text-center mb-6">
          Please Login to continue
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="label text-gray-300">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-cyan-400 focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-gray-300">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-cyan-400 focus:outline-none pr-14"
                placeholder="Enter your password"
              />
{/* 
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 hover:text-white z-10"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div> */}

            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a className="text-gray-300 hover:text-white cursor-pointer text-sm">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="btn w-full bg-gradient-to-r from-cyan-500 to-violet-500 border-none text-white shadow-lg hover:shadow-cyan-500/30 transition">
            Login
          </button>

          <p className="text-gray-300 text-center mt-4">
            New to City Fix?{" "}
            <Link
              to="/register"
              state={location?.state}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Register
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;