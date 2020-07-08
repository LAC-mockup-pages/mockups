// Actions and logic

const partnersList = ielcePartnersData.slice(0);
const stateList = ddlStates.slice(0);
const countyList = countyData.slice(0);
const fundingList = fundingData.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "Agency Id",
    IELCEPartnerID: "Partner ID",
    PartnerName: "Name",
    PartnerFSID: "Fund Code",
    PartnerFSIDDesc: "Fund Source",

    PartnerManager: "Manager",
    fullAddress: "Address",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    Telephone: "Phone",
    County: "County",
    CountyDesc: "County",
    AmountProj: "Projected $$",
    AmountAct: "Actual $$",
    PartnerTrainingType: "Training Type",
    PartnerCredential: "Credential",
  },
];

const createNewRecord = (labelList) => {
  let result = "";
  const keyList = Object.keys(labelList[0]).filter(
    (key) =>
      ![
        "ID",
        "AgencyID",
        "fullAddress",
        "CountyDesc",
        "PartnerFSIDDesc",
        "AmountProj",
        "AmountAct",
        "PartnerTrainingType",
        "PartnerCredential",
      ].includes(key)
  );
  const requiredList = [
    "IELCEPartnerID",
    "PartnerName",
    "PartnerFSID",
    // "PartnerFSIDDesc",
  ];

  for (const key of keyList) {
    let option = requiredList.includes(key) ? " required" : "";
    let classOption = " input-field";

    // inputNoLabel() <== helperFunction.js
    let element = inputNoLabel({
      key,
      placehold: labelList[0][key],
      classOption,
      option,
    });

    if (key === "County") {
      classOption = "modal-select";

      // elementSelectNewRecord() <== helperFunction.js
      element = elementSelectNewRecord({
        hashTable: countyList,
        keyValue: key,
        option,
        optionText: "a county",
        classOption,
      });
    } else if (key === "State") {
      classOption = "modal-select";

      // elementSelectNewRecord() <== helperFunction.js
      element = elementSelectNewRecord({
        hashTable: stateList,
        keyValue: key,
        option,
        optionText: "a state",
        classOption,
      });
    } else if (key === "PartnerFSID") {
      classOption += " modal-select";

      // elementSelectNewRecord() <== helperFunction.js
      element = elementSelectNewRecord({
        hashTable: fundingList,
        keyValue: key,
        option,
        optionText: "a funding",
        classOption,
      });
    }

    result += element;
  }
  result += `<button type="button" id="submit-btn" form="new-entry"
            class="btn btn-primary">
              Add</button>
          <button type="button" id="cancel-btn" form="new-entry"
            class="btn btn-default">
              Cancel</button>`;

  return result;
};

const createTableHeader = (labels) => {
  const labelObj = labels[0];
  const headerList = Object.keys(labelObj)
    .filter(
      (key) =>
        ![
          "ID",
          "AgencyID",
          "Address",
          "City",
          "State",
          "Zip",
          "CountyDesc",
          "PartnerFSID",
        ].includes(key)
    )
    .map((field) => labelObj[field]);

  // createHeaders() <== helperFunctions.js
  const tableHeader = createHeaders(headerList);

  return tableHeader;
};

const createTableBody = (dataList, labels) => {
  let rows = "";
  const filteredLabelList = Object.keys(labels[0]).filter(
    (item) => !["AgencyID"].includes(item)
  );
  const hiddenList = [
    "ID",
    "Address",
    "City",
    "State",
    "Zip",
    "County",
    "PartnerFSID",
  ];
  for (const record of dataList) {
    const { Address, City, State, Zip, Telephone } = record;

    // currencyFormat() <== helperFunction.js
    if (record.AmountProj)
      record.AmountProj = currencyFormat(record.AmountProj);
    if (record.AmountAct) record.AmountAct = currencyFormat(record.AmountAct);

    // phoneFormat() <== helperFunction.js
    if (Telephone) record.Telephone = phoneFormat(phoneFormat(Telephone));
    // zipCodeFormat() <== helperFunctions.js
    record.fullAddress = `${Address}<br>${City} ${State} ${zipCodeFormat(Zip)}`;

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: filteredLabelList,
      labelObj: rowLabels[0],
      hiddenList,
    });
  }
  return `<tbody>${rows}</tbody>`;
};

const createViewBloc = () => {
  const tableHeader = createTableHeader(rowLabels);
  const tableBody = createTableBody(partnersList, rowLabels);
  const viewBloc = tableHeader + tableBody;
  return viewBloc;
};

const getRequired = () => {
  const list = $("#new-entry input, select").get();
  const requiredList = list
    .filter((item) => $(item).prop("required"))
    .map((item) => $(item).attr("id"));
  return requiredList;
};

const createModalForm = (formId) => {
  const tdList = $.makeArray($(`#${formId} td`).get()).filter(
    (item) => $(item).attr("data-name") !== "CountyDesc"
  );
  const requiredList = getRequired();

  const result = tdList
    .map((item) => {
      const keyVal = $(item).attr("data-name");
      const labelVal = $(item).attr("data-label");
      let value = $(item).text().trim();
      let optionHidden = ["fullAddress", "ID"].includes(keyVal)
        ? "form-group hidden"
        : "form-group";
      let option = "";
      let classVal = "";
      let labelClassVal = "";

      if (requiredList.includes(keyVal)) {
        option = "required";
        labelClassVal += "class='red-text'";
      }
      // zipCodeFormat() elementSelectModal() elementInput()
      //    <== helperFunctions.js
      if (keyVal === "Zip") value = zipCodeFormat(value);
      if (keyVal === "County") {
        return elementSelectModal({
          hashTable: countyList,
          keyValue: keyVal,
          selectedValue: value,
          labelVal: "County",
          labelClassVal,
          option,
          optionText: " a county",
        });
      } else if (keyVal === "State") {
        return elementSelectModal({
          hashTable: stateList,
          keyValue: keyVal,
          selectedValue: value,
          labelVal: "State",
          labelClassVal,
          option,
          optionText: " a state",
        });
      } else {
        return elementInput({
          keyVal,
          labelVal,
          value,
          labelClassVal,
          classVal,
          option,
          optionHidden,
        });
      }
    })
    .join("");

  return result;
};

const saveMods = (fields, formName, tableName = "") => {
  const { AgencyID, AuditUserID } = sessionVariable;
  const result = { AgencyID, AuditUserID };
  $(`${formName} input, select`).removeClass("yellow-bg");
  console.log("fields :>> ", fields);
  const fieldList = fields.slice(0);

  // Data validation
  // validateNewRecord() <== data-check.js
  const validatedList = validateRecord(fieldList);
  console.log("validatedList :>> ", validatedList);
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
      if (name === "fullAddress") continue;
      if (["AmountProj", "AmountAct"].includes(name))
        val = val ? val.replace(/[$,]/gi, "").trim() : "";

      // phoneFormat() <== helperFunction.js
      if (name === "Telephone") val = val ? phoneFormat(val) : "";

      // zipCodeFormat() <== helperFunction.js
      if (name === "Zip") val = val ? zipCodeFormat(val) : "";

      result[name] = val;
    }

    const target = tableName ? tableName : "No table name";
    const resultList = [formName, target, JSON.stringify(result)];
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

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").click(function () {
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  //* Back to Top button
  const btnToTop = $("#btn-top");
  $("window").scroll(() => {
    btnToTop.style.display =
      $("window").scrollTop() > 600 || $("body".scrollTop() > 600)
        ? "inline-block"
        : "none";
  });
  btnToTop.click((e) => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "600");
  });

  //* Data viewing
  $("#new-entry").append(createNewRecord(rowLabels));
  $("#main-table").append(createViewBloc());

  //* Save button in new entry bloc
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    const newRecord = $(formId).serializeArray();

    console.log("newRecord :>> ", newRecord);
    saveMods(newRecord, formId, "ielcePartnersData");
  });

  //* Cancel button in new entry bloc
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select partner
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.stopPropagation();
    const recordId = $(this).attr("id");
    const formContent = createModalForm(recordId);
    $("#modalBloc").modal("toggle");
    $("#edit-form").empty().append(formContent).attr("data-bloc-id", recordId);
  });

  //* Save button in modal form
  $(document).on("click", "#save-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    const dataList = $(formId).serializeArray();
    saveMods(dataList, formId, "ielcePartnersData");
    // $("#modalBloc").modal("toggle");
  });

  //* Cancel button in modal form
  // Done through data-dismiss="modal" in index.html
});
