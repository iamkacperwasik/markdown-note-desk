import {create} from "zustand"

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  userId: "",

  setEmail: (email) => {
    set((state) => ({
      ...state,
      email,
    }))
  },
  setUserId: (userId) => {
    set((state) => ({
      ...state,
      userId,
    }))
  },
}))
