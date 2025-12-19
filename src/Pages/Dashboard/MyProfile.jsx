import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserAuth from "../../Hooks/UserAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import UseRole from "../../Hooks/UseRole";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaUser,
  FaCamera,
  FaCheck,
  FaTimes,
  FaCrown,
  FaBan,
} from "react-icons/fa";

const MyProfile = () => {
  const { user } = UserAuth();
  const { role } = UseRole();
  const axiosSecure = UseAxiosSecure();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Load user from MongoDB
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => {
          const mongoUser = res.data;
          setCurrentUser(mongoUser);
          setImagePreview(mongoUser.photoURL || user.photoURL || "");
          setValue(
            "displayName",
            mongoUser.displayName || user.displayName || ""
          );
        })
        .catch((err) => {
          console.error(err);
          setCurrentUser(user);
          setImagePreview(user.photoURL || "");
        });
    }
  }, [user, axiosSecure, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    // সবসময় current photoURL দিয়ে শুরু করুন
    let photoURL = currentUser.photoURL || user.photoURL || "";

    // যদি নতুন image select করা হয়, তাহলে upload করুন
    if (data.newPhoto?.[0]) {
      const formData = new FormData();
      formData.append("image", data.newPhoto[0]);

      const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      Swal.fire({
        title: "Uploading image...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const imgRes = await axios.post(imgApiUrl, formData);
        if (imgRes.data?.success) {
          photoURL = imgRes.data.data.display_url;
        } else {
          throw new Error("Upload failed");
        }
        Swal.close(); // loading বন্ধ
      } catch (error) {
        Swal.fire("Error!", "Image upload failed. Try again.", "error");
        return; // update বন্ধ করুন
      }
    }

    // Final update data — name + photoURL (যদি change না হয় তাহলেও পুরানোটা পাঠাবে)
    const updateData = {
      displayName:
        data.displayName?.trim() || currentUser.displayName || user.displayName,
    };

    // শুধু যদি photoURL change হয় বা নতুন upload হয় তাহলে পাঠান (optional optimize)
    if (photoURL) {
      updateData.photoURL = photoURL;
    }

    try {
      const res = await axiosSecure.patch("/users/profile", updateData);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Profile updated successfully!",
          timer: 2000,
        });

        // Local state update
        setCurrentUser((prev) => ({ ...prev, ...updateData }));
        setIsEditMode(false);
        setImagePreview(photoURL); // preview update
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Update failed",
        "error"
      );
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
              <FaUser /> {role?.toUpperCase()}
            </div>
          </div>

          {!isEditMode ? (
            <div className="text-center mt-8">
              <div className="relative inline-block">
                <img
                  src={
                    currentUser.photoURL ||
                    user.photoURL ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-8 border-white/30 shadow-2xl object-cover"
                />
                {currentUser.isPremium && (
                  <div className="absolute bottom-0 right-0 bg-yellow-400 text-black p-3 rounded-full">
                    <FaCrown className="text-2xl" />
                  </div>
                )}
              </div>

              <h2 className="text-4xl font-bold text-white mt-6">
                {currentUser.displayName || user.displayName}
              </h2>
              <p className="text-xl text-gray-300 mt-2">{user.email}</p>

              {currentUser.isPremium && (
                <div className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold">
                  PREMIUM MEMBER
                </div>
              )}

              {currentUser.blocked && (
                <div className="mt-6 p-4 bg-red-600/80 rounded-2xl flex items-center justify-center gap-3">
                  <FaBan />{" "}
                  <span className="text-xl font-bold">Account Blocked</span>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-10 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  <FaCamera /> Edit Profile
                </button>

                {!currentUser.isPremium && !currentUser.blocked && (
                  <Link to="/dashboard/payment">
                    <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-4 px-10 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all">
                      Upgrade to Premium - ৳1000
                    </button>
                  </Link>
                )}

                {currentUser.isPremium && (
                  <button
                    disabled
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-10 rounded-2xl font-bold opacity-70"
                  >
                    ✓ Already Premium
                  </button>
                )}
              </div>
            </div>
          ) : (
            // EDIT MODE
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "https://via.placeholder.com/150"}
                    alt="Preview"
                    className="w-40 h-40 rounded-full border-8 border-white/30 shadow-2xl object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-purple-600 p-4 rounded-full cursor-pointer hover:bg-purple-700">
                    <FaCamera className="text-2xl" />
                    <input
                      {...register("newPhoto")}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-200 text-lg font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("displayName", {
                      required: "Name is required",
                    })}
                    type="text"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                    placeholder="Your name"
                  />
                  {errors.displayName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.displayName.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-10 rounded-2xl font-bold shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <FaCheck /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      reset();
                      setImagePreview(currentUser.photoURL || user.photoURL);
                    }}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-4 px-10 rounded-2xl font-bold shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
