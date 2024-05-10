import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ProductService = {
  getProducts: async (recordsPerPage, pageIndex, searchQuery) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      const products = response.data;

      // Apply filtering
      if (searchQuery) {
        products = products.filter((product) =>
          Object.values(product)
            .join("")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      // Apply pagination
      const paginatedProducts = products.slice(
        pageIndex * recordsPerPage,
        (pageIndex + 1) * recordsPerPage
      );

      return { products: paginatedProducts };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

export default ProductService;