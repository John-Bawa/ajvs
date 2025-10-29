import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type UserRole = 'super_admin' | 'secretary' | 'editor' | 'section_editor' | 'reviewer' | 'author' | 'reader';

export const useUserRoles = (user: User | null) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) throw error;
        setRoles(data?.map((r) => r.role as UserRole) || []);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  const hasRole = (role: UserRole) => roles.includes(role);
  const hasAnyRole = (checkRoles: UserRole[]) => checkRoles.some((r) => roles.includes(r));
  const isAdmin = hasAnyRole(['super_admin', 'editor', 'secretary']);
  const isEditor = hasAnyRole(['super_admin', 'editor', 'section_editor']);
  const isReviewer = hasRole('reviewer');
  const isAuthor = hasRole('author');

  return {
    roles,
    loading,
    hasRole,
    hasAnyRole,
    isAdmin,
    isEditor,
    isReviewer,
    isAuthor,
  };
};
