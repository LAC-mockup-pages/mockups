// Actions and logic

// Isolate work objects and arrays from data source.
const dataSource = Facilitator.slice(0);
const stateList = States.slice(0);

const rowLabels = [
  {
    ID: "ID",
    FacFirstName: "First Name",
    FacLastName: "Last Name",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    HomePhone: "Home Phone",
    Email: "Email",
    CellPhone: "Cell Phone",
    AlternatePhone: "AlternatePhone",
  },
];

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = ["FacFirstName", "FacLastName", "HomePhone", "Email"];
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

  for (const recordObj of dataList) {
    // zipCodeFormat() <== helperFunction.js
    const formattedZip = recordObj.Zip ? zipCodeFormat(recordObj.Zip) : "";

    // phoneFormat() <== helperFunction.js
    const formattedHomePhone = phoneFormat(recordObj.HomePhone);
    const formattedCellPhone = phoneFormat(recordObj.CellPhone);
    const formattedAlternatePhone = phoneFormat(recordObj.AlternatePhone);

    const record = {
      ...recordObj,
      Zip: formattedZip,
      HomePhone: formattedHomePhone,
      CellPhone: formattedCellPhone,
      AlternatePhone: formattedAlternatePhone,
    };

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: Object.keys(labelObj),
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

const createModalForm = (tdList) => {
  const requiredList = getRequired().map((name) => {
    return name.endsWith("-view") ? name.replace("-view", "") : name;
  });

  const result = tdList
    .map((item) => {
      const keyVal = $(item).attr("data-name");
      const labelVal = $(item).attr("data-label");
      let value = $(item).text().trim();
      let optionHidden = ["ID"].includes(keyVal)
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
      if (keyVal === "State") {
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
      if (["HomePhone", "AlternatePhone", "CellPhone"])
        val = val ? phoneFormat(val) : "";

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
      $("#FacFirstName, #FacLastName, #HomePhone, #Email")
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
  $(document).on(
    "focusin",
    "#FacFirstName, #FacLastName, #HomePhone, #Email",
    function (evnt) {
      evnt.stopPropagation();
      $(this).toggleClass("dark-text").prop("required", false);
    }
  );

  // //* Adding a new partner
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const newSource = $(formId).serializeArray();
    saveMods(newSource, formId, "Facilitator");
  });

  // //* Canceling
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  // //* Select record to edit + display modal
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const rowID = "#" + $(this).attr("id");
    const selectedRow = $(`${rowID} td`).get();
    const editForm = createModalForm(selectedRow);
    $("#modalBloc").modal("toggle");
    $("#edit-form").empty().append(editForm);
  });

  // //* Saving mods after editing selected record
  $(document).on("click", "#save-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const newSource = $(formId).serializeArray();
    saveMods(newSource, formId, "Facilitator");
  });
});
