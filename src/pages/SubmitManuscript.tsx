import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { MultiStepSubmission } from "@/components/submissions/MultiStepSubmission";

const SubmitManuscript = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <MultiStepSubmission />
      <Footer />
    </div>
  );
};

export default SubmitManuscript;
