"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

import { useUserByNameInfiniteQuery } from "@/hooks/queries/admin/useUserByNameInfiniteQuery";
import { useUsersInfiniteQuery } from "@/hooks/queries/admin/useUsersInfiniteQuery";
import type { UserItem } from "@/types/admin";
import { UserRoleModal } from "./user-role-modal";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔍 검색어가 없을 땐 전체 유저
  const {
    allUsers,
    fetchNextPage: fetchAllUsersNext,
    hasNextPage: hasAllUsersNext,
    isLoading: isLoadingAll,
  } = useUsersInfiniteQuery();

  // 🔍 검색어가 있을 때만 이름 기반 쿼리 실행
  const {
    users: searchedUsers,
    fetchNextPage: fetchSearchNext,
    hasNextPage: hasSearchNext,
    isLoading: isLoadingSearch,
  } = useUserByNameInfiniteQuery(searchValue);

  const isSearchMode = !!searchValue.trim();
  const users = isSearchMode ? searchedUsers : allUsers;
  const fetchNextPage = isSearchMode ? fetchSearchNext : fetchAllUsersNext;
  const hasNextPage = isSearchMode ? hasSearchNext : hasAllUsersNext;
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingAll;

  const handleEditRole = (user: UserItem) => {
    if (user.role === "ADMIN") return;
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "EDITOR":
        return "default";
      case "USER":
      default:
        return "secondary";
    }
  };

  const handleSearch = () => {
    setSearchValue(searchTerm);
  };

  return (
    <div className="space-y-6">
      {/* 상단 헤더 + 검색 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">유저 관리</h1>
          <p className="text-gray-500">사용자 역할을 관리하세요</p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="이름으로 검색"
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
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>유저 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>프로필</TableHead>
                <TableHead>닉네임</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={user.profileUrl || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {user.userName?.charAt(0).toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRole(user)}
                      disabled={user.role === "ADMIN"}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    유저가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* 페이지네이션 */}
        {hasNextPage && (
          <div className="flex justify-center mt-4 mb-8">
            <Button onClick={() => fetchNextPage()} disabled={isLoading}>
              {isLoading ? "불러오는 중..." : "더 보기"}
            </Button>
          </div>
        )}
      </Card>

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
      />
    </div>
  );
}
