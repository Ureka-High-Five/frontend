import { create } from "zustand";

interface UserBehaviorData {
  avgWatchTime: number;
}

interface UserBehaviorState {
  userBehavior: UserBehaviorData;
  setAvgWatchTime: (watchTime: number) => void;
}

const initialUserBehavior: UserBehaviorData = {
  avgWatchTime: 0,
};

const useUserBehaviorStore = create<UserBehaviorState>((set) => ({
  userBehavior: initialUserBehavior,

  setAvgWatchTime: (watchTime) =>
    set((state) => ({
      userBehavior: { ...state.userBehavior, avgWatchTime: watchTime },
    })),
}));

export default useUserBehaviorStore;
