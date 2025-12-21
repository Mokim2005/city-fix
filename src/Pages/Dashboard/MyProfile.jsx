import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserAuth from "../../Hooks/UserAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import UseRole from "../../Hooks/UseRole";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { user, updateUserProfile } = UserAuth();
  const { role } = UseRole();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch MongoDB user
  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Initial setup
  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const displayName = currentUser.displayName || user?.displayName || "";
      const photoURL = currentUser.photoURL || user?.photoURL || "";
      setName(displayName);
      setImagePreview(photoURL || "https://via.placeholder.com/150");
    }
  }, [currentUser, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosSecure.patch("/users/profile", updateData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data && (data.success || data.email || data._id)) {
        const updatedUser = data.updatedUser || data;

        queryClient.setQueryData(["user", user?.email], updatedUser);

        setName(updatedUser.displayName || "");
        setImagePreview(
          updatedUser.photoURL || "https://via.placeholder.com/150"
        );

        updateUserProfile(
          updatedUser.displayName || "",
          updatedUser.photoURL || null
        )
          .then(() => console.log("Firebase profile updated"))
          .catch((err) =>
            console.warn("Firebase update failed (not critical):", err)
          );

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        setIsEditMode(false);
        setSelectedFile(null);
      } else {
        Swal.fire("Error!", "Failed to identify updated data", "error");
      }
    },
    onError: (error) => {
      console.error("Profile update error:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update profile. Try again.",
        "error"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalPhotoURL = currentUser.photoURL || user?.photoURL || "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      Swal.fire({
        title: "Uploading Image...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const imgRes = await axios.post(imgApiUrl, formData);
        if (imgRes.data.success) {
          finalPhotoURL = imgRes.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to upload image", "error");
        return;
      } finally {
        Swal.close();
      }
    }

    const updateData = {
      displayName: name.trim() || currentUser.displayName || user?.displayName,
    };

    if (
      finalPhotoURL &&
      finalPhotoURL !== (currentUser.photoURL || user?.photoURL)
    ) {
      updateData.photoURL = finalPhotoURL;
    }

    // Check for changes
    const noNameChange =
      updateData.displayName === (currentUser.displayName || user?.displayName);
    const noPhotoChange = !updateData.photoURL;
    if (noNameChange && noPhotoChange) {
      Swal.fire(
        "No Changes",
        "You haven't made any changes to your profile",
        "info"
      );
      setIsEditMode(false);
      return;
    }

    updateProfileMutation.mutate(updateData);
  };

  if (isLoading) {
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
                  src={imagePreview}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-8 border-white/30 shadow-2xl object-cover"
                />
                {currentUser.isPremium && (
                  <div className="absolute bottom-0 right-0 bg-yellow-400 text-black p-3 rounded-full shadow-lg">
                    <FaCrown className="text-2xl" />
                  </div>
                )}
              </div>

              <h2 className="text-4xl font-bold text-white mt-6">
                {currentUser.displayName || user?.displayName}
              </h2>
              <p className="text-xl text-gray-300 mt-2">{user?.email}</p>

              {currentUser.isPremium && (
                <div className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold shadow-lg">
                  PREMIUM MEMBER
                </div>
              )}

              {currentUser.blocked && (
                <div className="mt-6 p-4 bg-red-600/80 rounded-2xl flex items-center justify-center gap-3 shadow-lg">
                  <FaBan />
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
                      Upgrade to Premium - 1000 BDT
                    </button>
                  </Link>
                )}

                {currentUser.isPremium && (
                  <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-10 rounded-2xl font-bold opacity-70 cursor-not-allowed">
                    <FaCheck /> Already Premium
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "https://via.placeholder.com/150"}
                    alt="Preview"
                    className="w-40 h-40 rounded-full border-8 border-white/30 shadow-2xl object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-purple-600 p-4 rounded-full cursor-pointer hover:bg-purple-700 transition shadow-lg">
                    <FaCamera className="text-2xl text-white" />
                    <input
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
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-purple-500/50 placeholder-gray-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-10 rounded-2xl font-bold shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-70"
                  >
                    <FaCheck />
                    {updateProfileMutation.isPending
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setSelectedFile(null);
                      setName(
                        currentUser.displayName || user?.displayName || ""
                      );
                      setImagePreview(
                        currentUser.photoURL || user?.photoURL || ""
                      );
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
