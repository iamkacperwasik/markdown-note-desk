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
          content: string | null
          created_at: string
          id: number
          is_bookmark: boolean
          title: string
          title_slug: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          is_bookmark?: boolean
          title: string
          title_slug: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          is_bookmark?: boolean
          title?: string
          title_slug?: string
          user_id?: string
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
