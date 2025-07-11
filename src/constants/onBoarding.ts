const ONBOARDING_STEP_TEXTS = {
  name: ["반가워요!", "이렇게 불러드릴까요?"],
  age: ["좋아요!", "나이를 알려주세요"],
  gender: ["거의 다 왔어요!", "성별을 알려주세요"],
  content: ["좋아하는 작품을", "개 이상 선택해주세요"],
} as const;

const REQUIRED_COUNT = 10;

export { ONBOARDING_STEP_TEXTS, REQUIRED_COUNT };
