// User input data validation

const validateRecord = (dataList, requiredList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return !/[^\s\w-.,]/g.test(str);
  };
  // Regex for date Format as MM/DD/YYYY
  const dateFormat = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;

  const resultList = [];
  for (let field of dataList) {
    let { name, value } = field;
    const obj = { name, value };

    switch (name) {
      case "StartDate":
      case "EndDate":
        // Match the date format through regular expression
        obj.correct = value.match(dateFormat) ? true : false;
        break;

      default:
        if (requiredList.includes(name)) {
          obj.correct = value ? alphaNumCheck(value) : false;
        } else {
          obj.correct = value ? alphaNumCheck(value) : true;
        }
        break;
    }
    resultList.push(obj);
  }
  return resultList;
};