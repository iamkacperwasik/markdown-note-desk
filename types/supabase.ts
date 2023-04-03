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
          shared: boolean
          title: string
          title_slug: string
          user_id: string
          views: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          is_bookmark?: boolean
          shared?: boolean
          title: string
          title_slug: string
          user_id: string
          views?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          is_bookmark?: boolean
          shared?: boolean
          title?: string
          title_slug?: string
          user_id?: string
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
