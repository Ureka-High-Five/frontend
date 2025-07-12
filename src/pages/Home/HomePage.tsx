// // // import HomeContentLayout from "@/components/Home/HomeContentLayout";
// // // import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";

// // // const HomePage = () => {
// // //   return <HomeContentLayout data={mockRecommendContentsData} />;
// // // };

// // // export default HomePage;
// // import type { RecommendContentsResponse } from "@/types/RecommendContentsResponse";
// // import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";
// // import MainRecommendBanner from "@/components/Home/MainRecommendBanner";
// // import RecommendationSection from "@/components/Home/RecommendationSection";

// // const HomePage = () => {
// //   const data: RecommendContentsResponse = mockRecommendContentsData;

// //   return (
// //     <main className="flex flex-col gap-8 py-6">
// //       <div className="w-full max-w-screen-md mx-auto px-4 md:px-10">
// //         {/* <RandomPickBanner content={data.randomContent} /> */}
// //         <MainRecommendBanner content={data.mainRecommend} />
// //         <RecommendationSection
// //           title="이예슬님을 위한 추천"
// //           contents={data.recommendContents}
// //         />

// //         <RecommendationSection
// //           title={`어두운 ${data.recommendGenreContents.genre} 장르에 빠졌다면`}
// //           contents={data.recommendGenreContents.contents}
// //         />

// //         <RecommendationSection
// //           customHeader={
// //             <>
// //               <img
// //                 src={data.recommendCuration.userProfile}
// //                 alt="프로필"
// //                 className="w-4 h-4 rounded-full"
// //               />
// //               <span className="text-pink-400">
// //                 {data.recommendCuration.userName}의 추천
// //               </span>
// //               <span className="font-semibold">
// //                 {data.recommendCuration.curationTitle}
// //               </span>
// //             </>
// //           }
// //           contents={data.recommendCuration.contents}
// //         />
// //       </div>
// //     </main>
// //   );
// // };

// // export default HomePage;
// import { useEffect, useRef, useState } from "react";
// import MainRecommendBanner from "@/components/Home/MainRecommendBanner";
// import RecommendationSection from "@/components/Home/RecommendationSection";
// import Header from "@/components/common/Header";
// import NavigationBar from "@/components/common/Navigation/NavigationBar";
// import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";

// const HomePage = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const target = scrollRef.current;
//     if (!target) return;

//     const handleScroll = () => {
//       setScrolled(target.scrollTop > 10);
//     };

//     target.addEventListener("scroll", handleScroll);
//     return () => target.removeEventListener("scroll", handleScroll);
//   }, []);

//   const data = mockRecommendContentsData;

//   return (
//     <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
//       <Header scrolled={scrolled} />

//       {/* <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar"> */}
//         <main ref={scrollRef} className="flex flex-col gap-8 py-6 px-4 md:px-10 overflow-y-auto no-scrollbar">
//           {/* <div className="w-full max-w-screen-md mx-auto px-4 md:px-10"> */}
//             {/* <RandomPickBanner content={data.randomContent} /> */}
//             <MainRecommendBanner content={data.mainRecommend} />
//             <RecommendationSection
//               title="이예슬님을 위한 추천"
//               contents={data.recommendContents}
//             />
//             <RecommendationSection
//               title={`어두운 ${data.recommendGenreContents.genre} 장르에 빠졌다면`}
//               contents={data.recommendGenreContents.contents}
//             />
            
//             <RecommendationSection
//               customHeader={
//                 <>
//                   <img
//                     src={data.recommendCuration.userProfile}
//                     alt="프로필"
//                     className="w-4 h-4 rounded-full"
//                   />
//                   <span className="text-pink-400">
//                     {data.recommendCuration.userName}의 추천
//                   </span>
//                   <span className="font-semibold">
//                     {data.recommendCuration.curationTitle}
//                   </span>
//                 </>
//               }
//               contents={data.recommendCuration.contents}
//             />
//           {/* </div> */}
//         </main>
//       {/* </div> */}

//       <NavigationBar />
//     </div>
//   );
// };

// export default HomePage;
import { useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const handleScroll = () => {
      setScrolled(target.scrollTop > 10);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  const data = mockRecommendContentsData;

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={scrolled} />

      <main ref={scrollRef} className="flex flex-col gap-8 py-6 px-6 md:px-10 overflow-y-auto no-scrollbar">
        <MainRecommendBanner content={data.mainRecommend} />
        
        <PersonalRecommendSection contents={data.recommendContents} />
        <GenreRecommendSection data={data.recommendGenreContents} />
        <GenreRecommendSection data={data.recommendSecondGenreContents} />
        
        <CurationRecommendSection data={data.recommendCuration} />
        <CurationRecommendSection data={data.recommendSecondCuration} />
      </main>

      <NavigationBar />
    </div>
  );
};

export default HomePage;
