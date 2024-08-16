import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AdminHome = () => {
  const [numberOfUsers, setUserCount] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [topSellingProduct, setTopSellingProduct] = useState(null);
  const getNewOrders = async () => {
    try {
      const response = await axios.get("/order/new-orders");
      setNewOrders(response.data.newOrders);
    } catch (error) {
      toast.error("Failed to fetch new orders");
    }
  };
  const totalProducts = async () => {
    try {
      const response = await axios.post("/product/total-products");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to filter products");
    }
  };
  const getTotalCategories = async () => {
    try {
      const response = await axios.get("/admin/total-categories");
      setTotalCategories(response.data.totalCategories);
    } catch (error) {
      toast.error("Failed to filter products");
    }
  };

  useEffect(() => {
    totalProducts();
    getUserCount();
    getNewOrders();
    getTotalCategories();
    getTopSellingProduct();
  }, []);

  const { data: count } = useQuery({
    queryKey: ["totalProducts"],
    queryFn: totalProducts,
  });
  const getUserCount = async () => {
    try {
      const response = await axios.get("/admin/total-users");
      setUserCount(response.data.totalUsers);
    } catch (error) {
      toast.error("Failed to fetch user count");
    }
  };
  const getTopSellingProduct = async () => {
    try {
      const response = await axios.get("/admin/top-selling-product");
      setTopSellingProduct(response.data.name);
    } catch (error) {
      toast.error("Failed to fetch user count");
    }
  };
  console.log(numberOfUsers);
  return (
    <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome, Super Admin!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Products" value={count} icon="📦" />
        <DashboardCard title="Active Users" value={numberOfUsers} icon="👥" />
        <DashboardCard title="New Orders" value={newOrders} icon="📦" />
        <DashboardCard
          title="Product Categories"
          value={totalCategories}
          icon="🏷️"
        />
        <DashboardCard
          title="Top Selling Product"
          value={topSellingProduct || "N/A"}
          icon="🔥"
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg">
    <div className="text-5xl mb-4">{icon}</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminHome;
