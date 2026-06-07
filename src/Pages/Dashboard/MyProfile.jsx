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
import Loading from "../../Components/Loading";

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

  // Initial setup + update when currentUser changes
  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const displayName = currentUser.displayName || user?.displayName || "";
      const photoURL =
        currentUser.photoURL ||
        user?.photoURL ||
        "https://via.placeholder.com/150";

      setName(displayName);
      setImagePreview(photoURL);
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

        // 🔥 IMPORTANT: Manually update all states immediately
        setName(updatedUser.displayName || user?.displayName || "");
        setImagePreview(
          updatedUser.photoURL ||
            user?.photoURL ||
            "https://via.placeholder.com/150"
        );
        setSelectedFile(null);
        setIsEditMode(false);

        // Update React Query cache
        queryClient.setQueryData(["user", user?.email], updatedUser);

        // Optional: Invalidate to refetch fresh data (double safety)
        queryClient.invalidateQueries({ queryKey: ["user", user?.email] });

        // Update Firebase Auth profile
        updateUserProfile(
          updatedUser.displayName || "",
          updatedUser.photoURL || null
        )
          .then(() => console.log("Firebase profile updated"))
          .catch((err) => console.warn("Firebase update failed:", err));

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error!", "Failed to update profile", "error");
      }
    },
    onError: (error) => {
      console.error("Profile update error:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update profile",
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
        Swal.close();
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

    // No changes check
    const noNameChange =
      updateData.displayName === (currentUser.displayName || user?.displayName);
    const noPhotoChange = !updateData.photoURL;
    if (noNameChange && noPhotoChange) {
      Swal.fire("No Changes", "You haven't made any changes", "info");
      setIsEditMode(false);
      return;
    }

    updateProfileMutation.mutate(updateData);
  };

  if (isLoading) {
    return Loading
  }

return (
  <div className="w-full flex justify-center px-4 py-10">
    
    {/* Main Container */}
    <div className="w-full max-w-6xl text-white">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-gray-400 mt-2">
          View all your profile details here.
        </p>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CARD - PROFILE */}
        <div className="lg:col-span-1 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col items-center">

          {/* Avatar */}
          <div className="relative">
            <img
              src={imagePreview}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/20"
            />

            {currentUser.isPremium && (
              <div className="absolute bottom-2 right-2 bg-yellow-400 text-black p-2 rounded-full">
                <FaCrown />
              </div>
            )}
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold mt-5 text-center">
            {name || user?.displayName}
          </h2>

          <p className="text-gray-400">{user?.email}</p>

          {/* Status */}
          <div className="mt-4 flex flex-col gap-2 items-center">
            {currentUser.isPremium && (
              <span className="px-4 py-1 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-sm">
                Premium User
              </span>
            )}

            {currentUser.blocked && (
              <span className="px-4 py-1 bg-red-500/20 border border-red-400/30 text-red-300 rounded-full text-sm flex items-center gap-2">
                <FaBan /> Blocked
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="w-full mt-6 space-y-3">

            <button
              onClick={() => setIsEditMode(true)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <FaCamera className="inline mr-2" />
              Edit Profile
            </button>

            {!currentUser.isPremium && !currentUser.blocked && (
              <Link to="/dashboard/payment">
                <button className="w-full bg-white/10 border border-white/20 py-3 rounded-xl hover:bg-white/20 transition">
                  Upgrade Premium
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT CARD - DETAILS (like your image) */}
        <div className="lg:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">

          <h2 className="text-xl font-semibold mb-6">
            Bio & other details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="font-semibold">{name || user?.displayName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="font-semibold">{role?.toUpperCase()}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Account Status</p>
              <p className="font-semibold">
                {currentUser.isPremium ? "Premium" : "Free"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">User ID</p>
              <p className="font-semibold">
                {currentUser._id?.slice(0, 10)}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Blocked</p>
              <p className="font-semibold">
                {currentUser.blocked ? "Yes" : "No"}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* EDIT MODE (unchanged logic, same UI block) */}
      {isEditMode && (
        <div className="mt-8 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6">
          
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-36 h-36 rounded-full border-4 border-white/20"
                />

                <label className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full cursor-pointer">
                  <FaCamera />
                  <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl"
            />

            <div className="flex gap-4">

              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="flex-1 bg-green-600 py-3 rounded-xl"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="flex-1 bg-gray-600 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  </div>
);
};

export default MyProfile;
