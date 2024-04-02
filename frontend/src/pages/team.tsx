import { Layout } from "@/components/Layout/Layout";
import TestForm from "@/components/Forms/PlayerDropDownForm";

export default function TeamPage() {
  return (
    <Layout>
      <div className=" text-white">
        <h2 className="text-2xl mb-[1.6rem]">Team Members</h2>
        <div className="text-[1.6rem]">Yash Dave</div>
        <div className="text-[1.6rem]">Jeffrey Jones</div>
        <div className="text-[1.6rem]">Raul Martinez</div>
      </div>
    </Layout>
  );
}
