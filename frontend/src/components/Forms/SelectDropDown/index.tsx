import { FieldProps } from "formik";
import ReactSelect, {
  ActionMeta,
  SingleValue,
  StylesConfig,
} from "react-select";
import {
  SelectDropDownProps,
  DropDownOption,
  customStyles,
} from "./drop-down-styles";

export default function SelectDropDown({
  options,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & SelectDropDownProps) {
  const onChange = (
    newValue: SingleValue<DropDownOption>,
    _actionMeta: ActionMeta<DropDownOption>
  ) => setFieldValue(field.name, newValue?.value);

  const withError = !!errors[field.name];

  return (
    <div className="relative">
      <ReactSelect
        instanceId={field.name}
        id={field.name}
        name={field.name}
        onMenuClose={() => setFieldTouched(field.name, true)}
        options={options}
        placeholder={props.labelCopy}
        onChange={onChange}
        styles={customStyles(withError)}
      />
    </div>
  );
}
