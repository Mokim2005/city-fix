import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UserAuth from "../Hooks/UserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IssueForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendIssus = async (data) => {
    if (
      !data.title ||
      !data.description ||
      !data.category ||
      !data.location ||
      !data.image[0]
    ) {
      Swal.fire(
        "Error!",
        "Please fill all fields and upload an image",
        "error"
      );
      return;
    }

    const issueImage = data.image[0];
    const formData = new FormData();
    formData.append("image", issueImage);

    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    const result = await Swal.fire({
      title: "Submit Issue?",
      text: "Are you sure you want to report this issue?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while we upload your image and submit the issue",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const imgRes = await axios.post(imgApiUrl, formData);
      const imageUrl = imgRes.data?.data?.display_url;

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageUrl,
        email: user?.email,
      };

      const res = await axiosSecure.post("/issus", issueData);

      if (res.data.insertedId || res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your issue has been reported successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
        setImagePreview("");

        setTimeout(() => {
          navigate("/all-issus");
        }, 2000);
      }
    } catch (error) {
      console.error("Issue submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://www.the-world.in/wp-content/uploads/2024/04/The-World-Website-Cleanest-City-Surat-Landscape.webp')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative"
    >
      <title>Report Issue</title>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-8 sm:mb-12"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl px-8 sm:px-12 py-6 sm:py-8 shadow-2xl inline-block">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3"
          >
            Report an Issue
          </motion.h1>
          <p className="text-gray-200 text-base sm:text-lg lg:text-xl max-w-2xl">
            Help us improve your city by reporting problems. Your voice matters!
          </p>
        </div>
      </motion.div>

      {/* Form Container with Glassy Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-4xl backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl"
      >
        <form
          onSubmit={handleSubmit(handleSendIssus)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-100 mb-2 font-semibold text-lg">
              Issue Title <span className="text-red-400">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="e.g., Broken streetlight on Main Road"
              className="w-full p-4 backdrop-blur-xl bg-white/10 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
            />
            {errors.title && (
              <span className="text-red-400 text-sm mt-1 block">
                ⚠️ Title is required
              </span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-100 mb-2 font-semibold text-lg">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-4 backdrop-blur-xl bg-white/10 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="" className="bg-gray-900">
                Select Category
              </option>
              <option value="Road" className="bg-gray-900">
                🛣️ Road Issue
              </option>
              <option value="Electricity" className="bg-gray-900">
                ⚡ Electricity
              </option>
              <option value="Water" className="bg-gray-900">
                💧 Water Leakage
              </option>
              <option value="Garbage" className="bg-gray-900">
                🗑️ Garbage Problem
              </option>
              <option value="Sanitation" className="bg-gray-900">
                🚽 Sanitation
              </option>
              <option value="Other" className="bg-gray-900">
                📋 Other
              </option>
            </select>
            {errors.category && (
              <span className="text-red-400 text-sm mt-1 block">
                ⚠️ Category is required
              </span>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-100 mb-2 font-semibold text-lg">
              Location <span className="text-red-400">*</span>
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="e.g., Mirpur 10, Dhaka"
              className="w-full p-4 backdrop-blur-xl bg-white/10 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
            />
            {errors.location && (
              <span className="text-red-400 text-sm mt-1 block">
                ⚠️ Location is required
              </span>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-100 mb-2 font-semibold text-lg">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe the issue in detail..."
              className="w-full p-4 backdrop-blur-xl bg-white/10 text-white border border-white/30 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 resize-none"
            ></textarea>
            {errors.description && (
              <span className="text-red-400 text-sm mt-1 block">
                ⚠️ Description is required
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-100 mb-2 font-semibold text-lg">
              Upload Image <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-4 backdrop-blur-xl bg-white/10 text-white border border-white/30 rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white file:font-semibold file:cursor-pointer hover:file:from-purple-700 hover:file:to-pink-700 transition-all duration-300"
              />
            </div>
            {errors.image && (
              <span className="text-red-400 text-sm mt-1 block">
                ⚠️ Image is required
              </span>
            )}
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6"
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md mx-auto h-64 object-cover rounded-2xl border-2 border-purple-400/50 shadow-2xl"
                />
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 backdrop-blur-sm border border-purple-400/50"
            >
              🚀 Submit Issue Report
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-gray-300 text-center mt-8 backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/20"
      >
        📧 Logged in as: <span className="text-purple-400 font-semibold">{user?.email}</span>
      </motion.p>
    </div>
  );
};

export default IssueForm;
