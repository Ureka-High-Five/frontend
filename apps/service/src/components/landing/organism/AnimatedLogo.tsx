import { AnimatePresence } from "framer-motion";
import AnimatedImageEntrance from "@/components/common/atom/AnimatedImageEntrance";

interface AnimatedLogoProps {
  isVisible: boolean;
  src: string;
  alt: string;
}

const AnimatedLogo = ({ isVisible, src, alt }: AnimatedLogoProps) => (
  <AnimatePresence>
    {isVisible && <AnimatedImageEntrance src={src} alt={alt} />}
  </AnimatePresence>
);

export default AnimatedLogo;
