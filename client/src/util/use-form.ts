import { useState } from 'react';

interface IRegisterValues {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const useForm = (callback: () => void, initialState = {}) => {
  const [values, setValues] = useState<IRegisterValues>(initialState);

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
