import { create } from "zustand";

interface UserData {
  userId: number;
  selectedContentIds: number[];
  year: number;
  gender: "male" | "female" | "";
  name: string;
}

interface UserState {
  user: UserData;
  setUserId: (id: number) => void;
  setSelectedContentIds: (ids: number[]) => void;
  setYear: (year: number) => void;
  setGender: (gender: "male" | "female") => void;
  setName: (name: string) => void;
}

const initialUser: UserData = {
  userId: 0,
  selectedContentIds: [],
  year: 0,
  gender: "",
  name: "",
};

const useUserStore = create<UserState>((set) => ({
  user: initialUser,

  setUserId: (id) =>
    set((state) => ({
      user: { ...state.user, userId: id },
    })),

  setSelectedContentIds: (ids) =>
    set((state) => ({
      user: { ...state.user, selectedContentIds: ids },
    })),

  setYear: (year) =>
    set((state) => ({
      user: { ...state.user, year },
    })),

  setGender: (gender) =>
    set((state) => ({
      user: { ...state.user, gender },
    })),

  setName: (name) =>
    set((state) => ({
      user: { ...state.user, name },
    })),
}));

export default useUserStore;
