// Actions and logic

const agencyData = agencyDataFund.slice(0);
const sourcesData = fundingData.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "Agency ID",
    FSID: "Source ID",
    FundAbbrev: "Source Name",
    FundStart: "Begin Date (MM/DD/YYYY)",
    FundEnd: "End Date (MM/DD/YYYY)",
    FY: "Fiscal Year",
    FundNumber: "Contract / Grant #",
    Amount: "Amount",
    Purpose: "Purpose"
  }
];

const setFiscalYear = (start, end) => {
  const startDate = new Date(start);

  const endDate = new Date(end);
  const nowDay = new Date();
  let fiscalYear = endDate.getFullYear();
  if (fiscalYear === startDate.getFullYear() && nowDay >= endDate)
    fiscalYear += 1;
  return fiscalYear.toString();
};

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const keyList = Object.keys(labelObj).filter(
    (key) => !["ID", "AgencyID", "FundAbbrev"].includes(key)
  );
  for (const key of keyList) {
    let element = "";
    let option = "";
    let classOption = "";
    if (key === "FSID") {
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: sourcesData,
        keyValue: key,
        option: "required",
        optionText: "a funding source",
        classOption
      });
    } else {
      let placehold = labelObj[key];
      if (["FundStart", "FundEnd"].includes(key)) {
        option =
          " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field\n(MM/DD/YYYY)'";
      }
      if (key === "FY") {
        classOption += " hidden";
      }
      // inputNoLabel() <== helperFunctions()
      element = inputNoLabel({
        key,
        placehold,
        classOption,
        option
      });
    }
    result.push(element);
  }
  return result.join("");
};

const createTableHeader = (labelsObject) => {
  const list = Object.entries(labelsObject)
    .map((label) => label[1])
    .filter((label) => !["ID", "Agency ID", "Source ID"].includes(label));

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const createTableBody = (dataList, labelList) => {
  let rows = "";
  const filteredLabelList = Object.keys(labelList).filter(
    (item) => !["AgencyID"].includes(item)
  );
  for (const record of dataList) {
    // currencyFormat() <== helperFunction.js
    if (record.Amount) record.Amount = currencyFormat(record.Amount);

    // dateFormat() <== helperFunction.js
    record.FundStart = dateFormat(record.FundStart);
    record.FundEnd = dateFormat(record.FundEnd);
    const hiddenList = ["ID", "FSID"];

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: filteredLabelList,
      labelObj: rowLabels[0],
      hiddenList
    });
  }
  return `<tbody>${rows}</tbody>`;
};

const createViewBloc = () => {
  const tableHeader = createTableHeader(rowLabels[0]);
  const tableBody = createTableBody(agencyData, rowLabels[0]);
  const viewBloc = tableHeader + tableBody;
  return viewBloc;
};

const saveMods = (fields, formName, tableName = "") => {
  const { AgencyID, AuditUserID } = sessionVariable;
  const result = { AgencyID, AuditUserID };

  $(`${formName} input, select`).removeClass("yellow-bg");
  const fieldList = fields.slice(0);

  // Data validation
  // validateNewRecord() <== data-check.js
  const validatedList = validateRecord(fieldList);

  // Background color change for invalid field values
  const checkFlag = validatedList.some((item) => !item.correct);
  if (checkFlag) {
    const list = validatedList.filter((obj) => obj.correct === false);
    for (let field of list) {
      const fieldId =
        formName === "#new-entry" ? `#${field.name}` : `#${field.name}-view`;
      $(fieldId).addClass("yellow-bg");
    }
    return;
  } else {
    for (const field of fieldList) {
      let val = field.value;
      let name = field.name;
      if (name === "Amount") val = val.replace(/[$,]/gi, "").trim();
      result[name] = val;
    }

    const target = tableName ? tableName : formId;
    const resultList = [target, JSON.stringify(result)];
    console.table(result);
    //! =================================================
    //! JSON Object to send back to database
    console.log("result :", resultList);
    //! =================================================

    //ToDO Reloading/resetting with new data

    if (formName === "#edit-form") $("#modalBloc").modal("toggle");
    if (formName === "#new-entry") $(formName)[0].reset();
  }
};

//*=================================================
//* jQuery section
//*=================================================

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").on("click", function () {
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  // * Agency funding sources viewing
  $("#new-entry").append(createNewRecord(rowLabels));
  $("#main-table").append(createViewBloc(rowLabels));

  // Change text color from red (required) to black
  // when a value other than default is selected
  $(document).on("change", "#FSID-view", function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });
  $(document).on("focusin", "#FundStart, #FundEnd", function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  //* Adding a new funding source
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    $(`#new-source input`).removeClass("yellow-bg");
    const newSource = $(formId).serializeArray();

    const startField = newSource.filter(
      (field) => field.name === "FundStart"
    )[0];
    const endField = newSource.filter((field) => field.name === "FundEnd")[0];
    const fiscalYearValue = setFiscalYear(startField.value, endField.value);
    newSource.forEach((item) => {
      if (item.name === "FY") item.value = fiscalYearValue;
    });

    saveMods(newSource, formId, "agencyDataFund");
  });

  //* New source Cancel button
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select funding source
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.stopPropagation();
    $("#modalBloc").modal("toggle");
    $("#edit-form").empty();

    const sourceId = $(this).attr("id");
    const tdList = $.makeArray($(`#${sourceId} td`).get());
    const result = tdList
      .map((item) => {
        const keyVal = $(item).attr("data-name");
        const labelVal = $(item).attr("data-label");
        const value = $(item).text().trim();
        // const classModal = ;
        let optionHidden = $(item).attr("class").includes("hidden")
          ? "form-group hidden"
          : "form-group";

        if (keyVal === "FSID") {
          // elementSelectModal() <== helperFunction.js
          return elementSelectModal({
            hashTable: sourcesData,
            keyValue: keyVal,
            selectedValue: value,
            labelVal: "Source Name",
            labelClassVal: "class='red-text'",
            option: "required",
            optionText: " a source"
          });
        } else {
          let option = "";
          let labelClassVal = "";
          if (keyVal === "FundAbbrev") optionHidden = "form-group hidden";
          if (["FundStart", "FundEnd"].includes(keyVal)) {
            labelClassVal = "class='red-text'";
            option = "required";
          }
          if (keyVal === "FY") option = "disabled";
          // createInputField() <== helperFunction.js
          return elementInput({
            keyVal,
            labelVal,
            value,
            labelClassVal,
            classVal: "",
            option,
            optionHidden
          });
        }
      })
      .join("");

    $("#edit-form").append(result).attr("data-bloc-id", sourceId);
  });

  //* Modal form Save button
  $(document).on("click", "#save-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    $("#FY-view").prop("disabled", false);
    const formContent = $(formId).serializeArray();
    saveMods(formContent, formId, "agencyDataFund");
  });

  //* Modal form Delete source button
  $(document).on("click", "#delete-btn", (evnt) => {
    evnt.stopPropagation();
    const deleteConfirm = $(".modal-footer>h3");
    const formId = `#${$(this).attr("form")}`;

    if (deleteConfirm.length === 0) {
      $(".modal-footer").prepend(
        "<h3 class='delete-msg'>Confirm deletion by clicking the DELETE button again</h3>"
      );
    } else {
      deleteConfirm.remove();
      const recordIdToDelete = $("#ID-view").val();
      const recordList = [{ name: "ID", value: recordIdToDelete }];
      saveMods(recordList, `${formId}-DELETE`, "agencyDataFund");

      $("#modalBloc").modal("toggle");
    }
  });
});
