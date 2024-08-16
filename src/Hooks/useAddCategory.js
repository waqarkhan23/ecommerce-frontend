import { toast } from "react-toastify";
import axios from "./../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post("/category/create-category", data);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    },
  });
};

export default useAddCategory;
