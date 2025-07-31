import { Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentDetailHeaderProps {
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const ContentDetailHeader = ({
  onClose,
  isMuted,
  onToggleMute,
}: ContentDetailHeaderProps) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex justify-between p-4">
      <Button
        variant="ghost"
        onClick={onClose}
        aria-label="콘텐츠 상세 페이지 닫기"
        className="!text-white hover:bg-transparent bg-transparent">
        <X className="w-6 h-6" aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        onClick={onToggleMute}
        aria-label={isMuted ? "음소거 해제" : "음소거"}
        className="!text-white hover:bg-transparent bg-transparent">
        {isMuted ? (
          <VolumeX className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Volume2 className="w-6 h-6" aria-hidden="true" />
        )}
      </Button>
    </header>
  );
};

export default ContentDetailHeader;
