export const invalidEmail = (email: string): boolean => {
  if (email.includes('@')) {
    return false;
  }
  return true;
};

export const invalidUsername = (username: string): boolean => {
  if (username === '') {
    return true;
  }
  return false;
};

export const invalidPassword = (password: string): boolean => {
  if (password.length < 8) {
    return true;
  }
  return false;
};

export const invalidPasswordConfirmation = (password: string, passwordConfirmation: string): boolean => {
  if (password !== passwordConfirmation) {
    return true;
  }
  return false;
};

export const validUserData = (
  username: string, email: string, password: string, passwordConfirmation: string,
): boolean => {
  if (
    invalidEmail(email)
    || invalidUsername(username)
    || invalidPassword(password)
    || invalidPasswordConfirmation(password, passwordConfirmation)
  ) {
    return false;
  }
  return true;
};
