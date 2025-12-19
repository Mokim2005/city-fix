import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UserAuth from "../Hooks/UserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ← এটা যোগ করুন

const IssueForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate(); // ← redirect-এর জন্য

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // ← form reset করার জন্য
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendIssus = async (data) => {
    // Required fields check (optional, react-hook-form validation যোগ করতে পারেন)
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

    // Swal confirmation
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

    if (!result.isConfirmed) return; // Cancel হলে বন্ধ

    // Loading Swal
    Swal.fire({
      title: "Uploading...",
      text: "Please wait while we upload your image and submit the issue",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // 1. Image Upload to ImgBB
      const imgRes = await axios.post(imgApiUrl, formData);
      const imageUrl = imgRes.data?.data?.display_url;

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      // 2. Prepare final data
      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: imageUrl,
        email: user?.email,
      };

      // 3. Submit to backend
      const res = await axiosSecure.post("/issus", issueData);

      if (res.data.insertedId || res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your issue has been reported successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form + preview
        reset();
        setImagePreview("");

        // Redirect to All Issues page after 2 seconds
        setTimeout(() => {
          navigate("/all-issus"); // ← আপনার All Issues page-এর route দিন
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1a132f] to-[#2b2250] p-6">
      <div className="bg-[#2b2250] w-full max-w-3xl p-8 rounded-2xl shadow-xl border border-purple-600/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
          Report a New Issue
        </h2>

        <form
          onSubmit={handleSubmit(handleSendIssus)}
          className="grid grid-cols-1 gap-6"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Issue Title *
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter issue title"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.title && (
              <span className="text-red-400 text-sm">Title is required</span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Description *
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write issue details"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Category *
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Category</option>
              <option value="Road">Road Issue</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water Leakage</option>
              <option value="Garbage">Garbage Problem</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Location *
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Enter Location (e.g., Mirpur 10, Dhaka)"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Upload Image *
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-64 h-64 object-cover rounded-lg border border-purple-400 shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-purple-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-purple-700 shadow-lg transition-all"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
