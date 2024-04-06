import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import ReactSelect, {
  ActionMeta,
  SingleValue,
  createFilter,
} from "react-select";
import {
  DropDownOption,
  SelectDropDownProps,
  customStyles,
} from "./drop-down-styles";
import { FixedSizeList as List } from "react-window";

function MenuList(props: any) {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const optHeight = 49;
  // const initialOffset = options.indexOf(value) * optHeight;

  return (
    <List
      height={
        maxHeight < optHeight * children.length
          ? maxHeight
          : optHeight * children.length
      }
      width={"100%"}
      itemCount={children.length}
      itemSize={optHeight}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const withError = !!errors[field.name] && !!touched[field.name];

  return mounted ? (
    <div className="relative">
      <ReactSelect
        instanceId={field.name}
        id={field.name}
        name={field.name}
        onMenuClose={() => setFieldTouched(field.name, true)}
        options={options}
        placeholder={
          withError ? (errors[field.name] as string) : props.labelCopy
        }
        onChange={onChange}
        styles={customStyles(withError)}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{ MenuList }}
      />
    </div>
  ) : (
    <></>
  );
}
