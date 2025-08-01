import React from 'react';
import { motion } from 'framer-motion';

const LandingSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-green-800 to-green-600 text-white py-12 px-6 rounded-xl shadow-xl mb-10"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Welcome to GreenLeaf 🌿</h2>
        <p className="text-lg text-gray-200 max-w-xl mx-auto">
          Empowering eco-conscious users to earn $GLF rewards for their green actions. Connect your wallet and join the movement!
        </p>
        <motion.a
          href="#connect"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-4 px-6 py-2 bg-white text-green-800 font-semibold rounded-full shadow hover:bg-green-200 transition"
        >
          🚀 Get Started
        </motion.a>
      </div>
    </motion.div>
  );
};

export default LandingSection;