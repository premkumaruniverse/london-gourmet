import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const productCategories = [
    { name: 'Rubs & Spice Mix', path: '/products/Rubs', img: 'https://placehold.co/600x400/0A0A0A/F7F7F7?text=Rubs' },
    { name: 'Rassa', path: '/products/Rassa', img: 'https://placehold.co/600x400/0A0A0A/F7F7F7?text=Rassa' },
    { name: 'Cured & Coated', path: '/products/Cured', img: 'https://placehold.co/600x400/0A0A0A/F7F7F7?text=Cured' },
    { name: 'Achar', path: '/products/Achar', img: 'https://placehold.co/600x400/0A0A0A/F7F7F7?text=Achar' },
  ];

  return (
    <div className="bg-gray-900 text-gray-100">
      {/* 1. Hero Banner */}
      <section className="relative text-center py-24 px-4 sm:px-6 lg:px-8 bg-gray-800 shadow-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('https://placehold.co/1920x800/38A169/0A0A0A?text=London+Gourmet')" }}>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Simple Honest Food
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
            Delicious Taste Is The Soul.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Overview */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base font-semibold text-green-600 tracking-wide uppercase">About Us</p>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-400">
            London Gourmet is a premium culinary experience company specializing in bespoke catering and artisan food production. We blend chef-driven creativity with a commitment to farm-to-fork integrity.
          </p>
        </div>
      </section>

      {/* 3. Product Showcase */}
      <section className="bg-gray-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Artisan Products</h2>
            <p className="mt-4 text-lg text-gray-400">Crafted with passion, delivered to your door.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((cat) => (
              <Link key={cat.name} to={cat.path} className="group block">
                <div className="rounded-lg overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <img className="w-full h-48 object-cover" src={cat.img} alt={cat.name} />
                  <div className="p-6 bg-gray-900">
                    <h3 className="text-xl font-semibold text-amber-400">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Service Highlights */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white">Diner’s Atlas</h2>
            <p className="mt-4 text-lg text-gray-400">Bespoke multi-cuisine luxury catering for your finest house parties and events.</p>
            <Link to="/catering" className="mt-6 inline-block bg-transparent border border-green-600 text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white transition">
              Book a Luxury Event
            </Link>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white">Gourmet Club</h2>
            <p className="mt-4 text-lg text-gray-400">Join our exclusive culinary clubs and masterclasses by London Gourmet chefs.</p>
            <Link to="/club" className="mt-6 inline-block bg-transparent border border-green-600 text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white transition">
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="bg-gray-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-400">Chef-Driven Creativity</h3>
              <p className="mt-2 text-gray-400">Innovative menus crafted by our team of world-class chefs.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-400">Farm-to-Fork Integrity</h3>
              <p className="mt-2 text-gray-400">Sourcing the freshest, highest-quality ingredients directly from trusted partners.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-400">Tailored Luxury</h3>
              <p className="mt-2 text-gray-400">Bespoke services and sustainable practices for an unforgettable experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;