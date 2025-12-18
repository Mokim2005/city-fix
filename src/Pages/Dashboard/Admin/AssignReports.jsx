// import { useQuery } from "@tanstack/react-query";
// import React from "react";


// import Swal from "sweetalert2";
// import UserAuth from "../../../Hooks/UserAuth";
// import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

// const AssignDeliveries = () => {
//   const { user } = UserAuth();
//   const axiosSecure = UseAxiosSecure();

//   const { data: parcels = [], refetch } = useQuery({
//     queryKey: ["issus", user.email, "driver-assigned"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
//       );``
//       return res.data;
//     },
//   });

// //   const handleStatusUpdate = (parcel, status) => {
// //     const statusInfo = {
// //       deliveryStatus: status,
// //       riderId: parcel.riderId,
// //       trackingId: parcel.trackingId,
// //     };

// //     let message = `parcel status is updated with ${status
// //       .split("_")
// //       .join(" ")}`;

// //     axiosSecure
// //       .patch(`/parcels/${parcel._id}/status`, statusInfo)
// //       .then((res) => {
// //         if (res.data.modifiedCount) {
// //           refetch();
// //           Swal.fire({
// //             position: "top-end",
// //             icon: "success",
// //             title: message,
// //             showConfirmButton: false,
// //             timer: 2500,
// //           });
// //         }
// //       });
// //   };

//   return (
//     <div>
//       <h2 className="text-4xl">Parcels Pending Pikup : {parcels.length}</h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Confurm</th>
//               <th>Other action</th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {parcels.map((parcel, i) => (
//               <tr key={parcel._id}>
//                 <th>{i + 1}</th>
//                 <td>{parcel.parcelName}</td>
//                 <td>
//                   {parcel.deliveryStatus === "driver_assigned" ? (
//                     <>
//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(parcel, "rider_arriving")
//                         }
//                         className="btn btn-primary text-black mr-2"
//                       >
//                         Accept
//                       </button>
//                     </>
//                   ) : (
//                     <span className="btn btn-primary text-black mr-2">
//                       Accepted
//                     </span>
//                   )}
//                   <button className="btn btn-warning text-black">Reject</button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       handleStatusUpdate(parcel, "parcel_picked_up")
//                     }
//                     className="btn btn-primary text-black mr-2"
//                   >
//                     Mark as Piked Up
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleStatusUpdate(parcel, "parcel_delivered")
//                     }
//                     className="btn btn-primary text-black mr-2"
//                   >
//                     Marked as Delivered
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody> */}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignDeliveries;
