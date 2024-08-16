import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "./../utils/api";

const useProductList = () => {
  return useInfiniteQuery({
    queryKey: ["productList"],
    queryFn: ({ pageParam = 1 }) => fetchProductList(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
};

const fetchProductList = async (page) => {
  try {
    const response = await axios.get(`/loading/product-list?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    return [];
  }
};

export default useProductList;
