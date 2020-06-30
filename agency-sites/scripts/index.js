// Actions and logic

const dataSites = sitesDataServer.slice(0);
const countyList = countyData.slice(0);
const stateList = ddlStates.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "agencyId",
    SiteID: "Site ID",
    SiteName: "Site Name",
    SiteManager: "Manager",
    fullAddress: "Address",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    County: "County",
    countyDesc: "County",
    Telephone: "Phone",
    SiteEmail: "Email",
    CSD: "Community School Dist.",
    CPD: "Community Planning Dist.",
    CD: "Congressional Dist.",
    AD: "Assembly Dist.",
    SD: "Senatorial Dist.",
  },
];

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = ["SiteName", "SiteID"];
  const keyList = Object.keys(labelObj).filter(
    (key) =>
      ![
        "ID",
        "AgencyID",
        "fullAddress",
        "CountyDesc",
        "SiteEmail",
        "CSD",
        "CPD",
        "CD",
        "AD",
        "SD",
      ].includes(key)
  );
  for (const key of keyList) {
    let element = "";
    let option = "";
    let classOption = " input-field";
    const placehold = labelObj[key];
    if (key === "State") {
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: stateList,
        keyValue: key,
        option,
        optionText: "a state",
        classOption,
      });
    } else if (key === "County") {
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: countyList,
        keyValue: key,
        option,
        optionText: "a county",
        classOption,
      });
    } else {
      if (requiredList.includes(key)) {
        option = " required title='Please fill this field'";
      }
      // inputNoLabel() <== helperFunctions()
      element = inputNoLabel({
        key,
        placehold,
        classOption,
        option,
      });
    }
    result.push(element);
  }
  result.push(
    `<button type="button" id="submit-btn" form="new-entry"
      class="btn btn-primary">Add
    </button>
    <button type="button" id="cancel-btn" form="new-entry"
      class="btn btn-default">Cancel
    </button>`
  );
  return result.join("");
};

const createTableHeader = (labelsObject) => {
  const list = Object.entries(labelsObject)
    .filter(
      (label) =>
        ![
          "ID",
          "AgencyID",
          "fullAddress",
          "City",
          "State",
          "Zip",
          "SiteEmail",
          "countyDesc",
          "CSD",
          "CPD",
          "CD",
          "AD",
          "SD",
        ].includes(label[0])
    )
    .map((label) => label[1]);

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const createTableBody = (dataList, labelObj) => {
  let rows = "";
  const hiddenList = [
    "ID",
    "Address",
    "State",
    "City",
    "Zip",
    "SiteEmail",
    "County",
    "CSD",
    "CPD",
    "CD",
    "AD",
    "SD",
  ];

  const filteredLabelList = Object.keys(labelObj).filter(
    (item) => !["AgencyID"].includes(item)
  );
  for (const record of dataList) {
    const { Address, City, Zip, State, Telephone, County } = record;

    // zipCodeFormat() <== helperFunction.js
    record.fullAddress = `${Address}<br/>
    ${City} ${State} ${zipCodeFormat(Zip)}`;
    record.Zip = record.Zip ? zipCodeFormat(record.Zip) : "";

    const countyObj = County
      ? countyList.filter((item) => item.FIPS === County)[0]
      : "";
    record.countyDesc = countyObj ? countyObj.CountyDesc : countyObj;

    // phoneFormat() <== helperFunction.js
    record.Telephone = Telephone ? phoneFormat(phoneFormat(Telephone)) : "";

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: filteredLabelList,
      labelObj,
      hiddenList,
    });
  }
  return `<tbody>${rows}</tbody>`;
};

const createViewBloc = () => {
  const tableHeader = createTableHeader(rowLabels[0]);

  // Sorting list of sites by descending ID
  const list = dataSites.sort((site1, site2) => site2.ID - site1.ID);
  const tableBody = createTableBody(list, rowLabels[0]);
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

const createForm = (list) => {
  let formContent = "";
  const requiredList = getRequired();

  // const requiredList = ["SiteName", "SiteID"];
  const hiddenList = ["ID", "SiteEmail"];

  for (const cell of list) {
    let keyVal = $(cell).attr("data-name");
    let labelVal = $(cell).attr("data-label");
    let value = $(cell).text() ? $(cell).text().trim() : "";
    let labelClassVal = "";
    let classVal = "";
    let optionHidden = hiddenList.includes(keyVal)
      ? "form-group hidden"
      : "form-group";
    let option = "";

    if (["fullAddress", "countyDesc"].includes(keyVal)) continue;
    if (requiredList.includes(keyVal)) {
      labelClassVal = "class='red-text'";
      option = "required";
    }

    if (keyVal === "County") {
      if (value === "null") value = "";

      // elementSelectModal() <== helperFunctions.js
      formContent += elementSelectModal({
        hashTable: countyList,
        keyValue: keyVal,
        selectedValue: value,
        labelVal: "County",
        labelClassVal,
        option,
        optionText: " a county",
      });
    } else if (keyVal === "State") {
      if (value === "null") value = "";

      // elementSelectModal() <== helperFunctions.js
      formContent += elementSelectModal({
        hashTable: stateList,
        keyValue: keyVal,
        selectedValue: value,
        labelVal: "State",
        labelClassVal,
        option,
        optionText: " a state",
      });
    } else {
      // elementInput() <== helperFunctions.js
      formContent += elementInput({
        keyVal,
        labelVal,
        value,
        labelClassVal,
        classVal,
        option,
        optionHidden,
      });
    }
  }

  return formContent;
};

// Used for new site and edited site data set
const saveMods = (form) => {
  const { AuditUserID } = sessionVariable;
  const result = { AuditUserID };
  const submittedData = $(form).serializeArray();
  $(`#new-site input, select`).removeClass("yellow-bg");

  console.log("submittedData :>> ", submittedData);
  // Highlights invalid fields with yellow background
  //  validateUserInput() <== data-check.js
  const validatedList = validateUserInput(submittedData);
  console.log("validatedList :>> ", validatedList);
  const checkFlag = validatedList.some((item) => !item.correct);
  if (checkFlag) {
    const list = validatedList.filter((obj) => obj.correct === false);
    for (let field of list) {
      console.log("State value : ", $("#State-view").val());
      if (!$("#State-view").val()) $("#State-view").addClass("yellow-bg");
      if (!$("#County").val()) $("#County").addClass("yellow-bg");
      console.log("County value : ", $("#County").val());

      $(`#${field.name}`).addClass("yellow-bg");
    }
    return;
  }

  for (let field of submittedData) {
    if (field.name === "County") {
      result.County = field.value;
      countyDescValue = countyList.filter(
        (item) => item.FIPS === field.value
      )[0].CountyDesc;
      field.value = countyDescValue;
    }
    // phoneFormat <== helperFunctions()
    if (field.name === "Telephone") field.value = phoneFormat(field.value);
    result[field.name] = field.value;
  }

  const message = result.ID
    ? "Result from Editing :>>"
    : "Result from Adding new site :>>";
  console.table(result);
  //! =================================================
  //! JSON Object to send back to database
  console.log(message, JSON.stringify(result));
  //! =================================================

  // if (form === "#new-site") location.reload();

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

  // * Data viewing
  $("#new-entry").append(createNewRecord(rowLabels));
  $("#main-table").append(createViewBloc());

  //* Adding a new site
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    saveMods(formId);
  });

  //* Canceling in new entry form
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select sites
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const rowID = "#" + $(this).attr("id");
    const selectedRow = $(`${rowID} td`).get();
    const editForm = createForm(selectedRow);
    $("#modalBloc").modal("toggle");
    $("#modal-form").empty().append(editForm);
  });

  //* Saving mods after editing selected outcome
  $(document).on("click", "#save-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const form = `#${$(this).attr("form")}`;
    saveMods(form);
    $("#modalBloc").modal("toggle");
  });
});
