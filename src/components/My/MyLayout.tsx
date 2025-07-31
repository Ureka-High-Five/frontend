import logoImg from "@/assets/logo.png";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import type { UserInformation } from "@/types/user";
import Profile from "./molecule/Profile";
import MyPageTabs from "./organism/MyPageTabs";

interface MyLayoutProps {
  userInformation: UserInformation;
}

const MyLayout = ({ userInformation }: MyLayoutProps) => {
  return (
    <div className="relative flex flex-col h-screen-mobile">
      <div className="flex flex-col flex-1 overflow-y-auto pb-20 px-8 md:px-10 pt-3 gap-8">
        <header>
          <img src={logoImg} alt="logo" className="h-8" />
        </header>
        <Profile userInformation={userInformation} />
        <MyPageTabs userInformation={userInformation} />
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyLayout;
