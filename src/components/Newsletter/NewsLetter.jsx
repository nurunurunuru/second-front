// src/Newsletter.js
import { useState } from 'react';

function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${name}!`);
    setName('');
    setEmail('');
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 py-10 px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-2">Stay Updated!</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
