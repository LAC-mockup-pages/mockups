// Actions and logic

const dataPartners = partnersData;
const countyList = countyData;
const labelObj = {
  ID: "ID",
  AgencyID: "agencyId",
  ReferralSiteID: "Partner ID",
  ReferralSiteName: "Partner Name",
  ReferralSiteManager: "Manager",
  Address: "Address",
  City: "City",
  State: "State",
  Zip: "ZIP",
  County: "County Code",
  CountyDesc: "County",
  Telephone: "Phone",
  ReferralSiteEmail: "Email",
};

const createNewRecord = () => {
  for (let i = 0; i < placeholderList.length; i++) {
    const newLine = "";

    $("#new-partner").append(`${newLine}<input
    type="text"
    class="form-control"
    placeholder='${placeholderList[i]}'
    required
  />`);
  }

  $("#new-partner").append(
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add New Partner</button>`
  );
};

const createHeaders = (labels) => {
  const headers = labels.map((label) => `<th>${label}</th>`).join("");
  return `<thead>${headers}</thead>`;
};

const createBody = (dataList, labels) => {
  let rows = "";

  return `<tbody>${rows}</tbody>`;
};

const createViewBloc = (dataObj, labels) => {
  const labelList = [];
  for (let label in labels) {
    const value = labels[label];
    const excludedLabels = [
      "ID",
      "agencyId",
      "City",
      "State",
      "ZIP",
      "County Code",
    ];
    if (!excludedLabels.includes(value)) {
      labelList.push(value);
    }
  }
  const headerLine = createHeaders(labelList);
  const tableBody = createBody(dataObj, labelList);

  $("#view-bloc").append(
    `<table class="table">${headerLine}${tableBody}</table>`
  );
};

const createDataRow = (...args) => {
  const rowData = Array.from(args);
  const classList = headerList.slice(1);
  let row = "";

  for (let i = 0; i < rowData.length; i++) {
    const option = classList[i].replace(/\s/gi, "-").toLowerCase();
    row += `<td class="cell-data ${option}">${rowData[i]}</td>`;
  }

  return row;
};

// const viewData = (arr) => {
//   for (record of arr) {
//     const {
//       id,
//       PartnerName,
//       PartnerID,
//       PartnerMngr,
//       Address,
//       Phone,
//       Email,
//     } = record;

//     const { StreetAdrs, City, State, Zip, County } = Address;
//     const fullAddress = `${StreetAdrs}<br>${City.toUpperCase()}<br>${State} - ${Zip}`;
//     const rowContent = createDataRow(
//       PartnerName,
//       PartnerID,
//       PartnerMngr,
//       fullAddress,
//       County,
//       Phone,
//       Email
//     );
//     $(".table tbody").append(
//       `<tr class='table-row' id=${id} title='click to Edit'>${rowContent}</tr>`
//     );
//   }
// };

// //* Flattens a nested JSON object
// const flatten = (obj, path = "") => {
//   if (!(obj instanceof Object)) return { [path.replace(/\.$/g, "")]: obj };

//   return Object.keys(obj).reduce((output, key) => {
//     return obj instanceof Array
//       ? { ...output, ...flatten(obj[key], path) }
//       : { ...output, ...flatten(obj[key], key + ".") };
//   }, {});
// };

// const createListFields = (num) => {
//   const selectedRecord = partData.filter((record) => record.id === num);
//   const flattenedRecord = flatten(selectedRecord);
//   const keyList = Object.keys(flattenedRecord);
//   const list = keyList.map((key, indx) => [
//     key,
//     labelList[indx],
//     flattenedRecord[key],
//   ]);

//   return list;
// };

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
  createViewBloc(dataPartners, labelObj);
  // createNewRecord();

  //* Adding a new partner

  //* Select partner
  $("[title^='click'").click(function () {
    const rowID = Number($(this).attr("id"));
    const listFields = createListFields(rowID);
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

  // //* Deleting source
});
