import { StylesConfig } from "react-select";

export interface SelectDropDownProps {
  labelCopy: string;
  options: DropDownOption[];
}

export interface DropDownOption {
  label: string;
  value: any;
}

export const customStyles = (
  withError: boolean
): StylesConfig<DropDownOption, false> => ({
  control: (provided: any, props) => ({
    // ...provided,
    border: props.menuIsOpen
      ? "1px solid rgba(255, 255, 255, 0.25)"
      : withError
      ? "1px solid #F04747"
      : props.hasValue
      ? "1px solid white"
      : "1px solid rgba(255, 255, 255, 0.25)",
    outline: "none",
    boxShadow: "none",
    padding: "1.6rem",
    margin: "0",
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    height: "4.8rem",
    borderTopRightRadius: "3.2rem",
    borderTopLeftRadius: "3.2rem",
    borderBottomRightRadius: props.menuIsOpen ? "0" : "3.2rem",
    borderBottomLeftRadius: props.menuIsOpen ? "0" : "3.2rem",
    background: props.menuIsOpen
      ? "white"
      : withError
      ? "rgba(240, 71, 71, 0.10)"
      : "transparent",
    color: props.menuIsOpen ? "#0F0F0F" : withError ? "#F04747" : "white",
    ":hover": { border: "1px solid rgba(255, 255, 255, 0.25)" },
    display: "flex",
    justifyContent: "space-between",
  }),
  valueContainer: (provided: any, props) => ({
    ...provided,
    // color: props.hasValue ? 'black' : 'white',
    // position:
    overflow: "visible",
    margin: "0",
    padding: "0",
  }),
  input: (provided: any, props) => ({
    ...provided,
    color: "black",
    // color: props.hasValue ? 'black' : 'white',
    // position:
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided: any, props) => ({
    ...provided,
    // color: 'white',
    color: props.selectProps.menuIsOpen
      ? "black"
      : withError
      ? "#F04747"
      : "white",
    padding: "0",
    margin: "0",
  }),

  dropdownIndicator: (provided: any, props) => ({
    // ...provided,
    // color: 'white',
    padding: "0",
    margin: "0",
    height: "1.6rem",
  }),
  indicatorSeparator: (provided: any) => ({
    // ...provided,
    background: "transparent",
    display: "none",
  }),
  singleValue: (provided: any, props) => ({
    ...provided,
    color: !props.hasValue ? "#0F0F0F" : "white",
  }),
  menu: (provided: any) => ({
    // ...provided,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    background: "white",
    color: "#0F0F0F",
    margin: "0",
    padding: "0",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    borderBottomRightRadius: "2rem",
    borderBottomLeftRadius: "2rem",
    overflow: "hidden",
  }),
  menuList: (provided: any) => ({
    // ...provided,
    background: "white",
    color: "#0F0F0F",
    margin: "0",
    padding: "0",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    borderBottomRightRadius: "2rem",
    borderBottomLeftRadius: "2rem",
    maxHeight: "20rem",
    overflowY: "scroll",
  }),
  option: (provided: any) => ({
    // ...provided,
    margin: "0",
    backgroundColor: "white",
    color: "#0F0F0F",
    padding: "1.6rem",
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    borderTop: "1px solid #E6E6E6",
  }),
});
