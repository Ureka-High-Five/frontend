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
    <>
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          onClick={onClose}
          className="!text-white hover:bg-transparent bg-transparent">
          <X className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          onClick={onToggleMute}
          className="!text-white hover:bg-transparent bg-transparent">
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </Button>
      </div>
    </>
  );
};

export default ContentDetailHeader;
