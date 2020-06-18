//* Actions and logic
//! Add a <script> element in index.js pointing to data.js, then:
let agencyData = ag[0]; //! That is all that's needed

//! NB: Objects rowLabels and blocItems will need to be
//! modified if the Data fields from server are modified
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
// Indexes needed for each bloc, in order
const blocItems = {
  topLeft: [2, 3, 4, 5, 12, 17],
  topRight: [6, 7, 8, 9, 10, 18],
  bottomLeft: [11, 13, 14],
  bottomRight: [15, 16],
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

const createBloc = (blocName, dataObj) => {
  let blocRows = "";
  for (const key in dataObj) {
    const rowData = [key, rowLabels[key], dataObj[key]];
    blocRows += createOneRow(rowData);
  }
  return `<div class="quarter-bloc col-md-6">
            <table class="table-responsive" id="${blocName}">
              <tbody>
                ${blocRows}
              </tbody>
            </table>
          </div>`;
};

const renderViewBloc = (obj) => {
  // createFieldList() <== helpers.js
  const listFields = createFieldList(obj, rowLabels);
  const identifier = `${obj.ID}-${obj.AgencyID}`;
  let topBloc = "";
  let bottomBloc = "";

  for (const key in blocItems) {
    if (key.startsWith("top")) {
      topBloc += createBloc(key, blocItems[key], listFields);
    } else {
      bottomBloc += createBloc(key, blocItems[key], listFields);
    }
  }

  return `
    <div class="container row" id="top-bloc" title="Click to Edit" data-id="${identifier}">
      ${topBloc}
    </div>
    <div class="separation"></div>
    <div class="container row" id="bottom-bloc" title="Click to Edit" data-id="${identifier}">
      ${bottomBloc}
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

  // * data viewing

  $(".hero").append(renderViewBloc(agencyData));

  //* Data bloc editing

  $(document).on("click", ".hero > div", function (event) {
    event.stopPropagation();
    $("#modalTopBloc").modal("toggle");
    $("#edit-form").empty();

    const blocDataId = $(this).attr("data-id");
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
      // createInputField() <== helpers.js
      modalBloc += createInputField(item[0], item[1], item[2]);
    }
    $("#edit-form").append(modalBloc).attr("data-bloc-id", blocDataId);
  });

  $("#save-button").on("click", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formID = $(this).attr("form");
    const id = $(`#${formID}`).attr("data-bloc-id");
    saveMods(id);
  });
});
