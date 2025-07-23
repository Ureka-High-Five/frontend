"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentModal } from "./content-modal";

// Mock data
const mockContents = [
  {
    id: 1,
    title: "어벤져스: 엔드게임",
    type: "MOVIE",
    openDate: "2019-04-26",
    director: "안소니 루소, 조 루소",
    posterUrl: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 2,
    title: "기생충",
    type: "MOVIE",
    openDate: "2019-05-30",
    director: "봉준호",
    posterUrl: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 3,
    title: "오징어 게임",
    type: "TV",
    openDate: "2021-09-17",
    director: "황동혁",
    posterUrl: "/placeholder.svg?height=80&width=60",
  },
];

export function ContentManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  const handleCreate = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("Delete content:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h1>
          <p className="text-gray-500">영화와 TV 프로그램을 관리하세요</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          콘텐츠 생성
        </Button>
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
                <TableHead>타입</TableHead>
                <TableHead>오픈일</TableHead>
                <TableHead>감독</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <img
                      src={content.posterUrl || "/placeholder.svg"}
                      alt={content.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        content.type === "MOVIE" ? "default" : "secondary"
                      }>
                      {content.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{content.openDate}</TableCell>
                  <TableCell>{content.director}</TableCell>
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
                        onClick={() => handleDelete(content.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={editingContent}
      />
    </div>
  );
}
