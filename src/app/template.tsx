"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      }}
      className="flex-1 flex flex-col relative"
    >
      <motion.div
        initial={{ scaleY: 0, originY: 0, opacity: 0 }}
        animate={{ scaleY: 1, originY: 0, opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-accent-secondary/50 pointer-events-none z-50"
      />
      {children}
    </motion.div>
  );
}
