import type { Product } from "../types";


interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border p-4 rounded-xl flex flex-col items-center shadow-md">
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <img src={product.imageURL} alt={product.name} className="w-40 h-40 object-contain mb-4" />
      <div className="flex justify-between items-center w-full">
        <span className="text-base font-bold">{product.currency} {product.price}</span>
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;