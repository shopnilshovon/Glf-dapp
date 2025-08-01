import React from 'react';
import { motion } from 'framer-motion';

const tokenData = [
  { label: '🔹 Community', value: '50%' },
  { label: '🔹 Team', value: '10%' },
  { label: '🔹 Marketing', value: '10%' },
  { label: '🔹 Rewards', value: '30%' }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Tokenomics = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-gradient-to-br from-purple-700 to-blue-700 p-6 rounded-2xl shadow-lg text-white space-y-4 border border-purple-500/30"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold text-center text-white"
      >
        📊 Tokenomics
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-center text-gray-200"
      >
        Total Supply: <span className="font-semibold text-white">1,000,000 GLF</span>
      </motion.p>

      <div className="space-y-2 text-sm sm:text-base">
        {tokenData.map(({ label, value }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 p-3 rounded-lg flex justify-between items-center cursor-pointer transition-all duration-200"
          >
            <span className="text-gray-200">{label}</span>
            <span className="font-semibold text-white">{value}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="text-xs text-gray-300 text-center"
      >
        💡 These allocations help power community growth, development, outreach, and long-term sustainability.
      </motion.p>
    </motion.div>
  );
};

export default Tokenomics;