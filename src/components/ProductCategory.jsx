import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import ProductCard from './ProductCard';

const ProductCategory = () => {
  const { category } = useParams(); // Gets category name from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // This useEffect hook sets up the real-time listener
  useEffect(() => {
    if (!category) return;

    setLoading(true);

    // 1. Define the collection we are listening to
    const productsCollectionRef = collection(db, 'artifacts/london-gourmet/public/data/products');

    // 2. Create a query to filter products by the current category
    const q = query(productsCollectionRef, where("category", "==", category));

    // 3. Attach the real-time 'onSnapshot' listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData); // Update state with the new data
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products in real-time: ", error);
      setLoading(false);
    });

    // 4. Return a cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();

  }, [category]); // Re-run the effect if the category in the URL changes

  if (loading) {
    return <div className="text-center p-10">Loading Products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{category}</h1>
        <p className="mt-4 text-lg text-gray-400">Explore our collection of artisan {category.toLowerCase()}.</p>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductCategory;