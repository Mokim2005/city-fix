import React, { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserAuth from "../../Hooks/UserAuth";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyIssus = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const [filter, setFilter] = useState("all");
  const [editData, setEditData] = useState(null); // form modal

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issus?email=${user.email}`);
      return res.data;
    },
  });

  // --------------------
  // Delete Issue
  // --------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issus/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Issue removed successfully", "success");
          }
        });
      }
    });
  };

  // --------------------
  // Save Edited Data
  // --------------------
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      category: form.category.value,
    };

    axiosSecure.patch(`/issus/${editData._id}`, updated).then((res) => {
      Swal.fire("Updated!", "Issue updated successfully!", "success");
      setEditData(null);
      refetch();
    });
  };

  // --------------------
  // Filter Logic
  // --------------------
  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((item) => item.status === filter);

  return (
    <div className="p-6 min-h-screen bg-[#1a132f] text-white">
      <h1 className="text-3xl font-bold mb-4 text-purple-400">
        My Issues ({filteredReports.length})
      </h1>

      {/* Filter */}
      <div className="mb-6 flex gap-3">
        {["all", "pending", "in-progress", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg border 
              ${
                filter === status
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-gray-300"
              }
            `}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead className="text-purple-300 text-lg">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((report, i) => (
              <tr key={report._id} className="hover:bg-white/5 transition">
                <td>{i + 1}</td>
                <td>{report.title}</td>
                <td>{report.location}</td>
                <td className="capitalize">{report.status}</td>

                <td className="flex gap-3">
                  {/* Edit Button (Pending only) */}
                  {report.status === "pending" && (
                    <button
                      onClick={() => setEditData(report)}
                      className="btn btn-xs bg-blue-600 text-white"
                    >
                      <FaEdit />
                    </button>
                  )}

                  {/* View Details */}
                  <Link
                    to={`/Issus-details/${report._id}`}
                    className="btn btn-xs bg-green-600 text-white"
                  >
                    <FcViewDetails size={20} />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="btn btn-xs bg-red-600 text-white"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------------------------
          EDIT MODAL
      --------------------------- */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#2b2250] p-6 rounded-xl w-96 border border-purple-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Edit Issue
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                name="title"
                defaultValue={editData.title}
                className="input w-full text-black"
                placeholder="Title"
              />
              <textarea
                name="description"
                defaultValue={editData.description}
                className="textarea w-full text-black"
                placeholder="Description"
              ></textarea>
              <input
                name="location"
                defaultValue={editData.location}
                className="input w-full text-black"
                placeholder="Location"
              />
              <input
                name="category"
                defaultValue={editData.category}
                className="input w-full text-black"
                placeholder="Category"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-4 py-2 bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssus;
