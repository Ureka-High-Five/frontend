import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import usePatchContent from "@/hooks/queries/admin/usePatchContentMutation";
import { usePostContentMutation } from "@/hooks/queries/admin/usePostContentMutation";
import { useContentDetailQuery } from "@/hooks/queries/content/useContentDetailQuery";
import type { ContentCreateRequest } from "@/types/content";
import type { SearchContent } from "@/types/search";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: SearchContent | null;
}

export function ContentModal({ isOpen, onClose, content }: ContentModalProps) {
  const isEditMode = !!content;

  const [formData, setFormData] = useState<ContentCreateRequest>({
    title: "",
    description: "",
    videoUrl: "",
    postUrl: "",
    countryName: "",
    openDate: "",
    runningTime: 0,
    totalRound: 0,
    type: "",
    genres: [],
    actors: [],
    director: "",
  });

  const [genreInput, setGenreInput] = useState("");
  const [actorInput, setActorInput] = useState("");

  const { content: contentDetail } = useContentDetailQuery(
    content?.contentId?.toString() ?? ""
  );

  const { mutatePostContent, isPosting } = usePostContentMutation();
  const { mutatePatchContent } = usePatchContent();

  useEffect(() => {
    if (isEditMode && contentDetail) {
      setFormData({
        title: contentDetail.contentTitle,
        description: contentDetail.contentDescription,
        videoUrl: contentDetail.videoUrl ?? "",
        postUrl: contentDetail.postUrl ?? "",
        countryName: contentDetail.countryName ?? "",
        openDate: contentDetail.openYear ?? "",
        runningTime: contentDetail.contentRunningTime ?? 0,
        totalRound: contentDetail.totalRound ?? 0,
        type: contentDetail.contentType ?? "",
        genres: contentDetail.contentGenres ?? [],
        actors: contentDetail.actors ?? [],
        director: contentDetail.director ?? "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        videoUrl: "",
        postUrl: "",
        countryName: "",
        openDate: "",
        runningTime: 0,
        totalRound: 0,
        type: "",
        genres: [],
        actors: [],
        director: "",
      });
    }
  }, [content, contentDetail, isEditMode]);

  const handleInputChange = (
    field: keyof ContentCreateRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genreInput.trim()],
      }));
      setGenreInput("");
    }
  };

  const removeGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }));
  };

  const addActor = () => {
    if (actorInput.trim() && !formData.actors.includes(actorInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        actors: [...prev.actors, actorInput.trim()],
      }));
      setActorInput("");
    }
  };

  const removeActor = (actor: string) => {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((a) => a !== actor),
    }));
  };

  const handleSave = () => {
    if (isEditMode) {
      mutatePatchContent(formData);
    } else {
      mutatePostContent(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{content ? "콘텐츠 수정" : "콘텐츠 생성"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">타입</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="타입 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MOVIE">영화</SelectItem>
                  <SelectItem value="TV">TV 프로그램</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="videoUrl">비디오 URL</Label>
              <Input
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postUrl">포스터 URL</Label>
              <Input
                id="postUrl"
                value={formData.postUrl}
                onChange={(e) => handleInputChange("postUrl", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countryName">국가</Label>
              <Input
                id="countryName"
                value={formData.countryName}
                onChange={(e) =>
                  handleInputChange("countryName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openDate">개봉일</Label>
              <Input
                id="openDate"
                type="date"
                value={formData.openDate}
                onChange={(e) => handleInputChange("openDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="runningTime">상영시간 (분)</Label>
              <Input
                id="runningTime"
                type="number"
                value={formData.runningTime}
                onChange={(e) =>
                  handleInputChange("runningTime", Number(e.target.value))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalRound">총 회차</Label>
              <Input
                id="totalRound"
                type="number"
                value={formData.totalRound}
                onChange={(e) =>
                  handleInputChange("totalRound", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="director">감독</Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) => handleInputChange("director", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>장르</Label>
            <div className="flex gap-2">
              <Input
                placeholder="장르 입력"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addGenre()}
              />
              <Button type="button" onClick={addGenre}>
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {genre}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeGenre(genre)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>출연진</Label>
            <div className="flex gap-2">
              <Input
                placeholder="배우 이름 입력"
                value={actorInput}
                onChange={(e) => setActorInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addActor()}
              />
              <Button type="button" onClick={addActor}>
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.actors.map((actor) => (
                <Badge
                  key={actor}
                  variant="secondary"
                  className="flex items-center gap-1">
                  {actor}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeActor(actor)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button disabled={isPosting} onClick={handleSave}>
            {isEditMode ? "수정" : "저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
