import { useLocation, useNavigate } from "react-router-dom";
import { Tv, Zap } from "lucide-react";
import NavItem from "@/components/common/Navigation/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PATH } from "@/constants/path";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInformation } = useUserInformationQuery();

  return (
    <nav className="absolute bottom-0 flex h-16 w-full py-4 items-center justify-around bg-custom-darkgray/80 backdrop-blur-sm transition-opacity duration-300">
      <NavItem
        icon={<Tv className="stroke-current w-full h-full" />}
        label="HOME"
        onClick={() => navigate(PATH.HOME)}
        active={location.pathname === PATH.HOME}
      />
      <NavItem
        icon={<Zap className="stroke-current w-full h-full" />}
        label="SHORTS"
        onClick={() => navigate(PATH.SHORTS_LIST)}
        active={location.pathname === PATH.SHORTS_LIST}
      />
      <NavItem
        icon={
          <Avatar className="w-5 h-5">
            <AvatarImage
              src={userInformation?.profileUrl}
              alt="사용자 이미지"
            />
            <AvatarFallback>{userInformation?.userName[0]}</AvatarFallback>
          </Avatar>
        }
        label="MY"
        onClick={() => navigate(PATH.MYPAGE)}
        active={location.pathname === PATH.MYPAGE}
      />
    </nav>
  );
};

export default NavigationBar;
