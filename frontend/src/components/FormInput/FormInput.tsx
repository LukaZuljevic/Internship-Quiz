import { RefObject } from "react";
import c from "./FormInput.module.css";

type FormInputProps = {
  ref?: RefObject<HTMLInputElement> | null;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = ({
  ref,
  type,
  placeholder,
  name,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <input
      ref={ref}
      className={c.formInput}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
