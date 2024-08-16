import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const [ok, setOk] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.role === "admin") {
      setOk(true);
    } else {
      if (!ok) {
        const intervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        const timeoutId = setTimeout(() => {
          navigate("/", {
            state: location.pathname,
          });
        }, 5000);

        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
      }
    }
  }, [navigate, ok, user, location.pathname]);

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

export default AdminRoutes;
