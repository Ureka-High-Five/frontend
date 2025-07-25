import { useNavigate } from "react-router-dom";
import { Tv, Zap } from "lucide-react";
import NavItem from "@/components/common/Navigation/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PATH } from "@/constants/path";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { userInformation } = useUserInformationQuery();

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
        onClick={() => navigate(PATH.SHORTS_LIST)}
      />
      <NavItem
        icon={
          <Avatar className="w-5 h-5">
            <AvatarImage
              src={userInformation?.profileUrl}
              alt="사용자 이미지"
            />
            <AvatarFallback>{userInformation?.name[0]}</AvatarFallback>
          </Avatar>
        }
        label="MY"
        onClick={() => navigate(PATH.MYPAGE)}
      />
    </nav>
  );
};

export default NavigationBar;
