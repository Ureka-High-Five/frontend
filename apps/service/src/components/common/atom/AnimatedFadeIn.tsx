import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  keyName: string;
  children: ReactNode;
}

const AnimatedFadeIn = ({ keyName, children }: Props) => (
  <motion.div
    key={keyName}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}>
    {children}
  </motion.div>
);

export default AnimatedFadeIn;
