// User input data validation

const validateUserInput = (dataList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return /\w+$/i.test(str);
  };

  const checkedFieldList = [];
  let correct;

  for (let field of dataList) {
    switch (field.name) {
      case "State":
        correct = field.value.length < 3;
        checkedFieldList.push({ ...field, correct });
        break;

      case "Zip":
        correct = field.value.length < 11 && Boolean(Number(field.value));
        checkedFieldList.push({ ...field, correct });
        break;

      case "Telephone":
        correct = field.value.length < 13;
        checkedFieldList.push({ ...field, correct });
        break;

      default:
        correct = alphaNumCheck(field.value);
        checkedFieldList.push({ ...field, correct });
        break;
    }
  }
  return checkedFieldList;
};
