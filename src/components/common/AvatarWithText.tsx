// components/common/AvatarWithText.tsx

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarWithTextProps {
  avatarUrl?: string;
  title: React.ReactNode;
  subText?: React.ReactNode;
  className?: string;
}

const AvatarWithText = ({
  avatarUrl,
  title,
  subText,
  className,
}: AvatarWithTextProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarUrl} alt="프로필" />
        <AvatarFallback>나</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="heading-h2-pretendard text-white">{title}</div>
        {subText && (
          <div className="body-sm-pretendard text-darkgray">{subText}</div>
        )}
      </div>
    </div>
  );
};

export default AvatarWithText;
