import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const EditorialBoard = () => {
  const editorInChief = {
    name: "Prof. Ibrahim Musa Abdullahi",
    title: "Editor-in-Chief",
    affiliation: "Faculty of Veterinary Medicine, University of Jos, Nigeria",
    specialization: "Veterinary Pathology & Infectious Diseases",
    email: "editor@ajvs.org",
    bio: "Prof. Abdullahi has over 30 years of experience in veterinary pathology and has published extensively on infectious diseases in livestock across Africa.",
  };

  const managingEditor = {
    name: "Dr. Fatima Yusuf Mohammed",
    title: "Managing Editor",
    affiliation: "Faculty of Veterinary Medicine, University of Jos, Nigeria",
    specialization: "Veterinary Public Health",
    email: "managing@ajvs.org",
    bio: "Dr. Mohammed specializes in One Health approaches and zoonotic disease control in West Africa.",
  };

  const sectionEditors = [
    {
      name: "Prof. Emmanuel Chukwudi Okonkwo",
      section: "Veterinary Medicine & Surgery",
      affiliation: "University of Nigeria, Nsukka",
      email: "e.okonkwo@unn.edu.ng",
    },
    {
      name: "Dr. Aisha Bello Usman",
      section: "Animal Production & Nutrition",
      affiliation: "Ahmadu Bello University, Zaria",
      email: "a.usman@abu.edu.ng",
    },
    {
      name: "Prof. David Oluwaseun Adeyemi",
      section: "Veterinary Microbiology & Parasitology",
      affiliation: "University of Ibadan, Nigeria",
      email: "d.adeyemi@ui.edu.ng",
    },
    {
      name: "Dr. Grace Nnenna Okeke",
      section: "Veterinary Pathology & Pharmacology",
      affiliation: "University of Jos, Nigeria",
      email: "g.okeke@unijos.edu.ng",
    },
    {
      name: "Prof. James Mwangi Kariuki",
      section: "Wildlife & Conservation Medicine",
      affiliation: "University of Nairobi, Kenya",
      email: "j.kariuki@uonbi.ac.ke",
    },
  ];

  const advisoryBoard = [
    {
      name: "Prof. Sarah Cleaveland",
      affiliation: "University of Glasgow, UK",
      specialization: "One Health & Epidemiology",
    },
    {
      name: "Prof. Thumbi Mwangi",
      affiliation: "University of Nairobi, Kenya",
      specialization: "Veterinary Epidemiology",
    },
    {
      name: "Prof. Dirk Pfeiffer",
      affiliation: "City University of Hong Kong",
      specialization: "Veterinary Public Health",
    },
    {
      name: "Prof. Bassirou Bonfoh",
      affiliation: "Swiss Tropical and Public Health Institute",
      specialization: "One Health in Africa",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Editorial Board
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading experts in veterinary sciences guiding AJVS to excellence
            </p>
          </div>

          {/* Editor-in-Chief */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Editor-in-Chief</h2>
            <Card className="glass hover-lift max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 rounded-full gradient-royal mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
                    {editorInChief.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-2xl font-serif font-bold">{editorInChief.name}</h3>
                  <p className="text-primary font-semibold">{editorInChief.title}</p>
                  <p className="text-sm text-muted-foreground">{editorInChief.affiliation}</p>
                  <p className="text-sm text-muted-foreground italic">{editorInChief.specialization}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{editorInChief.bio}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${editorInChief.email}`} className="hover:underline">
                    {editorInChief.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Managing Editor */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Managing Editor</h2>
            <Card className="glass hover-lift max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 rounded-full gradient-cyan mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
                    {managingEditor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-2xl font-serif font-bold">{managingEditor.name}</h3>
                  <p className="text-primary font-semibold">{managingEditor.title}</p>
                  <p className="text-sm text-muted-foreground">{managingEditor.affiliation}</p>
                  <p className="text-sm text-muted-foreground italic">{managingEditor.specialization}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{managingEditor.bio}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${managingEditor.email}`} className="hover:underline">
                    {managingEditor.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Editors */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Section Editors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {sectionEditors.map((editor, index) => (
                <Card key={index} className="glass-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-banner flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                        {editor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-lg mb-1">{editor.name}</h3>
                        <p className="text-primary font-semibold text-sm mb-1">{editor.section}</p>
                        <p className="text-xs text-muted-foreground mb-2">{editor.affiliation}</p>
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <Mail className="w-3 h-3" />
                          <a href={`mailto:${editor.email}`} className="hover:underline">
                            {editor.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* International Advisory Board */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">International Advisory Board</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advisoryBoard.map((advisor, index) => (
                <Card key={index} className="glass-hover">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-bold text-lg mb-2">{advisor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{advisor.affiliation}</p>
                    <p className="text-sm text-primary italic">{advisor.specialization}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call for Reviewers */}
          <Card className="glass p-8 text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Join Our Reviewer Panel</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              AJVS welcomes qualified veterinary scientists to join our peer review panel. If you have expertise in veterinary sciences and wish to contribute to advancing research in Africa, please contact us.
            </p>
            <a href="mailto:editor@ajvs.org" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              <Mail className="w-4 h-4" />
              Contact Editorial Office
            </a>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialBoard;
