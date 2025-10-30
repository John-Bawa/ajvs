import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const EditorialBoard = () => {
  const editorInChief = {
    name: "Prof. Dzikwi Emmena Asabe",
    title: "Editor-in-Chief",
    affiliation: "Department of Veterinary Public Health and Preventive Medicine, University of Jos, Nigeria",
    email: "dzikwia@unijos.edu.ng",
    phone: "+234 8035912881",
  };

  const coEditorInChief = {
    name: "Dr Musinguzi Simon Peter",
    title: "Co-Editor-in-Chief",
    affiliation: "Department of Agriculture and Animal Production, Kyambogo University, Kampala, Uganda",
    email: "spmusinguzi@kyu.ac.ug",
    phone: "+256770700846",
  };

  const deputyEditorInChief = {
    name: "Dr. Ameji, Negedu Onogu",
    title: "Deputy Editor-in-Chief",
    position: "Associate Professor",
    affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
    email: "amejio@unijos.edu.ng",
    phone: "+234 8035907570",
    orcid: "0000-0002-1052-2799",
  };

  const managingEditor = {
    name: "Dr. Idris Ayodeji Azeez",
    title: "Managing Editor",
    position: "Senior Lecturer",
    affiliation: "Department of Veterinary Anatomy, University of Jos, Nigeria",
    email: "azeezi@unijos.edu.ng",
    phone: "+234 8034493343",
    orcid: "0000-0001-5848-1395",
  };

  const associateEditors = [
    {
      name: "Dr Gywa Gideon Deme",
      position: "Associate Professor",
      affiliation: "Department of Biology, Case West Reserve University, USA",
      email: "gxg277@case.edu",
      phone: "+12163014385",
    },
    {
      name: "Dr. Akinsola Oludayo M.",
      position: "Associate Professor",
      affiliation: "Department of Theriogenology and Production, University of Jos, Nigeria",
      email: "akinsolao@unijos.edu.ng",
      phone: "+2348022831192",
    },
    {
      name: "Dr Mohamed Abdelrahman",
      affiliation: "Department of Veterinary Public Health, Somali National University, Mogadishu, Somalia",
      email: "aamin33@gmail.com",
      phone: "+252619555575",
    },
    {
      name: "Dr Omoniwa David Oludare",
      position: "Senior lecturer",
      affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
      email: "omoniwad@unijos.edu.ng",
      phone: "+2348032765952",
    },
    {
      name: "Prof. Pita Justin",
      affiliation: "Universite Felix Houphouet-Boigny, Abidjan, Cote d'Ivoire",
      email: "justin.pita@wave-centre.org",
      phone: "+2250544825605",
    },
    {
      name: "Dr Karaye Gloria Pisha",
      position: "Associate professor",
      affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
      email: "karayeg@unijos.edu.ng",
      phone: "+2348060926642",
    },
    {
      name: "Dr Bitrus Asinamai A.",
      position: "Senior Lecturer",
      affiliation: "Department of Veterinary Microbiology, University of Jos, Nigeria",
      email: "bitrusaa@unijos.edu.ng",
      phone: "+2348065680664",
    },
    {
      name: "Dr Polycarp Tanko",
      position: "Associate Professor",
      affiliation: "Department of Veterinary Pathology, University of Jos, Nigeria",
      email: "polycarpt@unijos.edu.ng",
      phone: "+2348141215527",
    },
    {
      name: "Dr Gosomji Innocent",
      position: "Senior Lecturer",
      affiliation: "Department of Veterinary Anatomy, University of Jos, Nigeria",
      email: "gosomjii@unijos.edu.ng",
      phone: "+2348136070134",
    },
    {
      name: "Dr Oshadu David Omagbe",
      position: "Lecturer I",
      affiliation: "Department of Veterinary Parasitology and Entomology, University of Jos, Nigeria",
      email: "oshadud@unijos.edu.ng",
      phone: "+2347031581671",
    },
    {
      name: "Dr Alidehou Jerrold Agbankpe",
      affiliation: "Bacteriology Unit, Institut Pasteur de Guinea, Guinea-Conakry",
      email: "Jerrold.Agbankpe@pasteur-guinee.org",
      phone: "+224613006363",
    },
    {
      name: "Dr Chidiebere Uchendu",
      position: "Associate Professor",
      affiliation: "Department of Veterinary Pharmarcology and Toxicology, University of Jos, Nigeria",
      email: "ucheduc@unijos.edu.ng",
      phone: "+2348063234452",
    },
    {
      name: "Dr. Meseko Clement A.",
      position: "Associate Professor/Director of Research",
      affiliation: "National Veterinary Research Institute, Vom, Plateau State, Nigeria",
      email: "cameseko@yahoo.com",
      phone: "+2348039183988",
    },
  ];

  const advisoryBoard = [
    {
      name: "Prof. Lombin, Lami H.",
      affiliation: "Veterinary Teaching Hospital, University of Jos, Nigeria",
      email: "lombinl@unijos.edu.ng",
      phone: "+2348037150272",
    },
    {
      name: "Prof. George W. Nasinyama",
      affiliation: "Makerere University, College of Veterinary Medicine, Animal Resources and Biosecurity, Kampala, Uganda",
      email: "gwnasinyama@gmail.com",
    },
    {
      name: "Prof. Bamaiyi, Pwaveno Huladeino",
      affiliation: "Department of Veterinary Pathology and Microbiology, University of Jos, Nigeria",
      email: "bamaiyip@unijos.edu.ng",
      phone: "+ 2349035794545",
    },
    {
      name: "Prof. Fasina, Folorunsho O.",
      affiliation: "Food and Agriculture Organisation (ECTAD-FAO), Nairobi, Kenya",
      email: "daydupe2003@yahoo.co.uk",
      phone: "+255686132852",
    },
    {
      name: "Prof. Olapade, James O.",
      affiliation: "Veterinary Teaching Hospital, University of Ibadan, Nigeria",
      email: "jkayodeolapade@yahoo.com",
      phone: "+2348023860829",
    },
    {
      name: "Prof. Dr. Latiffah Hassan, DVM, PhD",
      affiliation: "Department of Veterinary Laboratory Diagnostics, Faculty of Veterinary Medicine, Universiti Putra Malaysia",
      email: "latiffah@upm.edu.my",
      phone: "+ 603-9769 3472",
    },
    {
      name: "Prof. Adeyeye, Adewale A.",
      affiliation: "Usmanu Danfodio University Sokoto, Sokoto, Nigeria",
      email: "ayo4wale@hotmail.com",
      phone: "+2348032859940",
    },
    {
      name: "Prof. Kudi, Caleb A.",
      affiliation: "Department of Veterinary Medicine, Ahmadu Bello University, Zaria, Nigeria",
      email: "calebkudi@hotmail.com",
      phone: "+2348065978003",
    },
    {
      name: "Prof. Robert W. Wills, DVM, PhD",
      affiliation: "Department of Comparative Biomedical Sciences, College of Veterinary Medicine, Mississippi State University",
      email: "Wills@cvm.msstate.edu",
    },
    {
      name: "Prof. Sudhakar Bhandare BVSc; MVSc; MSc; PhD",
      affiliation: "School of Veterinary Medicine and Science, Room B28 Veterinary Academic Building, University of Nottingham, Sutton Bonington Campus, Loughborough, Leicestershire, LE12 5RD UK",
      email: "Sudhakar.Bhandare@nottingham.ac.uk",
      phone: "0115 95 16397",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Editorial Board</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Details About the Journal
            </p>
          </div>

          {/* Section A: Contact Information */}
          <Card className="glass p-8 mb-12">
            <h2 className="text-2xl font-serif font-bold mb-4">Section A: Contact and Correspondences</h2>
            <p className="text-muted-foreground mb-2">Contact and correspondences should be sent to:</p>
            <div className="text-muted-foreground">
              <p className="font-semibold">The Editor – in – chief</p>
              <p>African Journal of Veterinary Sciences</p>
              <p>Faculty of Veterinary Medicine</p>
              <p>University of Jos,</p>
              <p>P.M.B 2084, Jos, Plateau State</p>
              <p>Nigeria</p>
              <div className="flex items-center gap-2 mt-2 text-primary">
                <Mail className="w-4 h-4" />
                <a href="mailto:AJVSc@unijos.edu.ng" className="hover:underline">
                  AJVSc@unijos.edu.ng
                </a>
              </div>
            </div>
          </Card>

          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">Section B: Editors and Editorial Board Members</h2>
          </div>

          {/* Associate Editors */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">2. Associate Editors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {associateEditors.map((editor, index) => (
                <Card key={index} className="glass-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-banner flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                        {editor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-lg mb-1">{editor.name}</h3>
                        {editor.position && (
                          <p className="text-primary font-semibold text-sm mb-1">{editor.position}</p>
                        )}
                        <p className="text-xs text-muted-foreground mb-2">{editor.affiliation}</p>
                        <div className="flex flex-col gap-1 text-xs">
                          <div className="flex items-center gap-1 text-primary">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${editor.email}`} className="hover:underline">
                              {editor.email}
                            </a>
                          </div>
                          {editor.phone && <p className="text-muted-foreground">Tel.: {editor.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Editorial Board Advisers */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">3. Editorial Board Advisers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advisoryBoard.map((advisor, index) => (
                <Card key={index} className="glass-hover">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-bold text-lg mb-2">{advisor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{advisor.affiliation}</p>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1 text-primary">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${advisor.email}`} className="hover:underline">
                          {advisor.email}
                        </a>
                      </div>
                      {advisor.phone && <p className="text-muted-foreground">Tel.: {advisor.phone}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call for Reviewers */}
          <Card className="glass p-8 text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Join Our Reviewer Panel</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              AJVS welcomes qualified veterinary scientists to join our peer review panel. If you have expertise in
              veterinary sciences and wish to contribute to advancing research in Africa, please contact us.
            </p>
            <a
              href="mailto:AJVSc@unijos.edu.ng"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
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
