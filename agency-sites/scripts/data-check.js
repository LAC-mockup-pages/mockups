// User input data validation

const validateRecord = (dataList) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return /\w+$/i.test(str);
  };

  const checkedFieldList = [];
  let correct = true;

  for (let field of dataList) {
    switch (field.name) {
      case "SiteID":
      case "SiteName":
      case "SiteManager":
      case "City":
        correct = alphaNumCheck(field.value);
        checkedFieldList.push({ ...field, correct });
        break;

      case "State-view":
        correct = field.value.length < 3 && field.value.length > 0;
        checkedFieldList.push({ ...field, correct });
        break;

      case "County":
        correct = field.value.length < 6 && field.value.length > 0;
        checkedFieldList.push({ ...field, correct });
        break;

      case "Zip":
        correct = field.value.length < 11 && Boolean(Number(field.value));
        checkedFieldList.push({ ...field, correct });
        break;

      case "Telephone":
        correct = field.value.length < 13 && field.value.length > 0;
        checkedFieldList.push({ ...field, correct });
        break;

      default:
        checkedFieldList.push({ ...field, correct });
        break;
    }
  }
  return checkedFieldList;
};
