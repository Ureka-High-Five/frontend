import { Heart } from "lucide-react";
import ReelTitle from "../atom/ReelTitle";
import ReelActionBar from "../molecules/ReelActionBar";
import { useParams } from "react-router-dom";
import { useCommentQuery } from "@/hooks/queries/shorts/useCommentQuery";
import { useLikeQuery } from "@/hooks/queries/shorts/useLikeQuery";
import { useEffect } from "react";

interface ReelOverlayProps {
  title: string;
  // shortsId: string;
  // isActive: boolean;
}

export default function ReelOverlay({ title }: ReelOverlayProps) {
  // active(현재 보고 있는 쇼츠)일 때만 쿼리 실행
  // (아래 주석 해제 및 실제 쿼리 훅 import 필요)
  const { id: shortsId } = useParams<{ id: string }>();
  const shortsLikes = useLikeQuery({ shortsId, duration: "5" });
  const shortsComments = useCommentQuery({ shortsId, time: "2" });

  return (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-5 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
      <div className="flex items-center justify-between pb-2">
        <ReelTitle title={title} />
        <Heart className="w-5 h-5 text-white" />
      </div>
      <ReelActionBar />
    </div>
  );
}
