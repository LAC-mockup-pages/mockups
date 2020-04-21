//* User input data validation

const validateUserInput = (dataList) => {
  // Returns true if input is only alphanumerical + underscore and not empty string
  const alphaNumCheck = (str) => {
    return /\w+$/i.test(str);
  };

  let resultTest = true;

  for (let field of dataList) {
    switch (field.name) {
      case "ReferralSiteName":
        resultTest = alphaNumCheck(field.value);
        break;
      case "ReferralSiteManager":
        resultTest = alphaNumCheck(field.value);
        break;
      case "Address":
        resultTest = alphaNumCheck(field.value);
        break;
      case "City":
        resultTest = alphaNumCheck(field.value);
        break;
      case "State":
        resultTest = field.value.length < 3;
      case "Zip":
        resultTest = field.value.length < 11;
        break;
      case "Telephone":
        resultTest = field.value.length < 13;
        break;
      default:
        resultTest = true;
        break;
    }
  }

  return resultTest;
};

export default validateUserInput;
