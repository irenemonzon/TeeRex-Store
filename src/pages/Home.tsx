import { useEffect, useState } from "react"
import { getProducts } from "../api/products"
import ProductList from "../components/ProductList"
import type { FilterType, FilterValues, Product } from "../types"
import SearchBar from "../components/SearchBar"
import Filters from "../components/Filters"

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterValues>({
    color: [],
    gender: [],
    price: [],
    type: [],
  });

  useEffect(() => {
    const getData = async () => {
      const products = await getProducts()
      setProducts(products)
      setFilteredProducts(products)
    }
    getData()
  }, [])

  useEffect(() => {
    filterAndSearchProducts();
  }, [searchQuery, filters, products]);

  const filterAndSearchProducts = () => {
    let updated = [...products];

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
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={setSearchQuery} />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home