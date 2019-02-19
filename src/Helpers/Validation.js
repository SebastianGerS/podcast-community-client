export const invalidEmail = (email) => {
  if (email.includes('@')) {
    return false;
  }
  return true;
};

export const invalidUsername = (username) => {
  if (username === '') {
    return true;
  }
  return false;
};

export const invalidPassword = (password) => {
  if (password.length < 8) {
    return true;
  }
  return false;
};

export const invalidPasswordConfirmation = (password, passwordConfirmation) => {
  if (password !== passwordConfirmation) {
    return true;
  }
  return false;
};

export const validUserData = (username, email, password, passwordConfirmation) => {
  if (
    invalidEmail(email)
    || invalidUsername(username)
    || invalidPassword(password)
    || invalidPasswordConfirmation(passwordConfirmation)
  ) {
    return false;
  }
  return true;
};
