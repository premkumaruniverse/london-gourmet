import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-base text-gray-300 hover:text-white">Products</Link></li>
              <li><Link to="/catering" className="text-base text-gray-300 hover:text-white">Catering</Link></li>
              <li><Link to="/club" className="text-base text-gray-300 hover:text-white">Gourmet Club</Link></li>
              <li><Link to="/recipes" className="text-base text-gray-300 hover:text-white">Recipes</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
             <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact Us</h3>
             <p className="text-base text-gray-300 mt-2">Email: contact@londongourmet.com</p>
             <p className="text-base text-gray-300">Phone: (123) 456-7890</p>
             <div className="flex space-x-6 mt-4">
                {/* Placeholder for social icons */}
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2025 London Gourmet Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;