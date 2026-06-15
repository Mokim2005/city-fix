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
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSendIssus = async (data) => {
    const issueImage = data.image[0];
    const formData = new FormData();
    formData.append("image", issueImage);

    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const result = await Swal.fire({
      title: "Submit Issue?",
      text: "Are you sure you want to report this issue?",
      icon: "question",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Uploading...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const imgRes = await axios.post(imgApiUrl, formData);
      const imageUrl = imgRes.data?.data?.display_url;

      const issueData = {
        ...data,
        image: imageUrl,
        email: user?.email,
      };

      const res = await axiosSecure.post("/issus", issueData);

      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success!", "Issue submitted successfully!", "success");
        reset();
        setImagePreview("");
        navigate("/all-issus");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
    >

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10">

          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Report an Issue
            </h1>
            <p className="text-gray-300 mt-2">
              Help improve your city by reporting problems
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(handleSendIssus)} className="grid md:grid-cols-2 gap-6">

            {/* TITLE */}
            <div className="md:col-span-2">
              <input
                {...register("title", { required: true })}
                placeholder="Issue Title"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.title && <p className="text-red-400 text-sm">Title required</p>}
            </div>

            {/* CATEGORY FIXED */}
            <select
              {...register("category", { required: true })}
              className="p-4 bg-gray-900/70 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" className="bg-gray-900 text-white">
                Select Category
              </option>
              <option value="Road" className="bg-gray-900">Road</option>
              <option value="Water" className="bg-gray-900">Water</option>
              <option value="Electricity" className="bg-gray-900">Electricity</option>
            </select>

            {/* LOCATION */}
            <input
              {...register("location", { required: true })}
              placeholder="Location"
              className="p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <textarea
                {...register("description", { required: true })}
                placeholder="Describe issue..."
                className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* IMAGE WITH BORDER FIX */}
            <div className="md:col-span-2">
              <div className="border border-white/30 rounded-xl p-3 bg-white/5">
                <input
                  {...register("image", { required: true })}
                  type="file"
                  onChange={handleImageChange}
                  className="w-full text-white file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                />
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  className="mt-4 w-full max-h-64 object-cover rounded-xl border border-white/20"
                />
              )}
            </div>

            {/* BUTTON GREEN + SMOOTH */}
            <button
              type="submit"
              className="md:col-span-2 py-4 rounded-xl font-bold bg-green-600 hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Submit Issue
            </button>
          </form>

          {/* USER */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Logged in as: {user?.email}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IssueForm;