import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, FileCheck, Users, Database, AlertTriangle } from "lucide-react";

const Policies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Journal Policies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ethical standards and publication policies guiding AJVS
            </p>
          </div>

          {/* Publication Ethics */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Publication Ethics</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AJVS is committed to maintaining the highest ethical standards in research publication. We adhere to the guidelines set by the Committee on Publication Ethics (COPE) and expect all contributors to uphold these principles.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2">Author Responsibilities</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Ensure the work is original and has not been published elsewhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Properly cite all sources and obtain permissions for reproduced material</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Include all contributors who meet authorship criteria</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Disclose all conflicts of interest and funding sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Respond promptly to reviewer and editor requests</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Reviewer Responsibilities</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Provide objective, constructive feedback in a timely manner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Maintain confidentiality of reviewed manuscripts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Declare conflicts of interest and decline review when appropriate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Report suspected ethical violations to the editor</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Editorial Responsibilities</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Ensure fair, unbiased, and timely peer review process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Make publication decisions based solely on scientific merit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Maintain confidentiality of submissions and reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Investigate and address allegations of misconduct</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plagiarism Policy */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Plagiarism and Originality</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AJVS has a zero-tolerance policy toward plagiarism. All submitted manuscripts are screened using plagiarism detection software before peer review.
                </p>
                
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
                  <h3 className="font-semibold text-destructive mb-2">Detection and Consequences</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Manuscripts with similarity index greater than 20% are rejected without review</li>
                    <li>• Similarity index 15-20% requires major revisions and resubmission</li>
                    <li>• Proven plagiarism may result in author ban and institutional notification</li>
                  </ul>
                </div>

                <div className="space-y-2 text-muted-foreground text-sm">
                  <p><strong>What constitutes plagiarism:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Copying text without proper attribution</li>
                    <li>• Paraphrasing without citation</li>
                    <li>• Self-plagiarism (republishing own work without disclosure)</li>
                    <li>• Image or data duplication without permission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Authorship Policy */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Authorship and Contributions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Authorship must be based on substantial contributions to the work. All authors must approve the final manuscript and agree to be accountable for its content.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Criteria for Authorship</h3>
                    <p className="text-sm text-muted-foreground mb-2">All authors must meet ALL of the following criteria:</p>
                    <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                      <li>Substantial contributions to conception, design, data acquisition, or analysis</li>
                      <li>Drafting or critically revising the manuscript for intellectual content</li>
                      <li>Final approval of the version to be published</li>
                      <li>Agreement to be accountable for all aspects of the work</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Non-Author Contributors</h3>
                    <p className="text-sm text-muted-foreground">
                      Individuals who contributed but do not meet authorship criteria should be acknowledged with their permission. This includes technical assistance, writing assistance, or general support.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Corresponding Author</h3>
                    <p className="text-sm text-muted-foreground">
                      The corresponding author is responsible for communication with the journal, obtaining co-author approvals, and ensuring accuracy of author information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Availability */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Data Availability and Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AJVS encourages authors to make research data publicly available whenever possible. Data supporting published findings should be accessible to enable verification and reuse.
                </p>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>Data Availability Statement Required:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Where data is available (repository, supplementary files, on request)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Any restrictions on data access (ethical, commercial, privacy)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Accession numbers for deposited data (GenBank, etc.)</span>
                    </li>
                  </ul>

                  <p className="mt-4"><strong>Recommended Repositories:</strong> Figshare, Dryad, Zenodo, discipline-specific repositories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conflict of Interest */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Conflict of Interest</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All authors must disclose any financial or non-financial interests that could inappropriately influence or bias the work.
                </p>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>Examples of conflicts to disclose:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Employment, consultancies, stock ownership, honoraria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Paid expert testimony, patents, registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Grants or other funding (including article processing charges)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Personal relationships, academic competition</span>
                    </li>
                  </ul>

                  <p className="mt-4">If no conflicts exist, authors must state: "The authors declare no competing interests."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Licensing */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-serif font-bold mb-4">Copyright and Licensing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AJVS operates under an open-access model. Published articles are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0), allowing free use with proper attribution.
            </p>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>CC BY 4.0 allows:</strong> Sharing, copying, redistributing, and adapting the material for any purpose, including commercially, as long as appropriate credit is given.
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Authors retain copyright of their work. By submitting to AJVS, authors grant the journal first publication rights and agree to the CC BY 4.0 license.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;
