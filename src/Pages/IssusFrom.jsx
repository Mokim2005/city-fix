import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UserAuth from "../Hooks/UserAuth";
import axios from "axios";


const IssueForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { user, } = UserAuth();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = UseAxiosSecure();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendIssus = (data) => {
    console.log("FORM SUBMIT DATA:", data);
    data.email = user?.email;

    const issueImage = data.image[0];
    const formData = new FormData();
    formData.append("image", issueImage);

    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    Swal.fire({
      title: "Are you sure?",
      text: "report is sending!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send report!",
    }).then((result) => {
      if (result.isConfirmed) {
        // 1️⃣ Image Upload
        axios.post(imgApiUrl, formData).then((imgRes) => {
          const imageUrl = imgRes.data?.data?.display_url;

          // 2️⃣ Add image URL to data
          data.image = imageUrl;

          // 3️⃣ Send to backend
          axiosSecure.post("/issus", data).then((res) => {
            console.log("Saved issue:", res.data);
            Swal.fire("Success!", "Issue reported successfully", "success");
            window.location.reload();
          });
        });
      }
    });
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
              Issue Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter issue title"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Write issue details"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Category
            </label>
            <select
              {...register("category")}
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
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="Enter Location"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Upload Image
            </label>

            <input
              {...register("image")}
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg cursor-pointer"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg border border-purple-400 shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="mt-4 text-center bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 shadow-lg transition-all"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
