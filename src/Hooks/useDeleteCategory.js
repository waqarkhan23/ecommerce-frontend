import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "./../utils/api";
import { toast } from "react-toastify";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId) => {
      await axios.delete(`/category/delete-category/${categoryId}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("categories");
      toast.success("Category deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category!");
    },
  });
};

export default useDeleteCategory;
