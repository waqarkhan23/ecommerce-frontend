import { useQuery } from "@tanstack/react-query";
import axios from "./../utils/api";

const useProductById = (productId) => {
  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`/product/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
};
export default useProductById;
