// Actions and logic

const partnersList = ielcePartnersData.slice(0);
const stateList = ddlStates.slice(0);
const countyList = countyData.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "Agency Id",
    IELCEPartnerID: "Partner ID",
    PartnerName: "Name",
    PartnerManager: "Manager",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    Telephone: "Phone",
    County: "County",
    CountyDesc: "County Name",
    PartnerFSID: "Fund Code",
    PartnerFSIDDesc: "Fund Source",
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
        "PartnerManager",
        "CountyDesc",
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
    "PartnerFSIDDesc",
  ];

  for (const key of keyList) {
    let option = requiredList.includes(key) ? " required" : "";
    let classOption = " input-field";
    let element = inputNoLabel({
      key,
      placehold: labelList[0][key],
      classOption,
      option,
    });

    if (key === "County") {
      classOption = "modal-select";
      element = elementSelectNewRecord({
        hashTable: countyList,
        keyValue: key,
        option,
        optionText: "a county",
        classOption,
      });
    } else if (key === "State") {
      classOption = "modal-select";
      element = elementSelectNewRecord({
        hashTable: stateList,
        keyValue: key,
        option,
        optionText: "a state",
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
  const hiddenList = ["ID", "City", "State", "Zip", "County", "PartnerFSID"];
  for (const record of dataList) {
    const { Address, City, State, Zip, Telephone } = record;

    // currencyFormat() <== helperFunction.js
    if (record.AmountProj)
      record.AmountProj = currencyFormat(record.AmountProj);
    if (record.AmountAct) record.AmountAct = currencyFormat(record.AmountAct);

    // phoneFormat() <== helperFunction.js
    if (Telephone) record.Telephone = phoneFormat(phoneFormat(Telephone));
    // zipCodeFormat() <== helperFunctions.js
    record.Address = `${Address}<br>${City} ${State} ${zipCodeFormat(Zip)}`;

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: filteredLabelList,
      labelObj: rowLabels,
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

const saveMods = (dataList, formId, tableName = "") => {
  const { AgencyID, AuditUserID } = sessionVariable;
  const result = { AgencyID, AuditUserID };
  console.log("dataList :>> ", dataList);

  for (const field of dataList) {
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
  $("#submit-btn").bind("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    $(`${formId} input`).removeClass("yellow-bg");
    const newSource = $(formId).serializeArray();

    // validateNewRecord() <== data-check.js
    const validatedList = validateNewRecord(newSource.slice(0));

    // Background color change for invalid field values
    const checkFlag = validatedList.some((item) => !item.correct);
    if (checkFlag) {
      const list = validatedList.filter((obj) => obj.correct === false);
      for (let field of list) {
        $(`[name=${field.name}]`).addClass("yellow-bg");
      }
      return;
    } else {
      saveMods(newSource, formId, "ielcePartnersData");
      $(formId)[0].reset();
    }
  });

  //* Cancel button in new entry bloc
  $("#cancel-btn").bind("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select partner
  $("#main-table tr").bind("click", function () {
    const rowID = Number($(this).attr("id"));
    console.log("rowID :>> ", rowID);
    const listFields = createListFields(rowID, ielcePartnersData);
    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();
    $(".modal-body").append("<form id='modal-form'></form>");

    for (field of listFields) {
      const key = field[1],
        idVal = field[0];
      let option = "",
        classOption = "",
        val = field[2];

      if (["id", "PartnerID"].includes(idVal)) option = "disabled";
      if (placeholderList.includes(key)) classOption = "class='red-text'";
      if (!val) val = "";
      $(".modal-body>form").append(
        `<div class="input-field">
            <label for=${idVal} ${classOption}>${key}</label>
            <input type="text" id=${idVal} value='${val}' ${option}>
          </div>`
      );
    }
  });

  // Save button in modal form

  // Cancel button in modal form
});
