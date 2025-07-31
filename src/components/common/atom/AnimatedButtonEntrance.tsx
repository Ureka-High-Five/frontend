import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

const AnimatedButtonEntrance = ({ children }: Props) => (
  <motion.div
    className="w-full flex justify-center items-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.7, ease: "easeOut" }}>
    {children}
  </motion.div>
);

export default AnimatedButtonEntrance;
