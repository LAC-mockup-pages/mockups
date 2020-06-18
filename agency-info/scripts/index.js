//* Actions and logic
//! Add a <script> element in index.js pointing to data.js, then:
let agencyData = ag[0]; //! That is all that's needed

// Labels used when DataObject keys need modifying
const rowLabels = {
  ID: "ID",
  AgencyID: "Agency ID",
  AgencyName: "Agency Name",
  SEDID: "SED ID",
  Division: "Division",
  ProgramManager: "Program Manager",
  Address: "Address",
  City: "City",
  State: "State",
  Zip: "ZIP",
  Telephone: "Phone",
  CSD: "Community School Dist.",
  EPERate: "EPE Rate",
  CPD: "Community Planning Dist.",
  CD: "Congressional Dist.",
  AD: "Assembly Dist.",
  SD: "Senatorial Dist.",
  PrepCode: "Prep Code",
  AgencyEmail: "Email",
};

const labelsBloc = {
  topLeft: [2, 3, 4, 5, 12, 17],
  topRight: [6, 7, 8, 9, 10, 18],
  bottomLeft: [11, 13, 14],
  bottomRight: [15, 16],
};

// list = [key,label,value] from createBloc()
const createOneRow = (list) => {
  const [key, label, value] = list;

  // phoneFormat() <== helpers.js
  const text = key === "Telephone" ? phoneFormat(value) : value;
  const optionHidden = ["ID", "AgencyID"].includes(key) ? " hidden" : "";
  const row = `<tr class="table-row${optionHidden}" id=${key}>
      <td class="row-label col-md-2">${label}</td>
      <td class="row-data col-md-3">${text}</td>
    </tr>`;

  return row;
};

// Args from renderViewBloc()
// blocName type: string
// dataObj type: JS object, fields selected to appear in this blocName
const createBloc = (blocName, dataObj) => {
  let blocRows = "";
  for (const key in dataObj) {
    blocRows += createOneRow([key, rowLabels[key], dataObj[key]]);
  }
  return `<div class="quarter-bloc col-md-6">
            <table class="table-responsive" id="${blocName}">
              <tbody>
                ${blocRows}
              </tbody>
            </table>
          </div>`;
};

const renderViewBloc = (dataObj) => {
  let {
    ID,
    AgencyName,
    SEDID,
    Division,
    ProgramManager,
    EPERate,
    PrepCode,
    Address,
    City,
    State,
    Zip,
    Telephone,
    AgencyEmail,
    CSD,
    CPD,
    CD,
    AD,
    SD,
  } = dataObj;
  const topLeft = createBloc("topLeft", {
    ID,
    AgencyName,
    SEDID,
    Division,
    ProgramManager,
    EPERate,
    PrepCode,
  });
  const topRight = createBloc("topRight", {
    Address,
    City,
    State,
    Zip,
    Telephone,
    AgencyEmail,
  });
  const bottomLeft = createBloc("bottomLeft", { ID, CSD, CPD, CD });
  const bottomRight = createBloc("bottomRight", { AD, SD });
  return `
    <div class="container row" id="top-bloc" title="Click to Edit">
      ${topLeft}${topRight}
    </div>
    <div class="separation"></div>
    <div class="container row" id="bottom-bloc" title="Click to Edit">
      ${bottomLeft}${bottomRight}
    </div>`;
};

const saveMods = (elmnt) => {
  const idList = elmnt.split("-");
  let result = { ID: idList[0], AgencyID: idList[1] };
  const list = $(`#${elmnt} input`).get();
  for (let row of list) {
    const key = $(row).attr("id");
    // phoneFormat() <== helpers.js
    const val = key === "Telephone" ? phoneFormat($(row).val()) : $(row).val();
    result[key] = val;
  }

  // updateDataObject() <== helpers.js
  const updatedData = updateDataObject(result, agencyData);

  //! Data object to send back to Database
  console.log("JSON Object :", JSON.stringify(updatedData));

  $("#modalTopBloc").modal("toggle");

  //TODO Update page with response from Database update
};

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").click(function () {
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  // * Data viewing

  $(".hero").append(renderViewBloc(agencyData));

  //* Data bloc editing

  $(document).on("click", ".hero > div", function (event) {
    event.stopPropagation();
    $("#modalTopBloc").modal("toggle");
    $("#edit-form").empty();
    const blocId = $(this).attr("id");
    const listRows = $.makeArray($(`#${blocId} .table-row`).get());
    let i = 0;
    const nestedListValues = [];
    let modalBloc = "";

    const listValues = $.map(listRows, function (row) {
      const rowId = $(row).attr("id");
      const rowData = $(`#${rowId} td`).get();
      const label = $(rowData[0]).text();
      const value = $(rowData[1]).text();
      return [rowId, label, value];
    });
    while (i < listValues.length) {
      nestedListValues.push(listValues.slice(0 + i, 3 + i));
      i += 3;
    }
    for (let item of nestedListValues) {
      const [keyVal, labelVal, value] = item;
      const optionHidden = keyVal === "ID" ? "hidden" : "";

      // elementInput() <== helpers.js
      modalBloc += elementInput({
        keyVal,
        labelVal,
        value,
        labelClassVal: "",
        classVal: "",
        option: "",
        optionHidden,
      });
    }
    $("#edit-form").append(modalBloc);
  });

  // Save button in modal form
  $("#save-button").on("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formID = $(this).attr("form");
    saveMods(`#${formID}`);
  });

  // Close button in modal form
  $("#close-button").on("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    $("#modalTopBloc").modal("toggle");
  });
});
