"use client";

import { useState } from "react";
import { ContentManagement } from "@/components/admin/content-management";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { UserManagement } from "@/components/admin/user-management";
import { useIsMobile } from "@/hooks/common/useIsMobile";

export default function AdminPage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("content");

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white text-gray-800 text-center p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">📵 모바일 미지원</h2>
          <p className="text-lg">
            관리자 페이지는 PC 화면에서만 접속 가능합니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "content" && <ContentManagement />}
          {activeTab === "user" && <UserManagement />}
        </main>
      </div>
    </div>
  );
}
