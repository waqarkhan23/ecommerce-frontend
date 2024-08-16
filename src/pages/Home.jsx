import Layout from "../layout/Layout";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import useFetchCategory from "../Hooks/useFetchCategory";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useProductList from "../Hooks/useProductList";

const Home = () => {
  // const { data: products, isLoading } = useFetchProduct();
  const { data: categories } = useFetchCategory();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [page, setPage] = useState(1);
  const { data, isLoading, fetchNextPage } = useProductList(page);

  const filteringProducts = async () => {
    try {
      const response = await axios.post("/product/filter-products", {
        checked: selectedCategories,
        radio: selectedPrice,
      });
      setFilteredProducts(response.data.data);
      setIsFiltered(true);
    } catch (error) {
      toast.error("Failed to filter products");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice([]);
    setFilteredProducts([]);
    setIsFiltered(false);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    fetchNextPage();
  };
  const allProducts = data?.pages.flatMap((page) => page.data) || [];
  const totalProducts = data?.pages[0]?.total || 0;
if (isFiltered && filteredProducts.length === 0) {
  return (
    <div className="text-center text-lg font-medium">
      No products found matching the selected filters.
    </div>
  );
}
if(!allProducts) {
  return (
    <div className="text-center text-lg font-medium">
      No products available.
    </div>
  );
 
}
  return (

    <Layout title={"Home - Wiki Store"}>
    {isFiltered && filteredProducts.length === 0 ? (
      <div className="text-center text-lg font-medium">
        No products found matching the selected filters.
      </div>
    ) : !allProducts ? (
      <div className="text-center text-lg font-medium">
        No products available.
      </div>
    ) : (
      <div className="flex flex-col md:flex-row">
      {/* Filters Section */}
      <div className="w-full md:w-1/4 p-4">
        <Filters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          isFiltered={isFiltered}
          filteringProducts={filteringProducts}
          clearFilters={clearFilters}
        />
      </div>

      {/* Products Section */}
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-3xl">Products</h2>
        <ProductList
          products={isFiltered ? filteredProducts : allProducts}
          total={totalProducts}
          page={page}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </div>
    </div>
    )}
  </Layout>









  );
};

export default Home;
