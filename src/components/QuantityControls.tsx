import { Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;
  max: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isCard?:boolean
}

const QuantityControls = ({ quantity, max, onIncrease, onDecrease ,  isCard=false}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        disabled={ !isCard &&quantity <= 1}
        className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 disabled:opacity-50"
        aria-label='decrease-quantity'
      >
        <Minus size={16} />
      </button>

      <span className="px-2 font-medium">{quantity}</span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label='increase-quantity'
        className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 disabled:opacity-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityControls;
