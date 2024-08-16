import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/wikistore.jpg";

import { NavLink, useNavigate } from "react-router-dom";
import { logout, setUser, setToken } from "../store/userSlice/userSlice";
import { clearCart } from "../store/cartSlice/cartSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector((state) =>
    isLoggedIn ? state.user.user?.role : null
  );
  const cartCount = useSelector((state) => state.cart.items.length);
  const handleLogout = () => {
    localStorage.setItem("userToken", null);
    dispatch(logout());
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate("/login");
    dispatch(clearCart());
  };
  return (
    <>
      <div className="navbar bg-base-200 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>

              <li>
                <NavLink to="/cart">Cart (0)</NavLink>
              </li>
            </ul>
          </div>

          <img src={logo} alt="logo" className="h-14 w-16 mix-blend-multiply" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            <li>
              <NavLink to={"/cart"}>Cart {cartCount}</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {" "}
          {userRole ? (
            <>
              {" "}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar btn btn-ghost btn-circle"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  {/* {userRole !== "admin" && (
                    <li>
                      <NavLink to="/dashboard/profile">Profile</NavLink>
                    </li>
                  )} */}
                  <li>
                    <NavLink
                      to={
                        userRole === "admin" ? "/admin-dashboard" : "/dashboard"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {" "}
              <NavLink to="/register" className="btn bg-green-300">
                Register
              </NavLink>
              <NavLink to="/login" className="btn">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
