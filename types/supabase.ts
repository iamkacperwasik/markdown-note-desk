export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json}
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          content: string
          createdAt: string
          id: number
          isBookmark: boolean
          isShared: boolean
          title: string
          titleSlug: string
          userId: string
          views: number
        }
        Insert: {
          content?: string
          createdAt?: string
          id?: number
          isBookmark?: boolean
          isShared?: boolean
          title: string
          titleSlug: string
          userId: string
          views?: number
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          isBookmark?: boolean
          isShared?: boolean
          title?: string
          titleSlug?: string
          userId?: string
          views?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
