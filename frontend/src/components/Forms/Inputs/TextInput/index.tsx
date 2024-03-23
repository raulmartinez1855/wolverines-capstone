import { FieldProps } from 'formik';
import s from './TextBox.module.css';

type TextInputProps = {
  labelCopy: string;
  type: string;
};

export default function TextInput({
  type,
  labelCopy,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & TextInputProps) {
  const displayError = errors[field.name] && touched[field.name];

  return (
    <div className={`${s.field} ${displayError ? s.error : ''}`}>
      <input placeholder=" " type={type} {...field} {...props} />
      <label htmlFor={field.name}>
        {displayError ? (errors[field.name] as string) : labelCopy}
      </label>
    </div>
  );
}
