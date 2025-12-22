import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { format } from "date-fns";
import Loading from "../../../Components/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";

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

  const receiptRefs = useRef({});

  const downloadReceipt = async (payment) => {
    const receiptId = `receipt-${payment._id}`;
    const element = receiptRefs.current[receiptId];

    if (!element) {
      Swal.fire("Error", "Receipt not ready. Please try again.", "error");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#111111",
        logging: false,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const styleTags = clonedDoc.querySelectorAll("style");
          styleTags.forEach((tag) => tag.remove());

          clonedDoc.body.style.background = "#111111";
          clonedDoc.body.style.color = "#e5e7eb";
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

      let remainingHeight = imgHeight - (pdfHeight - 30);
      while (remainingHeight > 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          10,
          -(remainingHeight + position),
          imgWidth,
          imgHeight
        );
        remainingHeight -= pdfHeight;
      }

      pdf.save(`CityFix_Receipt_${payment.transactionId || payment._id}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      Swal.fire("Error", "Failed to generate PDF. Please try again.", "error");
    }
  };

  if (isLoading) return <Loading />;

  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.amount_bdt || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Payment History
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
      </div>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-2xl shadow-2xl mb-8 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white/90">Total Revenue</p>
            <p className="text-4xl md:text-5xl font-black text-white mt-2">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
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
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="px-6 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Types</option>
          <option value="subscribe">Subscription</option>
          <option value="boost">Boost</option>
        </select>

        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-6 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Payments List */}
      <div className="space-y-6">
        {payments.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-400">
              No Payments Found
            </h3>
            <p className="text-gray-500 mt-4">
              {purposeFilter || monthFilter
                ? "Try changing filters"
                : "No records yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-gray-800/80 rounded-2xl overflow-hidden shadow-2xl">
                <thead className="bg-gray-700/80">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">TXN ID</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-5">
                        {formatDateSafely(payment.createdAt)}
                      </td>
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-medium">{payment.name || "N/A"}</p>
                          <p className="text-sm text-gray-400">
                            {payment.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
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
                      <td className="px-6 py-5 text-2xl font-bold text-emerald-400">
                        ${payment.amount_bdt?.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 font-mono text-sm text-gray-400">
                        {payment.transactionId || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => downloadReceipt(payment)}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-white flex items-center gap-2 mx-auto transition"
                        >
                          <FaDownload />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {payments.map((payment) => (
                <div key={payment._id}>
                  {/* Visible Card */}
                  <div className="bg-gray-800/90 rounded-2xl p-6 shadow-xl border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-2xl font-bold text-emerald-400">
                          ৳{payment.amount_bdt?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {formatDateSafely(payment.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          payment.purpose === "subscribe"
                            ? "bg-blue-900/70 text-blue-300"
                            : "bg-orange-900/70 text-orange-300"
                        }`}
                      >
                        {payment.purpose === "subscribe" ? "Premium" : "Boost"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">User</p>
                        <p className="font-medium">{payment.name || "N/A"}</p>
                        <p className="text-sm text-gray-400">{payment.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-mono text-xs bg-gray-700/50 px-3 py-1 rounded">
                          {payment.transactionId || "N/A"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => downloadReceipt(payment)}
                      className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-white flex items-center justify-center gap-3"
                    >
                      <FaDownload className="w-5 h-5" />
                      Download Receipt
                    </button>
                  </div>

                  {/* Hidden Receipt Template - FULLY FIXED: No Tailwind classes, only inline hex styles */}
                  <div
                    ref={(el) =>
                      (receiptRefs.current[`receipt-${payment._id}`] = el)
                    }
                    style={{
                      position: "fixed",
                      left: "-9999px",
                      top: "-9999px",
                      width: "210mm",
                      minHeight: "297mm",
                      backgroundColor: "#111111",
                      color: "#e5e7eb",
                      padding: "48px",
                      fontFamily: "Arial, sans-serif",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                      <h1
                        style={{
                          fontSize: "48px",
                          fontWeight: "bold",
                          color: "#10b981",
                          margin: "0 0 16px 0",
                        }}
                      >
                        City Fix
                      </h1>
                      <p
                        style={{
                          fontSize: "28px",
                          color: "#9ca3af",
                          margin: "0",
                        }}
                      >
                        Payment Receipt
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "32px 0",
                        borderTop: "2px solid #4b5563",
                        borderBottom: "2px solid #4b5563",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "24px",
                          fontSize: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Date & Time:</span>
                        <span>{formatDateSafely(payment.createdAt)}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "24px",
                          fontSize: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Customer:</span>
                        <span>
                          {payment.name || "N/A"} ({payment.email || "N/A"})
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "24px",
                          fontSize: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Payment Type:</span>
                        <span>
                          {payment.purpose === "subscribe"
                            ? "Premium Subscription"
                            : "Issue Priority Boost"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "32px",
                          fontSize: "40px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Amount Paid:</span>
                        <span style={{ fontWeight: "900", color: "#10b981" }}>
                          ৳{payment.amount_bdt?.toLocaleString()}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "24px",
                          fontSize: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>
                          Transaction ID:
                        </span>
                        <span style={{ fontFamily: "monospace" }}>
                          {payment.transactionId || "N/A"}
                        </span>
                      </div>
                      {payment.issueId && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "24px",
                            fontSize: "20px",
                          }}
                        >
                          <span style={{ fontWeight: "600" }}>Issue ID:</span>
                          <span>#{payment.issueId}</span>
                        </div>
                      )}
                      {payment.plan && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "24px",
                            fontSize: "20px",
                          }}
                        >
                          <span style={{ fontWeight: "600" }}>Plan:</span>
                          <span>{payment.plan}</span>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "64px",
                        color: "#9ca3af",
                      }}
                    >
                      <p style={{ fontSize: "18px" }}>
                        Thank you for your payment!
                      </p>
                      <p style={{ marginTop: "16px" }}>support@cityfix.com</p>
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
