import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [ok, setOk] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ok) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      const timeoutId = setTimeout(() => {
        navigate("/login", {
          state: location.pathname,
        });
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [navigate, ok]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status == 200) {
            setOk(true);
          } else {
            console.log("Token verification failed");
          }
        } catch (error) {
          console.log("Error fetching data: ", error);
        }
      };
      fetchData();
    }
  }, []);
  return (
    <>
      {ok ? (
        <Outlet />
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          {" "}
          <span className="loading loading-spinner loading-lg"></span>
          <span> Redirecting to You login page in {seconds} </span>
        </div>
      )}
    </>
  );
};

export default ProtectedRoutes;
