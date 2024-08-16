import { NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-base-200">
        <ul className="menu p-4 text-base-content">
          <li className="menu-title text-2xl">Admin Panel</li>
          <li>
            <NavLink to="/admin-dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <hr className="border-t-2 border-gray-300 my-2" />
          <li>
            <NavLink to="/admin-dashboard/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/create-product">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/create-category">
              Add Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/manage-products">
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/manage-orders">
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="flex-1">{/* Main content area */}</div>
    </div>
  );
};

export default AdminPanel;
