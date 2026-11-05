import { Link } from "react-router-dom";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";

const linkCls =
  "inline-flex min-h-[32px] items-center text-banner-foreground/75 transition-colors duration-150 hover:text-banner-foreground hover:underline";

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Journal",
    links: [
      { label: "Current Issue", to: "/current-issue" },
      { label: "Archives", to: "/archives" },
      { label: "Journal Overview", to: "/journal-overview" },
      { label: "About the Journal", to: "/about" },
      { label: "Editorial Board", to: "/editorial-board" },
      { label: "News & Blog", to: "/blog" },
    ],
  },
  {
    title: "For Authors",
    links: [
      { label: "Author Portal", to: "/author-portal" },
      { label: "Submit Manuscript", to: "/submit" },
      { label: "Author Guidelines", to: "/for-authors" },
      { label: "Call for Papers", to: "/call-for-papers" },
    ],
  },
  {
    title: "For Reviewers",
    links: [
      { label: "Peer Review", to: "/peer-review" },
      { label: "Contact Editorial Office", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Policies & Ethics", to: "/policies" },
      { label: "Terms of Use", to: "/policies" },
      { label: "Accessibility", to: "/contact" },
      { label: "System Credits", to: "/system-credits" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-banner text-banner-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-banner-foreground">{col.title}</h2>
              <ul className="space-y-1.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkCls}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-banner-foreground/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={ajvsLogo} alt="AJVS logo" loading="lazy" className="h-12 w-12 shrink-0 rounded bg-background object-contain p-1" />
            <div className="text-sm">
              <p className="font-semibold text-banner-foreground">African Journal of Veterinary Sciences</p>
              <p className="text-banner-foreground/75">
                Faculty of Veterinary Medicine, University of Jos, P.M.B 2084, Jos, Plateau State, Nigeria
              </p>
              <p className="text-banner-foreground/75">
                e-ISSN 3043-4246 ·{" "}
                <a href="mailto:editor@africanjournalvetsci.org" className="underline-offset-2 hover:text-banner-foreground hover:underline">
                  editor@africanjournalvetsci.org
                </a>
              </p>
            </div>
          </div>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="license noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded border border-banner-foreground/30 px-3 py-2 text-xs font-semibold text-banner-foreground hover:border-banner-foreground md:self-auto"
          >
            CC BY 4.0
            <span className="font-normal text-banner-foreground/75">Open access licence</span>
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-banner-foreground/15 pt-6 text-xs text-banner-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} African Journal of Veterinary Sciences.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/policies" className="hover:text-banner-foreground hover:underline">Privacy</Link>
            <Link to="/contact" className="hover:text-banner-foreground hover:underline">Contact</Link>
            <span>
              Platform design and development:{" "}
              <Link to="/system-credits" className="underline underline-offset-2 hover:text-banner-foreground">
                Data-craft Analytic Solutions Inc.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
