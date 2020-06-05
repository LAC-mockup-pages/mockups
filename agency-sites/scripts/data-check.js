// User input data validation

const validateUserInput = (dataList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return /\w+$/i.test(str);
  };

  const numCheck = (str) => {
    return /\d/g.test(str);
  };

  let resultTest = true;
  for (let field of dataList) {
    switch (field.name) {
      case "ReferralSiteName":
      case "ReferralSiteManager":
      case "Address":
      case "City":
        resultTest = alphaNumCheck(field.value);
        break;
      case "State":
        resultTest = field.value.length < 3;
      case "Zip":
        resultTest = field.value.length < 11 && Number(field.value);
        console.log("Number? >> ", Number(field.value));
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
