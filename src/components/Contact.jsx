import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Contact Us</h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">Get in Touch</p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
          Have a question about our products, catering, or events? We'd love to hear from you.
        </p>
      </div>
      
      {/* Placeholder for Contact Form and Map */}
      <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold text-amber-400">Contact Form & Map Coming Soon</h3>
        <p className="mt-4 text-gray-300">
          This section will contain a contact form with reCAPTCHA and an embedded Google Map.
        </p>
        <div className="mt-6">
            <p className="text-lg text-gray-200"><strong>Email:</strong> contact@londongourmet.com</p>
            <p className="text-lg text-gray-200"><strong>Phone:</strong> (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;