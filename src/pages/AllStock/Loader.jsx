import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const dotVariants = {
    bounce: {
      y: [0, -15, 0], // Bounce up and down
      transition: {
        y: {
          duration: 0.6,
          yoyo: Infinity, // Repeat the animation infinitely
          ease: "easeInOut",
        },
      },
    },
  };

  const containerVariants = {
    float: {
      y: [0, 10, 0], // Floating effect
      transition: {
        y: {
          duration: 1,
          yoyo: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dimmed backdrop
        zIndex: 9999,
      }}
    >
      <motion.div
        variants={containerVariants}
        animate="float"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Animated Dots */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            animate="bounce"
            transition={{ delay: index * 0.2 }} // Stagger animation for each dot
            style={{
              width: "15px",
              height: "15px",
              margin: "0 5px",
              backgroundColor: "#4CAF50",
              borderRadius: "50%",
            }}
          ></motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
