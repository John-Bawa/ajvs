import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reviewer pool expression of interest.
 * Records name, email, affiliation and expertise areas so the editorial
 * office can invite suitable reviewers through OJS.
 */
export const ReviewerInterestForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [expertise, setExpertise] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    const aff = affiliation.trim();
    const areas = expertise.trim();

    if (name.length < 2 || !EMAIL_REGEX.test(mail) || areas.length < 3) {
      setStatus("error");
      setMessage("Please complete your name, a valid email address, and your areas of expertise.");
      return;
    }

    setStatus("loading");
    const { error } = await supabase.from("reviewer_interests").insert({
      full_name: name,
      email: mail,
      affiliation: aff || null,
      expertise: areas,
    });

    if (error) {
      setStatus("error");
      setMessage("Could not save your details right now. Please try again or email the editorial office.");
    } else {
      setStatus("done");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">Thank you — your interest is recorded.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The editorial office will contact you when a manuscript in your area needs a reviewer. You can also register directly on the journal's online system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <UserPlus className="h-5 w-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold">Join the reviewer pool</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell the editorial office your subject areas so we can invite you when a matching manuscript arrives.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-semibold">Full name</span>
          <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr Amina Yusuf" maxLength={120} />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-semibold">Email</span>
          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" maxLength={254} />
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className="text-sm font-semibold">Affiliation <span className="font-normal text-muted-foreground">(optional)</span></span>
          <Input value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="Department, institution, country" maxLength={200} />
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className="text-sm font-semibold">Areas of expertise</span>
          <Textarea required value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="e.g. veterinary parasitology, poultry diseases, environmental toxicology" maxLength={500} rows={3} />
        </label>
      </div>
      <Button type="submit" disabled={status === "loading"} className="mt-5 rounded-sm">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
        Register my interest
      </Button>
      {status === "error" && <p className="mt-3 text-sm font-medium text-destructive">{message}</p>}
    </form>
  );
};
