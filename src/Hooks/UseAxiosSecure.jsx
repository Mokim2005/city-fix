import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAuth from "./UserAuth";

const axiosSecure = axios.create({
  baseURL: "https://city-fix-server-green.vercel.app",
});

const UseAxiosSecure = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("❌ Failed to get Firebase token:", error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Unauthorized – logging out");
          await logOut();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
