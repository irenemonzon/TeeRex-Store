import {toast} from 'sonner'
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";


interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddCart = () => {
    const cartItem = cart.find(item => item.id === product.id);
    
    if (cartItem && cartItem.quantityTotalCart >= product.quantity) {
      toast.error('Maximum available quantity reached');
      return;
    }
    
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="border p-4 rounded-xl flex flex-col items-center shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <img src={product.imageURL} alt={product.name} className="w-40 h-40 object-contain mb-4" />
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex justify-between items-center w-full">
          <span className="text-base font-bold">{product.currency} {product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">Stock: {product.quantity}</span>
        </div>
        <button 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddCart}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;