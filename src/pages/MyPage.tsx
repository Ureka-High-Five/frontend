import MyLayout from "@/components/My/MyLayout";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";

const MyPage = () => {
  const { userInformation } = useUserInformationQuery();

  if (!userInformation) return null;

  return <MyLayout userInformation={userInformation} />;
};

export default MyPage;
