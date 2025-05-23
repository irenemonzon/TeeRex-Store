import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import logo from '../assets/logo.svg'

const Navbar = () => {
  const quantity=useCartStore((state)=>state.getCartQuantity())

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600 flex gap-4">
        <img src={logo}alt='TeeRex Store' className='w-10 h-10'/>
        TeeRex
      </Link>

      <div className="relative">
        <a href="/cart">
          <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-blue-600 transition-colors" />
        </a>
        {quantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {quantity}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;