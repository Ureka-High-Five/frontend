"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePatchUserRoleMutation from "@/hooks/queries/admin/usePatchUserRoleMutation";
import type { UserItem } from "@/types/admin";

interface UserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserItem;
}

export function UserRoleModal({ isOpen, onClose, user }: UserRoleModalProps) {
  const { mutateUserRole } = usePatchUserRoleMutation();
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;

    mutateUserRole(
      {
        userId: user.userId,
        role: selectedRole,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>유저 역할 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profileUrl || "/placeholder.svg"} />
              <AvatarFallback>
                {user.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.userName}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">역할</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="EDITOR">EDITOR</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              ADMIN 역할은 수정할 수 없습니다.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
