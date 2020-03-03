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
const persoInfo = (arrPersoInfo, arrPhonesEmails) => {
  let personInfoBloc = "";
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
    personInfoBloc += createInputField(
      item[0],
      "",
      labelPhoneEmail,
      "",
      item[1],
      ""
    );
  }
  return personInfoBloc;
};

//* History
const createHistoryBody = (personID, arr, list, blockName) => {
  let dataRow = "";

  for (item of arr) {
    const { id, date, status } = item;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell'>${date}</td>
    <td class='${blockName}-cell'>${list[status]}</td>
  </tr>`;
  }
  return `<div class="${blockName}-table">
      <table class="table" id='${personID}-${blockName}'>
        <tbody>${dataRow}</tbody>
    </table></div>`;
};

const personHistory = personID => {
  let personHistoryBloc = `<div class='sub-header blue-bg blue-light-text'>
    <div class='sub-header-title'>History</div>`;
  const listFields = historyData
    .filter(item => item.personnelID === personID)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const headers = `<div class='container-fluid'><div class='row sub-header-labels'>
      <div class='bloc-history-date col-sm-4'>Date</div>
      <div class='bloc-history-status col-sm-8'>Status</div>
    </div></div></div>`;

  const dataRows = createHistoryBody(
    personID,
    listFields,
    historyList,
    "history"
  );
  return personHistoryBloc + headers + dataRows;
};

//* Professional Development history & total hours
const totalProDevHrs = list => {
  let result = 0;
  for (item of list) {
    if (
      currentFiscalYear.includes(item.fiscalYear) &&
      item.attended === "Yes"
    ) {
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
    const {
      id,
      date,
      workshopName,
      providerName,
      category,
      hours,
      attended
    } = item;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell col-sm-2'>${date}</td>
    <td class='${blockName}-cell col-sm-6'>${workshopName}<br>by: ${providerName}</td>
    <td class='${blockName}-cell col-sm-2'>${category}</td>
    <td class='${blockName}-cell col-sm-1'>${hours}</td>
    <td class='${blockName}-cell col-sm-1'>${attended}</td>
  </tr>`;
  }
  return `<div class="${blockName}-table">
      <table class="table" id='${personID}-${blockName}'>
        <tbody>${dataRow}</tbody>
    </table></div>`;
};

const personProDev = personID => {
  let personProDevBloc = `<div class='sub-header blue-bg blue-light-text'>
    <div class='sub-header-title'>Professional Development</div>`;
  const listFields = proDevData
    .filter(item => item.personnelID === personID)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(line => {
      const attend = line.attended ? "Yes" : "No";
      return { ...line, attended: attend };
    });
  const headers = `<div class='container-fluid'><div class='row sub-header-labels'>
      <div class='bloc-proDev-date col-sm-2'>Date</div>
      <div class='bloc-proDev-workshop col-sm-6'>Workshop/Provider</div>
      <div class='bloc-proDev-category col-sm-2'>Category</div>
      <div class='bloc-proDev-hrs col-sm-1'>Hrs</div>
      <div class='bloc-proDev-attended col-sm-1'>Done?</div>
      </div></div></div>`;

  const hoursPD = totalProDevHrs(listFields);
  const dataRows = createProDevBody(personID, listFields, "proDev");
  return personProDevBloc + headers + dataRows + hoursPD;
};

//* Bloc Comments and contact history

const personComment = (personID, dataList, title) => {
  const infobloc = `<div class="sub-header blue-bg blue-light-text">
    <div class="sub-header-title">${title}</div></div>`;

  const blockName = title.toLowerCase().replace(/\s/gi, "-");
  const commentText = dataList.filter(
    record => record.personnelID === personID
  )[0].comment;

  const content = `<div class='${blockName} dark-text'>${commentText}</div>`;

  return infobloc + content;
};

const contactBody = (personID, records, blockName) => {
  let dataRow = "";
  const sortedRecords = records.sort((a, b) => b.date - a.date);

  for (const record of sortedRecords) {
    const { id, date, type, notes } = record;
    const typeValue = contactTypesList[type];

    dataRow += `<tr id=${id}-row-${blockName}>
      <td class='${blockName}-cell col-sm-2'>${date}</td>
      <td class='${blockName}-cell col-sm-3'>${typeValue}</td>
      <td class='${blockName}-cell col-sm-7'>${notes}</td>
    </tr>`;
  }

  return `<div class="${blockName}-table">
    <table class="table" id='${personID}-${blockName}'>
      <tbody>${dataRow}</tbody>
    </table>
    </div>`;
};

//* Instructional hours block

const createNonInstrHrsBody = (personID, records, blockName, title) => {
  let dataRow = "";
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
      <td class='${blockName}-cell col-sm-2'>${PrepHrs}</td>
      <td class='${blockName}-cell col-sm-2'>${TravelHrs}</td>
      <td class='${blockName}-cell col-sm-2'>${TrainingHrs}</td>
      <td class='${blockName}-cell col-sm-2'>${MeetingHrs}</td>
      <td class='${blockName}-cell col-sm-1'>${ExtraHrs}</td>
      <td class='${blockName}-cell total-hours col-sm-1'>${totalHours}</td>
    </tr>`;
  }
  return `<div class="${blockName}-table">
    <table class="table" id='${personID}-${blockName}'>
      <tbody>${dataRow}</tbody>
    </table>
    </div>`;
};

const createInstrHrsBody = (personID, records, blockName, title) => {
  let dataRow = "";
  let totalHours = 0;
  for (record of records) {
    const { id, instructionHrs, course } = record;
    totalHours += instructionHrs;
    dataRow += `<tr id=${id}-row-${blockName}>
    <td class='${blockName}-cell col-sm-10'>${course}</td>
    <td class='${blockName}-cell col-sm-2'>${instructionHrs}</td>
     </tr>`;
  }
  return `<div class="${blockName}-table">
    <table class="table" id='${personID}-${blockName}'>
      <tbody>${dataRow}</tbody>
    </table>
    </div>
    <div class="proDev-hours-view">
      <div class="proDev-hours total-banner blue-light-bg dark-blue-text">Total ${title}: ${totalHours} hrs </div>
    </div>`;
};

const personInstrHrs = (personID, dataList, labelList, title, tableBody) => {
  let infoBloc = `<div class='sub-header blue-bg blue-light-text'>
  <div class='sub-header-title'>${title}</div>`;
  let headers = "";
  const blockName = title.toLowerCase().replace(/\s/gi, "-");
  const listFields = dataList.filter(record => record.personnelID === personID);
  const dataRows = tableBody
    ? tableBody(personID, listFields, blockName, title)
    : "";

  for (label of labelList) {
    headers += `<div class="${blockName}-${label[0].toLowerCase()} ${
      label[1]
    }">${label[0]}</div>`;
  }
  headers = `<div class='container-fluid'>
              <div class='row sub-header-labels'>${headers}</div>
            </div></div>`;
  return infoBloc + headers + dataRows;
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
  let infoBloc = `<div class='sub-header blue-bg blue-light-text'>
  <div class='sub-header-title'>${title}</div></div>`;
  const blockName = title.toLowerCase().replace(/\s/gi, "-");

  const content =
    blockName === "home-address"
      ? createAddress(dataList, blockName)
      : createWorkAddress(dataList, blockName);

  return infoBloc + content;
};
