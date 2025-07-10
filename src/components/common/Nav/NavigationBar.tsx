import { useNavigate } from "react-router-dom";
import { Tv, Zap } from "lucide-react";
import NavItem from "@/components/common/Nav/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PATH } from "@/constants/path";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex h-20 w-full py-4 justify-around bg-custom-darkgray/80">
      <NavItem
        icon={<Tv className="stroke-white" />}
        label="HOME"
        onClick={() => navigate(PATH.HOME)}
      />
      <NavItem
        icon={<Zap className="stroke-white" />}
        label="SHORTS"
        onClick={() => navigate(PATH.SHORTS)}
      />
      <NavItem
        icon={
          <Avatar className="w-6 h-6">
            <AvatarImage src="/images/user.svg" alt="사용자 이미지" />
            <AvatarFallback className="text-body-sm font-pretendard text-white">
              나
            </AvatarFallback>
          </Avatar>
        }
        label="MY"
        onClick={() => navigate(PATH.MYPAGE)}
      />
    </nav>
  );
};

export default NavigationBar;
