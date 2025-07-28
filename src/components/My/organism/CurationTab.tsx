import { Loader2 } from "lucide-react";
import CreateCurationModal from "@/components/My/organism/CreateCurationModal";
import MyCurationItem from "@/components/My/organism/MyCurationItem";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useOverlay } from "@/hooks/common/useOverlay";
import useDeleteCurationMutation from "@/hooks/queries/curation/useDeleteCurationMutation";
import useMyCurationInfiniteQuery from "@/hooks/queries/curation/useMyCurationInfiniteQuery";

const CurationTab = () => {
  const { curations, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyCurationInfiniteQuery();
  const { mutateDeleteMyCuration } = useDeleteCurationMutation();

  const { isOpen, open, close } = useOverlay();
  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    delayMs: 300,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const handleDeleteClick = (id: number) => {
    mutateDeleteMyCuration(id);
  };

  return (
    <section className="flex flex-col h-full items-center pt-8 gap-8">
      <Button
        size="lg"
        className="w-[90%] max-w-sm bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center"
        onClick={open}>
        큐레이션 등록
      </Button>
      <div
        ref={rootRef}
        className="w-full flex flex-1 flex-col overflow-y-auto no-scrollbar">
        {curations.length === 0 ? (
          <div className="flex flex-col flex-1 items-center justify-center text-custom-gray">
            <p className="heading-h2-pretendard">
              아직 생성된 큐레이션이 없어요
            </p>
            <p className="body-lg-pretendard mt-2">
              상단 버튼으로 새 큐레이션을 등록해보세요!
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-6">
            {curations.map((curation) => (
              <MyCurationItem
                key={curation.curationId}
                curationId={curation.curationId}
                title={curation.title}
                thumbnailUrl={curation.thumbnailUrl}
                description={curation.description}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </ul>
        )}

        <div ref={targetRef} className="h-6" />
        {isFetchingNextPage && (
          <div className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}
      </div>
      {isOpen && <CreateCurationModal onClose={close} />}
    </section>
  );
};

export default CurationTab;
