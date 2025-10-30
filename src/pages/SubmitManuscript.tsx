import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { OJSRedirectNotice } from "@/components/ojs/OJSRedirectNotice";
import { getOJSLink } from "@/config/ojs";

const SubmitManuscript = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <OJSRedirectNotice
          title="Manuscript Submission Portal"
          description="To submit your manuscript, you'll be redirected to our Open Journal Systems (OJS) platform where all submission and editorial workflows are managed."
          actionLabel="Go to Submission System"
          actionUrl={getOJSLink('SUBMIT_MANUSCRIPT')}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SubmitManuscript;
