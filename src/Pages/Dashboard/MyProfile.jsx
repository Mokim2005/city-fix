import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserAuth from "../../Hooks/UserAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router";

const MyProfile = () => {
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const [currentUser, setCurrentUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => {
          console.log("Mongo user:", res.data);
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  console.log("user are hare", currentUser);

  const handleSubscribe = async () => {
    if (!currentUser?._id) {
      return Swal.fire("Error", "User not loaded!", "error");
    }

    try {
      setIsLoading(true);

    
    } catch (error) {
      Swal.fire("Error", "Payment failed!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1f2e] text-white flex justify-center items-center p-4">
      <div className="bg-[#2e2e4d] rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={currentUser.photoURL || user.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-500 mb-4"
          />
          <h2 className="text-2xl font-bold">
            {" "}
            {currentUser.name || user.displayName}
          </h2>
          <p>{currentUser.email || user.email}</p>

          {/* Premium Badge */}
          {currentUser.isPremium && (
            <span className="mt-2 px-4 py-1 bg-yellow-400 text-black rounded-full font-semibold">
              Premium
            </span>
          )}

          {/* Block Warning */}
          {currentUser.isBlocked && (
            <div className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">
              ⚠️ You are blocked!
            </div>
          )}
        </div>

        {/* Subscribe Button */}
        {!currentUser.isPremium && !currentUser.isBlocked && (
          <Link to="/dashboard/payment">
            <button
              onClick={handleSubscribe}
              disabled={isLoading} // Disable button while processing
              className={`mt-6 w-full ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } transition-all py-2 rounded-xl font-semibold text-lg`}
            >
              {isLoading ? "Processing..." : "Subscribe - 1000 BDT"}
            </button>
          </Link>
        )}

        {/* Already Subscribed */}
        {currentUser.isPremium && (
          <button
            disabled
            className="mt-6 w-full bg-yellow-400 text-black py-2 rounded-xl font-semibold text-lg cursor-not-allowed"
          >
            Subscribed
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
