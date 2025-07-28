import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ChevronDown } from "lucide-react";
import FallbackImage from "@/components/common/atom/FallbackImage";
import CurationDetailList from "@/components/My/molecule/CurationDetailList";
import { useOverlay } from "@/hooks/common/useOverlay";

interface MyCurationItemProps {
  curationId: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  onDeleteClick: (id: number) => void;
}

const MyCurationItem = ({
  curationId,
  title,
  thumbnailUrl,
  description,
  onDeleteClick,
}: MyCurationItemProps) => {
  const { isOpen, toggle } = useOverlay();

  const handleCurationDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteClick(curationId);
  };

  return (
    <li className="flex flex-col gap-4 border-b border-custom-darkgray pb-4">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <div role="button" className="flex gap-4 cursor-pointer" onClick={toggle}>
        <FallbackImage
          src={thumbnailUrl}
          alt={title}
          className="w-[120px] h-[180px] rounded-md"
        />
        <div className="flex flex-col flex-1 text-white py-1 gap-2 text-left items-start">
          <h2 className="heading-h2-pretendard break-all">{title}</h2>
          <p className="body-lg-pretendard text-gray-300 break-all">
            {description}
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
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
      </div>
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
