import TextInput from "@/components/Forms/Inputs/TextInput";
import { Field } from "formik";
import * as yup from "yup";
import FormStateWrapper from "./FormStateWrapper";

const initalManualSubmissionFormValues = {
  catches: undefined,
  touchDowns: undefined,
};

export default function ManualSubmissionForm() {
  return (
    <FormStateWrapper
      initialValues={initalManualSubmissionFormValues}
      validationSchema={yup.object({
        catches: yup.number().required("Number of Catches is required"),
        touchDowns: yup.number().required("Number of Touchdowns is required"),
      })}
    >
      <>
        <h2 className="text-4xl text-white">
          Transfer Portal Prediction Model - Manual
        </h2>
        <p className="text-xl mb-[6.4rem]">
          Utilize this model to generate a transfer portal prediction for any
          arbitrary player by season stats.
        </p>
        <h2 className="text-2xl text-white">Enter Stats Manually</h2>
        <Field
          id="catches"
          name="catches"
          labelCopy="Catches"
          type="number"
          component={TextInput}
        />

        <Field
          id="touchDowns"
          name="touchDowns"
          labelCopy="Touch Downs"
          type="number"
          component={TextInput}
        />
      </>
    </FormStateWrapper>
  );
}
