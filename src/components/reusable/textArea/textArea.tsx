import React from "react";
import styles from "./textArea.module.scss";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = ({ id, label, name, ...restProps }: InputProps) => {
  return (
    <div>
      <label htmlFor={id || name}>{label || name}</label>
      <textarea
        //className={styles.textArea}
        id={id || name}
        name={name}
        {...restProps}
      />
    </div>
  );
};

export default TextArea;
