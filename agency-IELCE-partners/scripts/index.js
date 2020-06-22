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
    fullAddress: "Address",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    Telephone: "Phone",
    County: "County",
    CountyDesc: "County",
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

const createModalForm = (formId) => {
  const tdList = $.makeArray($(`#${formId} td`).get());

  const result = tdList
    .map((item) => {
      const keyVal = $(item).attr("data-name");
      const labelVal = $(item).attr("data-label");
      const value = $(item).text().trim();
      let optionHidden = ["fullAddress", "ID"].includes(keyVal)
        ? "form-group hidden"
        : "form-group";
      let option = "";
      let classVal = "";
      let labelClassVal = "";
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

const saveMods = (dataList, formId, tableName = "") => {
  const { AgencyID, AuditUserID } = sessionVariable;
  const result = { AgencyID, AuditUserID };
  console.log("dataList :>> ", dataList);

  for (const field of dataList) {
    let val = field.value;
    let name = field.name;
    if (name === "fullAddress") continue;
    if (["AmountProj", "AmountAct"].includes(name))
      val = val ? val.replace(/[$,]/gi, "").trim() : "";
    if (name === "Telephone") val = val ? phoneFormat(val) : "";
    if (name === "Zip") val = val ? zipCodeFormat(val) : "";
    result[name] = val;
  }

  const target = tableName ? tableName : "No table name";
  const resultList = [formId, target, JSON.stringify(result)];
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
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.stopPropagation();
    const recordId = $(this).attr("id");
    const formContent = createModalForm(recordId);
    $("#modalBloc").modal("toggle");
    $("#edit-form").empty().append(formContent).attr("data-bloc-id", recordId);
  });

  //* Save button in modal form
  $("#save-btn").bind("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const form = `#${$(this).attr("form")}`;
    const dataList = $(form).serializeArray();
    saveMods(dataList, form, "ielcePartnersData");

    $("#modalBloc").modal("toggle");
  });
  //* Cancel button in modal form
  // Done through data-dismiss="modal" in index.html
});
