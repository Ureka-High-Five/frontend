import { create } from "zustand";

export interface UserData {
  userId: number;
  selectedContentIds: number[];
  birthYear: number;
  gender: "MALE" | "FEMALE" | "";
  name: string;
}

interface UserState {
  user: UserData;
  setUserId: (id: number) => void;
  setSelectedContentIds: (ids: number[]) => void;
  addSelectedContentId: (id: number) => void;
  removeSelectedContentId: (id: number) => void;
  setBirthYear: (birthYear: number) => void;
  setGender: (gender: "MALE" | "FEMALE") => void;
  setName: (name: string) => void;
  resetUser: () => void;
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

  addSelectedContentId: (id) =>
    set((state) => {
      const current = state.user.selectedContentIds;

      if (current.includes(id)) return state;

      return {
        user: {
          ...state.user,
          selectedContentIds: [...current, id],
        },
      };
    }),

  removeSelectedContentId: (id) =>
    set((state) => ({
      user: {
        ...state.user,
        selectedContentIds: state.user.selectedContentIds.filter(
          (contentId) => contentId !== id
        ),
      },
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

  resetUser: () =>
    set(() => ({
      user: initialUser,
    })),
}));

export default useUserStore;
