/* eslint-disable react/prop-types */

const prices = [
  {
    id: 0,
    label: "$0 - $50",
    value: [0, 50],
  },
  {
    id: 1,
    label: "$51 - $100",
    value: [51, 100],
  },
  {
    id: 2,
    label: "$101 - $200",
    value: [101, 200],
  },
];

const Filters = ({
  categories,
  selectedCategories,
  setSelectedPrice,
  setSelectedCategories,
  selectedPrice,
  filteringProducts,
  clearFilters,
  isFiltered,
}) => {
  const handleCategoryChange = (e, categoryId) => {
    let allCategories = [...selectedCategories];
    if (e.target.checked) {
      allCategories.push(categoryId);
    } else {
      allCategories = allCategories.filter((id) => id !== categoryId);
    }
    setSelectedCategories(allCategories);
  };
  console.log("selectedPrice", selectedPrice);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Price Range Filter */}
      <div>
        <label className="block mb-2 font-bold"> Filter By Price</label>

        <div className="space-y-2">
          {prices.map((price) => (
            <label key={price.id} className="flex items-center">
              <input
                type="radio"
                className="radio radio-primary"
                name="priceFilter"
                value={price.id}
                onChange={() => setSelectedPrice(price.value)}
                checked={
                  selectedPrice[0] === price.value[0] &&
                  selectedPrice[1] === price.value[1]
                }
              />
              <span className="ml-2">{price.label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Category Filter */}
      <div>
        <label className="block mb-2 font-bold"> Filter By Category</label>

        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category._id} className="flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                value={category._id}
                onChange={(e) => handleCategoryChange(e, category._id)}
              />
              <span className="ml-2">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-success w-36 mb-2"
          onClick={filteringProducts}
        >
          Filter Products
        </button>
        {isFiltered && (
          <button className="btn btn-warning w-36" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
