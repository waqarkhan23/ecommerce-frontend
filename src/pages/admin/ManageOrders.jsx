import { toast } from "react-toastify";
import axios from "../../utils/api";
import { useEffect, useState } from "react";





const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response =await axios.get("/order/all-orders");
      setOrders(response.data.orders);
      console.log(orders);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  }
  useEffect(() => {
    getOrders();
  }, [])
  const updateOrderStatus = async (orderId, status) => {
  try {
     await axios.post("/order/update-order", {orderId, status });
     getOrders(); // Fetch updated orders after status update to reflect the change.

    toast.success("Order status updated successfully");
  } catch (error) {
    toast.error("Failed to update order status");
  }
  }
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Order ID</th>

          <th className="py-2 px-4 border-b">Total</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="py-2 px-4 border-b">{order._id}</td>
            <td className="py-2 px-4 border-b">${order.totalPrice}</td>
            <td className="py-2 px-4 border-b">{order.status}</td> 
            <td className="py-2 px-4 border-b">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ManageOrders