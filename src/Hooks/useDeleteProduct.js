import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from './../utils/api';
import { toast } from 'react-toastify';



const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      await axios.delete(`/product/delete-product/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting product: ${error.message}`);
    },
  });
};

export default useDeleteProduct;