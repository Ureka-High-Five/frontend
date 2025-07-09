import { useNavigate } from "react-router-dom";
import { Tv, Zap } from "lucide-react";
import NavItem from "@/components/Nav/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PATH } from "@/constants/path";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex max-w-2xl h-20 w-full mx-auto py-4 px-8 bg-custom-darkgray/80">
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
          <Avatar size="sm" variant="circle" className="border-white">
            <AvatarImage src="/images/user.svg" alt="사용자 이미지" />
            <AvatarFallback className="text-body-sm font-pretendard text-white">
              나
            </AvatarFallback>
          </Avatar>
        }
        label="MY"
        onClick={() => navigate(PATH.MYPAGE)}
      />
    </div>
  );
};

export default NavigationBar;
