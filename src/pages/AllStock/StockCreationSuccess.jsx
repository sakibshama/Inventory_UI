import React from "react";
import { motion } from "framer-motion";

const StockCreationSuccess = () => {
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
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
        zIndex: 9999, // Ensure it floats above everything
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#e0ffe0",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          maxWidth: "350px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{
            duration: 0.6,
            ease: "backOut",
            type: "spring",
            stiffness: 200,
          }}
          style={{
            backgroundColor: "#4CAF50",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "40px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          ✓
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Stock Created Successfully!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontSize: "16px",
            color: "#555",
          }}
        >
          Your stock entry has been saved and added to your dashboard.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default StockCreationSuccess;
