import React from "react";
import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ id, label, name, ...restProps }: InputProps) => {
  return (
    <div>
      <label htmlFor={id || name}>{label || name}</label>
      <input
        //className={styles.input}
        id={id || name}
        name={name}
        {...restProps}
      />
    </div>
  );
};

export default Input;
