import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

const Catering = () => {
  const [introContent, setIntroContent] = useState('');

  useEffect(() => {
    // The path must point to the specific document 'catering_main'
    const contentRef = doc(db, 'artifacts/london-gourmet/public/data/page_content/catering_main');

    const unsubscribe = onSnapshot(contentRef, (docSnap) => {
      if (docSnap.exists()) {
        setIntroContent(docSnap.data().content);
      } else {
        setIntroContent("Details about our bespoke catering services are coming soon.");
      }
    }, (error) => {
      console.error("Error fetching catering content:", error);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Diner's Atlas</h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Multi-Cuisine Luxury Catering
        </p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
          {introContent || 'Loading...'}
        </p>
      </div>

      {/* Placeholders for future sections */}
      <div className="mt-20 space-y-16">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <h3 className="text-2xl font-bold text-amber-400">Event Gallery</h3>
          <p className="mt-4 text-gray-300">A gallery showcasing our beautiful event setups and dishes will be available here soon.</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <h3 className="text-2xl font-bold text-amber-400">Booking Inquiry</h3>
          <p className="mt-4 text-gray-300">A form to request a consultation for your event will be available here.</p>
          <button className="mt-6 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
            Request Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;