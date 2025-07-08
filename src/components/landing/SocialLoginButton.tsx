import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "@/components/common/CommonButton";

interface SocialLoginButtonProps {
  isVisible: boolean;
}

const MotionCommonButton = motion(CommonButton);

const SocialLoginButton = ({ isVisible }: SocialLoginButtonProps) => (
  <AnimatePresence>
    {isVisible && (
      <MotionCommonButton
        className="bg-[#FEE500]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        text="카카오로 시작하기"
      />
    )}
  </AnimatePresence>
);

export default SocialLoginButton;
