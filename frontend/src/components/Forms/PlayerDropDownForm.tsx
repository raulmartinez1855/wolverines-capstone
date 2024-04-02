import { Field } from "formik";
import * as yup from "yup";
import FormStateWrapper from "./FormStateWrapper";
import SelectDropDown from "./SelectDropDown";

const initialPlayerDropDownFormValues = {
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

export default function PlayerDropDownForm() {
  return (
    <FormStateWrapper
      initialValues={initialPlayerDropDownFormValues}
      validationSchema={yup.object({
        playerName: yup.string().required("Player Name is required"),
      })}
    >
      <>
        <h2 className="text-2xl text-white">Search by Player</h2>
        <Field
          name="playerName"
          labelCopy="Select Player"
          options={selectOpts}
          component={SelectDropDown}
        />
      </>
    </FormStateWrapper>
  );
}
