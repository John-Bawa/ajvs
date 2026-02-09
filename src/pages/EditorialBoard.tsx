import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "./SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, ExternalLink, Award, Users, Globe2, User } from "lucide-react";
import { motion } from "framer-motion";
import amejiPhoto from "@/assets/ameji.jpg";
import idrisPhoto from "@/assets/idris.jpg";
import tankoPhoto from "@/assets/tanko.jpg";
import karayePhoto from "@/assets/karaye.jpg";
import calebPhoto from "@/assets/caleb.jpg";
import gosomjiPhoto from "@/assets/gosomji.jpg";
import oshaduPhoto from "@/assets/oshadu.jpg";
import asinamaiPhoto from "@/assets/asinamai.png";
import akinsolaPhoto from "@/assets/akinsola.jpg";
import omoniwaPhoto from "@/assets/omoniwa.jpg";
import clementPhoto from "@/assets/clement.jpg";
import fasinaPhoto from "@/assets/fasina.jpg";
import bamaiyiPhoto from "@/assets/bamaiyi.jpg";
import adeyeyePhoto from "@/assets/adeyeye.jpg";
import lukaPamPhoto from "@/assets/luka-pam.jpg";
import gywaDemePhoto from "@/assets/gywa-deme.jpg";
import latiffahHassanPhoto from "@/assets/latiffah-hassan.jpg";
import georgeGurunyenPhoto from "@/assets/george-gurumyen.jpg";
import emikpePhoto from "@/assets/emikpe.jpg";
import lombinPhoto from "@/assets/lombin.jpg";
import musinguziPhoto from "@/assets/musinguzi.jpg";
import ababaPhoto from "@/assets/ababa.jpg";

const EditorialBoard = () => {
  const editorInChief = {
    name: "Dr Musinguzi Simon Peter",
    title: "Editor-in-Chief",
    affiliation: "Department of Agriculture and Animal Production, Kyambogo University, Kampala, Uganda",
    email: "spmusinguzi@kyu.ac.ug",
    phone: "+256770700846",
    orcid: "0000-0003-0050-1043",
    photo: musinguziPhoto,
  };

  const coEditorInChief = {
    name: "Prof. Adeyeye, Adewale A.",
    title: "Co-Editor in-Chief",
    affiliation: "Usmanu Danfodio University Sokoto, Sokoto, Nigeria",
    email: "ayo4wale@hotmail.com",
    phone: "+2348032859940",
    photo: adeyeyePhoto,
  };

  const deputyEditorInChief = {
    name: "Dr. Ameji, Negedu Onogu",
    title: "Deputy Editor-in-Chief",
    affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
    email: "amejio@unijos.edu.ng",
    phone: "+234 8035907570",
    orcid: "0000-0002-1052-2799",
  };

  const managingEditor = {
    name: "Dr. Idris Ayodeji Azeez",
    title: "Managing Editor",
    affiliation: "Department of Veterinary Anatomy, University of Jos, Nigeria",
    email: "azeezi@unijos.edu.ng",
    phone: "+234 8034493343",
    orcid: "0000-0001-5848-1395",
  };

  const associateEditors = [
    {
      name: "Dr Gywa Gideon Deme",
      affiliation: "Department of Biology, Case West Reserve University, USA",
      email: "gxg277@case.edu",
      phone: "+12163014385",
      photo: gywaDemePhoto,
    },
    {
      name: "Dr. Akinsola Oludayo M.",
      affiliation: "Department of Theriogenology and Production, University of Jos, Nigeria",
      email: "akinsolao@unijos.edu.ng",
      phone: "+2348022831192",
      orcid: "0000-0003-3981-5672",
      photo: akinsolaPhoto,
    },
    {
      name: "Dr Mohamed Abdelrahman",
      affiliation: "Department of Veterinary Public Health, Somali National University, Mogadishu, Somalia",
      email: "aamin33@gmail.com",
      phone: "+252619555575",
    },
    {
      name: "Dr Omoniwa David Oludare",
      affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
      email: "omoniwad@unijos.edu.ng",
      phone: "+2348032765952",
      orcid: "0000-0002-9485-2081",
      photo: omoniwaPhoto,
    },
    {
      name: "Prof. Pita Justin",
      affiliation: "Universite Felix Houphouet-Boigny, Abidjan, Cote d'Ivoire",
      email: "justin.pita@wave-centre.org",
      phone: "+2250544825605",
    },
    {
      name: "Dr Karaye Gloria Pisha",
      affiliation: "Department of Veterinary Medicine, University of Jos, Nigeria",
      email: "karayeg@unijos.edu.ng",
      phone: "+2348060926642",
      photo: karayePhoto,
    },
    {
      name: "Dr Bitrus Asinamai A.",
      affiliation: "Department of Veterinary Microbiology, University of Jos, Nigeria",
      email: "bitrusaa@unijos.edu.ng",
      phone: "+2348065680664",
      orcid: "0000-0002-8649-4798",
      photo: asinamaiPhoto,
    },
    {
      name: "Dr Polycarp Tanko",
      affiliation: "Department of Veterinary Pathology, University of Jos, Nigeria",
      email: "polycarpt@unijos.edu.ng",
      phone: "+2348141215527",
      orcid: "0000-0003-1459-2564",
      photo: tankoPhoto,
    },
    {
      name: "Dr Gosomji Innocent",
      affiliation: "Department of Veterinary Anatomy, University of Jos, Nigeria",
      email: "gosomjii@unijos.edu.ng",
      phone: "+2348136070134",
      orcid: "0000-0002-8727-3217",
      photo: gosomjiPhoto,
    },
    {
      name: "Dr Oshadu David Omagbe",
      affiliation: "Department of Veterinary Parasitology and Entomology, University of Jos, Nigeria",
      email: "oshadud@unijos.edu.ng",
      phone: "+2347031581671",
      orcid: "0000-0002-1403-6077",
      photo: oshaduPhoto,
    },
    {
      name: "Dr Alidehou Jerrold Agbankpe",
      affiliation: "Bacteriology Unit, Institut Pasteur de Guinea, Guinea-Conakry",
      email: "Jerrold.Agbankpe@pasteur-guinee.org",
      phone: "+224613006363",
    },
    {
      name: "Dr Chidiebere Uchendu",
      affiliation: "Department of Veterinary Pharmarcology and Toxicology, University of Jos, Nigeria",
      email: "uchenduc@unijos.edu.ng",
      phone: "+2348063234452",
    },
    {
      name: "Dr. Meseko Clement A.",
      affiliation: "National Veterinary Research Institute, Vom, Plateau State, Nigeria",
      email: "Clement.meseko@nvri.gov.ng",
      phone: "+2348039183988",
      orcid: "0000-0001-7003-7528",
      photo: clementPhoto,
    },
    {
      name: "Dr Luka Pam",
      affiliation: "Viral Research Unit, National Veterinary Research Institute (NVRI), Vom, Plateau State, Nigeria",
      email: "pamluka08@gmail.com",
      orcid: "0000-0002-6170-4242",
      photo: lukaPamPhoto,
    },
    {
      name: "Dr George Yilzem Gurumyen",
      affiliation: "Department of Veterinary Pathology, University of Jos, Nigeria",
      email: "yilzemg@gmail.com",
      phone: "+2348030639783",
      orcid: "0000-0001-6389-8573",
      photo: georgeGurunyenPhoto,
    },
    {
      name: "Dr James Andrew Ababa",
      affiliation: "Department of Veterinary Surgery & Radiology, University of Jos, Nigeria",
      email: "Jamesan@unijos.edu.ng",
      phone: "+2347039762476",
      orcid: "0000-0003-1227-0684",
      photo: ababaPhoto,
    },
  ];

  const advisoryBoard = [
    {
      name: "Prof. Lombin, Lami H.",
      affiliation: "Veterinary Teaching Hospital, University of Jos, Nigeria",
      email: "lombinl@unijos.edu.ng",
      phone: "+2348037150272",
      photo: lombinPhoto,
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
      photo: bamaiyiPhoto,
    },
    {
      name: "Prof. Fasina, Folorunsho O.",
      affiliation: "Food and Agriculture Organisation (ECTAD-FAO), Nairobi, Kenya",
      email: "daydupe2003@yahoo.co.uk",
      phone: "+255686132852",
      orcid: "0000-0003-3088-8752",
      photo: fasinaPhoto,
    },
    {
      name: "Prof. Olapade, James O.",
      affiliation: "Veterinary Teaching Hospital, University of Ibadan, Nigeria",
      email: "jkayodeolapade@yahoo.com",
      phone: "+2348023860829",
    },
    {
      name: "Prof. Dr. Latiffah Hassan, DVM, PhD",
      affiliation: "Department of Public Health, College of Health Sciences, University of Missouri, USA",
      email: "latiffahhassan@health.missouri.edu",
      photo: latiffahHassanPhoto,
    },
    {
      name: "Prof. Kudi, Caleb A.",
      affiliation: "Department of Veterinary Medicine, Ahmadu Bello University, Zaria, Nigeria",
      email: "calebkudi@hotmail.com",
      phone: "+2348065978003",
      orcid: "0000-0001-8229-9795",
      photo: calebPhoto,
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
    {
      name: "Prof. Emikpe Benjamin O.",
      affiliation: "Kwame Nkrumah University of Science and Technology, Kumasi, Ghana",
      email: "benemikpegwac@gmail.com",
      phone: "+233549410841",
      photo: emikpePhoto,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Editorial Board"
        description="Meet the distinguished Editorial Board of the African Journal of Veterinary Sciences (AJVS). Our international team of veterinary science experts ensures the highest standards of peer review and scientific excellence."
        canonicalUrl="https://africanjournalvetsci.org/editorial-board"
        keywords={["editorial board", "journal editors", "veterinary scientists", "peer reviewers", "academic editors", "AJVS editors"]}
        breadcrumbs={[
          { name: "Home", url: "https://africanjournalvetsci.org" },
          { name: "Editorial Board", url: "https://africanjournalvetsci.org/editorial-board" }
        ]}
      />
      <Header />

      <main className="flex-1 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section - Academic Style */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Editorial Board
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Distinguished scholars guiding excellence in biomedical, environmental and veterinary sciences
            </p>
          </motion.div>

          {/* Section A: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="border border-border bg-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif font-bold mb-4">
                      Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-1 text-muted-foreground font-body">
                        <p className="font-semibold text-foreground">The Editor-in-Chief</p>
                        <p>African Journal of Veterinary Sciences</p>
                        <p>Faculty of Veterinary Medicine</p>
                        <p>University of Jos</p>
                        <p>P.M.B 2084, Jos, Plateau State</p>
                        <p>Nigeria</p>
                      </div>
                      <div className="space-y-3">
                        <a
                          href="mailto:editor@africanjournalvetsci.org"
                          className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                          </div>
                          <span className="font-medium">editor@africanjournalvetsci.org</span>
                        </a>
                        <a
                          href="mailto:ajvsc@unijos.edu.ng"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors mt-2"
                        >
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                          </div>
                          <span className="font-medium">ajvsc@unijos.edu.ng</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-serif font-bold inline-flex items-center gap-3">
              <span className="w-8 h-px bg-border"></span>
              Editorial Board Members
              <span className="w-8 h-px bg-border"></span>
            </h2>
          </motion.div>

          {/* Editor-in-Chief & Co-Editor in-Chief */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-14"
          >
            {/* Editor-in-Chief */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-serif font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wide">Editor-in-Chief</h3>
              <Card className="h-full border border-border bg-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4 overflow-hidden border-2 border-border flex-shrink-0">
                      <img 
                        src={editorInChief.photo} 
                        alt={editorInChief.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-1">{editorInChief.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 font-body min-h-[3rem]">{editorInChief.affiliation}</p>
                    <div className="space-y-1.5 text-sm">
                      <a
                        href={`mailto:${editorInChief.email}`}
                        className="flex items-center justify-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{editorInChief.email}</span>
                      </a>
                      <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {editorInChief.phone}
                      </p>
                      {editorInChief.orcid && (
                        <a
                          href={`https://orcid.org/${editorInChief.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-accent hover:text-accent/80 transition-colors"
                        >
                          <Award className="w-4 h-4" />
                          <span>ORCID: {editorInChief.orcid}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Co-Editor in-Chief */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-serif font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wide">Co-Editor in-Chief</h3>
              <Card className="h-full border border-border bg-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4 overflow-hidden border-2 border-border flex-shrink-0">
                      <img 
                        src={coEditorInChief.photo} 
                        alt={coEditorInChief.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-1">{coEditorInChief.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 font-body min-h-[3rem]">{coEditorInChief.affiliation}</p>
                    <div className="space-y-1.5 text-sm">
                      <a
                        href={`mailto:${coEditorInChief.email}`}
                        className="flex items-center justify-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{coEditorInChief.email}</span>
                      </a>
                      <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {coEditorInChief.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Deputy Editor-in-Chief & Managing Editor */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-14"
          >
            {/* Deputy Editor-in-Chief */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-serif font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wide">Deputy Editor-in-Chief</h3>
              <Card className="h-full border border-border bg-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4 overflow-hidden border-2 border-border flex-shrink-0">
                      <img 
                        src={amejiPhoto} 
                        alt={deputyEditorInChief.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-1">{deputyEditorInChief.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 font-body min-h-[3rem]">{deputyEditorInChief.affiliation}</p>
                    <div className="space-y-1.5 text-sm">
                      <a
                        href={`mailto:${deputyEditorInChief.email}`}
                        className="flex items-center justify-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{deputyEditorInChief.email}</span>
                      </a>
                      <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {deputyEditorInChief.phone}
                      </p>
                      <a
                        href={`https://orcid.org/${deputyEditorInChief.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        ORCID: {deputyEditorInChief.orcid}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Managing Editor */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-serif font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wide">Managing Editor</h3>
              <Card className="h-full border border-border bg-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4 overflow-hidden border-2 border-border flex-shrink-0">
                      <img 
                        src={idrisPhoto} 
                        alt={managingEditor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-1">{managingEditor.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 font-body min-h-[3rem]">{managingEditor.affiliation}</p>
                    <div className="space-y-1.5 text-sm">
                      <a
                        href={`mailto:${managingEditor.email}`}
                        className="flex items-center justify-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{managingEditor.email}</span>
                      </a>
                      <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {managingEditor.phone}
                      </p>
                      <a
                        href={`https://orcid.org/${managingEditor.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        ORCID: {managingEditor.orcid}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Associate Editors */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold mb-2">Associate Editors</h2>
              <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-banner mx-auto rounded-full" />
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {associateEditors.map((editor, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-hover h-full border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex flex-col items-center text-center h-full">
                        <motion.div
                          whileHover={{ rotate: editor.photo ? 0 : 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-20 h-20 md:w-24 md:h-24 rounded-full mb-3 shadow-lg flex-shrink-0 ${
                            editor.photo 
                              ? 'overflow-hidden' 
                              : 'bg-primary/20 dark:bg-primary/30 flex items-center justify-center'
                          }`}
                        >
                          {editor.photo ? (
                            <img 
                              src={editor.photo} 
                              alt={editor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
                          )}
                        </motion.div>
                        <h3 className="font-serif font-bold text-base mb-1 min-h-[2.5rem] flex items-center">{editor.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3 min-h-[2.5rem] line-clamp-2">{editor.affiliation}</p>
                        <div className="space-y-2 w-full">
                          <motion.a
                            whileHover={{ x: 3 }}
                            href={`mailto:${editor.email}`}
                            className="flex items-center justify-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{editor.email}</span>
                          </motion.a>
                          {editor.phone && (
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                              <Phone className="w-3 h-3" />
                              {editor.phone}
                            </p>
                          )}
                          {editor.orcid && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={`https://orcid.org/${editor.orcid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              ORCID: {editor.orcid}
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Editorial Board Advisers */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold mb-2">Editorial Board Advisers</h2>
              <div className="h-0.5 w-20 bg-gradient-to-r from-banner to-primary mx-auto rounded-full" />
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {advisoryBoard.map((advisor, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-hover h-full border border-banner/20 hover:border-banner/40 transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex flex-col items-center text-center h-full">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-20 h-20 md:w-24 md:h-24 rounded-full mb-3 shadow-lg flex-shrink-0 ${
                            advisor.photo 
                              ? 'overflow-hidden' 
                              : 'bg-accent/20 dark:bg-accent/30 flex items-center justify-center'
                          }`}
                        >
                          {advisor.photo ? (
                            <img 
                              src={advisor.photo} 
                              alt={advisor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 md:w-12 md:h-12 text-accent" strokeWidth={1.5} />
                          )}
                        </motion.div>
                        <h3 className="font-serif font-bold text-sm mb-1.5 min-h-[2.5rem] flex items-center">{advisor.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3 min-h-[3rem] line-clamp-3 leading-relaxed">{advisor.affiliation}</p>
                        <div className="space-y-2 w-full">
                          <motion.a
                            whileHover={{ x: 3 }}
                            href={`mailto:${advisor.email}`}
                            className="flex items-center justify-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{advisor.email}</span>
                          </motion.a>
                          {advisor.phone && (
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                              <Phone className="w-3 h-3" />
                              {advisor.phone}
                            </p>
                          )}
                          {advisor.orcid && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={`https://orcid.org/${advisor.orcid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              ORCID: {advisor.orcid}
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Call for Reviewers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-hover border-2 border-primary/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-banner/10 pointer-events-none" />
              <CardContent className="p-12 text-center relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center"
                >
                  <Award className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold mb-4">Join Our Reviewer Panel</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  AJVS welcomes qualified veterinary scientists to join our peer review panel. If you have expertise in
                  veterinary sciences and wish to contribute to advancing research in Africa, please contact us.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:editor@africanjournalvetsci.org"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Contact Editorial Office
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialBoard;
