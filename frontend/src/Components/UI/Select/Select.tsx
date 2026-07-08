import { JSX, memo } from "react";
import styles from "./Styles.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (
    value: string
  ) => void;
}

export function SelectComponent({
  id,
  name,
  value,
  options,
  placeholder = "Выберите значение",
  disabled = false,
  onChange
}: SelectProps): JSX.Element {


  return (
    <select
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      className={styles.select}
      onChange={(e)=>
        onChange(e.target.value)
      }
    >
      <option value="">
        {placeholder}
      </option>

      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  );
}

export const Select = memo(SelectComponent);