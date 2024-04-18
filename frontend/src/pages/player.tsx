import PlayerDropDownForm from "@/components/Forms/PlayerDropDownForm";
import { DropDownOption } from "@/components/Forms/SelectDropDown/drop-down-styles";
import { Layout } from "@/components/Layout/Layout";
import {
  FormDropDownOptionValues,
  getDropDownFormOpts,
} from "@/utils/forms/utils";

export const getStaticProps = async () => {
  const options: FormDropDownOptionValues = await getDropDownFormOpts();
  return { props: { options: options.players } };
};

export default function PlayerModelPage({
  options,
}: {
  options: DropDownOption[];
}) {
  return (
    <Layout>
      <div className="flex justify-center">
        <PlayerDropDownForm playerOptions={options} />
      </div>
    </Layout>
  );
}
