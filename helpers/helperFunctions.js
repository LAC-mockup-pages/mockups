//* Helper functions for ASISTS_2020 pages

const createInputField = (
  keyVal,
  labelVal,
  value,
  labelClassVal = "",
  classVal = "",
  option = ""
) => {
  return `<div class="input-field">
      <label for='${keyVal}' class='${labelClassVal}'>${labelVal}</label>
      <input type="text" id='${keyVal}' class='${classVal}' name=${keyVal}
      value='${value}' ${option}>
    </div>`;
};

// obj = { keyVal, labelVal, value, labelClassVal,
//         classVal, option, optionHidden}
const elementInput = (obj) => {
  return `<div class="input-field ${obj.optionHidden}">
      <label for='${obj.keyVal}' ${obj.labelClassVal}>${obj.labelVal}</label>
      <input type="text" id='${obj.keyVal + "-view"}' ${obj.classVal} name=${
    obj.keyVal
  }
      value='${obj.value}' ${obj.option}>
    </div>`;
};

// Returns an <input .... > element with no label for new record entry bloc
// Assign "" to keys in argsObj which are not needed.
const inputNoLabel = (argsObj) => {
  const { key, placehold, classOption, option } = argsObj;

  return `<input type="text" class="form-control${classOption}" id=${key}
            name="${key}" placeholder="${placehold}"${option}
            autocomplete="new-password" spellcheck="off"/>`;
};

// Select element for new record entry
// ! Check the CSS for this:
// :required::placeholder,
// .form-control:required,
// .delete-msg {
//   color: rgb(197, 65, 65);
//   font-weight: 700;
//   text-align: left;
// }

//! Needs this event trigger for font color
// Change text color from red (required) to black
// when a value other than default is selected. Replace the anchor id.
//  $("#FSID-view").bind("change", function (evnt) {
//   evnt.stopPropagation();
//   $(this).toggleClass("dark-text").prop("required", false);
// });

const elementSelectNewRecord = (argsObj) => {
  const { hashTable, keyValue, option, optionText } = argsObj;
  const [primary, secondary] = Object.keys(hashTable[0]);
  let optionList = hashTable
    .map((item) => {
      return `<option value="${item[primary]}">
          ${item[secondary]}</option>`;
    })
    .join("");
  const descriptor = optionText ? optionText : "an option";
  const elementSelect = `
     <select id="${
       keyValue + "-view"
     }" class="form-control" name="${keyValue}" ${option}>
      <option value='' selected disabled>Select ${descriptor}</option>
      ${optionList}
     </select>`;

  return elementSelect;
};

// Create a select element with label for modal form
// Input: JS object. Set value to "" for key(s) not needed.
const elementSelectModal = (argsObj) => {
  const {
    hashTable,
    keyValue,
    selectedValue,
    labelVal,
    labelClassVal,
    option,
    optionText,
  } = argsObj;
  const descriptor = optionText ? optionText : "an option";
  let firstOption = `<option disabled>Select ${descriptor}</option>`;

  const [primary, secondary] = Object.keys(hashTable[0]);
  let optionList = hashTable
    .map((item) => {
      const selected =
        item[primary].toString() === selectedValue ? "selected" : "";
      return `<option value="${item[primary]}" ${selected}>
          ${item[secondary]}</option>`;
    })
    .join("");
  if (!selectedValue) {
    firstOption = `<option selected disabled>Select ${descriptor}</option>`;
  }

  const elementSelect = `<div class= "input-field form-group">
  <label for="${keyValue}" ${labelClassVal}>${labelVal}</label>
  <select id="${
    keyValue + "-view"
  }" class="modal-select" name="${keyValue}" ${option}>${firstOption}${optionList}</select>
</div>`;

  return elementSelect;
};

// Converts 0000000000 to 000-000-0000 and vice-versa
const phoneFormat = (str) => {
  if (!str) return "";
  if (str.match(/\D/)) {
    return str.replace(/\D/gi, "");
  } else {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6)}`;
  }
};

// dataObj: JSON object
// labelObj: JS Object with key from dataObj, value = label
const createFieldList = (dataObj, labelObj) => {
  const keyList = Object.keys(dataObj);

  return keyList.map((key) => {
    const label = labelObj[key] ? labelObj[key] : key;
    return [key, label, dataObj[key]];
  });
};

// Returns the year of a string date
const createFiscalYear = (str) => {
  const date = new Date(str);
  return date.getFullYear();
};

// Returns amount with $ 000000.00 format
const currencyFormat = (str) => {
  return !str
    ? ""
    : "$ " +
        Number(str)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// Returns a string date formatted MM/DD/YYYY with 0 if day or month
// is 1 digit.
const dateFormat = (str) => {
  const date = new Date(str);
  const month =
    date.getMonth() < 9
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString();

  const day =
    date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString();

  return `${month}/${day}/${date.getFullYear()}`;
};

// Creates a JS Object from 1 object result of processing page elements
// and 1 JSON data object result of server request
const updateDataObject = (obj, dataObj) => {
  const result = {};
  const listKeys = Object.keys(dataObj);
  for (let key of listKeys) {
    if (!obj[key]) {
      result[key] = dataObj[key];
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

// Returns ZIP code formatted 00000 0000
const zipCodeFormat = (str) => {
  return str.replace(/_/g, "").replace(/-/, " ").trim();
};

// Returns a string of headers for a <table> element
const createHeaders = (labels) => {
  const headers = labels.map((label) => `<th>${label}</th>`).join("");
  return `<thead>${headers}</thead>`;
};

// Returns a <tr> element as a string from a record object
const createTableRow = (idValue, recordObj) => {
  let dataElement = "";
  for (const property in recordObj) {
    dataElement += `<td class="cell-data" title="Click to edit" data-name=${property}>
        ${recordObj[property]}
      </td>`;
  }
  return `<tr id=${idValue}>${dataElement}</tr>`;
};

// argsObj = {record, labelList, labelObj, hiddenList}
const createRow = (argsObj) => {
  const { record, labelList, labelObj, hiddenList } = argsObj;
  let tdList = [];
  for (const key of labelList) {
    const option = hiddenList.includes(key) ? " hidden" : "";
    const cell = `<td class="cell-data${option}"
                    data-name=${key}
                    data-label="${labelObj[key]}">
                      ${record[key]}
                  </td>`;
    tdList.push(cell);
  }
  return `<tr id=${record.ID} title="Click to edit">
            ${tdList.join("")}
          </tr>`;
};
