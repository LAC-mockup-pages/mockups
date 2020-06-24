//* Data check for new or edited record

const validateRecord = (list) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return /\w+$/i.test(str);
  };
  const resultList = [];

  for (const field of list) {
    let { name, value } = field;
    const obj = { name, value };
    switch (name) {
      case "AmountProj":
      case "AmountAct":
        if (value) obj.correct = true;
        break;
      case "Zip":
        obj.correct = value ? Boolean(Number(zipCodeFormat(value))) : true;
        break;
      default:
        obj.correct = value ? alphaNumCheck(value) : true;
        break;
    }
    resultList.push(obj);
  }

  return resultList;
};
