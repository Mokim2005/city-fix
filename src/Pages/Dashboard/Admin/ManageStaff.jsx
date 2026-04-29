import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

const ManageStaff = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    photoURL: "",
    password: "",
  });

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ["staffList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/list");
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/admin/add-staff", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staffList"]);
      setShowAddModal(false);
      setFormData({
        displayName: "",
        email: "",
        phone: "",
        photoURL: "",
        password: "",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.patch(`/admin/update-staff/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staffList"]);
      setShowUpdateModal(false);
      setFormData({
        displayName: "",
        email: "",
        phone: "",
        photoURL: "",
        password: "",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin/delete-staff/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["staffList"]),
  });

  const handleAdd = () => {
    addMutation.mutate(formData);
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: selectedStaff._id, data: formData });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      deleteMutation.mutate(id);
    }
  };

  const openUpdate = (s) => {
    setSelectedStaff(s);
    setFormData({
      displayName: s.displayName || "",
      phone: s.phone || "",
      photoURL: s.photoURL || "",
    });
    setShowUpdateModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({
      displayName: "",
      email: "",
      phone: "",
      photoURL: "",
      password: "",
    });
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setFormData({
      displayName: "",
      email: "",
      phone: "",
      photoURL: "",
      password: "",
    });
  };

  if (isLoading) {
    return Loading
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
      <title>Manage Staff</title>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-10 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg"
      >
        Manage Staff ({staff.length})
      </motion.h2>

      {/* Add Staff Button */}
      <div className="mb-6 md:mb-8 text-center md:text-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition text-base md:text-lg"
        >
          + Add New Staff
        </motion.button>
      </div>

      {/* Staff Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/30"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
               <tr className="bg-gradient-to-r from-green-600/50 to-emerald-600/50 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                <th className="px-4 md:px-8 py-4 md:py-6">Name</th>
                <th className="px-4 md:px-8 py-4 md:py-6 hidden sm:table-cell">Email</th>
                <th className="px-4 md:px-8 py-4 md:py-6 hidden lg:table-cell">Phone</th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              <AnimatePresence>
                {staff.map((s, index) => (
                  <motion.tr
                    key={s._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="transition-colors"
                  >
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        {s.photoURL ? (
                          <img
                            src={s.photoURL}
                            alt={s.displayName}
                             className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-green-400"
                          />
                        ) : (
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-sm md:text-lg font-bold">
                            {s.displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-sm md:text-base">{s.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-gray-200 hidden sm:table-cell text-sm md:text-base">{s.email}</td>
                    <td className="px-4 md:px-8 py-4 md:py-6 hidden lg:table-cell text-sm md:text-base">
                      {s.phone || (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openUpdate(s)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium shadow-lg hover:shadow-green-500/30 transition"
                        >
                          Update
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(s._id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium shadow-lg hover:shadow-green-500/30 transition"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md p-4"
            onClick={closeAddModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Add New Staff
              </h3>
              <div className="space-y-4 md:space-y-5">
                <input
                  placeholder="Full Name"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Photo URL (optional)"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 mt-6 md:mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeAddModal}
                  className="px-6 md:px-8 py-3 backdrop-blur-md bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/30"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  disabled={addMutation.isPending}
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {addMutation.isPending ? "Adding..." : "Add Staff"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Staff Modal */}
      <AnimatePresence>
        {showUpdateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md p-4"
            onClick={closeUpdateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Update Staff
              </h3>
              <div className="space-y-4 md:space-y-5">
                <input
                  placeholder="Full Name"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Photo URL (optional)"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  className="w-full backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 md:px-5 py-3 md:py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 mt-6 md:mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeUpdateModal}
                  className="px-6 md:px-8 py-3 backdrop-blur-md bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition border border-white/30"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending}
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {updateMutation.isPending ? "Updating..." : "Save Changes"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageStaff;
