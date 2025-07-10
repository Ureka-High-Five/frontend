import HomeContentLayout from "@/components/Home/HomeContentLayout";
import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";

const HomePage = () => {
  return <HomeContentLayout data={mockRecommendContentsData} />;
};

export default HomePage;
