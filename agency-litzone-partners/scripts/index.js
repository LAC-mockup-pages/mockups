// Actions and logic

// Isolate work objects and arrays from data source.
const dataPartners = partnersData.slice(0);
const countyList = countyData.slice(0);
const stateList = ddlStates.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "agencyId",
    ReferralSiteID: "Partner ID",
    ReferralSiteName: "Partner Name",
    ReferralSiteManager: "Manager",
    fullAddress: "Address",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    County: "County",
    CountyDesc: "County",
    Telephone: "Phone",
    ReferralSiteEmail: "Email",
  },
];

//? Done
const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = ["ReferralSiteName", "ReferralSiteID"];
  const keyList = Object.keys(labelObj).filter(
    (key) => !["ID", "AgencyID", "fullAddress", "CountyDesc"].includes(key)
  );
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
      if (key === "ReferralSiteEmail") type = "email";

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
    `<button type="button" id="submit-btn" form="new-partner" class="btn btn-primary">Add</button>
    <button type="button" id="cancel-btn" form="new-partner" class="btn btn-default">Cancel</button>`
  );
  return result.join("");
  // const formContent = result.join("");
  // $("#new-partner").append(formContent);
  // $("#State-view, #CountyDesc-view").addClass("modal-select");
};

//? Done
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
          "CountyDesc",
        ].includes(label[0])
    )
    .map((label) => label[1]);

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

//? Done
const createTableBody = (dataList, labelObj) => {
  let rows = "";
  const hiddenList = ["ID", "Address", "State", "City", "Zip", "County"];

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

//? Done
const createViewBloc = () => {
  const tableHeader = createTableHeader(rowLabels[0]);

  // Sorting list of sites by descending ID
  const list = dataPartners.sort((site1, site2) => site2.ID - site1.ID);
  const tableBody = createTableBody(list, rowLabels[0]);
  const viewBloc = tableHeader + tableBody;
  return viewBloc;
};

//? Done
const getRequired = () => {
  const list = $("#new-entry input, select").get();
  const requiredList = list
    .filter((item) => $(item).prop("required"))
    .map((item) => $(item).attr("id"));
  return requiredList;
};

const createForm = (elmnt) => {
  const idArray = $(elmnt).attr("id").split("-");
  const formData = {};
  formData.ID = [labelObj.ID, idArray[0]];
  formData.AgencyID = [labelObj.AgencyID, idArray[1]];

  const tdList = elmnt[0].cells;

  for (let item of tdList) {
    const key = $(item).attr("class").split(" ")[1];
    let value = $(item).text();
    formData[key] = [labelObj[key], value];
  }
  const fieldList = Object.keys(formData).filter((item) => item !== "County");

  const formFields = fieldList
    .map((fieldName) => {
      let fieldText = "";
      let option = "";
      let labelClassVal = "";
      if (["ReferralSiteName", "ReferralSiteEmail"].includes(fieldName)) {
        option = "required";
        labelClassVal = "red-text";
      }

      if (fieldName === "CountyDesc") {
        return elementSelectModal({
          hashTable: countyList,
          keyValue: fieldName,
          selectedValue: formData.County[1],
          labelVal: labelObj[fieldName],
          labelClassVal,
          option: "",
          optionText: "a county",
        });
      }
      if (fieldName === "State") {
        return elementSelectModal({
          hashTable: stateList,
          keyValue: fieldName,
          selectedValue: formData.State[1],
          labelVal: labelObj[fieldName],
          labelClassVal,
          option,
          optionText: "a state",
        });
      }
      switch (fieldName) {
        case "Address":
          fieldText = formData.Address[1].slice(
            0,
            formData.Address[1].indexOf(formData.City[1])
          );
          break;
        case "ReferralSiteID":
          fieldText = formData[fieldName][1];
          break;
        case "Zip":
          // zipCodeFormat() <== helperFunctions()
          fieldText = zipCodeFormat(formData.Zip[1]);
          break;

        default:
          fieldText = formData[fieldName][1];
          break;
      }

      // createInputField() <== helperFunctions.js
      return createInputField(
        fieldName,
        formData[fieldName][0],
        fieldText,
        labelClassVal,
        "",
        option
      );
    })
    .join("");

  return formFields;
};

// Used for new partner and edited partner data set
const saveMods = (form) => {
  const { AuditUserID, AgencyID } = sessionVariable;
  const result = { AuditUserID, AgencyID };
  const submittedData = $(form).serializeArray();
  $(`${form} input`).removeClass("yellow-bg");

  // Highlights invalid fields with yellow background and
  // exits loop.
  // validateUserInput() <== data-check.js
  const validatedList = validateUserInput(submittedData);
  const checkFlag = validatedList.some((item) => !item.correct);
  if (checkFlag) {
    const list = validatedList.filter((obj) => obj.correct === false);
    for (let field of list) {
      $(`#${field.name}`).addClass("yellow-bg");
    }
    return;
  }

  for (let field of submittedData) {
    if (field.name === "CountyDesc") {
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
  const message = `Result from ${form} :>>`;
  console.table(result);
  const resultList = ["partnersData", JSON.stringify(result)];
  //! =================================================
  //! JSON Object to send back to database
  console.log(message, resultList);
  //! =================================================

  //ToDO Reloading/resetting with new data
  // location.reload();
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
  $(document).on("focusin", "#ReferralSiteID, #ReferralSiteName", function (
    evnt
  ) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  //* Adding a new partner
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    saveMods(formId);
    $(formId)[0].reset();
  });

  //* Canceling
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select partner
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const rowID = "#" + $(this).attr("id");
    const selectedElement = $(rowID).get();
    const editForm = createForm(selectedElement);
    $("#modalBloc").modal("toggle");
    $("#modal-form").empty().append(editForm);

    // Elements ID and AgencyID hidden so they are included in the
    // serialization creating the data Object sent back to database
    $(".input-field").slice(0, 2).toggleClass("hidden");
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
