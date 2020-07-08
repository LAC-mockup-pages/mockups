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
      case "SiteID":
      case "SiteName":
        obj.correct = value ? alphaNumCheck(value) : false;
        break;
      default:
        obj.correct = value ? alphaNumCheck(value) : true;
        break;
    }
    resultList.push(obj);
  }
  return resultList;
};
