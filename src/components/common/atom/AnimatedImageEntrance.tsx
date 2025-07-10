import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
}

const AnimatedImageEntrance = ({ src, alt }: Props) => (
  <motion.img
    src={src}
    alt={alt}
    className="max-w-xs w-auto h-auto"
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

export default AnimatedImageEntrance;
