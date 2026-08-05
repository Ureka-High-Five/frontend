import { KAKAO_API_URL } from "@lead-me/api/constants";
import { Button } from "@lead-me/ui/button";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const AdminLoginPage = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-white p-8 text-center text-gray-800">
        <div>
          <h1 className="text-2xl font-bold">📵 모바일 미지원</h1>
          <p className="mt-4 text-lg">
            관리자 페이지는 PC 화면에서만 접속 가능합니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(71,85,105,0.32),_transparent_48%)]"
      />

      <section className="relative flex min-h-screen w-full flex-col items-center justify-center text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur">
          <ShieldCheck aria-hidden="true" className="h-8 w-8" />
        </div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
          Lead Me Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          관리자 로그인
        </h1>

        <Button
          className="mt-10 h-14 gap-2 rounded-xl bg-[#FEE500] px-24 text-base font-semibold text-[#191919] shadow-none hover:bg-[#F4DC00] hover:text-[#191919]"
          onClick={() => {
            window.location.href = KAKAO_API_URL;
          }}>
          <MessageCircle aria-hidden="true" className="h-5 w-5 fill-current" />
          카카오로 로그인
        </Button>
      </section>
    </main>
  );
};

export default AdminLoginPage;
