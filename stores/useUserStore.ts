import {create} from "zustand"

export type UserStore = {
  userId: string
  email: string

  setUserId: (userId: string) => void
  setEmail: (email: string) => void
}

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
