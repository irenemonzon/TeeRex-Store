import { toast } from 'sonner';
import { useCartStore } from '../store/cartStore';
import QuantityControls from './QuantityControls';
import { formatCurrency } from '../utils';
import type { Product } from '../types';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQty = cartItem?.quantityTotalCart || 0;
  const remainingStock = product.quantity - currentQty;

  const handleAddCart = () => {
    if (remainingStock <= 0) {
      toast.error('Maximum available quantity reached');
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="border p-4 rounded-xl flex flex-col items-start shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <img
        src={product.imageURL}
        alt={product.name}
        className="w-full h-40 object-contain mb-4"
      />
      <div className='flex w-full justify-between'>
        <div className='flex flex-col mt-4 w-2/4'>
          <span className="text-base font-bold">
            {formatCurrency(product.price, product.currency)}
          </span>
          <span
            className={`text-sm mt-1 ${
              remainingStock === 0
                ? 'text-red-600'
                : remainingStock === 1
                ? 'text-orange-500'
                : 'text-gray-500'
            }`}
          >
            {remainingStock === 0
              ? 'Out of Stock'
              : `Stock: ${remainingStock}`}
          </span>
        </div>
        <div className="mt-4">
          {currentQty > 0 ? (
            <QuantityControls
              quantity={currentQty}
              max={product.quantity}
              onIncrease={() => {
                if (currentQty < product.quantity) {
                  increaseQuantity(product.id);
                } else {
                  toast.error('Maximum available quantity reached');
                }
              }}
              onDecrease={() => decreaseQuantity(product.id)}
              isCard
            />
          ) : (
            <button
              className={`px-4 py-2 rounded text-white transition-colors ${
                remainingStock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleAddCart}
              disabled={remainingStock === 0}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
