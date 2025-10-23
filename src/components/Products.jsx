import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore configuration
import { collection, onSnapshot } from 'firebase/firestore';
import ProductCard from './ProductCard';

const Products = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'artifacts/{appId}/public/data/products'), (snapshot) => {
            const fetchedCategories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(fetchedCategories);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl text-gray-100 mb-4">Product Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                    <ProductCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default Products;