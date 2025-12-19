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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
          Payment History
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
      </div>

      {/* Summary Card - Fully Responsive */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-4 sm:p-5 md:p-6 rounded-2xl shadow-2xl mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-white/90">
              Total Revenue
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mt-1 sm:mt-2 leading-tight">
              {totalRevenue.toLocaleString()} <span className="text-sm sm:text-base font-normal">BDT</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters - Perfect responsive */}
      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto sm:mx-0">
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="px-4 py-3 sm:px-5 bg-gray-800/80 border border-gray-700/50 backdrop-blur-sm rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-300 w-full flex-1 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:border-gray-600/50"
        >
          <option value="">All Payment Types</option>
          <option value="subscribe">Subscription Payments</option>
          <option value="boost">Boost Payments</option>
        </select>

        <div className="relative">
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-3 sm:px-5 w-full bg-gray-800/80 border border-gray-700/50 backdrop-blur-sm rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:border-gray-600/50 pl-12 pr-4"
            placeholder="Select Month"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Responsive Content Area */}
      <div className="space-y-4 sm:space-y-6">
        {/* No Data State */}
        {payments.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-3">No Payments Found</h3>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
              {purposeFilter || monthFilter 
                ? "Try adjusting your filters to see payment records." 
                : "No payment records available at the moment."
              }
            </p>
          </div>
        ) : (
          <>
            {/* Desktop+ Table View */}
            <div className="hidden sm:block">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700/80 backdrop-blur-sm border-b border-gray-600/50">
                        {[
                          { label: "Date & Time", className: "w-32" },
                          { label: "Email", className: "w-48 sm:w-64" },
                          { label: "Type", className: "w-40" },
                          { label: "Amount", className: "w-32" },
                          { label: "Transaction ID", className: "w-48" },
                          { label: "Details", className: "w-48" }
                        ].map((header, idx) => (
                          <th 
                            key={idx}
                            className={`px-3 sm:px-4 md:px-6 py-4 text-left font-semibold text-xs sm:text-sm md:text-base text-gray-200 uppercase tracking-wider ${header.className}`}
                          >
                            {header.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {payments.map((payment) => (
                        <tr
                          key={payment._id}
                          className="hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-700/30 last:border-b-0 group"
                        >
                          <td className="px-3 sm:px-4 md:px-6 py-5 text-gray-300 text-xs sm:text-sm font-medium">
                            {formatDateSafely(payment.createdAt)}
                          </td>
                          <td className="px-3 sm:px-4 md:px-6 py-5 text-gray-300 text-xs sm:text-sm max-w-[140px] sm:max-w-none truncate">
                            {payment.email || "N/A"}
                          </td>
                          <td className="px-3 sm:px-4 md:px-6 py-5">
                            <span
                              className={`inline-flex px-3 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md ${
                                payment.purpose === "subscribe"
                                  ? "bg-gradient-to-r from-blue-900/60 to-blue-800/60 text-blue-300 border border-blue-500/30"
                                  : "bg-gradient-to-r from-orange-900/60 to-orange-800/60 text-orange-300 border border-orange-500/30"
                              }`}
                            >
                              {payment.purpose === "subscribe" ? "Premium Subscription" : "Issue Boost"}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 md:px-6 py-5">
                            <div className="font-black text-emerald-400 text-lg sm:text-xl md:text-2xl leading-tight">
                              ৳{payment.amount_bdt?.toLocaleString() || 0}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 md:px-6 py-5 text-gray-400 font-mono text-xs sm:text-sm max-w-[140px] sm:max-w-none break-words">
                            {payment.transactionId || "N/A"}
                          </td>
                          <td className="px-3 sm:px-4 md:px-6 py-5 text-gray-300 text-xs sm:text-sm">
                            <div className="space-y-1">
                              {payment.purpose === "boost" && payment.issueId && (
                                <div className="text-blue-400 font-medium">#Issue-{payment.issueId}</div>
                              )}
                              {payment.plan && (
                                <div className="text-purple-400 font-medium">{payment.plan} Plan</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Card View - Shows on ALL small screens */}
            <div className="sm:hidden space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                            payment.purpose === "subscribe"
                              ? "bg-gradient-to-r from-blue-900/70 to-blue-800/70 text-blue-300"
                              : "bg-gradient-to-r from-orange-900/70 to-orange-800/70 text-orange-300"
                          }`}
                        >
                          {payment.purpose === "subscribe" ? "Premium" : "Boost"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 truncate">Date</p>
                        <p className="text-sm sm:text-base font-semibold text-gray-100 truncate">
                          {formatDateSafely(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-2xl sm:text-3xl text-emerald-400 leading-tight">
                        ৳{payment.amount_bdt?.toLocaleString() || 0}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-200 break-words">{payment.email || "N/A"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Transaction ID</p>
                      <p className="text-xs font-mono text-gray-400 bg-gray-700/50 px-2 py-1 rounded-lg break-all">
                        {payment.transactionId || "N/A"}
                      </p>
                    </div>

                    {(payment.issueId || payment.plan) && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Details</p>
                        <div className="flex flex-wrap gap-2">
                          {payment.purpose === "boost" && payment.issueId && (
                            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-lg border border-blue-500/30">
                              Issue #{payment.issueId}
                            </span>
                          )}
                          {payment.plan && (
                            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs font-medium rounded-lg border border-purple-500/30">
                              {payment.plan}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show table row count on mobile */}
            {payments.length > 0 && (
              <div className="sm:hidden pt-4 text-center">
                <p className="text-xs text-gray-500 bg-gray-800/50 px-4 py-2 rounded-xl inline-block border border-gray-700/50">
                  Showing {payments.length} payments
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPayments;