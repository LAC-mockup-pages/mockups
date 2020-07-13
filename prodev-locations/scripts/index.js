// Actions and logic

// Isolate work objects and arrays from data source.
const dataSource = Locations.slice(0);
const stateList = States.slice(0);

const rowLabels = [
  {
    ID: "ID",
    FacilityName: "Facility Name",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    Phone: "Phone",
    Email: "Email",
  },
];

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = ["FacilityName", "Phone", "Email"];
  const keyList = Object.keys(labelObj).filter((key) => !["ID"].includes(key));
  for (key of keyList) {
    let element = "";
    let option = "";
    let type = "text";
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
    } else {
      if (requiredList.includes(key)) {
        option = " required title='Please fill this field'";
      }
      // if (hiddenList.includes(key)) classOption += " hidden";
      if (key === "Email") type = "email";

      // inputNoLabel() <== helperFunctions()
      element = inputNoLabel({
        key,
        placehold,
        classOption,
        option,
        type,
      });
    }
    result.push(element);
  }
  result.push(
    `<button type="button" id="submit-btn" form="new-entry" class="btn btn-primary">Add</button>
    <button type="button" id="cancel-btn" form="new-entry" class="btn btn-default">Cancel</button>`
  );
  return result.join("");
};

const createTableHeader = (labelsObject) => {
  const list = Object.entries(labelsObject)
    .filter((label) => !["ID"].includes(label[0]))
    .map((label) => label[1]);

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const createTableBody = (dataList, labelObj) => {
  let rows = "";
  const hiddenList = ["ID"];

  const filteredLabelList = Object.keys(labelObj).filter(
    (item) => !["AgencyID"].includes(item)
  );
  for (const recordObj of dataList) {
    // zipCodeFormat() <== helperFunction.js
    formattedZip = recordObj.Zip ? zipCodeFormat(recordObj.Zip) : "";

    // phoneFormat() <== helperFunction.js
    formattedPhone = phoneFormat(recordObj.Phone);

    const record = { ...recordObj, Zip: formattedZip, Phone: formattedPhone };

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
  const list = dataSource.sort((site1, site2) => site2.ID - site1.ID);
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
      let fieldId =
        formName === "#new-entry" ? `#${field.name}` : `#${field.name}-view`;
      $(fieldId).addClass("yellow-bg");
    }
    return;
  } else {
    for (const field of fieldList) {
      let val = field.value;
      let name = field.name;

      // phoneFormat() <== helperFunction.js
      if (name === "Phone") val = val ? phoneFormat(val) : "";

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
    if (formName === "#new-entry") {
      $(formName)[0].reset();
      $("#IELCEPartnerID, #PartnerName, #PartnerFSID-view")
        .toggleClass("dark-text")
        .prop("required", true);
    }
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

  // Change text color from red (required) to black
  // when a value is entered
  $(document).on("focusin", "#FacilityName, #Phone, #Email", function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  // //* Adding a new partner
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const newSource = $(formId).serializeArray();
    saveMods(newSource, formId, "Locations");
  });

  // //* Canceling
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  // //* Select record to edit + display modal
  // $(document).on("click", ".table tbody tr", function (evnt) {
  //   evnt.preventDefault();
  //   evnt.stopPropagation();

  //   const rowID = "#" + $(this).attr("id");
  //   const selectedRow = $(`${rowID} td`).get();
  //   const editForm = createForm(selectedRow);
  //   $("#modalBloc").modal("toggle");
  //   $("#edit-form").empty().append(editForm);
  // });

  // //* Saving mods after editing selected record
  // $(document).on("click", "#save-btn", function (evnt) {
  //   evnt.preventDefault();
  //   evnt.stopPropagation();
  //   const formId = "#" + $(this).attr("form");
  //   const newSource = $(formId).serializeArray();
  //   saveMods(newSource, formId, "partnersData");
  // });
});
