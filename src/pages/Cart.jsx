import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/Layout";
import { removeFromCart } from "../store/cartSlice/cartSlice";
import { Link, useNavigate } from "react-router-dom";

import axios from "../utils/api";
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { clearCart } from "../store/cartSlice/cartSlice";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      const response = await axios.get("/loading/braintree/token");
      setToken(response.data.clientToken.clientToken);
    } catch (error) {
      console.log("Error fetching token: ", error);
    }
  };
  useEffect(() => {
    getToken();
  }, [isLoggedIn]);
  const [instance, setInstance] = useState(null);

  const handlePayment = async () => {
    try {
      if (!instance) {
        console.log("Braintree instance not available");
        return;
      }
      const { nonce } = await instance.requestPaymentMethod();
      const total =
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + 5;

      const cartWithProductIds = cartItems.map((item) => ({
        product: item._id, // Assuming _id is the product ID
        quantity: item.quantity,
      }));

      const response = await axios.post("/loading/braintree/checkout", {
        nonce,
        cart: cartWithProductIds,
        total,
      });
      if (response.data.success) {
        dispatch(clearCart());
        toast.success("Payment successful! Your order has been placed.");
        console.log("Order ID: ", response.data);
        navigate("/order-confirmation", {
          state: { orderId: response.data.orderId },
        });

        // Reset the Braintree instance
        setInstance(null);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.log("Error processing payment: ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg shadow-md">
      <svg
        className="w-24 h-24 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
      </svg>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you have not added any items to your cart yet.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
      >
        Start Shopping
      </Link>
    </div>
  );

  return (
    <Layout title={"Cart - Wiki Store"}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      {" "}
                      Quantity:
                      {/* <button className="bg-gray-200 px-2 py-1 rounded">
                        -
                      </button> */}
                      <span className="mx-2">{item.quantity}</span>
                      {/* <button className="bg-gray-200 px-2 py-1 rounded">
                        +
                      </button> */}
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>
                  $
                  {(
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) + 5
                  ).toFixed(2)}
                </span>
              </div>

              {isLoggedIn && token ? (
                <>
                  <DropIn
                    options={{ authorization: token }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 block text-center"
                >
                  Login to Checkout
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
