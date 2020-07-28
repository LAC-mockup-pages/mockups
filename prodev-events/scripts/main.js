// Actions and logic
import { createEventView } from "./components/event-view.js";

// Isolate work objects and arrays from data source.
const dataSource = ProfDevEventsInfo.slice(0);
export const facilitatorList = Facilitator.slice(0);
export const providerList = Providers.slice(0);
export const locationList = Locations.slice(0);
const fiscalYearList = FiscalYear.slice(0);
export const categoryList = Categories.slice(0);
export const subjectList = Subjects.slice(0);
export const sessionList = [
  { key: "morning", name: "Morning" },
  { key: "afternoon", name: "Afternoon" },
];
const stateList = States.slice(0);

const rowLabels = [
  {
    ID: "ID",
    ProfDevActivityName: "Name",
    ProfDevDate: "Date",
    ProfDevDescription: "Session",
    ProfDevProviderID: "Provider",
    profdevProvider: "Provider",
    ProfDevLocationID: "Location",
    profdevLocation: "Location",
    ProfDevFY: "Fiscal Year",
    ProfDevCategoryID: "Category",
    profdevCategory: "Category",
    ProfDevSubjectID: "Subject",
    profdevSubject: "Subject",
    ProfDevTimeFrom: "Start Time",
    ProfDevTimeTo: "End Time",
    ProfDevHours: "Hours",
    ProfDevFacilitator1: "Facilitator1",
    profdevFac1: "Facilitator1",
    ProfDevFacilitator2: "Facilitator2",
    profdevFac2: "Facilitator2",
    ProfDevFacilitator3: "Facilitator3",
    profdevFac3: "Facilitator3",
    ProfDevFeeCharged: "Fee",
    RAENEvent: "RAEN Event",
    ProfDevComments: "Comments",
  },
];

const setFiscalYear = (datePD) => {
  const dateEvent = new Date(datePD);
  const currentYear = dateEvent.getFullYear();
  const startFY = new Date(`07/01/${currentYear}`);
  const endYear = new Date(`12/31/${currentYear}`);
  if (dateEvent >= startFY) {
    if (dateEvent <= endYear) {
      return (currentYear + 1).toString();
    } else {
      return currentYear.toString();
    }
  } else {
    return currentYear.toString();
  }
};

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = [
    "ProfDevActivityName",
    "ProfDevDescription",
    "ProfDevDate",
    "ProfDevProviderID",
    "ProfDevCategoryID",
    "ProfDevSubjectID",
    "ProfDevFacilitator1",
    "ProfDevLocationID",
  ];
  const hiddenList = [
    "profdevProvider",
    "profdevLocation",
    "profdevCategory",
    "ProfDevFY",
    "profdevSubject",
    "profdevFac1",
    "profdevFac2",
    "profdevFac3",
    "ProfDevHours",
    "ProfDevFacilitator2",
    "ProfDevFacilitator3",
    "ProfDevFeeCharged",
    "ProfDevComments",
    "ProfDevTimeFrom",
    "ProfDevTimeTo",
  ];
  const keyList = Object.keys(labelObj).filter(
    (key) => !["ID", "RAENEvent"].includes(key)
  );
  for (const key of keyList) {
    let element = "";
    let option = "";
    let type = "text";
    let classOption = "";
    let placehold = labelObj[key];

    if (key === "ProfDevDescription") {
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: sessionList,
        keyValue: key,
        option,
        optionText: "a session",
        classOption,
      });
    } else if (key === "ProfDevProviderID") {
      const shortList = providerList.map((item) => {
        return { ID: item.ID, name: item.ProviderName };
      });
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: shortList,
        keyValue: key,
        option,
        optionText: "a provider",
        classOption,
      });
    } else if (key === "ProfDevLocationID") {
      const shortList = locationList.map((item) => {
        return { ID: item.ID, name: item.FacilityName };
      });
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: shortList,
        keyValue: key,
        option,
        optionText: "a location",
        classOption,
      });
    } else if (key === "ProfDevCategoryID") {
      const shortList = categoryList.map((item) => {
        return { ID: `${item.CATEGORYID}`, name: item.Category };
      });
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: shortList,
        keyValue: key,
        option,
        optionText: "a category",
        classOption,
      });
    } else if (key === "ProfDevSubjectID") {
      const shortList = subjectList.map((item) => {
        return { ID: `${item.SubjectID}`, name: item.SubjectDesc };
      });
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: shortList,
        keyValue: key,
        option,
        optionText: "a subject",
        classOption,
      });
    } else if (key === "ProfDevFacilitator1") {
      const shortList = facilitatorList
        .sort((record1, record2) => record1.FacLastName - record2.FacLastName)
        .map((item) => {
          return {
            ID: item.ID,
            name: `${item.FacLastName} ${item.FacFirstName}`,
          };
        });
      option =
        " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: shortList,
        keyValue: key,
        option,
        optionText: "a facilitator",
        classOption,
      });
    } else {
      if (requiredList.includes(key)) {
        option =
          " required data-toggle='tooltip' data-placement='bottom' title='Please fill this field'";
      }
      if (hiddenList.includes(key)) classOption += " hidden";
      if (key === "ProfDevDate") placehold += " (MM/DD/YYYY)";

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
  return result.join("");
};

const createTableHeader = (labelsObject) => {
  const list = Object.entries(labelsObject)
    .filter(
      (label) =>
        ![
          "ID",
          "ProfDevFY",
          "ProfDevProviderID",
          "ProfDevLocationID",
          "ProfDevCategoryID",
          "ProfDevSubjectID",
          "ProfDevFacilitator1",
          "ProfDevFacilitator2",
          "ProfDevFacilitator3",
          "profdevFac1",
          "profdevFac2",
          "profdevFac3",
          "ProfDevFeeCharged",
          "RAENEvent",
          "ProfDevComments",
          "ProfDevTimeFrom",
          "ProfDevTimeTo",
        ].includes(label[0])
    )
    .map((label) => label[1]);

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const createTableBody = (dataList, labelObj) => {
  let rows = "";
  const hiddenList = [
    "ID",
    "ProfDevFY",
    "ProfDevProviderID",
    "ProfDevLocationID",
    "ProfDevCategoryID",
    "ProfDevSubjectID",
    "ProfDevFacilitator1",
    "ProfDevFacilitator2",
    "ProfDevFacilitator3",
    "profdevFac1",
    "profdevFac2",
    "profdevFac3",
    "ProfDevFeeCharged",
    "RAENEvent",
    "ProfDevComments",
    "ProfDevTimeFrom",
    "ProfDevTimeTo",
  ];

  const filteredLabelList = Object.keys(labelObj).filter(
    (item) => !["AgencyID"].includes(item)
  );
  for (const recordObj of dataList) {
    const {
      ProfDevProviderID,
      ProfDevLocationID,
      ProfDevCategoryID,
      ProfDevSubjectID,
    } = recordObj;
    const profdevProvider = providerList.find(
      (item) => item.ID === ProfDevProviderID
    ).ProviderName;

    const profdevLocation = locationList.find(
      (item) => item.ID === ProfDevLocationID
    ).FacilityName;

    const profdevCategory = categoryList.find(
      (item) => item.CATEGORYID === +ProfDevCategoryID
    ).Category;

    const profdevSubject = subjectList.find(
      (item) => item.SubjectID === +ProfDevSubjectID
    ).SubjectDesc;

    const record = {
      ...recordObj,
      profdevProvider,
      profdevLocation,
      profdevCategory,
      profdevSubject,
    };
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
const createViewBloc = () => {
  const tableHeader = createTableHeader(rowLabels[0]);

  // Sorting list of records alphabetically by descending date
  const list = dataSource.sort(
    (record1, record2) =>
      new Date(record2.ProfDevDate) - new Date(record1.ProfDevDate)
  );
  const tableBody = createTableBody(list, rowLabels[0]);
  const viewBloc = tableHeader + tableBody;
  return viewBloc;
};

const getRequired = () => {
  const list = $("#new-entry input, select").get();
  const requiredList = list
    .filter((item) => $(item).prop("required"))
    .map((item) => $(item).attr("id"));
  return requiredList;
};

const saveMods = (fields, formName, tableName = "") => {
  const { AgencyID, AuditUserID } = sessionVariable;
  const result = { AgencyID, AuditUserID };
  $(`${formName} input, select`).removeClass("yellow-bg");
  const fieldList = fields.slice(0);
  const requiredList = getRequired();
  const dateEvent = fieldList.find((item) => item.name === "ProfDevDate").value;

  // Data validation
  // validateNewRecord() <== data-check.js
  const validatedList = validateRecord(fieldList, requiredList);
  // Background color change for invalid field values
  const checkFlag = validatedList.some((item) => !item.correct);

  if (checkFlag) {
    const list = validatedList.filter((obj) => obj.correct === false);
    for (let field of list) {
      let fieldId =
        formName === "#new-entry" ? `#${field.name}` : `#${field.name}-view`;
      $(fieldId).addClass("yellow-bg");
    }
    return;
  } else {
    for (const field of fieldList) {
      let val = field.value;
      let name = field.name;
      if (name === "ProfDevFY") val = setFiscalYear(dateEvent);
      result[name] = val;
    }

    const target = tableName ? tableName : "No table name";
    const resultList = [formName, target, JSON.stringify(result)];
    console.table(result);
    //! =================================================
    //! JSON Object to send back to database
    console.log("result :", resultList);
    //! =================================================

    //ToDO Reloading/resetting with new data

    // if (formName === "#edit-form") $("#modalBloc").modal("toggle");
    if (formName === "#new-entry") {
      const resetList = getRequired()
        .map((field) => `#${field}`)
        .join(",");
      $(formName)[0].reset();
      $(resetList).toggleClass("dark-text").prop("required", true);
    }
  }
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
  $(".record-entry").append(`<div class="container-fluid buttons-bloc-new">
    <button type="button" id="cancel-btn" form="new-entry"
      class="btn btn-default pull-right">Cancel</button>
    <button type="button" id="submit-btn" form="new-entry"
      class="btn dark-blue-text blue-light-bg pull-right">Add</button>
  </div>`);
  $("#main-table").append(createViewBloc());

  // Change text color from red (required) to black
  // when a value is entered
  const reqList = getRequired()
    .map((field) => `#${field}`)
    .join(",");
  $(document).on("focusin", reqList, function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });
  // Enables customized tooltips
  $("[data-toggle='tooltip']").tooltip();

  //* Adding a new partner
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const newSource = $(formId)
      .serializeArray()
      .filter((field) => field.name.startsWith("ProfDev"));
    saveMods(newSource, formId, "ProfDevEventsInfo");
  });

  //* Canceling
  $(document).on("click", "#cancel-btn", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    location.reload();
  });

  //* Select record to edit + display selected event & roster
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.stopPropagation();

    const rowID = "#" + $(this).attr("id");
    const selectedRow = $(`${rowID} td`).get();
    const requiredList = getRequired();
    const eventView = createEventView(selectedRow, requiredList);
    // Cleaning up
    $(".record-entry").toggleClass("hidden");
    $("#view-bloc").empty().append(eventView);

    //   const editForm = createModalForm(selectedRow);
    //   $("#modalBloc").modal("toggle");
    //   $("#edit-form").empty().append(editForm);

    // Enables customized tooltips
    $("[data-toggle='tooltip']").tooltip();
  });

  //* Saving mods after editing selected record
  // $(document).on("click", "#save-btn", function (evnt) {
  //   evnt.preventDefault();
  //   evnt.stopPropagation();
  //   const formId = "#" + $(this).attr("form");
  //   const newSource = $(formId).serializeArray();
  //   saveMods(newSource, formId, "Facilitator");
  // });
});
