export const logout = () => {
  localStorage.removeItem('token');
  if (!localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const validateUserData = ({
  password, passwordConfirmation, username, email, atemptSetMessage,
}) => {
  if (password !== passwordConfirmation) {
    atemptSetMessage({ message: 'Passwordconfirmation does not match', type: 'warning' });
    return false;
  }
  if (password === '') {
    atemptSetMessage({ message: 'please select a password', type: 'warning' });
    return false;
  }
  if (password.length < 8) {
    atemptSetMessage({ message: 'passwords must be atleast 8 characters long', type: 'warning' });
    return false;
  }
  if (username === '') {
    atemptSetMessage({ message: 'please select a username', type: 'warning' });
    return false;
  }
  if (email === '') {
    atemptSetMessage({ message: 'please select email address', type: 'warning' });
    return false;
  }

  if (!email.includes('@')) {
    atemptSetMessage({ message: 'please enter a valid email address', type: 'warning' });
    return false;
  }
  return true;
};
