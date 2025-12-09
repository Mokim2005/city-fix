import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserAuth from "../../Hooks/UserAuth";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyIssus = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: reports = [] , refetch} = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/citizen?email=${user.email}`);
      return res.data;
    },
  });

  const handleReportsDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/citizen/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your Report request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1>All of my Reports: {reports.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, i) => (
              <tr key={report._id}>
                <th>{i + 1}</th>
                <td>{report.title}</td>
                <td>{report.location}</td>
                <td>{report.status}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FaEdit></FaEdit>
                  </button>
                  <button className="btn mx-2 btn-square hover:bg-primary">
                    <FcViewDetails />
                  </button>
                  <button
                    onClick={() => handleReportsDelete(report._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyIssus;
