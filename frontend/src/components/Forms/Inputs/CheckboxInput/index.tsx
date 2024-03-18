import { FieldProps } from 'formik';
import s from './CheckboxInput.module.css';

type CheckboxInputProps = {
  checkboxCopy: string;
};

export default function CheckboxInput({
  checkboxCopy,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & CheckboxInputProps) {
  const displayError = errors[field.name] && touched[field.name];
  return (
    <div className="relative flex items-center">
      <div className={`${s.checkbox_wrapper} ${displayError ? s.error : ''}`}>
        <input id={field.name} className={s.checkbox} {...field} {...props} />
        <label htmlFor={field.name} className={s.checkbox_label}></label>
        <div className={s.checkbox_copy}>{checkboxCopy}</div>
        {displayError ? (
          <div className={s.error_copy}>{errors[field.name] as string}</div>
        ) : null}
      </div>
    </div>
  );
}
