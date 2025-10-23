import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebaseConfig'; // Import storage
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import Notification from './Notification';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Achar',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null); // State for the image file
  const [isUploading, setIsUploading] = useState(false); // To show loading state
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Real-time listener for products
  useEffect(() => {
    const q = query(collection(db, 'artifacts/london-gourmet/public/data/products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      showNotification('Name, category, and price are required.', 'error');
      return;
    }

    setIsUploading(true);
    let imageUrl = '';

    try {
      // Step 1: Upload image to Firebase Storage if a file is selected
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else {
        // Use a placeholder if no image is uploaded
        imageUrl = `https://placehold.co/600x400/0A0A0A/F7F7F7?text=${newProduct.name.replace(' ', '+')}`;
      }

      // Step 2: Add the product data (with the image URL) to Firestore
      const productsCollectionRef = collection(db, 'artifacts/london-gourmet/public/data/products');
      await addDoc(productsCollectionRef, {
        ...newProduct,
        price: Number(newProduct.price),
        imageUrl: imageUrl, // Save the final URL
      });

      showNotification('Product added successfully!', 'success');
      // Reset form
      setNewProduct({ name: '', category: 'Achar', description: '', price: '' });
      setImageFile(null);
      document.getElementById('image-upload').value = null; // Clear file input
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification(`Error adding product: ${error.message}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
      {notification.show && <Notification message={notification.message} type={notification.type} />}
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Product Management</h2>

      <form onSubmit={handleAddProduct} className="mb-8 p-4 bg-gray-900 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold text-white">Add New Product</h3>
        <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" className="w-full p-2 bg-gray-700 rounded" />
        <select name="category" value={newProduct.category} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded">
          <option>Achar</option>
          <option>Rassa</option>
          <option>Cured & Coated</option>
          <option>Rubs</option>
          <option>Ayu Bites</option>
        </select>
        <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" className="w-full p-2 bg-gray-700 rounded" />
        <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 bg-gray-700 rounded"></textarea>
        
        {/* Changed to file input */}
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300">Product Image</label>
          <input id="image-upload" type="file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"/>
        </div>

        <button type="submit" disabled={isUploading} className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-500">
          {isUploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      <div>
        <h3 className="text-xl font-semibold text-white">Existing Products</h3>
        <div className="mt-4 space-y-2">
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center bg-gray-900 p-3 rounded">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-400">{product.category} - <span className="text-amber-400">${product.price}</span></p>
              </div>
              {/* Add Edit/Delete buttons here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;