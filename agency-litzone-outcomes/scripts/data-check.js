// User input data validation

const validateRecord = (dataList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return !/[^\s\w-.]/g.test(str);
  };
  const resultList = [];

  for (const field of dataList) {
    let { name, value } = field;
    const obj = { name, value };
    if (name === "Description") {
      obj.correct = value ? alphaNumCheck(value) : true;
    } else {
      obj.correct = true;
    }
    resultList.push(obj);
  }
  return resultList;
};
