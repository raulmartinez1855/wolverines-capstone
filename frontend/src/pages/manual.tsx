import ManualSubmissionForm from "@/components/Forms/ManualSubmissionForm";
import { Layout } from "@/components/Layout/Layout";
import {
  DropDownFormInputFieldProps,
  getDropDownFormOpts,
} from "@/utils/forms/utils";

export const getServerSideProps = async () => {
  const { conferences, positions, seasons, teams } =
    await getDropDownFormOpts();

  const dropDownFields = [
    {
      id: "Season",
      label: "Season",
      options: seasons,
    },
    {
      id: "PositionId",
      label: "Position",
      options: positions,
    },
    { id: "TeamId", label: "Team Name", options: teams },
    {
      id: "ConferenceId",
      label: "Conference",
      options: conferences,
    },
  ];

  return { props: { dropDownFields } };
};

export default function HomePage({
  dropDownFields,
}: {
  dropDownFields: DropDownFormInputFieldProps[];
}) {
  return (
    <Layout>
      <div className="flex justify-center">
        <ManualSubmissionForm dropDownFields={dropDownFields} />
      </div>
    </Layout>
  );
}
