import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600 flex gap-4">
        <img src={logo}alt='TeeRex Store' className='w-10 h-10'/>
        TeeRex
      </Link>

      <a href="/cart" className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-blue-600 transition-colors" />
      </a>
    </nav>
  );
};

export default Navbar;