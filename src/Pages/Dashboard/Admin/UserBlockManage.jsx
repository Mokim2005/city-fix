import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const UserBlockManage = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const blockMutation = useMutation({
    mutationFn: async ({ id, blocked }) => {
      const res = await axiosSecure.patch(`/admin/user-block/${id}`, {
        blocked,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const handleBlock = (user, blocked) => {
    if (window.confirm(`${blocked ? "Block" : "Unblock"} this user?`)) {
      blockMutation.mutate({ id: user._id, blocked });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{user.isPremium ? "Premium" : "Free"}</td>
              <td>{user.blocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => handleBlock(user, !user.blocked)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBlockManage;
