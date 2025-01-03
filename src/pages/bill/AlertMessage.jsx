// AlertMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AlertMessage = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 2000,
      }}
    >
      <div>
        {message}
        <button 
          onClick={onClose} 
          style={{ 
            marginLeft: '10px', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer' 
          }}
        >
          X
        </button>
      </div>
    </motion.div>
  );
};

export default AlertMessage;