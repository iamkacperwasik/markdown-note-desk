import {create} from "zustand"

export type UserStore = {
  user_id: string
  email: string

  set_user_id: (user_id: string) => void
  set_email: (email: string) => void
}

export default create<UserStore>((set) => ({
  email: "",
  user_id: "",

  set_email: (email) => {
    set((state) => ({
      ...state,
      email,
    }))
  },
  set_user_id: (user_id) => {
    set((state) => ({
      ...state,
      user_id,
    }))
  },
}))
