interface IError {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const validateRegisterInput = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors = {} as IError;

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    // email matching regex
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email is not valid';
    }
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    // returns true if there are no matching above conditions
    valid: Object.keys(errors).length < 1,
  };
};

export default validateRegisterInput;
