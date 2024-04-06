import { Field } from "formik";
import * as yup from "yup";
import FormStateWrapper from "./FormStateWrapper";
import SelectDropDown from "./SelectDropDown";
import { DropDownOption } from "./SelectDropDown/drop-down-styles";

const initialPlayerDropDownFormValues = {
  playerName: undefined,
};

export default function PlayerDropDownForm({
  playerOptions,
}: {
  playerOptions: DropDownOption[];
}) {
  return (
    <FormStateWrapper
      initialValues={initialPlayerDropDownFormValues}
      validationSchema={yup.object({
        playerName: yup.string().required("Player Name is required"),
      })}
    >
      <h2 className="text-4xl text-white">
        Transfer Portal Prediction Model - by Player
      </h2>
      <p className="text-xl mb-[6.4rem]">
        Utilize this model to generate a transfer portal prediction for an
        individual player by name
      </p>
      <h2 className="text-2xl text-white">Search by Player</h2>
      <Field
        name="playerName"
        labelCopy="Select Player"
        options={playerOptions}
        component={SelectDropDown}
      />
    </FormStateWrapper>
  );
}
