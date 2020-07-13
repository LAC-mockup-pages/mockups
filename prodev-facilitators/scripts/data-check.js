// User input data validation

const validateRecord = (dataList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return !/[^\s\w-.]/g.test(str);
  };
  const resultList = [];

  for (let field of dataList) {
    let { name, value } = field;
    const obj = { name, value };
    switch (name) {
      case "FacFirstName":
      case "FacLastName":
      case "HomePhone":
        obj.correct = value ? alphaNumCheck(value) : false;
        break;
      case "Email":
        obj.correct = value ? true : false;
        break;

      default:
        obj.correct = value ? alphaNumCheck(value) : true;
        break;
    }
    resultList.push(obj);
  }
  return resultList;
};
