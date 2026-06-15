import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UserAuth from "../../Hooks/UserAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const { registeUser, updateUserProfile } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    if (!profileImg) return;

    registeUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then(async (res) => {
          if (res.data.success) {
            const photoURL = res.data.data.display_url;

            await updateUserProfile({
              displayName: data.name,
              photoURL,
            });

            await axiosSecure.post("/users", {
              displayName: data.name,
              email: data.email,
              photoURL,
              role: "user",
            });

            navigate(location?.state || "/");
          }
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-6"
    >
      <title>Register</title>

      {/* 🔥 Glass Card */}
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 z-10">
        <h3 className="text-3xl font-bold text-white text-center">
          Create an Account
        </h3>
        <p className="text-gray-300 text-center mb-6">
          Welcome to <span className="font-semibold">City Fix</span>
        </p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label text-gray-300">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-cyan-400 focus:outline-none"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label text-gray-300">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full bg-white/10 text-white border-white/20"
            />
            {errors.photo && (
              <p className="text-red-400 text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-cyan-400 focus:outline-none"
              placeholder="Email Address"
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
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number & special character",
                  },
                })}
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 border-white/20 focus:border-cyan-400 focus:outline-none pr-14"
                placeholder="Enter Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button className="relative overflow-hidden btn w-full rounded-xl font-semibold text-white shadow-lg transition-all duration-500 ease-out" style={{ background: "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #2DD4BF 100%)" }}>
            Register
          </button>

          <p className="text-gray-300 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location?.state}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Login
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

export default Register;