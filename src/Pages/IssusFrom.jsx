import React, { useState } from "react";
import { Link } from "react-router";

const IssueForm = () => {
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1a132f] to-[#2b2250] p-6">
      <div className="bg-[#2b2250] w-full max-w-3xl p-8 rounded-2xl shadow-xl border border-purple-600/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
          Report a New Issue
        </h2>

        <form className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Issue Title
            </label>
            <input
              type="text"
              placeholder="Enter issue title"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Description
            </label>
            <textarea
              placeholder="Write issue details"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Category
            </label>
            <select className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="">Select Category</option>
              <option value="Road">Road Issue</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water Leakage</option>
              <option value="Garbage">Garbage Problem</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-200 mb-2 font-semibold">
              Upload Image
            </label>

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 bg-[#1a132f] text-white border border-purple-500 rounded-lg cursor-pointer"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg border border-purple-400 shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <Link
            to="/my-issus"
            type="submit"
            className="mt-4 text-center bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 shadow-lg transition-all"
          >
            Submit Issue
          </Link>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
