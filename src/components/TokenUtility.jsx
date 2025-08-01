import React from 'react';
import { motion } from 'framer-motion';

const utilities = [
  {
    title: '🌱 Staking Rewards',
    description: 'Earn passive $GLF by holding or staking tokens.',
  },
  {
    title: '🛍️ Eco Marketplace',
    description: 'Use $GLF to buy green products and services.',
  },
  {
    title: '🎫 Governance',
    description: 'Vote on future eco-initiatives and proposals.',
  },
  {
    title: '🎉 Community Perks',
    description: 'Access exclusive events and rewards as a $GLF holder.',
  },
];

const TokenUtility = () => {
  return (
    <div className="bg-gray-800 text-white rounded-xl p-6 shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">💡 $GLF Utility</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {utilities.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-green-700 p-4 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-200">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TokenUtility;