import { toast } from "react-toastify";
import axios from "./../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post("/product/create-product", data);
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.error("Error adding Product:", error);
      toast.error("Failed to add Product");
    },
  });
};

export default useAddProduct;
