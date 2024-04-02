import ManualSubmissionForm from "@/components/Forms/ManualSubmissionForm";
import { Layout } from "@/components/Layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex justify-center">
        <ManualSubmissionForm />
      </div>
    </Layout>
  );
}
