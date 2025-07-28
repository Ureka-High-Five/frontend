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
      <div ref={rootRef} className="w-full flex-1 overflow-y-auto no-scrollbar">
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
