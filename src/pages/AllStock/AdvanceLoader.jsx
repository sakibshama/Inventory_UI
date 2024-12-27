import React from "react";
import { motion } from "framer-motion";

const AdvancedLoader = () => {
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
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark backdrop
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #8a2be2, #d8b4e2)", // Medium-Dark Violet and Light Violet Gradient
          boxShadow: "0px 0px 30px 5px rgba(138, 43, 226, 0.7)", // Medium-Dark Violet Glow
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Spinning Outer Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "5px solid transparent",
            borderTop: "5px solid #d8b4e2", // Light Violet Border
            borderRadius: "50%",
          }}
        ></motion.div>

        {/* Pulsating Inner Dot */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#8a2be2", // Medium-Dark Violet Inner Dot
            boxShadow: "0px 0px 20px rgba(138, 43, 226, 0.8)", // Medium-Dark Violet Glow
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default AdvancedLoader;
