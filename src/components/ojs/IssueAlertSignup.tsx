import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reader signup for new-issue email alerts.
 * Stores only the email address — no names or other personal data.
 */
export const IssueAlertSignup = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("alert_subscribers").insert({ email: value });
    if (error) {
      if (error.code === "23505") {
        setStatus("done");
        setMessage("You're already on the list — we'll email you when a new issue publishes.");
      } else {
        setStatus("error");
        setMessage("Could not save your email right now. Please try again.");
      }
    } else {
      setStatus("done");
      setMessage("You're subscribed. We'll email you when a new AJVS issue publishes.");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-border bg-card p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-sm border border-border bg-card ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="flex items-center gap-2.5">
        <Bell className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <h3 className="font-serif text-lg font-semibold">New issue alerts</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Get an email when a new AJVS issue publishes. We store only your email address.
      </p>
      <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => { setEmail(event.target.value); if (status === "error") setStatus("idle"); }}
          placeholder="you@example.com"
          aria-label="Email address for new issue alerts"
          className="h-11 flex-1"
        />
        <Button type="submit" disabled={status === "loading"} className="rounded-sm">
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
          Notify me
        </Button>
      </form>
      {status === "error" && <p className="mt-2 text-sm font-medium text-destructive">{message}</p>}
    </div>
  );
};
