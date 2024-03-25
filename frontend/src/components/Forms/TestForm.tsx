import TextInput from "@/components/Forms/Inputs/TextInput";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import SelectDropDown from "./SelectDropDown";

const initialTestFormValues = {
  catches: null,
  touchDowns: null,
  playerName: "",
};

const selectOpts = [
  "Darrius Clemons",
  "Mike Sainristil",
  "Amorion Walker",
  "Roman Wilson",
  "Blake Corum",
  "Will Johnson",
  "Fredrick Moore",
  "Keon Sabb",
  "Jayden Denegal",
  "Micah Pollard",
  "Karmello English",
  "Josaiah Stewart",
  "Brandyn Hillman",
  "Cornelius Johnson",
  "Donovan Edwards",
  "Makari Paige",
  "Derrick Moore",
  "Tyler Morris",
  "J.J. McCarthy",
  "Rod Moore",
  "Zeke Berry",
].map((v) => ({ label: v, value: v }));
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER as string;

export default function TestForm() {
  const [serverResponse, setServerResponse] = useState();
  return (
    <>
      <Formik
        initialValues={initialTestFormValues}
        validationSchema={yup.object({
          catches: yup.number().required("Number of Catches is required"),
          touchDowns: yup.number().required("Number of Touchdowns is required"),
          playerName: yup.string().required("Player Name is required"),
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
            name="playerName"
            labelCopy="Select Player"
            options={selectOpts}
            component={SelectDropDown}
          />
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
