// Actions and logic

const partnersList = ielcePartnersData.slice(0);
const stateList = ddlStates.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "Agency Id",
    IELCEPartnerID: "Partner ID",
    PartnerName: "Name",
    PartnerManager: "Manager",
    Address: "Address",
    City: "City",
    State: "State",
    Zip: "ZIP",
    Telephone: "Phone",
    County: "County",
    CountyDesc: "County Description",
    PartnerFSID: "Fund Code",
    PartnerFSIDDesc: "Fund Source",
    AmountProj: "Projected $$",
    AmountAct: "Actual $$",
    PartnerTrainingType: "Training Type",
    PartnerCredential: "Credential",
  },
];

const createNewRecord = () => {
  const newLine = "";
  const placeholderList = ["placehold 1", "placehold 2"];
  const $newRecord = $("#new-partner");
  for (let i = 0; i < placeholderList.length; i++) {
    $newRecord.append(`${newLine}<input
    type="text"
    class="form-control"
    placeholder='${placeholderList[i]}'
    required
  />`);
  }

  $newRecord.append(
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add</button>`
  );
};

const createTableHeader = (labels) => {
  const labelObj = labels[0];
  const headerList = Object.keys(labelObj)
    .filter(
      (key) =>
        ![
          "ID",
          "AgencyID",
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
  const hiddenList = ["ID", "City", "State", "Zip", "County", "PartnerFSID"];
  for (const record of dataList) {
    const { Address, City, State, Zip, Telephone } = record;

    // currencyFormat() <== helperFunction.js
    if (record.AmountProj)
      record.AmountProj = currencyFormat(record.AmountProj);
    if (record.AmountAct) record.AmountAct = currencyFormat(record.AmountAct);

    // phoneFormat() <== helperFunction.js
    if (Telephone) record.Telephone = phoneFormat(phoneFormat(Telephone));
    // zipCodeFormat() <== helperFunctions.js
    record.Address = `${Address}<br>${City} ${State} ${zipCodeFormat(Zip)}`;

    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList: filteredLabelList,
      labelObj: rowLabels,
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
  createNewRecord();
  $("#main-table").append(createViewBloc());

  //* Adding a new partner

  // Save button in new entry bloc

  // Cancel button in new entry bloc
  //* Select partner
  $("#main-table tr").on("click", function () {
    const rowID = Number($(this).attr("id"));
    console.log("rowID :>> ", rowID);
    const listFields = createListFields(rowID, ielcePartnersData);
    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();
    $(".modal-body").append("<form id='modal-form'></form>");

    for (field of listFields) {
      const key = field[1],
        idVal = field[0];
      let option = "",
        classOption = "",
        val = field[2];

      if (["id", "PartnerID"].includes(idVal)) option = "disabled";
      if (placeholderList.includes(key)) classOption = "class='red-text'";
      if (!val) val = "";
      $(".modal-body>form").append(
        `<div class="input-field">
            <label for=${idVal} ${classOption}>${key}</label>
            <input type="text" id=${idVal} value='${val}' ${option}>
          </div>`
      );
    }
  });

  // Save button in modal form

  // Cancel button in modal form
});
