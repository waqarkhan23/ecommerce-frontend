import { useQuery } from "@tanstack/react-query";
import axios from "./../utils/api";

const useFetchProduct = () => {
  const FetchProducts = async () => {
    try {
      const response = await axios.get("/product");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  return useQuery({ queryKey: ["products"], queryFn: FetchProducts });
};

export default useFetchProduct;
