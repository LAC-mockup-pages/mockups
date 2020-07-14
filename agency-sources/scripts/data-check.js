//* Data check for new or edited source
//* Using Moment.js for date validation

const validateRecord = (list) => {
  // Returns true if input is only alphanumerical + underscore, dash,
  // dot, whitespace, not empty string
  const alphaNumCheck = (str) => {
    return !/[^\s\w-.]/g.test(str);
  };
  const resultList = [];
  for (const field of list) {
    let { name, value } = field;
    const obj = { name, value };
    switch (name) {
      case "Amount":
        obj.correct = value
          ? Boolean(Number(value.replace(/[$,]/gi, "").trim()))
          : true;
        break;
      case "FundStart":
        obj.correct = moment(obj.value, "MM/DD/YYYY", true).isValid();
        break;

      case "FundEnd":
        obj.correct = moment(obj.value, "MM/DD/YYYY", true).isValid();
        break;

      default:
        obj.correct = value ? alphaNumCheck(value) : true;
        break;
    }
    resultList.push(obj);
  }
  return resultList;
};
