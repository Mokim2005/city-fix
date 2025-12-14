import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UserAuth from "../../Hooks/UserAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

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

    registeUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then(async (res) => {
          const photoURL = res.data?.data?.display_url;

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          await updateUserProfile(userProfile);

          await axiosSecure.post("/users", {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
            role: "user",
          });

          navigate(location?.state || "/");
        });
      })
      .catch((error) => console.log(error.message));
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
          Create an Account
        </h3>
        <p className="text-purple-200 text-center mb-4">
          Welcome to <span className="font-semibold">City Fix</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label text-purple-200">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300 focus:outline-none"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label text-purple-200">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full bg-white/20 text-white border-purple-400"
            />
            {errors.photo && (
              <p className="text-red-400 text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-purple-200">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="label text-purple-200">Password</label>

            <div className="flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">
                Minimum 6 characters required
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <a className="text-purple-300 hover:text-purple-100 cursor-pointer text-sm">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button className="btn w-full bg-purple-600 hover:bg-purple-700 border-none text-white shadow-lg hover:shadow-purple-800/50 transition">
            Register
          </button>

          <p className="text-purple-200 text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location?.state}
              className="text-green-300 hover:text-green-200"
            >
              Login
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

export default Register;
