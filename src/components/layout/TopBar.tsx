import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TopBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  if (!user) return null;

  return (
    <div className="w-full bg-secondary/30 border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-end gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground h-8">
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="text-foreground/80 hover:text-foreground h-8"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
