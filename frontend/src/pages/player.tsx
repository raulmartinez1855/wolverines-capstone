import { Layout } from "@/components/Layout/Layout";
import PlayerDropDownForm from "@/components/Forms/PlayerDropDownForm";

export default function PlayerModelPage() {
  return (
    <Layout>
      <div className="flex justify-center">
        <PlayerDropDownForm />
      </div>
    </Layout>
  );
}
