import React from "react";


import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UserAuth from "./UserAuth";

const UseRole = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const { isLoading: roleLoading, data: roleInfo = {} } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });

  return { roleLoading, role: roleInfo.role };
};

export default UseRole;
