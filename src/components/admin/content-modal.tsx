import { useState, useEffect, useMemo } from "react";
import { X, Plus } from "lucide-react";
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
import { GENRE_LIST, COUNTRY_CODE_LIST } from "@/constants/admin";
import useFileUpload from "@/hooks/common/useFileUpload";
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
    trailerTime: 0,
  });

  const [genreInput, setGenreInput] = useState("");
  const [actorInput, setActorInput] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const { content: contentDetail } = useContentDetailQuery(
    isEditMode && content?.contentId ? String(content.contentId) : ""
  );
  const { mutatePostContent, isPosting } = usePostContentMutation();
  const { mutatePatchContent } = usePatchContent();
  const { uploadFile } = useFileUpload();

  const previewVideoUrl = useMemo(() => {
    if (!videoFile) return "";

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  const previewPosterUrl = useMemo(() => {
    if (!posterFile) return "";

    return URL.createObjectURL(posterFile);
  }, [posterFile]);

  useEffect(() => {
    return () => {
      if (previewPosterUrl) URL.revokeObjectURL(previewPosterUrl);
    };
  }, [previewPosterUrl]);

  useEffect(() => {
    return () => {
      if (previewVideoUrl) URL.revokeObjectURL(previewVideoUrl);
    };
  }, [previewVideoUrl]);

  useEffect(() => {
    if (isEditMode && contentDetail && content?.contentId) {
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
        trailerTime: contentDetail.contentRunningTime ?? 0,
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
        trailerTime: 0,
      });
      setGenreInput("");
      setActorInput("");
      setVideoFile(null);
      setPosterFile(null);
    }
  }, [content, contentDetail, isEditMode]);
  if (isEditMode && !content?.contentId) return null;

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

  const handleSave = async () => {
    if (isEditMode) {
      mutatePatchContent(formData);
    } else if (videoFile && posterFile) {
      const [videoUrl, postUrl] = await Promise.all([
        uploadFile(videoFile, "video"),
        uploadFile(posterFile, "image"),
      ]);

      if (videoUrl && postUrl) {
        mutatePostContent({
          ...formData,
          videoUrl,
          postUrl,
        });
      }
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
              <Label id="type">타입</Label>
              <Select
                aria-labelledby="type-"
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className="h-9 text-sm">
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
              <Label htmlFor="videoFile">비디오</Label>
              <div className="relative w-full aspect-[2/3] border-2 border-dashed rounded-md cursor-pointer hover:border-primary overflow-hidden flex items-center justify-center">
                <label
                  htmlFor="videoFile"
                  className="w-full h-full flex items-center justify-center">
                  {videoFile ? (
                    <video
                      src={previewVideoUrl}
                      className="object-cover h-full w-full"
                      onLoadedMetadata={(e) => {
                        const duration = Math.round(e.currentTarget.duration);

                        setFormData((prev) => ({
                          ...prev,
                          trailerTime: duration,
                        }));
                      }}
                      controls>
                      <track kind="captions" srcLang="ko" label="자막" />
                    </video>
                  ) : (
                    <div className="text-muted-foreground text-sm flex flex-col items-center">
                      <Plus className="w-6 h-6 mb-1" />
                      비디오 파일 선택
                    </div>
                  )}
                </label>
                {videoFile && (
                  <button
                    type="button"
                    onClick={() => setVideoFile(null)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                    <X className="w-4 h-4 text-black" />
                  </button>
                )}
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) setVideoFile(file);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="posterFile">포스터</Label>
              <div className="relative w-full aspect-[2/3] border-2 border-dashed rounded-md cursor-pointer hover:border-primary overflow-hidden flex items-center justify-center">
                <label
                  htmlFor="posterFile"
                  className="w-full h-full flex items-center justify-center">
                  {posterFile ? (
                    <img
                      src={previewPosterUrl}
                      alt="포스터 미리보기"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm flex flex-col items-center">
                      <Plus className="w-6 h-6 mb-1" />
                      포스터 이미지 선택
                    </div>
                  )}
                </label>
                {posterFile && (
                  <button
                    type="button"
                    onClick={() => setPosterFile(null)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                    <X className="w-4 h-4 text-black" />
                  </button>
                )}
                <input
                  id="posterFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) setPosterFile(file);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countryName">국가</Label>
              <Select
                value={formData.countryName}
                onValueChange={(value) =>
                  handleInputChange("countryName", value)
                }>
                <SelectTrigger id="countryName" className="h-9 text-sm">
                  <SelectValue placeholder="국가를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODE_LIST.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Label htmlFor="genre">장르</Label>
            <div className="text-xs">{GENRE_LIST.join(", ")}</div>
            <div className="flex gap-2">
              <Input
                id="genre"
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
            <Label htmlFor="actor">출연진</Label>
            <div className="flex gap-2">
              <Input
                id="actor"
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
