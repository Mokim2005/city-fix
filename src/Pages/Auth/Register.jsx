import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UserAuth from "../../Hooks/UserAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GiBrassKnuckles } from "react-icons/gi";

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

    if (!profileImg) {
      console.error("No photo selected");
      return;
    }

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
              photoURL: photoURL,
            });

            await axiosSecure.post("/users", {
              displayName: data.name,
              email: data.email,
              photoURL: photoURL,
              role: "user",
            });

            navigate(location?.state || "/");
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #8a05ff 0%, #2a014f 60%, #120025 100%)",
      }}
    >
      <title>Register</title>
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-2xl shadow-2xl p-8">
        <h3 className="text-3xl font-bold text-purple-300 text-center drop-shadow-lg">
          Create an Account
        </h3>
        <p className="text-purple-200 text-center mb-6">
          Welcome to <span className="font-semibold">City Fix</span>
        </p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
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
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full bg-white/20 text-white border-purple-400"
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
              className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300 focus:outline-none"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password - Fully Fixed with Eye Icon */}
          {/* Password */}
          <div>
            <label className="label text-purple-200">Password</label>
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
                      "Password must contain at least one uppercase, one lowercase, one number and one special character (@$!%*?&)",
                  },
                })}
                className="input input-bordered w-full bg-white/20 text-white placeholder-purple-300 border-purple-400 focus:border-purple-300 focus:outline-none pr-14"
                placeholder="Enter Password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-200 hover:text-purple-100 z-10"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Error Messages */}
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button className="btn w-full bg-purple-600 hover:bg-purple-700 border-none text-white shadow-lg hover:shadow-purple-800/50 transition">
            Register
          </button>

          <p className="text-purple-200 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location?.state}
              className="text-green-300 hover:text-green-200 font-medium"
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
