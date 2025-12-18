import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AllIssusTable = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const { data: issues = [] } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issus");
      return res.data;
    },
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ["staffList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/list");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ id, staffEmail, staffName }) => {
      const res = await axiosSecure.patch(`/admin/assign-staff/${id}`, {
        staffEmail,
        staffName,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["allIssues"]),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/reject-issue/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["allIssues"]),
  });

  const handleAssign = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const confirmAssign = () => {
    const staff = staffList.find((s) => s.email === selectedStaff);
    assignMutation.mutate({
      id: selectedIssue._id,
      staffEmail: selectedStaff,
      staffName: staff.displayName,
    });
    setShowModal(false);
  };

  const handleReject = (id) => {
    if (window.confirm("Reject this issue?")) {
      rejectMutation.mutate(id);
    }
  };

  const sortedIssues = issues.sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Issues</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedIssues.map((issue) => (
            <tr key={issue._id}>
              <td>{issue.title}</td>
              <td>{issue.category}</td>
              <td>{issue.status}</td>
              <td>{issue.priority}</td>
              <td>{issue.assignedStaffName || "Not Assigned"}</td>
              <td>
                {!issue.assignedStaffEmail && (
                  <button
                    onClick={() => handleAssign(issue)}
                    className="bg-blue-500 text-white px-2 py-1"
                  >
                    Assign Staff
                  </button>
                )}
                {issue.status === "pending" && (
                  <button
                    onClick={() => handleReject(issue._id)}
                    className="bg-red-500 text-white px-2 py-1 ml-2"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h3>Assign Staff to {selectedIssue.title}</h3>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffList.map((s) => (
                <option key={s._id} value={s.email}>
                  {s.displayName} ({s.email})
                </option>
              ))}
            </select>
            <button
              onClick={confirmAssign}
              className="bg-green-500 text-white px-4 py-2 mt-4"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllIssusTable;
