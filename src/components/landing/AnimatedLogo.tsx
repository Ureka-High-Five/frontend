import { motion, AnimatePresence } from "framer-motion";

interface AnimatedLogoProps {
  isVisible: boolean;
  src: string;
  alt: string;
}

const AnimatedLogo = ({ isVisible, src, alt }: AnimatedLogoProps) => (
  <AnimatePresence>
    {isVisible && (
      <motion.img
        src={src}
        alt={alt}
        className="max-w-xs w-auto h-auto"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    )}
  </AnimatePresence>
);

export default AnimatedLogo;
