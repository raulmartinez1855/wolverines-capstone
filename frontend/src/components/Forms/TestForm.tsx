import TextInput from "@/components/Forms/Inputs/TextInput";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const initialTestFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER as string;

export default function TestForm() {
  const [serverResponse, setServerResponse] = useState();
  return (
    <>
      <Formik
        initialValues={initialTestFormValues}
        validationSchema={yup.object({
          firstName: yup.string().required("Legal First Name is required"),
          lastName: yup.string().required("Legal Last Name is required"),
          email: yup.string().required("Email is required"),
        })}
        onSubmit={async function (
          values: FormikValues,
          formikHelpers: FormikHelpers<FormikValues>
        ): Promise<any> {
          console.log(values, process.env.NEXT_PUBLIC_BACKEND_SERVER);

          const res = await axios.post(backendUrl, values);

          setServerResponse(res.data);
        }}
      >
        <Form className="flex flex-col gap-[1.6rem] w-[30rem]">
          <h2 className="text-2xl text-white">TEST FORM SUBMISSION</h2>
          <Field
            id="firstName"
            name="firstName"
            labelCopy="First Name"
            component={TextInput}
          />

          <Field
            id="lastName"
            name="lastName"
            labelCopy="Last Name"
            component={TextInput}
          />

          <Field
            id="email"
            name="email"
            type="email"
            labelCopy="Email"
            component={TextInput}
          />

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
      {serverResponse && (
        <div className="bg-white mt-5">
          <p>SERVER RESPONDED WITH:</p>
          <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
