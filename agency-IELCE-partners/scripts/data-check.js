//* Data check for new or edited record

const validateNewRecord = (list) => {
  // Returns true if input is only alphanumerical + underscore, not empty string
  const alphaNumCheck = (str) => {
    return /\w/i.test(str);
  };
  const result = [];

  for (const obj of list) {
    switch (obj.name) {
      default:
        obj.correct = obj.value ? alphaNumCheck(obj.value) : true;
        break;
    }
    result.push(obj);
  }

  return result;
};
