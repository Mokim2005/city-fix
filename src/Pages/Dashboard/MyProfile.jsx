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

        setName(updatedUser.displayName || user?.displayName || "");
        setImagePreview(
          updatedUser.photoURL ||
            user?.photoURL ||
            "https://via.placeholder.com/150"
        );
        setSelectedFile(null);
        setIsEditMode(false);

        queryClient.setQueryData(["user", user?.email], updatedUser);
        queryClient.invalidateQueries({ queryKey: ["user", user?.email] });

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
    return Loading;
  }

  return (
    <>
      {/* ── Keyframe animations injected once ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1);    }
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
          50%       { box-shadow: 0 0 22px 6px rgba(52,211,153,0.35); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .profile-card  { animation: fadeSlideUp 0.55s ease both; }
        .details-card  { animation: fadeSlideUp 0.55s 0.12s ease both; }
        .edit-card     { animation: fadeSlideUp 0.45s ease both; }

        .avatar-ring:hover img {
          animation: avatarGlow 1.8s ease-in-out infinite;
        }

        .detail-row {
          transition: background 0.2s, transform 0.2s;
          border-radius: 0.75rem;
          padding: 0.6rem 0.75rem;
          margin: -0.6rem -0.75rem;
        }
        .detail-row:hover {
          background: rgba(255,255,255,0.06);
          transform: translateX(4px);
        }

        .btn-edit {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-edit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-edit:hover {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 8px 24px rgba(16,185,129,0.35);
        }
        .btn-edit:hover::after {
          opacity: 1;
          animation: shimmer 0.8s linear;
        }
        .btn-edit:active { transform: scale(0.98); }

        .btn-upgrade {
          transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-upgrade:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255,255,255,0.1);
        }
        .btn-upgrade:active { transform: scale(0.98); }

        .btn-save {
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-save:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(22,163,74,0.4);
        }
        .btn-save:active:not(:disabled) { transform: scale(0.98); }

        .btn-cancel {
          transition: background 0.2s, transform 0.2s;
        }
        .btn-cancel:hover {
          background: #4b5563;
          transform: translateY(-2px);
        }
        .btn-cancel:active { transform: scale(0.98); }

        .badge-premium {
          animation: popIn 0.4s 0.3s ease both;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .badge-premium:hover {
          transform: scale(1.06);
          box-shadow: 0 4px 14px rgba(74,222,128,0.3);
        }
        .badge-blocked {
          animation: popIn 0.4s 0.35s ease both;
          transition: transform 0.2s;
        }
        .badge-blocked:hover { transform: scale(1.06); }

        .crown-icon {
          animation: popIn 0.5s 0.5s ease both;
          transition: transform 0.25s;
        }
        .crown-icon:hover { transform: scale(1.2) rotate(-8deg); }

        .camera-label {
          transition: background 0.2s, transform 0.2s;
        }
        .camera-label:hover {
          background: #15803d;
          transform: scale(1.12);
        }
      `}</style>

      <div className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-6xl text-white">

          {/* Header */}
          <div className="mb-8" style={{ animation: "fadeSlideUp 0.4s ease both" }}>
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="text-gray-400 mt-2">View all your profile details here.</p>
          </div>

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT CARD */}
            <div className="profile-card lg:col-span-1 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl hover:border-white/30">

              {/* Avatar */}
              <div className="avatar-ring relative">
                <img
                  src={imagePreview}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white/20 transition-transform duration-300 hover:scale-105"
                  alt="avatar"
                />
                {currentUser.isPremium && (
                  <div className="crown-icon absolute bottom-2 right-2 bg-yellow-400 text-black p-2 rounded-full">
                    <FaCrown />
                  </div>
                )}
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold mt-5 text-center">
                {name || user?.displayName}
              </h2>
              <p className="text-gray-400">{user?.email}</p>

              {/* Status badges */}
              <div className="mt-4 flex flex-col gap-2 items-center">
                {currentUser.isPremium && (
                  <span className="badge-premium px-4 py-1 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-sm">
                    Premium User
                  </span>
                )}
                {currentUser.blocked && (
                  <span className="badge-blocked px-4 py-1 bg-red-500/20 border border-red-400/30 text-red-300 rounded-full text-sm flex items-center gap-2">
                    <FaBan /> Blocked
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="w-full mt-6 space-y-3">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="btn-edit w-full bg-gradient-to-r from-green-600 to-emerald-600 py-3 rounded-xl font-semibold"
                >
                  <FaCamera className="inline mr-2" />
                  Edit Profile
                </button>

                {/* Upgrade button — only shown when NOT premium and NOT blocked */}
                {!currentUser.isPremium && !currentUser.blocked && (
                  <Link to="/dashboard/payment">
                    <button className="btn-upgrade w-full bg-white/10 border border-white/20 py-3 rounded-xl mt-3">
                      Upgrade Premium
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="details-card lg:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-white/30">

              <h2 className="text-xl font-semibold mb-6">Bio &amp; other details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="detail-row">
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="font-semibold">{name || user?.displayName}</p>
                </div>

                <div className="detail-row">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>

                <div className="detail-row">
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="font-semibold">{role?.toUpperCase()}</p>
                </div>

                {/* Upgrade button hidden means premium (paid), visible means free */}
                <div className="detail-row">
                  <p className="text-gray-400 text-sm">Account Status</p>
                  <p className={`font-semibold ${(!currentUser.isPremium && !currentUser.blocked) ? "text-gray-300" : "text-yellow-300"}`}>
                    {(!currentUser.isPremium && !currentUser.blocked) ? "Free" : "Paid"}
                  </p>
                </div>

                <div className="detail-row">
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="font-semibold">{currentUser._id?.slice(0, 10)}</p>
                </div>

                <div className="detail-row">
                  <p className="text-gray-400 text-sm">Blocked</p>
                  <p className={`font-semibold ${currentUser.blocked ? "text-red-400" : "text-gray-300"}`}>
                    {currentUser.blocked ? "Yes" : "No"}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* EDIT MODE */}
          {isEditMode && (
            <div className="edit-card mt-8 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6">

              <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      className="w-36 h-36 rounded-full border-4 border-white/20 transition-transform duration-300 hover:scale-105"
                      alt="preview"
                    />
                    <label className="camera-label absolute bottom-2 right-2 bg-green-600 p-2 rounded-full cursor-pointer">
                      <FaCamera />
                      <input type="file" hidden onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl transition-all duration-200 focus:outline-none focus:border-green-400/60 focus:bg-white/15"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="btn-save flex-1 bg-green-600 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateProfileMutation.isPending ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="btn-cancel flex-1 bg-gray-600 py-3 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyProfile;