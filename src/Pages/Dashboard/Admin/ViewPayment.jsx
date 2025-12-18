import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { format } from "date-fns";
import Loading from "../../../Components/Loading";

// Safe date formatting function
const formatDateSafely = (dateInput) => {
  if (!dateInput) return "N/A";

  const date = new Date(dateInput);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return format(date, "dd MMM yyyy, hh:mm a");
};

const ViewPayments = () => {
  const axiosSecure = UseAxiosSecure();

  const [purposeFilter, setPurposeFilter] = useState(""); // all/subscribe/boost
  const [monthFilter, setMonthFilter] = useState("");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["adminPayments", purposeFilter, monthFilter],
    queryFn: async () => {
      let url = "/admin/payments";
      const params = new URLSearchParams();
      if (purposeFilter) params.append("purpose", purposeFilter);
      if (monthFilter) params.append("month", monthFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Total revenue calculation
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.amount_bdt || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {/* Summary Card */}
      <div className="bg-green-100 p-4 rounded-lg mb-6 inline-block">
        <p className="text-lg font-semibold">
          Total Revenue: {totalRevenue} BDT
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="subscribe">Subscription</option>
          <option value="boost">Boost</option>
        </select>

        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Date</th>
                <th className="border border-gray-300 p-3 text-left">Email</th>
                <th className="border border-gray-300 p-3 text-left">Type</th>
                <th className="border border-gray-300 p-3 text-left">
                  Amount (BDT)
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Transaction ID
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                  <td className="border border-gray-300 p-3">
                    {formatDateSafely(payment.createdAt)}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {payment.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.purpose === "subscribe"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {payment.purpose === "subscribe"
                        ? "Premium Subscription"
                        : "Issue Boost"}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 font-bold text-green-600">
                    {payment.amount_bdt || 0} BDT
                  </td>
                  <td className="border border-gray-300 p-3 text-sm font-mono">
                    {payment.transactionId || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {payment.purpose === "boost" && payment.issueId && (
                      <div>Issue ID: {payment.issueId}</div>
                    )}
                    {payment.plan && <div>Plan: {payment.plan}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewPayments;
