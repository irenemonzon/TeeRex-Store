import { useEffect, useState } from "react"
import { getProducts } from "../api/products"
import { useFilterStore } from "../store/filterStore"
import ProductList from "../components/ProductList"
import SearchBar from "../components/SearchBar"
import Filters from "../components/Filters"
import MobileFilters from "../components/MobileFilters"
import type { FilterType, Product } from "../types"

const Home = () => {
  const filters = useFilterStore((state) => state.filters);
  const searchQuery = useFilterStore((state) => state.searchSubmitted);
  const setFilters = useFilterStore((state) => state.setFilters);
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const products = await getProducts()
      setProducts(products)
      setFilteredProducts(products)
      setLoading(false)
    }
    getData()
  }, [])

  useEffect(() => {
    filterAndSearchProducts();
  }, [searchQuery, filters, products]);

  const filterAndSearchProducts = () => {
    let updated = [...products];
    const isFiltering = searchQuery || Object.values(filters).some((arr) => arr.length > 0);
    
    if (!isFiltering) {
      setFilteredProducts(products);
      return;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      updated = updated.filter((product) =>
        `${product.name} ${product.color} ${product.type}`.toLowerCase().includes(query)
      );
    }

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === 'price') {
          updated = updated.filter((product) => {
            return values.some((range) => {
              if (range === '0-250') return product.price <= 250;
              if (range === '251-450') return product.price > 250 && product.price <= 450;
              if (range === '450+') return product.price > 450;
              return false;
            });
          });
        } else {
          updated = updated.filter((product) => 
            values.includes(String(product[key as keyof Product]))
          );
        }
      }
    });

    setFilteredProducts(updated);
  };

  const handleFilterChange = (type: FilterType, value: string) => {
    const newValues = filters[type].includes(value)
      ? filters[type].filter((v) => v !== value)
      : [...filters[type], value];

    setFilters({ ...filters, [type]: newValues });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <SearchBar />
        </div>
        <MobileFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="top-4 p-4 border rounded-lg shadow-sm bg-white">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </aside>
        
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2" />
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home