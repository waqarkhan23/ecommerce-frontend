import { useQuery } from "@tanstack/react-query";
import axios from "../utils/api";

const useFetchCategory = () => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category/all-category");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
};

export default useFetchCategory;
