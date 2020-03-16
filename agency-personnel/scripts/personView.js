//* Additional script to view/edit selected personnel
const createInputField = (
  keyVal,
  labelClassVal,
  labelVal,
  classVal,
  value,
  option
) => {
  return `<div class="input-field">
    <label for='${keyVal}' class='${labelClassVal}'>${labelVal}</label>
    <input type="text" id='${keyVal}' class='${classVal}' value='${value}' ${option}>
    </div>`;
};

//* First block ==> Info on person
const persoInfo = (personID, arrPersoInfo, arrPhonesEmails) => {
  let personInfoBloc = `
  <div class="sub-header blue-bg blue-light-text" data-blockId="${personID}">
    <div class="container-fluid row">
       <div class="sub-header-title">Personnel Information</div>
    </div>
  </div>
  `;
  console.log("arrPersoInfo :", arrPersoInfo);
  // first part of person bloc
  for (let i = 0; i < 3; i++) {
    const labelField = placeholderList[i];
    const [keyField, valueField] = arrPersoInfo[i];
    const classOption = labelField.replace(/\s/, "-").toLowerCase();
    personInfoBloc += createInputField(
      keyField,
      "red-text",
      labelField,
      classOption,
      valueField,
      "required"
    );
  }
  // seniority
  const seniorityYears = moment(arrPersoInfo[2], "MM/DD/YYYY")
    .fromNow()
    .replace(" ago", "");
  personInfoBloc += createInputField(
    "seniority",
    "",
    "Length of Stay (yrs)",
    "seniorityClass",
    seniorityYears,
    "disabled"
  );
  //Last part of person bloc
  for (let j = 3; j < arrPersoInfo.length; j++) {
    const labelField = placeholderList[j + 1];
    const [keyField, valueField] = arrPersoInfo[j];
    const classOption = labelField[0].replace(/\s|\W/, "-").toLowerCase();
    const value = labelField[1][valueField];
    personInfoBloc += createInputField(
      keyField,
      "red-text",
      labelField[0],
      classOption,
      value,
      "required"
    );
  }
  // Phones and Emails
  for (item of arrPhonesEmails) {
    const labelPhoneEmail = item[0]
      .split("-")[1]
      .replace(/[A-Z]/g, letter => " " + letter)
      .trim();
    const value = item[1] ? item[1] : "";
    personInfoBloc += createInputField(
      item[0],
      "",
      labelPhoneEmail,
      "",
      value,
      ""
    );
  }
  return personInfoBloc;
};

const toggleFocus = elmnt => {
  $(elmnt).toggleClass("high-focus");
};

//* Add button, title and headers
const topBanner = (personId, title, list = null) => {
  let headerLine = "";

  if (list) {
    headerLine +=
      "<div class='container-fluid row sub-header-labels blue-light-bg blue-text'>";
    for (const item of list) {
      const cellName = item[0].toLowerCase().replace(/\W/gi, "-");
      const blockName = title.toLowerCase().replace(/\W/gi, "-");
      headerLine += ` <div class='bloc-${blockName}-${cellName} ${item[1]}'>${item[0]}</div>`;
    }
    headerLine += "</div>";
  }
  return `
  <div class='sub-header blue-bg blue-light-text'>
    <div class="container-fluid row">
      <button type='button' class="btn btn-default add-record-btn col-sm-2" onclick="addRecord(event, this)" data-blockId="${personId}-${title}">Add</button>
      <div class='sub-header-title'>${title}</div>
    </div>
    ${headerLine}
  </div>
  `;
};

//* History
const createHistoryBody = (personID, arr, list, blockName) => {
  let dataRow = "";

  for (item of arr) {
    const { id, date, status } = item;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell cell-data'>${date}</td>
    <td class='${blockName}-cell cell-data'>${list[status]}</td>
  </tr>`;
  }
  return `<div class="${blockName}-table" onmouseover="toggleFocus(this)" onmouseout="toggleFocus(this)">
      <table class="table" id='${personID}-${blockName}'>
        <tbody class='${blockName}-body'>${dataRow}</tbody>
    </table></div>`;
};

const personHistory = personID => {
  const personHistoryBloc = topBanner(personID, "History", historyHeaderList);
  const listFields = historyData
    .filter(item => item.personnelID === personID)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const dataRows = createHistoryBody(
    personID,
    listFields,
    historyList,
    "history"
  );
  return personHistoryBloc + dataRows;
};

//* Professional Development history & total hours
const totalProDevHrs = list => {
  let result = 0;
  for (item of list) {
    if (currentFiscalYear.includes(item.fiscalYear)) {
      result += item.hours;
    }
  }
  const optionText = result < 14 ? "red-text" : "";
  const totalProDevHrsView = `<div class="proDev-hours-view">
    <div class="proDev-hours total-banner blue-light-bg dark-blue-text">Total PD hours for the current Fiscal Year:
    <span class=${optionText}>${result} hrs</span>
    </div>
  </div>`;
  return totalProDevHrsView;
};

const createProDevBody = (personID, arr, blockName) => {
  let dataRow = "";

  for (item of arr) {
    const { id, date, workshopName, providerName, hours } = item;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell cell-data col-sm-2'>${date}</td>
    <td class='${blockName}-cell cell-data col-sm-8'>${workshopName}<br>by: ${providerName}</td>
    <td class='${blockName}-cell-hrs cell-data col-sm-2'>${hours}</td>
  </tr>`;
  }
  return `<div class="${blockName}-table" onmouseover="toggleFocus(this)" onmouseout="toggleFocus(this)">
      <table class="table" id='${personID}-${blockName}'>
        <tbody class='${blockName}-body'>${dataRow}</tbody>
    </table></div>`;
};

const personProDev = personID => {
  let personProDevBloc = topBanner(
    personID,
    "Professional Development",
    proDevHeaderList
  );
  const personProDevData = proDevData.filter(
    item => item.personnelID === personID
  );
  // No Pro Dev hours
  if (!personProDevData[0]) return personProDevBloc + headers;

  const listFields = personProDevData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const hoursPD = totalProDevHrs(listFields);
  const dataRows = createProDevBody(personID, listFields, "proDev");

  return personProDevBloc + dataRows + hoursPD;
};

//* Bloc Additional Information

const personAdditionalInfo = (personID, dataList, labelList, title) => {
  const infoBloc = `
  <div class='sub-header blue-bg blue-light-text'>
    <div class='sub-header-title' data-blockId="${personID}-${title}">${title}</div>
  </div>
  <div class="container-fluid row">`;

  const halfLength = Math.ceil(labelList.length / 2);
  const fullLength = labelList.length;
  let leftSection = "<form class='bloc-perso col-md-6'>";
  let rightSection = "<form class='bloc-perso col-md-6'>";
  const fieldList = dataList.slice(1);

  for (let i = 0; i < halfLength; i++) {
    const valueInputLeft =
      labelList[i].name === "BirthDate"
        ? fieldList[i][1]
        : labelList[i].options[fieldList[i][1]];

    leftSection += createInputField(
      labelList[i].name,
      `label-${fieldList[i][0]}`,
      labelList[i].label,
      fieldList[i][0],
      valueInputLeft
    );
  }
  for (let j = halfLength; j < fullLength; j++) {
    const valueInputRight = labelList[j].options[fieldList[j][1]];

    rightSection += createInputField(
      labelList[j].name,
      `label-${fieldList[j][0]}`,
      labelList[j].label,
      fieldList[j][0],
      valueInputRight
    );
  }

  return infoBloc + leftSection + "</form>" + rightSection + "</form></div>";
};

//* Bloc Comments and contact history

const personComment = (personID, dataList, title) => {
  const infobloc = topBanner(personID, title);
  const blockName = title.toLowerCase().replace(/\s/gi, "-");
  const record = dataList.filter(record => record.personnelID === personID);
  const commentText = record.length > 0 ? record[0].comment : "";
  const content = `<div class='${blockName} dark-text'>${commentText}</div>`;

  return infobloc + content;
};

const contactBody = (personID, records, blockName) => {
  let dataRow = "";
  if (!records[0]) return "";
  const sortedRecords = records.sort((a, b) => b.date - a.date);

  for (const record of sortedRecords) {
    const { id, date, type, notes } = record;
    const typeValue = contactTypesList[type];
    dataRow += `<tr id=${id}-row-${blockName}>
      <td class='${blockName}-cell cell-data col-sm-2'>${date}</td>
      <td class='${blockName}-cell cell-data col-sm-3'>${typeValue}</td>
      <td class='${blockName}-cell cell-data col-sm-7'>${notes}</td>
    </tr>`;
  }

  return `<div class="${blockName}-table">
    <table class="table" id='${personID}-${blockName}'>
      <tbody class='${blockName}-body'>${dataRow}</tbody>
    </table>
    </div>`;
};

//* Instructional hours block

const createNonInstrHrsBody = (personID, records, blockName, title) => {
  let dataRow = "";
  if (!records[0]) return "";

  const sortedRecords = records.sort((a, b) => a.month - b.month);
  for (const record of sortedRecords) {
    const {
      id,
      month,
      PrepHrs,
      TravelHrs,
      TrainingHrs,
      MeetingHrs,
      ExtraHrs
    } = record;
    const totalHours =
      PrepHrs + TravelHrs + TrainingHrs + MeetingHrs + ExtraHrs;
    dataRow += `<tr id=${id}-row-${blockName}>
      <td class='${blockName}-cell col-sm-2'>${moment(month.toString()).format(
      "MMM"
    )}</td>
      <td class='${blockName}-cell cell-data col-sm-2'>${PrepHrs}</td>
      <td class='${blockName}-cell cell-data col-sm-2'>${TravelHrs}</td>
      <td class='${blockName}-cell cell-data col-sm-2'>${TrainingHrs}</td>
      <td class='${blockName}-cell cell-data col-sm-2'>${MeetingHrs}</td>
      <td class='${blockName}-cell cell-data col-sm-2'>${ExtraHrs}</td>
      <td class='${blockName}-cell total-hours cell-data col-sm-2'>${totalHours}</td>
    </tr>`;
  }
  return `<div class="${blockName}-table">
    <table class="table-condensed" id='${personID}-${blockName}'>
      <tbody class='${blockName}-body'>${dataRow}</tbody>
    </table>
    </div>`;
};

const createInstrHrsBody = (personID, records, blockName, title) => {
  let dataRow = "";
  let totalHours = 0;
  if (!records[0]) return "";
  for (record of records) {
    const { id, instructionHrs, course } = record;
    totalHours += instructionHrs;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell cell-data col-sm-10'>${course}</td>
    <td class='${blockName}-cell cell-data col-sm-2'>${instructionHrs}</td>
     </tr>`;
  }

  return `<div class="${blockName}-table">
    <table class="table" id='${personID}-${blockName}'>
      <tbody class='${blockName}-body'>${dataRow}</tbody>
    </table>
    </div>
    <div class="proDev-hours-view">
      <div class="proDev-hours total-banner blue-light-bg dark-blue-text">Total ${title}: ${totalHours} hrs </div>
    </div>`;
};

const personInstrHrs = (personID, dataList, labelList, title, tableBody) => {
  let infoBloc = topBanner(personID, title, labelList);
  const blockName = title.toLowerCase().replace(/\s/gi, "-");
  const listFields = dataList.filter(record => record.personnelID === personID);
  const dataRows = tableBody
    ? tableBody(personID, listFields, blockName, title)
    : "";

  return infoBloc + dataRows;
};

//* Bloc Address
const createAddress = (list, blockName) => {
  const cityStateZip =
    list[1][1].toUpperCase() + " - " + list[2][1] + " " + list[3][1];

  return `<div class='${blockName} dark-text'>
    <div class='${list[0][0]}'>${list[0][1]}
    <span class='${list[1][0]}'>${cityStateZip}</span></div>
  </div>`;
};

const createWorkAddress = (list, blockName) => {
  const cityStateZip =
    list[1][1].toUpperCase() + " - " + list[2][1] + " " + list[3][1];
  const canMail = list[6][1] ? "checked" : "";
  const canCall = list[7][1] ? "checked" : "";

  return `<div class='${blockName} dark-text'>
      <div class='${list[0][0]}'>${list[0][1]}
      <span class='${list[1][0]}'>${cityStateZip}</span></div>
    <div class='container-fluid row work-address-checkbox'>
      <div class='mail-call-checkboxes col-sm-6'>
        <label for='canMail-checkbox'>Can receive mail? </label>
        <input type='checkbox' id='canMail-checkbox' ${canMail} disabled/>
      </div>
      <div class='mail-call-checkboxes col-sm-6'>
        <label for='canCall-checkbox'>Can receive calls? </label>
        <input type='checkbox' id='canCall-checkbox' ${canCall} disabled/>
      </div>
     </div>
  </div>`;
};

const personAddresses = (dataList, title) => {
  const personID = dataList[0][1];
  let infoBloc = topBanner(personID, title);
  const blockName = title.toLowerCase().replace(/\s/gi, "-");
  if (!dataList[1][1]) return infoBloc;
  const content =
    blockName === "home-address"
      ? createAddress(dataList, blockName)
      : createWorkAddress(dataList, blockName);

  return infoBloc + content;
};
