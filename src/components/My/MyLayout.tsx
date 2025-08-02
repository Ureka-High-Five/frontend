import { Link } from "react-router-dom";
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
  return (
    <div className="relative flex flex-col h-screen-mobile gap-6 pb-20">
      <header className="w-full flex h-14 items-center md:h-16 px-4 md:px-10 md:pt-3">
        <Link to={PATH.HOME} aria-label="홈으로 이동">
          <img src={logoImg} alt="홈 로고" className="h-8 md:h-12" />
        </Link>
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
