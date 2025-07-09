import { useNavigate, useLocation } from "react-router-dom";
import { Tv, Zap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex max-w-[700px] h-[83px] w-full mx-auto py-6 px-[30px] bg-[#434141]/80">
      <Button
        className="flex flex-col flex-1 hover:bg-transparent"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.HOME)}>
        <Tv
          className={isActive(PATH.HOME) ? "stroke-blue-500" : "stroke-white"}
        />
        <span
          className={cn(
            "text-sm font-medium",
            isActive(PATH.HOME) ? "text-blue-500" : "text-white"
          )}>
          HOME
        </span>
      </Button>

      <Button
        className="flex flex-col flex-1 hover:bg-transparent"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.SHORTS)}>
        <Zap
          className={isActive(PATH.SHORTS) ? "stroke-blue-500" : "stroke-white"}
        />
        <span
          className={cn(
            "text-sm font-medium",
            isActive(PATH.SHORTS) ? "text-blue-500" : "text-white"
          )}>
          SHORTS
        </span>
      </Button>

      <Button
        className="flex flex-col flex-1 items-center hover:bg-transparent"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.MYPAGE)}>
        <Avatar
          size="sm"
          variant="circle"
          className={cn(
            isActive(PATH.MYPAGE) ? "border-blue-500" : "border-gray-300"
          )}>
          <AvatarImage src="src/assets/react.svg" alt="사용자 이미지" />
          <AvatarFallback>나</AvatarFallback>
        </Avatar>

        <span
          className={cn(
            "text-sm font-medium",
            isActive(PATH.MYPAGE) ? "text-blue-500" : "text-white"
          )}>
          MY
        </span>
      </Button>
    </div>
  );
};

export default NavigationBar;
