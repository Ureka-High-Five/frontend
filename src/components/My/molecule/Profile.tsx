import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UserInformation } from "@/types/user";

interface ProfileProps {
  userInformation: UserInformation;
}

const Profile = ({ userInformation }: ProfileProps) => {
  return (
    <section
      aria-labelledby="profile-title"
      className="flex items-center gap-4">
      <Avatar className="w-14 h-14">
        <AvatarImage src={userInformation.profileUrl} alt="프로필 이미지" />
        <AvatarFallback>{userInformation.userName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 id="profile-title" className="heading-h2-pretendard text-white">
            {userInformation.userName}님
          </h2>
          {userInformation.role === "EDITOR" && (
            <span className="px-2 border border-custom-point body-md-pretendard rounded-full text-custom-point">
              큐레이션
            </span>
          )}
        </div>
        <p className="body-md-pretendard text-custom-gray">
          {userInformation.email}
        </p>
      </div>
    </section>
  );
};

export default Profile;
