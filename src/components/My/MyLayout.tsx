import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import { PATH } from "@/constants/path";
import type { UserInformation } from "@/types/user";
import Profile from "./molecule/Profile";
import MyPageTabs from "./organism/MyPageTabs";

interface MyLayoutProps {
  userInformation: UserInformation;
}

const MyLayout = ({ userInformation }: MyLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-screen-mobile gap-6 pb-20">
      <header className="w-full flex h-14 md:h-16 px-4 md:px-10 md:pt-3">
        <button type="button" onClick={() => navigate(PATH.HOME)}>
          <img src={logoImg} alt="홈 로고" className="h-8 md:h-12" />
        </button>
      </header>
      <div className="flex flex-col flex-1 overflow-y-auto px-8 md:px-10 gap-6">
        <Profile userInformation={userInformation} />
        <MyPageTabs userInformation={userInformation} />
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyLayout;
