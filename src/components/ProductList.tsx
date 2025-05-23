import type { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  product: Product;
}

const ProductList = ({ product }: Props) => {
  return <ProductCard product={product} />;
};

export default ProductList;