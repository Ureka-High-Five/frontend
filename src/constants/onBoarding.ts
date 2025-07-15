export const ONBOARDING_STEP_TEXTS = {
  name: ["반가워요!", "이렇게 불러드릴까요?"],
  birthYear: ["좋아요!", "나이를 알려주세요"],
  gender: ["거의 다 왔어요!", "성별을 알려주세요"],
  content: {
    default: ["좋아하는 작품을", "개 이상 선택해주세요"],
    completed: ["10개 달성!", "더 선택하면 추천이 더 정확해져요"],
  },
} as const;

export const REQUIRED_COUNT = 10;
