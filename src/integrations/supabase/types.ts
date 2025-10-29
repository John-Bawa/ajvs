export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      issues: {
        Row: {
          created_at: string
          id: string
          is_current: boolean | null
          number: number
          published_date: string | null
          title: string | null
          volume: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_current?: boolean | null
          number: number
          published_date?: string | null
          title?: string | null
          volume: number
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          is_current?: boolean | null
          number?: number
          published_date?: string | null
          title?: string | null
          volume?: number
          year?: number
        }
        Relationships: []
      }
      manuscript_authors: {
        Row: {
          author_order: number
          created_at: string
          email: string
          full_name: string
          id: string
          institution: string
          is_corresponding: boolean | null
          manuscript_id: string
          orcid: string | null
        }
        Insert: {
          author_order: number
          created_at?: string
          email: string
          full_name: string
          id?: string
          institution: string
          is_corresponding?: boolean | null
          manuscript_id: string
          orcid?: string | null
        }
        Update: {
          author_order?: number
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          institution?: string
          is_corresponding?: boolean | null
          manuscript_id?: string
          orcid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "manuscript_authors_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscripts"
            referencedColumns: ["id"]
          },
        ]
      }
      manuscripts: {
        Row: {
          abstract: string
          assigned_editor_id: string | null
          conflict_statement: string | null
          cover_letter: string | null
          created_at: string
          doi: string | null
          funding_statement: string | null
          id: string
          issue_id: string | null
          keywords: string[] | null
          manuscript_file_path: string | null
          manuscript_type: string
          serial_id: string | null
          status: Database["public"]["Enums"]["manuscript_status"]
          subject_area: string
          submission_date: string | null
          submitting_author_id: string
          suggested_reviewers: string | null
          title: string
          updated_at: string
        }
        Insert: {
          abstract: string
          assigned_editor_id?: string | null
          conflict_statement?: string | null
          cover_letter?: string | null
          created_at?: string
          doi?: string | null
          funding_statement?: string | null
          id?: string
          issue_id?: string | null
          keywords?: string[] | null
          manuscript_file_path?: string | null
          manuscript_type: string
          serial_id?: string | null
          status?: Database["public"]["Enums"]["manuscript_status"]
          subject_area: string
          submission_date?: string | null
          submitting_author_id: string
          suggested_reviewers?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          abstract?: string
          assigned_editor_id?: string | null
          conflict_statement?: string | null
          cover_letter?: string | null
          created_at?: string
          doi?: string | null
          funding_statement?: string | null
          id?: string
          issue_id?: string | null
          keywords?: string[] | null
          manuscript_file_path?: string | null
          manuscript_type?: string
          serial_id?: string | null
          status?: Database["public"]["Enums"]["manuscript_status"]
          subject_area?: string
          submission_date?: string | null
          submitting_author_id?: string
          suggested_reviewers?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "manuscripts_assigned_editor_id_fkey"
            columns: ["assigned_editor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manuscripts_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manuscripts_submitting_author_id_fkey"
            columns: ["submitting_author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          institution: string | null
          orcid: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          institution?: string | null
          orcid?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          institution?: string | null
          orcid?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      published_articles: {
        Row: {
          created_at: string
          id: string
          issue_id: string
          manuscript_id: string
          pages: string | null
          pdf_path: string
          published_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_id: string
          manuscript_id: string
          pages?: string | null
          pdf_path: string
          published_date: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_id?: string
          manuscript_id?: string
          pages?: string | null
          pdf_path?: string
          published_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "published_articles_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "published_articles_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscripts"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comments_to_author: string | null
          comments_to_editor: string | null
          created_at: string
          decision: Database["public"]["Enums"]["review_decision"] | null
          id: string
          manuscript_id: string
          reviewer_id: string
          score_clarity: number | null
          score_methodology: number | null
          score_novelty: number | null
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          comments_to_author?: string | null
          comments_to_editor?: string | null
          created_at?: string
          decision?: Database["public"]["Enums"]["review_decision"] | null
          id?: string
          manuscript_id: string
          reviewer_id: string
          score_clarity?: number | null
          score_methodology?: number | null
          score_novelty?: number | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          comments_to_author?: string | null
          comments_to_editor?: string | null
          created_at?: string
          decision?: Database["public"]["Enums"]["review_decision"] | null
          id?: string
          manuscript_id?: string
          reviewer_id?: string
          score_clarity?: number | null
          score_methodology?: number | null
          score_novelty?: number | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      manuscript_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "revision_requested"
        | "revised"
        | "accepted"
        | "rejected"
        | "published"
      review_decision: "accept" | "minor_revision" | "major_revision" | "reject"
      user_role:
        | "super_admin"
        | "secretary"
        | "editor"
        | "section_editor"
        | "reviewer"
        | "author"
        | "reader"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      manuscript_status: [
        "draft",
        "submitted",
        "under_review",
        "revision_requested",
        "revised",
        "accepted",
        "rejected",
        "published",
      ],
      review_decision: ["accept", "minor_revision", "major_revision", "reject"],
      user_role: [
        "super_admin",
        "secretary",
        "editor",
        "section_editor",
        "reviewer",
        "author",
        "reader",
      ],
    },
  },
} as const
