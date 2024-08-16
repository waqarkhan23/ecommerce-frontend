/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice/cartSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const ProductList = ({ products, total, handleLoadMore }) => {
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");
  // const isAdmin = false; // Replace with actual admin check logic
  const dispatch = useDispatch();
  console.log(products);
  if (!products) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-xl font-semibold text-gray-600">No products found</p>
        <p className="text-gray-500 mt-2">
          Please check back later or try a different search.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 mb-2">
                Category: {product.category ? product.category.name : "N/A"}
              </p>
              <p className="text-gray-600 mb-4 truncate">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/product/${product._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
                {!isAdmin && (
                  <button
                    onClick={() => {
                      dispatch(addToCart(product));
                      toast.success("Product added to cart!");
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded
                    hover:bg-green-600 transition duration-300"
                  >
                    {" "}
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {products && products.length < total && (
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoadMore();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
