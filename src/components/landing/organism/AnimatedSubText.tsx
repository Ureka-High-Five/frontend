import { AnimatePresence } from "framer-motion";
import AnimatedFadeIn from "@/components/common/atom/AnimatedFadeIn";

interface AnimatedSubTextProps {
  isVisible: boolean;
  text: string;
  keyVal: number;
}

const AnimatedSubText = ({ isVisible, text, keyVal }: AnimatedSubTextProps) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <AnimatedFadeIn keyName={keyVal.toString()} duration={0.5}>
        <p className="text-gray-400 body-md-pretendard tracking-wide">{text}</p>
      </AnimatedFadeIn>
    )}
  </AnimatePresence>
);

export default AnimatedSubText;
