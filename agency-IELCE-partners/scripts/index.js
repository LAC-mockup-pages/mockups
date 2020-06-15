// Actions and logic

const partnersList = ielcePartnersData.slice(0);
const stateList = ddlStates.slice(0);

const labelList = [
  "id",
  "Partner Name",
  "Partner ID",
  "Partner Manager",
  "Street Address",
  "City",
  "State",
  "ZIP",
  "County",
  "Phone",
  "Email",
  "FS ID",
  "Projected Amount",
  "Amount",
  "Training Type",
  "Credential",
];

const rowLabels = {
  ID: "10",
  AgencyID: "PRA",
  IELCEPartnerID: "PRAIELCE10",
  PartnerName: "IEL-12.3",
  PartnerManager: "ASISTS Data Services ",
  Address: "85 Broad Street ",
  City: "New York ",
  State: "NY",
  Zip: "10004-____",
  County: "",
  Telephone: "",
  PartnerFSID: "EPE",
  AmountProj: "70000.00",
  AmountAct: "70000.00",
  PartnerTrainingType: "Workforce Readiness",
  PartnerCredential: "Certification",
  CountyDesc: "",
  PartnerFSIDDesc: "EPE",
};

const createNewRecord = () => {
  const newLine = "";
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
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add New Partner</button>`
  );
};

const viewHeaders = () => {
  for (let i = 0; i < headerList.length; i++) {
    $(".table thead").append(`<th>${headerList[i]}</th>`);
  }
};

const createDataRow = (...args) => {
  const rowData = Array.from(args);
  // const classList = headerList.slice(1);
  let row = "";

  for (let i = 0; i < rowData.length; i++) {
    const option = headerList[i].replace(/\s/gi, "-").toLowerCase();
    let val = rowData[i] ? rowData[i] : "";
    if (val instanceof Array)
      val = rowData[i][0] + "<br>" + "ID: " + rowData[i][1];
    row += `<td class="cell-data ${option}">${val}</td>`;
  }

  return row;
};

const viewData = (arr) => {
  for (record of arr) {
    const {
      id,
      PartnerName,
      PartnerID,
      PartnerMngr,
      Address,
      Phone,
      Email,
      FSID,
      ProjectedAmount,
      Amount,
      TrainingType,
      Credential,
    } = record;

    const { StreetAdrs, City, State, Zip, County } = Address;
    const fullAddress = `${StreetAdrs}<br>${City.toUpperCase()}<br>${State} - ${Zip}`;

    $(".table tbody").append(
      `<tr class='table-row' id=${id} title='click to Edit'></tr>`
    );

    $(".table tbody tr:last-child").append(
      `${createDataRow(
        [PartnerName, PartnerID],
        PartnerMngr,
        fullAddress,
        County,
        Phone,
        Email,
        FSID,
        ProjectedAmount,
        Amount,
        TrainingType,
        Credential
      )}`
    );
  }
};

//* Flattens a nested JSON object
const flatten = (obj, path = "") => {
  if (!(obj instanceof Object)) return { [path.replace(/\.$/g, "")]: obj };

  return Object.keys(obj).reduce((output, key) => {
    return obj instanceof Array
      ? { ...output, ...flatten(obj[key], path) }
      : { ...output, ...flatten(obj[key], key + ".") };
  }, {});
};

const createListFields = (num, arr) => {
  const selectedRecord = arr.filter((record) => record.id === num);
  const flattenedRecord = flatten(selectedRecord);
  const keyList = Object.keys(flattenedRecord);
  const list = keyList.map((key, indx) => [
    key,
    labelList[indx],
    flattenedRecord[key],
  ]);

  return list;
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
  createNewRecord();
  viewHeaders();
  viewData(ielcePartnersData);

  // //* Adding a new partner

  // //* Select partner
  $("[title^='click'").click(function () {
    const rowID = Number($(this).attr("id"));
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
});
