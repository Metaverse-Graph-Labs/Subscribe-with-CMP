export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      merchants: {
        Row: {
          company: string | null
          contact: string | null
          created_at: string | null
          description: string | null
          id: number
          link: string | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          link?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          link?: string | null
          user_id?: string | null
        }
      }
      subscriptions: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number | null
          id: number
          price: number | null
          published: boolean | null
          title: string | null
          user_id: string | null
          wallet: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          price?: number | null
          published?: boolean | null
          title?: string | null
          user_id?: string | null
          wallet?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          price?: number | null
          published?: boolean | null
          title?: string | null
          user_id?: string | null
          wallet?: string | null
        }
      }
      todo: {
        Row: {
          address: string | null
          created_at: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          id: number
          subscription_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          subscription_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          subscription_id?: number
          user_id?: string
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          name: string | null
          user_id: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          name?: string | null
          user_id: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          name?: string | null
          user_id?: string
          wallet_address?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
