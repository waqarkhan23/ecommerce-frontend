import { useLocation, Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  console.log(location.state);
  return (
    <Layout title="Order Confirmation - Wiki Store">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-success">Thank You!</h1>
            <p className="py-6 text-2xl">Your order has been confirmed.</p>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Order Details</h2>
                <p>Order ID: {orderId}</p>
                <p>We have sent a confirmation email with all the details.</p>
                <div className="card-actions justify-center mt-4">
                  <Link to="/" className="btn btn-primary">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
