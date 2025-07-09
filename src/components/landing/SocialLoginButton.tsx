import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

interface SocialLoginButtonProps {
  isVisible: boolean;
}

const MotionCommonButton = motion(Button);

const SocialLoginButton = ({ isVisible }: SocialLoginButtonProps) => (
  <AnimatePresence>
    {isVisible && (
      <MotionCommonButton
        className="w-[90%] max-w-sm h-14 text-custom-black body-lg-dohyeon bg-[#FEE500]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.7, ease: "easeOut" }}>
        카카오로 시작하기
      </MotionCommonButton>
    )}
  </AnimatePresence>
);

export default SocialLoginButton;
