import { Field } from "formik";
import * as yup from "yup";
import FormStateWrapper from "./FormStateWrapper";
import SelectDropDown from "./SelectDropDown";
import { DropDownOption } from "./SelectDropDown/drop-down-styles";
import { genPlayerPredictions } from "@/utils/forms/utils";

const initialPlayerDropDownFormValues = {
  PlayerId: "",
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
        PlayerId: yup.number().required("Player Selection is required"),
      })}
      submitFn={genPlayerPredictions}
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
        name="PlayerId"
        labelCopy="Select Player"
        options={playerOptions}
        component={SelectDropDown}
      />
    </FormStateWrapper>
  );
}
