import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
            <img src={product.imageUrl || 'https://placehold.co/300x200'} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-amber-400 text-xl mt-2">{product.name}</h3>
            <p className="text-gray-100">{product.description}</p>
            <p className="text-amber-400 text-lg font-bold">${product.price.toFixed(2)}</p>
            <button className="bg-green-600 text-white rounded-lg px-4 py-2 mt-2">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;