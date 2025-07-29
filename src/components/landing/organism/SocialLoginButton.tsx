import { AnimatePresence } from "framer-motion";
import AnimatedButtonEntrance from "@/components/common/atom/AnimatedButtonEntrance";
import { KAKAO_API_URL } from "@/constants/api";
import { Button } from "../../ui/button";

interface SocialLoginButtonProps {
  isVisible: boolean;
}

const SocialLoginButton = ({ isVisible }: SocialLoginButtonProps) => (
  <AnimatePresence>
    {isVisible && (
      <AnimatedButtonEntrance>
        <Button
          className="w-[90%] max-w-sm h-14 text-custom-black body-lg-dohyeon bg-[#FEE500] hover:bg-[#FEE500]/90 hover:text-custom-black"
          onClick={() => {
            window.location.href = KAKAO_API_URL;
          }}>
          카카오로 시작하기
        </Button>
      </AnimatedButtonEntrance>
    )}
  </AnimatePresence>
);

export default SocialLoginButton;
