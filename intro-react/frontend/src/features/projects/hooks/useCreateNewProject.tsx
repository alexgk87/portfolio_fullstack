import { ChangeEvent, useState, type FormEvent } from "react";

type FieldState = {
    value: string | boolean;
    isValid: boolean;
    isDirty: boolean;
    isTouched: boolean;
  };
  
  type UseFormProps<T extends Record<string, string | boolean>> = {
    initialFields: T;
    onSubmit: (data: T) => void;
    validate: (field: keyof T, value: string | boolean) => boolean;
  };
  
  export function useCreateNewProject<T extends Record<string, string | boolean>>({
    initialFields,
    onSubmit,
    validate,
  }: UseFormProps<T>) {
    const [fields, setFields] = useState<Record<keyof T, FieldState>>(() => {
      const initialState = {} as Record<keyof T, FieldState>;
      for (const key in initialFields) {
        initialState[key] = {
          value: initialFields[key],
          isValid: validate(key, initialFields[key]),
          isDirty: false,
          isTouched: false,
        };
      }
      return initialState;
    });

  const updateField = (field: keyof T, value: string | boolean) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: value,
        isValid: validate(field, value),
        isDirty: true,
      },
    }));
  };

  const setFieldTouched = (field: keyof T) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], isTouched: true },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = Object.values(fields).every((field) => field.isValid);

    if (!isFormValid) return;

    const formData = Object.fromEntries(
      Object.keys(fields).map((key) => [key, fields[key as keyof T].value])
    ) as T;

    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    const resetState = {} as Record<keyof T, FieldState>;
    for (const key in initialFields) {
      resetState[key] = {
        value: initialFields[key],
        isValid: false,
        isDirty: false,
        isTouched: false,
      };
    }
    setFields(resetState);
  };

  const getFieldProps = (field: keyof T) => ({
    ...(typeof fields[field].value === 'boolean'
      ? { checked: fields[field].value as boolean }
      : { value: fields[field].value }),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = event.target;
      let value: string | boolean;
      
      if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        value = target.checked;
      } else {
        value = target.value;
      }
      
      updateField(field, value);
    },
    onBlur: () => setFieldTouched(field),
  });

  const isFieldInvalid = (field: keyof T) =>
    !fields[field].isValid && fields[field].isDirty;

  return {
    fields,
    handleSubmit,
    getFieldProps,
    isFieldInvalid,
  };
}