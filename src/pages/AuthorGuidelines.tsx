import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { FileText, CheckCircle, AlertCircle, Download, BookOpen, Shield, Users, DollarSign, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthorGuidelines = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <SEOHead
        title="Author Guidelines"
        description="Comprehensive guidelines for preparing and submitting manuscripts to the African Journal of Veterinary Sciences (AJVS). Learn about manuscript formatting, submission requirements, ethical guidelines, and publication fees."
        canonicalUrl="https://africanjournalvetsci.org/for-authors"
        keywords={["author guidelines", "manuscript submission", "paper format", "veterinary journal submission", "publication guidelines", "peer review process"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "For Authors", url: "https://africanjournalvetsci.org/for-authors" }
        ]}
      />
      <TopBar />
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Authors' Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guidelines for preparing and submitting manuscripts to African Journal of Veterinary Sciences
            </p>
          </div>

          {/* About the Journal */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">About the Journal</h2>
                <p className="text-muted-foreground mb-4">
                  African Journal of Veterinary Sciences is published by the Faculty of Veterinary Medicine, University of Jos, Nigeria. It is a peer-reviewed, international and open access journal that publishes high-quality original research articles, reviews, short communications and case reports in all aspects of veterinary, biomedical and animal sciences. The journal publishes two issues per year and ensures that articles are made available online as soon as they are accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Scope */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Scope of the Journal</h2>
            <p className="text-muted-foreground mb-4">
              African Journal of Veterinary Sciences aims to promote the contributions of the veterinary profession and biomedical sciences in the African continent to the global hub of scientific knowledge. This objective will be achieved via publishing of original research work and articles in all aspects of veterinary, biomedical and animal sciences whose contents are novel or tailored towards contributing to scientific knowledge with high impacts and of global importance.
            </p>
            <p className="text-muted-foreground">
              The Journal welcomes original research articles, reviews, case reports, short communications and perspectives in the fields of veterinary, biomedical and animal sciences which include but not limited to anatomy, animal breeding and genetics; biochemistry and physiology; diagnostic medicine and surgery; entomology and parasitology; ecology and environmental health; immunology and vaccine development; livestock health and production; microbiology; pathology; pharmacology and toxicology; public health and preventive medicine; wild life conservation and health; among others.
            </p>
          </div>

          {/* Open Access Policy */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Open Access Policy</h2>
            <p className="text-muted-foreground">
              This journal provides immediate open access of its content on the principle that making research freely available to the public supports a greater global exchange of knowledge. However, the authors retain copyright of their work through a Creative Commons attribution license that clearly states how readers can copy, distribute, and use their attributed research, free of charge.
            </p>
          </div>

          {/* Publication Schedule */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Publication Schedule</h2>
                <p className="text-muted-foreground">
                  African Journal of Veterinary Sciences publishes two issues per year and ensures that manuscripts are made available online as soon as they are accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Policy */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Editorial Policy</h2>
            <p className="text-muted-foreground mb-4">
              African Journal of Veterinary Sciences has a distinguished Editorial Board made up of leading professionals in the fields of veterinary and biomedical sciences from around the world. All the manuscripts submitted to AJVS are subjected to a blind peer-review process. Moreover, with the presence of a robust base of international reviewers, the process of decision making on the acceptance/rejection of all submitted manuscripts will be done rapidly and to the highest standards.
            </p>
            <p className="text-muted-foreground">
              Authors must prepare their manuscripts in accordance to the Instructions for Authors of the journal. Manuscripts which do not follow the format and style of the Journal, will be returned to the authors for revision or rejected. The Journal reserves the right to make any further formal changes and language corrections necessary in a manuscript accepted for publication. Manuscripts are accepted with the understanding that the authors have not violated the ethics of research and publishing during the conduct of the experiment and writing of the manuscript.
            </p>
          </div>

          {/* Ethical Guidelines */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Ethical Guidelines for Authors, Reviewers and Editors</h2>
                <p className="text-muted-foreground mb-4">
                  The Editorial Office and all participants in the peer-review process, including Editors-in-Chief, Editorial Board Members, Guest Editors, Reviewers and Authors, take responsibility for overseeing the integrity of AJVS's editorial process.
                </p>
                <p className="text-muted-foreground mb-4">
                  If a participant in the peer-review process has ethical concerns about a manuscript sent for review or decision, or receives information about a possible ethical issue after publication, they must contact the Editorial Office as soon as possible. The Editorial Office will then conduct investigation as per the AJVS Comments and Complaints Policy and in accordance with COPE guidelines.
                </p>
                
                <h3 className="font-semibold mb-3 text-lg">Pre-Review Checks</h3>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ethical approval and permissions for research involving human subjects, animals or cell lines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Plagiarism, duplicate publication, and necessary permission from the copyright holder to include already-published figures or images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Clinical Trials Registration, and reference to the registration in the Methods Section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Other compliance and integrity checks in accordance with AJVS policies and guidelines</span>
                  </li>
                </ul>

                <h3 className="font-semibold mb-3 text-lg">Review Considerations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Any facts that might be perceived as a possible conflict of interest must be disclosed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Authors must accurately present their research findings and include an objective discussion of the significance of their findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Data and methods used in the research need to be presented in sufficient detail in the paper, so that other researchers can replicate their work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* General Requirements */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">General Requirements</h2>
            <p className="text-muted-foreground mb-4">
              All submitted manuscripts should contain original research written in English Language with the understanding that it has not been previously published nor is it under consideration for publication elsewhere. Manuscripts may be submitted for consideration as original research papers, case report, short communications, reviews and clinical data report that are relevant to the field of veterinary and biomedical sciences.
            </p>
            <p className="text-muted-foreground">
              As the journal has a multidisciplinary focus, manuscripts must be written in a manner and style that is intelligible to specialists and non-specialists alike. Contributions should therefore be written in clear and simple terminologies so that they are accessible to readers in other disciplines and those for whom English is not a first language.
            </p>
          </div>

          {/* Instructions for Authors */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6">Instructions for Authors</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Authorship</h3>
                <p className="text-muted-foreground mb-2">
                  Manuscripts are submitted on the understanding that they have been read and approved by all authors before submission. Only authors that make significant contributions to the manuscript should be listed as co-authors. Authors must ensure that the "Instructions to Authors" on the preparation of manuscript is duly followed. All authors must approve the submission and this should be clearly indicated on the cover letter.
                </p>
                <ul className="space-y-2 text-muted-foreground mt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Original research article should be the results of findings from original research that is ethically approved and not under consideration for publication elsewhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Review articles should not exceed 30,000 words</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Short communications, Letters to the Editor and correspondences should not exceed 2,000 words</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Manuscript Preparation and Submission */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 dark:bg-accent/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              Manuscript Preparation and Submission
            </h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Each manuscript submitted should be accompanied by a cover letter and signed declaration statement stating that the submitted manuscript has been seen and approved by all authors and transferring copyright ownership to African Journal of Veterinary Sciences.
              </p>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Format Requirements</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Typewritten in English, Times New Roman, font size 12</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>A4 size paper with double line spacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Normal margin page layout (at least 2.5 cm margins all around)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Microsoft® Office package (2010 or later) saved in Microsoft Word format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Figures should be high resolution (at least 300 dpi) and included after tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All measurements should be in standard international units</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Temperature should be in degree Celsius</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Article Structure</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Title Page</h4>
                    <p className="text-sm text-muted-foreground">Should be short, concise, self-explanatory and not more than 23 words. Include author names, affiliations, and institutional email of corresponding author.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Abstract</h4>
                    <p className="text-sm text-muted-foreground">Up to 300 words with 2-3 sentences introduction, one-sentence main finding, and 2-3 sentences placing findings in context. Include 5 keywords not reflected in the title.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Introduction</h4>
                    <p className="text-sm text-muted-foreground">Concise, focusing on justification, aim, specific objectives/hypothesis. Use pertinent and preferably recent references.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">4. Materials and Methods</h4>
                    <p className="text-sm text-muted-foreground">Clear technical information for replication. State study design clearly. Include statistical analysis section. Provide proof of ethical approval where appropriate.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">5. Results</h4>
                    <p className="text-sm text-muted-foreground">Concisely presented in text with well-cited tables and figures. Show trends and relationships, avoid repeating numbers from tables.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">6. Discussion</h4>
                    <p className="text-sm text-muted-foreground">Interpret significant results with concise comparison to published studies. Discuss important limitations. Avoid unnecessary repetition of results.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">7. Conclusion</h4>
                    <p className="text-sm text-muted-foreground">Clear, brief with final take-home message. Emphasize significance and implications.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">8. Acknowledgements</h4>
                    <p className="text-sm text-muted-foreground">Credit individuals and organizations that supported the work.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">9. Conflicts of Interest</h4>
                    <p className="text-sm text-muted-foreground">Must be clearly stated.</p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-semibold mb-2">10. References</h4>
                    <p className="text-sm text-muted-foreground">Follow APA 5th edition referencing style. Citations: (Pam, 2023) or Pam (2023); (Pam and Oyetunde, 2023); (Nwagu et al., 2023) or Nwagu et al. (2015).</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Authors' Contributions</h3>
                <p className="text-muted-foreground">
                  Specify contributions along the lines of: conceptualization; methodology; data collection; sample analysis; data analysis; validation; data curation; writing – the initial draft; writing – revisions; student supervision; project leadership; project management; and funding acquisition.
                </p>
              </div>
            </div>
          </div>

          {/* Plagiarism Assessment */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Plagiarism Assessment</h2>
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-muted-foreground">
                Manuscripts submitted to the editorial office will be screened for potential plagiarism before peer review using similarity detection software. All cases of suspected or alleged plagiarism are considered very seriously in accordance with the journal's Plagiarism Policy.
              </p>
            </div>
          </div>

          {/* Ethical Guidelines Section */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Ethical Guidelines</h2>
            <p className="text-muted-foreground mb-4">
              Submissions involving research conducted on human or animals must meet the highest standards regarding both the ethical consideration given and reporting of the procedures followed. All reported research involving humans or other animals must be approved by an institutional ethics committee prior to commencement of the study. Secondary use of data, also requires ethical approval. The name of the approving body and a reference number (if provided) must be included in the Methods section of the manuscript.
            </p>
          </div>

          {/* Submission for Consideration */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Submission of Manuscripts for Consideration</h2>
            <p className="text-muted-foreground">
              Manuscripts for peer review must be submitted through to the editorial office via email or the journal online management system. Please ensure that you have complied with the guidelines and completed the Publishing Agreement before you start the submission process. Submissions that are incomplete or do not comply with the instructions will be returned.
            </p>
          </div>

          {/* Peer Review Process */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Peer-Review Process</h2>
                <p className="text-muted-foreground mb-4">
                  Manuscripts are preliminarily reviewed by the editorial office for content, relevance and compliance to the AJVS format. Any manuscript that complies with the Journal format is sent to three (3) independent reviewers who are specialists in the subject area of the manuscript.
                </p>
                <p className="text-muted-foreground mb-4">
                  AJVS uses double blind review process where authors don't know who reviews their manuscript nor reviewers aware of the authors of the paper they are reviewing. The reviewers are to review and make recommendation(s) within three (3) weeks. The manuscript is accepted if any two (2) of these reviewers recommend publication subject to author(s) revision with or without correction(s). However, editorial decision is final although based on recommendations from the reviewers.
                </p>
              </div>
            </div>
          </div>

          {/* Handling and Page Charges */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 dark:bg-accent/30 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Handling and Page Charges</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Processing Fee</h3>
                    <p className="text-muted-foreground mb-2">
                      A non-refundable processing fee of <strong>Five Thousand Naira (₦5,000) or $30</strong> is to be paid along with each manuscript submitted. This fee is to be paid before a manuscript is submitted to reviewers.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Page Charge</h3>
                    <p className="text-muted-foreground">
                      For accepted articles, a fee of <strong>Seven Thousand Naira (₦7,000) or $35</strong> is charged per printed page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription and Advertisement Rates */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-6">Subscription and Advertisement Rates</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Subscription Rates</h3>
                <p className="text-muted-foreground mb-2">
                  For libraries, organizations and individuals:
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="font-semibold">₦10,000 or $20 per issue</p>
                  <p className="text-sm text-muted-foreground">(excluding freight - charged based on destination)</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Advertisement Rates</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between p-2 bg-secondary/50 rounded">
                    <span>Half inside page</span>
                    <span className="font-semibold">₦10,000 / $60</span>
                  </li>
                  <li className="flex justify-between p-2 bg-secondary/50 rounded">
                    <span>Full inside page</span>
                    <span className="font-semibold">₦20,000 / $400</span>
                  </li>
                  <li className="flex justify-between p-2 bg-secondary/50 rounded">
                    <span>Inner back page</span>
                    <span className="font-semibold">₦30,000 / $100</span>
                  </li>
                  <li className="flex justify-between p-2 bg-secondary/50 rounded">
                    <span>Back page</span>
                    <span className="font-semibold">₦50,000 / $200</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Payment Information</h2>
            <p className="text-muted-foreground mb-4">Payments can be made into:</p>
            <div className="p-6 bg-secondary/50 rounded-lg">
              <div className="space-y-2">
                <p className="text-lg font-semibold">Access Bank Plc</p>
                <p className="text-2xl font-bold text-primary">1931486112</p>
                <p className="text-muted-foreground">African Journal of Vet. Sciences</p>
              </div>
            </div>
          </div>

          {/* Accepted Manuscript */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <h2 className="text-2xl font-serif font-bold mb-4">Accepted Manuscript</h2>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-semibold mb-2">Galley Proof</h3>
              <p className="text-muted-foreground">
                PDF proof shall be sent to the corresponding author electronically. The author is expected to proof read and accept or correct the proof within 72 hours.
              </p>
            </div>
          </div>

          {/* Correspondence */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-8 hover-lift">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Correspondence</h2>
                <p className="text-muted-foreground mb-4">
                  All correspondences to the journal should be addressed to:
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg space-y-1">
                  <p className="font-semibold">Editorial Office</p>
                  <p>African Journal of Veterinary Sciences</p>
                  <p>Faculty of Veterinary Medicine</p>
                  <p>University of Jos</p>
                  <p>Plateau State</p>
                  <p className="text-primary font-semibold mt-2">E-mail: editor@africanjournalvetsci.org</p>
                  <p className="text-primary font-semibold">Alt: ajvsc@unijos.edu.ng</p>
                  <p className="text-sm mt-1">Phone: +234 8035907570</p>
                </div>
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
