import React from "react";
import UserAuth from "../../Hooks/UserAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(async (res) => {
        const user = res.user;

        await axiosSecure.post("/users", {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        navigate(location?.state || "/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-gray-300 text-sm font-medium tracking-wider">
          OR
        </span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      {/* Google Button */}
      <button
        onClick={handleGoogleSignIn}
        className="group relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-5 py-3 text-white font-semibold transition-all duration-300 hover:bg-white/15 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></span>

        <span className="relative flex items-center justify-center gap-3">
          <FcGoogle className="text-2xl" />
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;