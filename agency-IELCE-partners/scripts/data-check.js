//* Data check for new or edited record

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
      case "AmountProj":
      case "AmountAct":
        obj.correct = value
          ? Boolean(Number(value.replace(/[$,]/gi, "").trim()))
          : true;
        break;
      case "IELCEPartnerID":
      case "PartnerName":
      case "PartnerFSID":
        obj.correct = value ? alphaNumCheck(value) : false;
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
