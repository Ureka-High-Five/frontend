import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";

export function AdminHeader() {
  const { userInformation } = useUserInformationQuery();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            관리자 대시보드
          </h2>
          <p className="text-sm text-gray-500">콘텐츠와 사용자를 관리하세요</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={userInformation?.profileUrl} />
              <AvatarFallback>
                {userInformation?.userName?.[0] || "관"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                {userInformation?.userName || "관리자"}
              </p>
              <p className="text-gray-500">
                {userInformation?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
