import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ChevronDown } from "lucide-react";
import FallbackImage from "@/components/common/atom/FallbackImage";
import CurationDetailList from "@/components/My/molecule/CurationDetailList";
import { useOverlay } from "@/hooks/common/useOverlay";

interface MyCurationItemProps {
  curationId: number;
  title: string;
  thumbnailUrl: string;
  onDeleteClick: (id: number) => void;
}

const MyCurationItem = ({
  curationId,
  title,
  thumbnailUrl,
  onDeleteClick,
}: MyCurationItemProps) => {
  const { isOpen, toggle } = useOverlay();

  const handleCurationDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteClick(curationId);
  };

  return (
    <li className="flex flex-col gap-4 border-b border-custom-darkgray pb-4">
      <button
        className="flex gap-4 cursor-pointer"
        type="button"
        onClick={toggle}>
        <FallbackImage
          src={thumbnailUrl}
          alt={title}
          className="aspect-[3/2] w-[30%] min-w-[140px] rounded-md"
        />
        <span className="text-white text-left body-lg-pretendard py-2 whitespace-normal break-words flex-1">
          {title}
        </span>
        <div className="flex flex-col justify-between">
          <button
            type="button"
            onClick={handleCurationDelete}
            className="text-white hover:text-red-500 transition-colors">
            <Trash2 size={18} />
          </button>
          <ChevronDown
            size={20}
            className={`text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden">
            <CurationDetailList curationId={curationId} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MyCurationItem;
