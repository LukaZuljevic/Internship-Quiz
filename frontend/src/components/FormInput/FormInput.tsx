import c from "./FormInput.module.css";

type FormInputProps = {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <input
      className={c.formInput}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
