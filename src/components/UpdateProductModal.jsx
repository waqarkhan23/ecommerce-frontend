import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "./../utils/api";
import { toast } from "react-toastify";

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
    image: null,
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("stock", updatedProduct.stock);
      formData.append("description", updatedProduct.description);

      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }

      await axios.put(`/product/update-product/${product._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries("products");
      onClose();
      onUpdate(updatedProduct);
    },
    onError: (error) => {
      toast.error(`Error updating product: ${error.message}`);
    },
  });

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setUpdatedProduct({
        ...updatedProduct,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setUpdatedProduct({
        ...updatedProduct,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateMutation.mutate();
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
      <div className="bg-white rounded-lg shadow-md p-8 animate__animated animate__faster animate__zoomIn">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={updateMutation.isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {updateMutation.isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
