import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import AvatarWithText from "@/components/common/AvatarWithText";
import type { CommentWithTime } from "@/types/shorts";
import ReelTitle from "../atom/ReelTitle";
import ReelActionBar from "../molecules/ReelActionBar";

interface ReelOverlayProps {
  title: string;
  comment?: CommentWithTime | null;
}

export default function ReelOverlay({ title, comment }: ReelOverlayProps) {
  return (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-8 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
      <div className="relative h-14">
        <AnimatePresence mode="wait">
          {comment && (
            <motion.div
              key={`${comment.userId}-${comment.time}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-block">
              <AvatarWithText
                avatarUrl={comment.profileUrl}
                subText={comment.comment}
                className="bg-gray-500/30 px-3 py-2 rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pt-2">
        <ReelTitle title={title} />
        <Heart className="w-5 h-5 text-white" />
      </div>
      <ReelActionBar />
    </div>
  );
}
