import AsyncBoundary from "@/components/common/AsyncBoundary";
import MyLayout from "@/components/My/MyLayout";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";

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
