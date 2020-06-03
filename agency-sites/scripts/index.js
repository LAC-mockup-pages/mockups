// Actions and logic

const dataSites = sitesDataServer.slice(0);
const countyList = countyData.slice(0);
const labelObj = {
  ID: "ID",
  AgencyID: "agencyId",
  SiteID: "Site ID",
  SiteName: "Site Name",
  SiteManager: "Manager",
  Address: "Address",
  City: "City",
  State: "State",
  Zip: "ZIP",
  County: "County Name",
  Telephone: "Phone",
  SiteEmail: "Email",
  CSD: "Community School Dist.",
  CPD: "Community Planning Dist.",
  CD: "Congressional Dist.",
  AD: "Assembly Dist.",
  SD: "Senatorial Dist.",
};

const createNewRecord = (labelsObject, agencyId) => {
  let result = [];
  const keyList = Object.keys(labelsObject).filter(
    (key) => !["ID", "SiteEmail", "CSD", "CPD", "CD", "AD", "SD"].includes(key)
  );
  for (key of keyList) {
    let option = " required";
    let classOption = "";
    if (["AgencyID", "County"].includes(key)) {
      const agency = (option = key === "AgencyID" ? ` value=${agencyId}` : "");
      classOption = " hidden";
    }
    let inputElement = `<input type="text" class="form-control${classOption}" id=${key} name="${key}" placeholder="${labelsObject[key]}"${option} autocomplete="new-password" spellcheck="off">`;

    if (key === "County") {
      inputElement = createSelect(countyList, key, "", 1);
    }
    result.push(inputElement);
  }
  result.push(
    '<button type="button" id="submit-btn" form="new-site" class="btn btn-primary">Add</button><button type="button" id="cancel-btn" form="new-site" class="btn btn-default">Cancel</button>'
  );
  const formContent = result.join("");
  $("#new-site").append(formContent);
};

const createBody = (dataList, labels) => {
  let rows = "";
  dataList = dataList.sort((a, b) => b.ID - a.ID);
  for (const record of dataList) {
    const identifier = `${record.ID}-${record.AgencyID}`;
    record.SiteEmail = !record.SiteEmail ? "" : record.SiteEmail;

    // zipCodeFormat() <== helperFunctions.js
    const zipCode = zipCodeFormat(record.Zip);
    const fullAddress = `${record.Address}<br>${record.City}<br>
                          ${record.State} ${zipCode}`;

    // phoneFormat() <== helperFunctions.js
    const phoneNumber = record.Telephone
      ? phoneFormat(phoneFormat(record.Telephone))
      : "";

    const countyValue = !record.County
      ? " "
      : countyList.filter((obj) => obj.FIPS === record.County)[0].CountyDesc;

    const fieldsArray = Object.keys(record).filter((fieldName) =>
      labels.includes(labelObj[fieldName])
    );
    const row = fieldsArray
      .map((key) => {
        let value = "";
        switch (key) {
          case "Address":
            value = fullAddress;
            break;
          case "Telephone":
            value = phoneNumber;
            break;
          case "County":
            value = countyValue;
            break;
          default:
            value = record[key];
            break;
        }
        return `<td class="cell-data ${key}">${value}</td>`;
      })
      .join("");

    rows += `<tr id=${identifier} title="Click to edit">${row}</tr>`;
  }
  return `<tbody>${rows}</tbody>`;
};

const createViewBloc = (dataObj, labels) => {
  const excludedLabels = [
    "ID",
    "AgencyID",
    "City",
    "State",
    "Zip",
    "CSD",
    "CPD",
    "CD",
    "AD",
    "SD",
  ];
  const labelList = Object.keys(labels)
    .filter((key) => !excludedLabels.includes(key))
    .map((key) => labels[key]);
  const bodyLabelList = Object.keys(labels).map((key) => labels[key]);

  // createHeaders() <== helperFunctions()
  const headerLine = createHeaders(labelList);
  const tableBody = createBody(dataObj, bodyLabelList, countyList);
  $("#view-bloc").append(
    `<table class="table">${headerLine}${tableBody}</table>`
  );

  // Elements hidden so they are included in the selection used to
  // create the modal form for editing.
  const hiddenElements = `.${excludedLabels.join(", .")}`;
  $(hiddenElements).toggleClass("hidden");
};

const createSelect = (hashTable, keyValue, selectedValue = "", numSelected) => {
  let firstOption = "<option disabled>Select an option</option>";
  const [primary, secondary] = Object.keys(hashTable[0]);
  let optionList = hashTable
    .map((item) => {
      const selected = item[primary] === selectedValue ? "selected" : "";
      return `<option value="${item[primary]}" ${selected}>
          ${item[secondary]}</option>`;
    })
    .join("");

  if (!selectedValue) {
    firstOption = "<option selected disabled>Select an option</option>";
  }

  const elementChoice = [
    `<div class= "input-field form-group">
  <label for="${keyValue}">${labelObj[keyValue]}</label>
  <select id="${keyValue}" class="modal-select" name="${keyValue}">${firstOption}${optionList}</select>
</div>`,
    `<select id="${keyValue}" class="modal-select form-control" name=${keyValue}><option selected disabled>Select an option</option>${optionList}</select>`,
  ];

  return elementChoice[numSelected];
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

  const formFields = Object.keys(formData)
    .map((fieldName) => {
      let fieldText = "";
      let option = "";
      let labelClass = "";
      if (fieldName === "County") {
        const countyCode = formData.County[1].split(" ")[0];
        return createSelect(countyList, fieldName, countyCode, 0);
      }
      switch (fieldName) {
        case "Address":
          fieldText = formData.Address[1].slice(
            0,
            formData.Address[1].indexOf(formData.City[1])
          );
          break;
        case "SiteID":
          fieldText = formData[fieldName][1];
          // option = "disabled";
          break;
        case "Zip":
          // zipCodeFormat() <== helperFunctions()
          fieldText = zipCodeFormat(formData.Zip[1]);
          break;
        default:
          fieldText = formData[fieldName][1];
          break;
      }
      if (
        [
          "SiteID",
          "SiteName",
          "SiteManager",
          "Address",
          "City",
          "State",
          "Zip",
          "Telephone",
        ].includes(fieldName)
      ) {
        labelClass = " red-text";
        option += " required";
      }
      // createInputField() <== helperFunctions.js
      return createInputField(
        fieldName,
        formData[fieldName][0],
        fieldText,
        labelClass,
        "",
        option
      );
    })
    .join("");

  return formFields;
};

// Used for new site and edited site data set
const saveMods = (form) => {
  const result = {};
  const submittedData = $(form).serializeArray();

  //  validateUserInput() <== data-check.js
  if (!validateUserInput(submittedData)) $(form)[0].reset();
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
  //! =================================================
  //! JSON Object to send back to database
  console.log(message, JSON.stringify(result));
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

  // * Data viewing
  createViewBloc(dataSites, labelObj);
  createNewRecord(labelObj, dataSites[0].AgencyID);

  //* Adding a new site
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    saveMods(formId);
    $(formId)[0].reset();
  });

  //* Canceling
  $("#cancel-btn").click(function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    $(formId)[0].reset();
  });

  //* Select sites
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
  $("#save-btn").click(function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const form = `#${$(this).attr("form")}`;
    saveMods(form);
    $("#modalBloc").modal("toggle");
  });
});
