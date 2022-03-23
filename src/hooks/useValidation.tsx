import { useState } from "react";

export const useValidation = (
  schema: Field[],
  prepopulated: boolean = false
) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [wasTouched, setWasTouched] = useState(
    Object.fromEntries(schema.map(({ name }) => [name, false]))
  );

  const getError = (name: string, value: string) => {
    const field = schema.find((field) => field.name === name);
    if (!field) throw Error(`No field with name ${name}`);
    if (field.required && !value) return `${name} is required`;
    if (field.minLength !== undefined && value.length < field.minLength)
      return `${name} must be at least ${field.minLength} characters`;
    if (field.maxLength !== undefined && value.length > field.maxLength)
      return `${name} must be at most ${field.maxLength} characters`;
    if (
      field.min !== undefined &&
      !isNaN(parseInt(value)) &&
      +value < field.min
    )
      return `${name} must be at least ${field.min}`;
    if (
      field.max !== undefined &&
      !isNaN(parseInt(value)) &&
      +value > field.max
    )
      return `${name} must be at most ${field.max}`;
    if (field.integer && !Number.isInteger(+value))
      return `${name} must be an integer`;
    return "";
  };

  const reset = () => {
    for (let fieldName in wasTouched) wasTouched[fieldName] = false;
    setErrors([]);
  };

  const validateAllTouched = (
    touchedFieldName: string,
    fields: { name: string; value: string }[]
  ) => {
    const _wasTouched = { ...wasTouched, [touchedFieldName]: true };
    const _errors: string[] = [];
    for (let field of fields) {
      if (_wasTouched[field.name]) {
        let _error = getError(field.name, field.value);
        if (_error) _errors.push(_error);
      }
    }
    setWasTouched(_wasTouched);
    setErrors(_errors);
  };

  const RequiredFieldWasNotTouched = () => {
    return Object.entries(wasTouched).some(([fieldName, fieldWasTouched]) => {
      const schemaField = schema.find((field) => field.name === fieldName);
      if (!schemaField) throw Error(`No field with name ${fieldName}`);
      if (!schemaField.required) return false;
      return !fieldWasTouched;
    });
  };

  const shouldDisableSubmit = () => {
    return errors.length > 0 || (!prepopulated && RequiredFieldWasNotTouched());
  };

  return {
    errors,
    setErrors,
    reset,
    validateAllTouched,
    shouldDisableSubmit,
  };
};

export interface Field {
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
}
