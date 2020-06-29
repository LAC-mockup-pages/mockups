// Actions and logic

const agencyData = agencyDataFund;
let updatedAgencyDataFund = {};

const headerList = [
  "Label",
  "Source Name",
  "Amount",
  "Begin Date",
  "End Date",
  "Contrat / Grant #",
  "Purpose"
];

const rowLabels = {
  FundAbbrev: "Source Name",
  FundStart: "Begin Date",
  FundEnd: "End Date",
  FundNumber: "Contrat / Grant #"
};

const createFiscalYear = str => {
  const date = new Date(str);
  return date.getFullYear();
};

const currencyFormat = str => {
  return !str
    ? ""
    : "$ " +
        Number(str)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const dateFormat = str => {
  const date = new Date(str);
  const month =
    date.getMonth() < 9
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString();

  const day =
    date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString();

  return `${month}/${day}/${date.getFullYear()}`;
};

const viewData = sources => {
  let bodyBloc = "";
  for (let item of sources) {
    const ID = item.ID;
    const FSID = item.FSID;
    const FundAbbrev = item.FundAbbrev;
    const Amount = item.Amount;
    const Purpose = item.Purpose;
    const FundNumber = item.FundNumber;
    const FundStart = dateFormat(item.FundStart);
    const FundEnd = dateFormat(item.FundEnd);
    const fiscalYear = createFiscalYear(FundEnd);

    bodyBloc += `
    <tr class="table-row" title="Click to Edit" data-source-id=${ID}-${FSID}>
        <td>${FundAbbrev}</td>
        <td>${currencyFormat(Amount)}</td>
        <td class="date">${FundStart}</td>
        <td class="date">${FundEnd}</td>
        <td class="fiscalYear">${fiscalYear}</td>
        <td>${FundNumber}</td>
        <td class="purpose">${Purpose}</td>
    </tr>`;
  }
  return bodyBloc;
};

const createListFields = row => {
  const sourceName = Object.keys(agencyDataFund)[row];
  const listValues = Object.keys(agencyDataFund[sourceName]).map(
    key => agencyDataFund[sourceName][key]
  );
  // listValues.push(CurrentFY);
  listValues.unshift(sourceName);
  console.log("listValues :", listValues);
  return headerList.map((item, indx) => [item, listValues[indx]]);
};

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").click(function() {
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  // * data viewing
  $("tbody").append(viewData(agencyData));

  //* Adding a new funding source

  //* Select funding source
  $("[title^='Click'").click(function() {
    const rowIndx = $(this)[0].rowIndex - 1;

    const listFields = createListFields(rowIndx);

    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();
    $(".modal-body").append("<form id='modal-form'></form>");

    for (field of listFields) {
      const key = field[0],
        val = field[1],
        indx = listFields.indexOf(field);

      let option = "";

      if (!indx) option = "disabled";
      if ([1, 3, 4].includes(indx)) option = "required";

      $(".modal-body>form").append(
        `<div class="input-field">
          <label for=${indx}>${key}</label>
          <input type="text" id=${indx} value='${val}' ${option}>
        </div>`
      );
    }
  });

  //* Deleting source
  $("#delete-btn").click(() => {
    const deleteConfirm = $(".modal-footer>h3");

    if (deleteConfirm.length === 0) {
      $(".modal-footer").prepend(
        "<h3 class='delete-msg'>Confirm deletion by clicking again the DELETE button</h3>"
      );
    } else {
      deleteConfirm.remove();
    }
  });
});
