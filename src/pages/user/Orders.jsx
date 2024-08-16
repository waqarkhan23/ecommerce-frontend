import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { toast } from "react-toastify";

const Orders = () => {
  // Mock data for orders, replace with actual data fetching logic
  const orders = [
    { id: 1, date: "2023-06-01", total: 99.99, status: "Delivered" },
    { id: 2, date: "2023-06-05", total: 149.99, status: "Shipped" },
    { id: 3, date: "2023-06-10", total: 79.99, status: "Processing" },
  ];
  const [order, setOrder] = useState(orders);
  const getUserOrders = async () => {
    try {
      const response = await axios.get("/order/user-orders");
      setOrder(response.data);
    } catch (error) {
      toast.error("Error fetching user orders: ", error);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {order.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {order._id}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">${order.totalPrice}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-600"
                        : order.status === "Shipped"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-yellow-200 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
