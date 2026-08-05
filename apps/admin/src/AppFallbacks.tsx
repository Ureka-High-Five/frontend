export const Loading = () => (
  <main className="flex min-h-screen items-center justify-center bg-gray-50">
    <p className="text-gray-600">관리자 정보를 확인하고 있습니다.</p>
  </main>
);

export const ApiUnavailable = () => (
  <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6 text-center">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        관리자 서버에 연결할 수 없습니다
      </h1>
      <p className="mt-2 text-gray-500">
        서버 상태와 환경 변수를 확인해 주세요.
      </p>
    </div>
  </main>
);
