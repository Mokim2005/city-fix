import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


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

  const { data: staff = [] } = useQuery({
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
    if (window.confirm("Delete this staff?")) {
      deleteMutation.mutate(id);
    }
  };

  const openUpdate = (s) => {
    setSelectedStaff(s);
    setFormData({
      displayName: s.displayName,
      phone: s.phone,
      photoURL: s.photoURL,
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Staff</h2>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        Add Staff
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s._id}>
              <td>{s.displayName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>
                <button
                  onClick={() => openUpdate(s)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h3>Add Staff</h3>
            <input
              placeholder="Name"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-gray-500 text-white px-4 py-2 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h3>Update Staff</h3>
            <input
              placeholder="Name"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Update
            </button>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="bg-gray-500 text-white px-4 py-2 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
