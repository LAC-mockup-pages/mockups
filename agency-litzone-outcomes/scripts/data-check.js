// Data validation

//* Returns true if input is only alphanumerical and underscore
const alphaNumCheck = (str) => {
  return /\w+$/i.test(str);
};
