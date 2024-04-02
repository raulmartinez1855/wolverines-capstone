import { FormSteps, backendUrl, loading } from "@/utils/forms/utils";
import axios from "axios";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { ReactNode, useState } from "react";
import { RingLoader } from "react-spinners";
import { CountUp } from "use-count-up";
import * as yup from "yup";

export default function FormStateWrapper({
  initialValues,
  validationSchema,
  children,
}: {
  initialValues: any;
  validationSchema: yup.ObjectSchema<any>;
  children: ReactNode;
}) {
  const [serverResponse, setServerResponse] = useState();
  const [formSteps, setFormSteps] = useState(FormSteps.START);

  if (formSteps === FormSteps.DONE)
    return (
      <div className="flex flex-col w-full items-center ">
        <div className="text-5xl text-center">
          <span className="block mb-[6.4rem]">Transer Probability: </span>
          <span className="text-9xl">
            <CountUp
              easing={"easeInCubic"}
              isCounting
              end={serverResponse?.probability as number}
              duration={2}
            />
            %
          </span>
        </div>
        <button
          onClick={() => setFormSteps(FormSteps.START)}
          className="mt-[3.2rem] flex justify-center items-center py-[1.6rem] px-[2.4rem] rounded-[3.2rem] bg-white "
        >
          <span className="text-[1.4rem] leading-[1.6rem] text-black w-full focus-visible:outline-none">
            Restart
          </span>
        </button>
      </div>
    );
  if (formSteps === FormSteps.SUBMITTING)
    return (
      <>
        <div className="flex flex-col w-[30rem] h-full items-center">
          <h2 className="text-4xl text-white mb-[6.4rem]">
            Generating Predictions
          </h2>
          <RingLoader size={300} color="#fff" />
        </div>
      </>
    );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async function (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ): Promise<any> {
        setFormSteps(FormSteps.SUBMITTING);
        await loading(3000, null);
        const res = await axios.post(backendUrl, values);
        setServerResponse({ ...res.data, probability: 75 });
        setFormSteps(FormSteps.DONE);
        formikHelpers.resetForm();
      }}
    >
      <Form className="flex flex-col gap-[1.6rem]  max-w-[50rem]">
        {children}
        <button
          className="flex justify-center items-center py-[1.6rem] px-[2.4rem] rounded-[3.2rem] bg-white "
          type="submit"
        >
          <span className="text-[1.4rem] leading-[1.6rem] text-black w-full focus-visible:outline-none">
            Submit
          </span>
        </button>
      </Form>
    </Formik>
  );
}
