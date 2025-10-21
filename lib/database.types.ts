export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      people: {
        Row: {
          id: string
          name: string
          age: number
          bio: string
          occupation: string
          image: string
          gallery: string[]
          bids_count: number
          auctioned_by: string
          about: string
          pros: string[]
          cons: string[]
          interests: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          bio: string
          occupation: string
          image: string
          gallery?: string[]
          bids_count?: number
          auctioned_by: string
          about: string
          pros?: string[]
          cons?: string[]
          interests?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          bio?: string
          occupation?: string
          image?: string
          gallery?: string[]
          bids_count?: number
          auctioned_by?: string
          about?: string
          pros?: string[]
          cons?: string[]
          interests?: string[]
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          person_id: string
          name: string
          text: string
          avatar: string
          created_at: string
        }
        Insert: {
          id?: string
          person_id: string
          name: string
          text: string
          avatar: string
          created_at?: string
        }
        Update: {
          id?: string
          person_id?: string
          name?: string
          text?: string
          avatar?: string
          created_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          person_id: string
          user_id: string
          amount: number
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          person_id: string
          user_id: string
          amount: number
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          person_id?: string
          user_id?: string
          amount?: number
          message?: string | null
          created_at?: string
        }
      }
    }
  }
}
