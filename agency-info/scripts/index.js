//* Actions and logic
//! Add a <script> element in index.js pointing to data.js, then:
const agencyData = ag.slice(0); //! That is all that's needed

// Labels used when DataObject keys need modifying
const rowLabels = [
  {
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
  },
];

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
  const labels = rowLabels[0];
  for (const key in dataObj) {
    blocRows += createOneRow([key, labels[key], dataObj[key]]);
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

const saveMods = (form) => {
  const { AuditUserID, AgencyID } = sessionVariable[0];
  const result = { AgencyID, AuditUserID };
  const submittedData = $(form).serializeArray();
  $(`#edit-form input, select`).removeClass("yellow-bg");

  const validatedList = validateUserInput(submittedData);
  const checkFlag = validatedList.some((item) => !item.correct);
  if (checkFlag) {
    const list = validatedList.filter((obj) => !obj.correct);
    for (let field of list) {
      $(`#${field.name}-view`).addClass("yellow-bg");
    }
    return;
  }

  for (const field of submittedData) {
    // phoneFormat <== helperFunctions()
    if (field.name === "Telephone") field.value = phoneFormat(field.value);
    result[field.name] = field.value;
  }

  const message = `Result from ${form} :>>`;
  console.table(result);
  const resultList = ["ag", JSON.stringify(result)];
  //! =================================================
  //! JSON Object to send back to database
  console.log(message, resultList);
  //! =================================================

  //ToDO Reloading/resetting with new data
  // location.reload();
};

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").on("click", function (event) {
    evnt.stopPropagation();
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  // * Data viewing
  $(".hero").append(renderViewBloc(agencyData[0]));

  //* Data bloc editing
  $(document).on("click", ".hero > div", function (event) {
    event.stopPropagation();
    $("#modal-bloc").modal("toggle");
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

      if (keyVal === "State") {
        // elementSelectModal() <== helpers.js
        modalBloc += elementSelectModal({
          hashTable: ddlStates,
          keyValue: keyVal,
          selectedValue: value,
          labelVal,
          labelClassVal: "",
          option: "",
          optionText: "a State",
        });
      } else {
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
    }
    $("#edit-form").append(modalBloc);
    $("#AgencyEmail-view").attr("type", "email");
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
    $("#modal-bloc").modal("toggle");
  });
});
