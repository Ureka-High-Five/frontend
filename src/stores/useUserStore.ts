import { create } from "zustand";

interface UserData {
  userId: number;
  selectedContentIds: number[];
  birthYear: number;
  gender: "male" | "female" | "";
  name: string;
}

interface UserState {
  user: UserData;
  setUserId: (id: number) => void;
  setSelectedContentIds: (ids: number[]) => void;
  setBirthYear: (birthYear: number) => void;
  setGender: (gender: "male" | "female") => void;
  setName: (name: string) => void;
}

const initialUser: UserData = {
  userId: 0,
  selectedContentIds: [],
  birthYear: 0,
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

  setBirthYear: (birthYear) =>
    set((state) => ({
      user: { ...state.user, birthYear },
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
