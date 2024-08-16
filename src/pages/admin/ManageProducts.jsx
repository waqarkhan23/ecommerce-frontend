import { useState } from "react";
import useFetchProduct from "../../Hooks/useFetchProduct";
import useDeleteProduct from "../../Hooks/useDeleteProduct";
import UpdateProductModal from "../../components/UpdateProductModal";

const ManageProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: products, isLoading, error } = useFetchProduct();
  const deleteProduct = useDeleteProduct();
const handleDelete = (id) => () => {
 deleteProduct.mutate(id); // Delete the product
  setSelectedProduct(null); // Reset selected product after deletion
}
const handleUpdate = (updatedProduct) => {
  // Update the product in your state or perform any additional logic
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button
                  onClick={handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={()=> handleUpdate(selectedProduct) }
        />
      )}
    </div>
  );
};

export default ManageProducts;
