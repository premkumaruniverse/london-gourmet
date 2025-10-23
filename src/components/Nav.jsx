import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-amber-400 text-lg font-bold">
                    London Gourmet Ltd.
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/recipes" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Recipes
                        </Link>
                    </li>
                    <li>
                        <Link to="/catering" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Catering
                        </Link>
                    </li>
                    <li>
                        <Link to="/club" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Gourmet Club
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className="text-gray-100 hover:bg-green-600 p-2 rounded">
                            Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;