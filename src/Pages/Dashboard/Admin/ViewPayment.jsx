import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { format } from "date-fns";
import Loading from "../../../Components/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";

// Safe date formatting
const formatDateSafely = (dateInput) => {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Invalid Date";
  return format(date, "dd MMM yyyy, hh:mm a");
};

const ViewPayments = () => {
  const axiosSecure = UseAxiosSecure();
  const [purposeFilter, setPurposeFilter] = useState("");
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

  // Ref for each receipt card (mobile view)
  const receiptRefs = useRef({});

  // PDF Download Function
  const downloadReceipt = async (payment) => {
    const receiptId = `receipt-${payment._id}`;
    const element = receiptRefs.current[receiptId];

    if (!element) {
      alert("Receipt not ready. Try again.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1a1a1a",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Receipt_${payment.transactionId || payment._id}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

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

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-4 sm:p-5 md:p-6 rounded-2xl shadow-2xl mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-white/90">
              Total Revenue
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mt-1 sm:mt-2 leading-tight">
              {totalRevenue.toLocaleString()}{" "}
              <span className="text-sm sm:text-base font-normal">BDT</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
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
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6">
        {payments.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-3">
              No Payments Found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
              {purposeFilter || monthFilter
                ? "Try adjusting your filters."
                : "No payment records available."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700/80 backdrop-blur-sm border-b border-gray-600/50">
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Transaction ID
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-sm text-gray-200">
                          Details
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-sm text-gray-200">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {payments.map((payment) => (
                        <tr
                          key={payment._id}
                          className="hover:bg-gray-700/50 transition-all"
                        >
                          <td className="px-6 py-5 text-sm">
                            {formatDateSafely(payment.createdAt)}
                          </td>
                          <td className="px-6 py-5 text-sm truncate max-w-xs">
                            {payment.email}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                payment.purpose === "subscribe"
                                  ? "bg-blue-900/60 text-blue-300"
                                  : "bg-orange-900/60 text-orange-300"
                              }`}
                            >
                              {payment.purpose === "subscribe"
                                ? "Premium"
                                : "Boost"}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-xl font-bold text-emerald-400">
                            ৳{payment.amount_bdt?.toLocaleString()}
                          </td>
                          <td className="px-6 py-5 font-mono text-xs text-gray-400 break-all">
                            {payment.transactionId || "N/A"}
                          </td>
                          <td className="px-6 py-5 text-sm">
                            {payment.issueId && (
                              <div className="text-blue-400">
                                #Issue-{payment.issueId}
                              </div>
                            )}
                            {payment.plan && (
                              <div className="text-purple-400">
                                {payment.plan}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5 text-center">
                            <button
                              onClick={() => downloadReceipt(payment)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-medium transition shadow-md hover:shadow-lg"
                            >
                              <FaDownload className="w-4 h-4" />
                              <span className="hidden md:inline">Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Card View with Hidden Receipt Template */}
            <div className="sm:hidden space-y-4">
              {payments.map((payment) => (
                <div key={payment._id}>
                  {/* Visible Card */}
                  <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            payment.purpose === "subscribe"
                              ? "bg-blue-900/70 text-blue-300"
                              : "bg-orange-900/70 text-orange-300"
                          }`}
                        >
                          {payment.purpose === "subscribe"
                            ? "Premium"
                            : "Boost"}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateSafely(payment.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-3xl text-emerald-400">
                          ৳{payment.amount_bdt?.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500">Email:</span>{" "}
                        <span className="text-gray-300 break-all">
                          {payment.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">TXN ID:</span>{" "}
                        <span className="font-mono text-xs bg-gray-700/50 px-2 py-1 rounded">
                          {payment.transactionId || "N/A"}
                        </span>
                      </div>
                      {(payment.issueId || payment.plan) && (
                        <div className="flex flex-wrap gap-2">
                          {payment.issueId && (
                            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-lg">
                              Issue #{payment.issueId}
                            </span>
                          )}
                          {payment.plan && (
                            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-lg">
                              {payment.plan}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => downloadReceipt(payment)}
                      className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition shadow-lg"
                    >
                      <FaDownload />
                      Download Receipt (PDF)
                    </button>
                  </div>

                  {/* Hidden Receipt Template for PDF */}
                  <div
                    ref={(el) =>
                      (receiptRefs.current[`receipt-${payment._id}`] = el)
                    }
                    className="fixed -left-full -top-full w-[210mm] bg-gray-900 text-gray-100 p-10"
                  >
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-emerald-400">
                        City Fix
                      </h1>
                      <p className="text-xl mt-2">Payment Receipt</p>
                    </div>
                    <div className="border-t border-gray-700 pt-6 space-y-4 text-lg">
                      <div className="flex justify-between">
                        <span>Date:</span>{" "}
                        <span>{formatDateSafely(payment.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span> <span>{payment.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>{" "}
                        <span className="capitalize">
                          {payment.purpose === "subscribe"
                            ? "Premium Subscription"
                            : "Issue Boost"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>{" "}
                        <span className="text-3xl font-bold text-emerald-400">
                          ৳{payment.amount_bdt?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>{" "}
                        <span className="font-mono">
                          {payment.transactionId || "N/A"}
                        </span>
                      </div>
                      {payment.issueId && (
                        <div className="flex justify-between">
                          <span>Issue ID:</span> <span>#{payment.issueId}</span>
                        </div>
                      )}
                      {payment.plan && (
                        <div className="flex justify-between">
                          <span>Plan:</span> <span>{payment.plan}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-12 text-gray-500">
                      <p>Thank you for your payment!</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPayments;
