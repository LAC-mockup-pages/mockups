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
  County: "County",
  Telephone: "Phone",
  SiteEmail: "Email",
  CSD: "Community School Dist.",
  CPD: "Community Planning Dist.",
  CD: "Congressional Dist.",
  AD: "Assembly Dist.",
  SD: "Senatorial Dist.",
};

const createNewSite = () => {
  for (let i = 0; i < placeholderList.length; i++) {
    const newLine = "";

    $("#new-site").append(`${newLine}<input
    type="text"
    class="form-control"
    placeholder='${placeholderList[i]}'
    required
  />`);
  }

  $("#new-site").append(
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add New Site</button>`
  );
};

const createBody = (dataList, labels) => {
  let rows = "";
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
      ? ""
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
  const [primary, secondary] = Object.keys(hashTable[0]);
  const optionList = hashTable
    .map((item) => {
      const selected = item[primary] === selectedValue ? " selected" : "";
      return `<option value=${item[primary]}${selected}>
          ${item[secondary]}</option>`;
    })
    .join("");
  const elementChoice = [
    `<div class="form-group input-field">
  <label for=${keyValue}>County</label>
  <select id=${keyValue} class="modal-select" name=${keyValue}>${optionList}</select>
</div>`,
    `<select id=${keyValue} class="modal-select form-control" name=${keyValue}><option selected disabled>Select an option</option>${optionList}</select>`,
  ];

  return elementChoice[numSelected];
};

const createForm = (elmnt) => {
  const idArray = $(elmnt).attr("id").split("-");
  const formData = {};
  formData.ID = [labelObj.ID, idArray[0]];
  formData.AgencyID = [labelObj.AgencyID, idArray[1]];

  const tdList = elmnt[0].cells;

  console.log("tdList :", tdList);

  for (let item of tdList) {
    const key = $(item).attr("class").split(" ")[1];
    let value = $(item).text();
    formData[key] = [labelObj[key], value];
  }

  const fieldList = Object.keys(formData);
  console.log("fieldList :", fieldList);
  const formFields = Object.keys(formData)
    .map((fieldName) => {
      let fieldText = "";
      let option = "";
      let labelClass = "";
      if (fieldName === "County") {
        return createSelect(countyList, fieldName, formData.County[1], 0);
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
          option = "disabled";
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

  // * data viewing
  // createNewSite();

  createViewBloc(dataSites, labelObj);

  // //* Adding a new site

  //* Canceling
  $("#cancel-btn").click(function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    $(formId)[0].reset();
  });

  //* Select sites
  $("[title^='Click']").click(function (evnt) {
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

  // //* Deleting source
});
