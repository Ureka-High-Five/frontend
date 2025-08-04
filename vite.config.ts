/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: "bundle-report.html", // 분석 결과 파일
      open: true, // 빌드 완료 후 자동 브라우저 열기
      template: "treemap", // treemap 방식 시각화
      gzipSize: true, // gzip 사이즈 표시
      brotliSize: true, // brotli 사이즈 표시
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // chunk 분석을 명확하게 보이도록 설정
      },
    },
  },
});
