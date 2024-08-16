import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { addToCart } from "../store/cartSlice/cartSlice";
import useFetchProductById from "../Hooks/useFetchProductById";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const Admin = useSelector((state) => state.user?.user?.role === "admin");

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(Admin);
  // const [quantity, setQuantity] = useState(1);
  const { data: sampleProduct, isLoading, error } = useFetchProductById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error fetching product: {error.message}</p>;
  }

  return (
    <Layout title={`${sampleProduct.name} - Product Details`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={sampleProduct.image}
              alt={sampleProduct.name}
              className="w-full"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold mb-2">Name:</h2>
            <h1 className="text-3xl font-bold mb-4">{sampleProduct.name}</h1>
            <h2 className="text-xl font-semibold mb-2">Price:</h2>
            <p className="text-2xl font-semibold mb-4">
              ${sampleProduct.price.toFixed(2)}
            </p>
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <p className="mb-4">{sampleProduct.description}</p>
            {/* <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2"
              >
                {[...Array(sampleProduct.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div> */}
            {!Admin && (
              <button
                onClick={() => {
                  toast.success("Product added to cart!");
                  dispatch(addToCart(sampleProduct));
                }}
                className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

//  128sporting@belgianairways.com
