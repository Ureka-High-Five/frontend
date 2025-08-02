import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserInformation } from "@/types/user";
import CurationTab from "./CurationTab";
import ReviewTab from "./ReviewTab";

interface MyPageTabsProps {
  userInformation: UserInformation;
}

const MyPageTabs = ({ userInformation }: MyPageTabsProps) => {
  return (
    <Tabs defaultValue="review" className="flex flex-col flex-1 min-h-0">
      <TabsList className="w-full justify-between border-b border-custom-darkgray bg-transparent">
        <TabsTrigger
          value="review"
          className="flex-1 text-white border-b-4 border-transparent px-1 pb-2 bg-transparent data-[state=active]:shadow-[inset_0_-1px_0_0_white]">
          나의 리뷰
        </TabsTrigger>

        <TabsTrigger
          value="curation"
          className="flex-1 text-white border-b-4 border-transparent px-1 pb-2 bg-transparent data-[state=active]:shadow-[inset_0_-1px_0_0_white]">
          큐레이션
        </TabsTrigger>
      </TabsList>

      <TabsContent value="review" className="flex-1 min-h-0">
        <ReviewTab />
      </TabsContent>
      <TabsContent value="curation" className="flex-1 min-h-0">
        <CurationTab userInformation={userInformation} />
      </TabsContent>
    </Tabs>
  );
};

export default MyPageTabs;
