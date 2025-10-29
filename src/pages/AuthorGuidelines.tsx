import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthorGuidelines = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Author Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Essential information for submitting your manuscript to AJVS
            </p>
          </div>

          {/* Manuscript Types */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Manuscript Types</h2>
                <p className="text-muted-foreground mb-4">AJVS accepts the following types of submissions:</p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Original Research Articles</h3>
                    <p className="text-sm text-muted-foreground">Full-length research reports (4,000-6,000 words). Should present novel findings with comprehensive methodology, results, and discussion.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Review Articles</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive syntheses of current knowledge (5,000-8,000 words). Must provide critical analysis and identify research gaps.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Short Communications</h3>
                    <p className="text-sm text-muted-foreground">Brief reports of preliminary or focused findings (1,500-2,500 words). Suitable for rapid dissemination of significant observations.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Case Reports</h3>
                    <p className="text-sm text-muted-foreground">Clinical cases with educational value (1,000-2,000 words). Must include detailed case presentation and relevant literature review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manuscript Preparation */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Manuscript Preparation
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">File Format</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Submit manuscripts in Microsoft Word (.docx) or PDF format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Use Times New Roman font, 12-point, double-spaced throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Include line numbers for ease of review</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Structure</h3>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li><strong>Title Page:</strong> Title, author names, affiliations, ORCID IDs, corresponding author details</li>
                  <li><strong>Abstract:</strong> Structured abstract (Background, Methods, Results, Conclusions) max 300 words</li>
                  <li><strong>Keywords:</strong> 4-6 keywords relevant to the manuscript</li>
                  <li><strong>Introduction:</strong> Background, rationale, and objectives</li>
                  <li><strong>Materials and Methods:</strong> Detailed methodology allowing reproducibility</li>
                  <li><strong>Results:</strong> Clear presentation of findings with tables and figures</li>
                  <li><strong>Discussion:</strong> Interpretation, comparison with literature, limitations</li>
                  <li><strong>Conclusion:</strong> Main findings and implications</li>
                  <li><strong>Acknowledgments:</strong> Funding sources, contributors</li>
                  <li><strong>References:</strong> Follow APA 7th edition style</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">References</h3>
                <p className="text-muted-foreground mb-2">Use APA 7th edition style. Examples:</p>
                <div className="p-4 bg-secondary/50 rounded-lg font-mono text-xs space-y-2">
                  <p>Journal: Smith, J. A., & Jones, M. B. (2020). Title of article. <em>Journal Name</em>, 15(3), 234-250. https://doi.org/10.xxxx</p>
                  <p>Book: Brown, R. (2019). <em>Title of book</em> (2nd ed.). Publisher.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ethical Requirements */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-royal flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              Ethical Requirements
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h3 className="font-semibold text-destructive mb-2">Plagiarism Policy</h3>
                <p className="text-sm">All submissions are screened for plagiarism. Manuscripts with similarity index greater than 20% will be rejected. Authors must ensure originality and proper citation of all sources.</p>
              </div>

              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Ethics Approval:</strong> Research involving animals must have ethics committee approval. Include approval number in Methods section.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Informed Consent:</strong> For case reports involving client-owned animals, obtain written consent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Conflict of Interest:</strong> Declare all financial and non-financial competing interests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Data Availability:</strong> State where supporting data can be accessed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Authorship:</strong> All listed authors must have made substantial contributions and approved the final manuscript.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Submission Process */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6">Submission Process</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-cyan flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Register/Login</h3>
                  <p className="text-sm text-muted-foreground">Create an account or log in. ORCID registration is required for all authors.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-royal flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Prepare Manuscript</h3>
                  <p className="text-sm text-muted-foreground">Follow formatting guidelines. Prepare figures and supplementary materials separately.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-cyan flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Submit Online</h3>
                  <p className="text-sm text-muted-foreground">Complete the online submission form with all required metadata.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-royal flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Pay Article Processing Charge (APC)</h3>
                  <p className="text-sm text-muted-foreground">NGN 50,000 (approx. USD 125) via Paystack. Payment after acceptance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Peer Review */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Peer Review Process</h2>
            <p className="text-muted-foreground mb-4">
              AJVS operates a double-blind peer review system. Manuscripts are reviewed by at least two independent experts. Average time from submission to first decision is 4-6 weeks.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-secondary/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary mb-1">4-6 weeks</div>
                <div className="text-sm text-muted-foreground">First Decision</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary mb-1">2-3 weeks</div>
                <div className="text-sm text-muted-foreground">Revision Review</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary mb-1">1-2 weeks</div>
                <div className="text-sm text-muted-foreground">Online Publication</div>
              </div>
            </div>
          </div>

          {/* Download Template */}
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Download Resources</h2>
            <p className="text-muted-foreground mb-6">Get our manuscript template and cover letter template to get started</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Manuscript Template
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Cover Letter Template
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorGuidelines;
