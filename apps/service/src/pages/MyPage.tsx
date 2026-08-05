import useUserInformationQuery from "@lead-me/data-access/user/useUserInformationQuery";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import MyLayout from "@/components/My/MyLayout";

const MyPageContent = () => {
  const { userInformation } = useUserInformationQuery();

  return <MyLayout userInformation={userInformation} />;
};

const MyPage = () => {
  return (
    <AsyncBoundary>
      <MyPageContent />
    </AsyncBoundary>
  );
};

export default MyPage;
