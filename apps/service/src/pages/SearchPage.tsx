import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import SearchContentList from "@/components/search/organism/SearchContentList";

const SearchPage = () => {
  return (
    <div className="relative bg-black text-white h-screen-mobile flex flex-col overflow-hidden">
      <Header scrolled={false} />
      <main className="flex-1 px-4 pt-16 overflow-y-auto no-scrollbar">
        <SearchContentList />
      </main>
      <NavigationBar />
    </div>
  );
};

export default SearchPage;
