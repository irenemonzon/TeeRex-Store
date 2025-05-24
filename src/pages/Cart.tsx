import { useCartStore } from '../store/cartStore';
import {Trash2} from 'lucide-react';
import { toast } from 'sonner';
import QuantityControls from '../components/QuantityControls';
import { formatCurrency } from '../utils';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());

  const handleIncreaseQuantity = (itemId: number, currentQuantity: number, maxQuantity: number) => {
    if (currentQuantity < maxQuantity) {
      increaseQuantity(itemId);
    } else {
      toast.error('Maximum available quantity reached');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
        <div className="text-4xl mb-4">🛒</div>
        <div className="text-xl font-semibold mb-2">Your cart is empty</div>
        <p className="text-gray-500">Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex gap-6 items-center border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src={item.imageURL}
            alt={item.name}
            className="w-24 h-24 object-contain"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">
              {formatCurrency(item.price, item.currency)} each
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Available: {item.quantity -item.quantityTotalCart}
            </p>

            <QuantityControls
              quantity={item.quantityTotalCart}
              max={item.quantity}
              onIncrease={() => handleIncreaseQuantity(item.id, item.quantityTotalCart, item.quantity)}
              onDecrease={() => decreaseQuantity(item.id)}
            />
          </div>

          <div className="text-right">
            <p className="font-bold">Subtotal:</p>
            <p>{formatCurrency(item.subtotal, item.currency)}</p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 mt-2 hover:text-red-700 transition-colors"
              title="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <div>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
          >
            Clear Cart
          </button>
        </div>
        <div className="text-xl font-bold">
          Total {formatCurrency(total, cart[0]?.currency)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
