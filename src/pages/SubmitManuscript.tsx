import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { FileText, Upload } from "lucide-react";

const SubmitManuscript = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    keywords: "",
    subjectArea: "",
    manuscriptType: "original_research",
    coverLetter: "",
    suggestedReviewers: "",
    fundingStatement: "",
    conflictStatement: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.from("manuscripts").insert({
        title: formData.title,
        abstract: formData.abstract,
        keywords: formData.keywords.split(",").map((k) => k.trim()),
        subject_area: formData.subjectArea,
        manuscript_type: formData.manuscriptType,
        submitting_author_id: user.id,
        cover_letter: formData.coverLetter,
        suggested_reviewers: formData.suggestedReviewers,
        funding_statement: formData.fundingStatement,
        conflict_statement: formData.conflictStatement,
        status: "draft",
      });

      if (error) throw error;

      toast.success("Manuscript saved as draft!");
      navigate("/manuscripts");
    } catch (error: any) {
      toast.error(error.message || "Failed to save manuscript");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Submit Manuscript</h1>
            <p className="text-muted-foreground">
              Provide the details of your research manuscript for submission
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Manuscript Information
                </CardTitle>
                <CardDescription>Core details about your manuscript</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Manuscript Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter the full title of your manuscript"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Manuscript Type *</Label>
                  <Select
                    value={formData.manuscriptType}
                    onValueChange={(value) => setFormData({ ...formData, manuscriptType: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original_research">Original Research</SelectItem>
                      <SelectItem value="review">Review Article</SelectItem>
                      <SelectItem value="case_report">Case Report</SelectItem>
                      <SelectItem value="short_communication">Short Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Area *</Label>
                  <Select
                    value={formData.subjectArea}
                    onValueChange={(value) => setFormData({ ...formData, subjectArea: value })}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical_sciences">Clinical Sciences</SelectItem>
                      <SelectItem value="animal_health">Animal Health & Diseases</SelectItem>
                      <SelectItem value="surgery">Surgery & Anesthesia</SelectItem>
                      <SelectItem value="pathology">Pathology & Diagnostics</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology & Toxicology</SelectItem>
                      <SelectItem value="reproduction">Animal Reproduction</SelectItem>
                      <SelectItem value="nutrition">Animal Nutrition</SelectItem>
                      <SelectItem value="public_health">Veterinary Public Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract">Abstract *</Label>
                  <Textarea
                    id="abstract"
                    placeholder="Enter your manuscript abstract (250-300 words)"
                    value={formData.abstract}
                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    rows={8}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Word count: {formData.abstract.split(" ").filter((w) => w).length}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords *</Label>
                  <Input
                    id="keywords"
                    placeholder="keyword1, keyword2, keyword3"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Separate keywords with commas (3-6 keywords)</p>
                </div>
              </CardContent>
            </Card>

            {/* Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  File Uploads
                </CardTitle>
                <CardDescription>Upload your manuscript and supporting files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    File upload functionality will be available after initial save
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Accepted formats: DOCX, PDF (max 10MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Letter</Label>
                  <Textarea
                    id="cover"
                    placeholder="Optional cover letter to the editor"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewers">Suggested Reviewers</Label>
                  <Textarea
                    id="reviewers"
                    placeholder="Suggest potential reviewers (name, institution, email)"
                    value={formData.suggestedReviewers}
                    onChange={(e) => setFormData({ ...formData, suggestedReviewers: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="funding">Funding Statement</Label>
                  <Textarea
                    id="funding"
                    placeholder="Declare any funding sources for this research"
                    value={formData.fundingStatement}
                    onChange={(e) => setFormData({ ...formData, fundingStatement: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conflict">Conflict of Interest Statement</Label>
                  <Textarea
                    id="conflict"
                    placeholder="Declare any conflicts of interest"
                    value={formData.conflictStatement}
                    onChange={(e) => setFormData({ ...formData, conflictStatement: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save as Draft"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitManuscript;
