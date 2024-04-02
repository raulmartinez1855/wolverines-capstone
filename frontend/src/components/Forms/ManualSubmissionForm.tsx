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
