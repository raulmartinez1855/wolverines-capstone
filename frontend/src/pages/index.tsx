import { Layout } from "@/components/Layout/Layout";
import TestForm from "@/components/Forms/TestForm";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex justify-center">
        <TestForm />
      </div>
    </Layout>
  );
}
