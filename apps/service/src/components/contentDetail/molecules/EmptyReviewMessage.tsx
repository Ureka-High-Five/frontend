const EmptyReviewMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-6 text-center bg-gray-500/10 rounded-lg backdrop-blur-sm">
      <p className="body-md-pretendard text-custom-gray mb-1">
        아직 리뷰가 없어요
      </p>
      <p className="body-sm-pretendard text-custom-gray/60">
        첫 번째 리뷰를 작성해보세요!
      </p>
    </div>
  );
};

export default EmptyReviewMessage;
