import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeleteContentMutation from "@/hooks/queries/admin/useDeleteContentMutation";
import { useSearchContentsInfiniteQuery } from "@/hooks/queries/home/useSearchContentsInfiniteQuery";
import type { SearchContent } from "@/types/search";
import { ContentModal } from "./content-modal";

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<SearchContent | null>(
    null
  );

  const { searchContents, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchContentsInfiniteQuery(searchValue);
  const { mutateDeleteContent } = useDeleteContentMutation(searchValue);

  const handleCreate = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (content: SearchContent) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    mutateDeleteContent(id);
  };

  const handleSearch = () => {
    setSearchValue(searchTerm);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h1>
          <p className="text-gray-500">영화와 TV 프로그램을 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="콘텐츠 제목 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch}>검색</Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            콘텐츠 생성
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>콘텐츠 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>포스터</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>오픈 연도</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchContents.map((content) => (
                <TableRow key={content.contentId}>
                  <TableCell>
                    <img
                      src={content.thumbnailUrl || "/placeholder.svg"}
                      alt={content.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>{content.openYear}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(content)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(content.contentId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* 페이지네이션 */}
        {hasNextPage && (
          <div className="flex justify-center mt-4 mb-8">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
            </Button>
          </div>
        )}
      </Card>

      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={editingContent}
      />
    </div>
  );
}
