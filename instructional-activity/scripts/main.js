// Actions and logic

//Data files
export const courseList = GetCourse.slice(0);
export const instructorList = GetInstructor.slice(0);
// Imports
import { createNewRecordForm } from "./components/AddNewRecord.js";
import {
  createFilterBloc,
  createShortList,
  createSecondarySelect
} from "./components/FilterBloc.js";
import { createDetailsView } from "./components/DetailsView.js";
import {
  createModalForm,
  addClassIdAndDescription
} from "./components/ModalForm.js";
import { addInstructor } from "./components/Instructors.js";
import { addSpecialProgram } from "./components/Recommended.js";
import { saveSchedule } from "./components/Schedule.js";
import { saveFundingSources } from "./components/FundingSources.js";
import { createEnrollmentView } from "./components/EnrollmentView.js";
// Main elements
export const rowLabels = [
  {
    ID: "ID",
    CourseID: "Course Name",
    ClassID: "Instruction Code",
    InstructionDescription: "Description",
    StartDate: "Start",
    EndDate: "End",
    FY: "Fiscal Year",
    ClassType: "Type",
    InstructorID: "Instructor",
    UpperLevel: "Level",
    SiteName: "Site Name",
    Format: "Format"
  }
];

export const setFiscalYear = (datePD) => {
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

export const setDefaultDate = () => {
  let firstDay = "07/01";
  let lastDay = "06/30";
  const fiscalYear = Number(setFiscalYear(Date.now()));
  firstDay += `/${(fiscalYear - 1).toString()}`;
  lastDay += `/${fiscalYear.toString()}`;
  return [firstDay, lastDay];
};

// Creates header with optional button, optional column headers
// (from list parameter). 1st param is bloc title.
// list = [["column name 1", "col-sm-2"],...] the width is in Grid
// Bootstrap format.
export const topBanner = (title, list = null) => {
  let headerLine = "";
  const blockName = title.toLowerCase().replace(/\W/gi, "-");

  // Sets the blocs displaying a button.
  const buttonList = [
    { title: "Funding", btnText: "Save", btnClass: "save-record-btn" },
    { title: "Schedule", btnText: "Save", btnClass: "save-record-btn" },
    { title: "Instructors", btnText: "Add", btnClass: "add-record-btn" },
    { title: "Special Program", btnText: "Add", btnClass: "add-record-btn" }
  ];
  const formName = `form="${blockName}"`;
  let headerButton = "";

  const filteredButtonList = buttonList.filter((item) => item.title === title);
  if (filteredButtonList.length > 0) {
    const { btnText, btnClass } = filteredButtonList[0];
    headerButton = `<button type='button' class="btn btn-default ${btnClass} col-sm-2" ${formName}>${btnText}</button>`;
  }

  if (list) {
    headerLine +=
      "<div class='container-fluid row sub-header-labels blue-light-bg blue-text'>";
    for (const item of list) {
      const cellName = item[0].toLowerCase().replace(/\W/gi, "-");
      headerLine += `<div class='bloc-${blockName}-${cellName} ${item[1]}'>${item[0]}</div>`;
    }
    headerLine += "</div>";
  }
  return `
  <div class='sub-header blue-bg blue-light-text'>
    <div class="container-fluid row sub-header-bloc">
      ${headerButton}
      <div class='sub-header-title'>${title}</div>
    </div>
    ${headerLine}
  </div>
  `;
};

// Returns a table body with hidden cells, label object and table name
export const tableBody = (
  dataList,
  block,
  hiddenList,
  labelObj = {},
  tableName = ""
) => {
  block = block.toLowerCase().replace(/\W/gi, "-");

  const rows = dataList
    .map((record, indx) => {
      let cells = "";
      const tableData = tableName ? `data-table=${tableName}` : "";
      const trID = record.ID ? record.ID : `${block}-${index}`;
      for (const key in record) {
        if (key === "ID") continue;
        const optionHidden = hiddenList.includes(key) ? " hidden" : "";
        const label = labelObj[key] ? `data-label='${labelObj[key]}'` : "";

        cells += `<td class="cell-data${optionHidden} ${key}"
                  data-field=${key} ${label}>${record[key]}</td>`;
      }

      return `<tr id=${trID} ${tableData} data-toggle="tooltip"
                data-placement="right" data-original-title="Click to Edit">
                ${cells}
              </tr>`;
    })
    .join("");
  return `<div class="${block}-table">
            <table class="table table-bordered">
              <tbody class='${block}-body'>${rows}</tbody>
            </table>
          </div>`;
};

const createTableHeader = (labelsObject) => {
  const {
    CourseID,
    StartDate,
    EndDate,
    ClassType,
    SiteName,
    InstructorID,
    Format
  } = labelsObject;
  const list = [
    CourseID,
    StartDate,
    EndDate,
    ClassType,
    SiteName,
    InstructorID,
    Format
  ];

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const createTableBody = (dataList, labelObj) => {
  let rows = "";
  const hiddenList = ["ID"];
  const labelList = [
    "ID",
    "CourseID",
    "StartDate",
    "EndDate",
    "ClassType",
    "SiteName",
    "InstructorID",
    "Format"
  ];

  for (const record of dataList) {
    // createRow() <== helperFunction.js
    rows += createRow({
      record,
      labelList,
      labelObj,
      hiddenList
    });
  }

  return `<tbody>${rows}</tbody>`;
};

export const createViewBloc = (dataList) => {
  const tableHeader = createTableHeader(rowLabels[0]);

  // Sorting list of records  by descending ID
  const list = dataList.sort((record1, record2) => record2.ID - record1.ID);
  const tableBody = createTableBody(list, rowLabels[0]);
  const viewBloc = tableHeader + tableBody;

  return viewBloc;
};

export const getRequired = () => {
  const list = $("#new-entry input, select").get();
  const requiredList = list
    .filter((item) => $(item).prop("required"))
    .map((item) => $(item).attr("id"));

  return requiredList;
};

const saveMods = (fields, formName, tableName = "", requiredList = []) => {
  const { AgencyID, AuditUserID } = SESSION_VARIABLE[0];
  let result = { AgencyID, AuditUserID };
  $(`${formName} input, select`).removeClass("yellow-bg");
  const fieldList = fields.slice(0);

  // Data validation
  // validateRecord() <== data-check.js
  // const validatedList = validateRecord(fieldList, requiredList);

  // Background color change for invalid field values
  // const checkFlag = validatedList.some((item) => !item.correct);
  //! =================================================
  //! Temporary bypassing data validation
  //! =================================================

  const checkFlag = false;

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
      result[name] = val;
    }
    const target = tableName ? tableName : "No table name";
    const resultList = [formName, target, JSON.stringify(result)];
    console.table(result);
    //! =================================================
    //! JSON Object to send back to database
    console.log("result :", resultList);
    console.log("result :", result);
    //! =================================================

    //ToDO Reloading/resetting with new data

    if (formName === "#edit-form") $("#modalBloc").modal("toggle");
    if (formName === "#new-entry") {
      const resetList = requiredList.map((field) => `#${field}`).join(", ");
      $(formName)[0].reset();
      $(resetList).toggleClass("dark-text").prop("required", true);

      //! =================================================
      //! Response from POST request is used to display the
      //! Details page and add other required and optional
      //! data.
      //! =================================================
      // const response = [{ ID: "99999", ...result }];
      // return response;
    }
  }
};

//*=================================================
//* jQuery section
//*=================================================

$(document).ready(() => {
  //* Selecting subnavbar tabs
  // $(document).on("click", "#sub-nav li", function (evnt) {
  //   $("#sub-nav li").removeClass("blue-light-bg blue-text");
  //   $(this).toggleClass("blue-light-bg blue-text");
  // });

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
  $("#new-entry").append(createNewRecordForm());
  $("#filter-bloc").append(createFilterBloc());

  // Enables customized tooltips
  $("[data-toggle='tooltip']").tooltip();

  // console.log("response object: >> ", Object.keys(responseObj[0]));

  // Add default date to date fields in #new-entry after focus out
  // Field Begin value: "07/01/<CurrentFiscalYear>"
  // Field End value: "06/30/<CurrentFiscalYear>"
  $(document).on("focusout", "#StartDate, #EndDate", function (evnt) {
    evnt.stopPropagation();
    if (!$(this).val()) {
      const [firstDay, lastDay] = setDefaultDate();
      $(this).val($(this).attr("id") === "StartDate" ? firstDay : lastDay);
    }
  });

  // Change text color from red (required) to black
  // when a value is entered
  $(document).on("focusin", getRequired(), function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  //* Displaying #new-entry
  $(document).on("click", "#add-new-record", function (evnt) {
    evnt.stopPropagation();
    $("#new-entry").toggleClass("hidden");
  });

  // Enables customized tooltips
  $("[data-toggle='tooltip']").tooltip();

  //* Change event in filter bloc
  $(document).on("change", "#primary-filter-view", function (evnt) {
    evnt.stopPropagation();
    const selectedField = $(this).val();
    const selectedYear = $("#fiscal-year-select").val();
    const newSecondarySelect = createSecondarySelect(
      selectedYear,
      selectedField
    );
    if (newSecondarySelect) {
      $("#secondary-select").replaceWith(newSecondarySelect);
    }
  });

  //* Applying filters
  $(document).on("click", "#filter-apply-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const filterList = $(formId).serializeArray();
    const [selectedYear, selectedCategory, selectedValue] = filterList;
    let shortList = [];

    if (selectedCategory.value) {
      if (selectedValue.value) {
        shortList = createShortList(
          selectedYear.value,
          selectedCategory.value,
          selectedValue.value
        );
      }
    } else {
      shortList = createShortList(selectedYear.value);
    }
    $("#main-table").empty().append(createViewBloc(shortList));

    // Enables customized tooltips
    $("[data-toggle='tooltip']").tooltip();
  });

  // Change text color from red (required) to black
  // when a value is entered
  const listOfRequired = getRequired();
  const reqString = listOfRequired.map((field) => `#${field}`).join(",");
  $(document).on("focusin", reqString, function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  //* Adding a new record
  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const newSource = $(formId).serializeArray();
    const response = saveMods(newSource, formId, "GetCourse", listOfRequired);

    // Hide all children of .hero and display Details page
    // to finish entering all necessary and optional data
    detailsView(response);
  });

  //* Canceling
  $(document).on(
    "click",
    "#cancel-btn, #event-view-cancel-btn, #filter-cancel-btn",
    function (evnt) {
      evnt.preventDefault();
      evnt.stopPropagation();
      // const formId = "#" + $(this).attr("form");
      location.reload();
      // if (formId === "#new-entry") location.reload();
      // if (formId === "#event-view-form") $(formId)[0].reset();
    }
  );

  //* Special program handling when IET is selected
  //TODO Add trigger, event handler
  // $(document).on('change',"#")

  //* Editing bloc
  $(document).on("click", ".field-bloc", function (evnt) {
    evnt.stopPropagation();
    const formId = $(this).attr("id");
    // console.log("formId :>> ", formId);
    const formName = formId.replace("-form", "");
    // console.log("formName :>> ", formName);
    const fieldSource = $(`#${formId} .input-field`).clone();

    // console.log("fieldSource :>> ", fieldSource);

    const editFormContent = createModalForm(fieldSource);
    $("#modalBloc").modal("toggle");
    $("#edit-form").empty().append(editFormContent);
    $("#edit-form").attr("data-bloc", formName);
  });

  //* Clicking back to IA Course Offering view
  $(document).on("click", "#offering", function (evnt) {
    evnt.stopPropagation();
    location.reload();
  });

  //* Select record to display
  $(document).on("click", "#main-table tr", function (evnt) {
    evnt.stopPropagation();
    const rowId = $(this).attr("id");
    const selectedCourse = courseList.find((course) => course.ID === rowId);
    const { ClassID } = selectedCourse;

    const enrollmentView = createEnrollmentView(rowId, ClassID);
    const courseView = createDetailsView(selectedCourse);

    // Cleaning up
    $(".record-entry, #filter-bloc").toggleClass("hidden");
    $("#view-bloc").empty().append(enrollmentView);
    // $("#view-bloc").empty().append(courseView);
    $("html, body").animate({ scrollTop: 220 }, 200);
    $("#offering").removeClass();
    $("#enrollment").addClass("blue-light-bg blue-text");

    // Enables customized tooltips
    $("[data-toggle='tooltip']").tooltip();
  });

  //* Handling change for special program selected
  $(document).on("change", "#SpecialProgramID-view", function (evnt) {
    evnt.stopPropagation();
    const programCode = $(this).value();

    console.log("programCode :>> ", programCode);
    if (programCode === "IET") {
      $("#IET_Class_PKID-view").prop("disabled", false);
    } else {
      $("#IET_Class_PKID-view").val("");
    }
  });

  //* Saving after Editing in Modal
  $(document).on("click", "#save-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = "#" + $(this).attr("form");
    const blocName = $(formId).data("bloc");
    const newSource = $(formId).serializeArray();
    let fieldList =
      blocName === "main-info"
        ? addClassIdAndDescription(newSource, instructorList)
        : newSource;

    const courseId = $(".course-details").attr("id");
    fieldList = [{ name: "ID", value: courseId }, ...fieldList];

    saveMods(fieldList, formId, "GetCourse");
  });

  //* Editing instructor/special program
  $(document).on(
    "click",
    ".instructors-body > tr, .special-program-body > tr",
    function (evnt) {
      evnt.stopPropagation();
      const rowId = $(this).attr("id");
      console.log("rowId :>> ", rowId);
      const table = $(`#${rowId}`).attr("data-table");
      console.log("table :>> ", table);

      const formContent =
        table === "GetSpecialProgram" ? addSpecialProgram(rowId, table) : "";

      $("#modalBloc").modal("toggle");
      $("#edit-form").empty().append(formContent);
      $("#edit-form").attr("data-bloc", table);
    }
  );

  //* Adding an instructor/special program
  $(document).on("click", ".add-record-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = $(this).attr("form");
    let formContent = "";
    if (formId === "instructors") {
      formContent = addInstructor();
    }
    if (formId === "special-program") {
      formContent = addSpecialProgram();
    }

    $("#modalBloc").modal("toggle");
    $("#edit-form").empty().append(formContent);
    $("#edit-form").attr("data-bloc", formId);
  });

  //* Saving schedule/funding sources
  $(document).on("click", ".save-record-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = $(this).attr("form");
    let savedData = [];
    if (formId === "schedule") {
      savedData = saveSchedule();
    } else {
      savedData = saveFundingSources();
    }
    console.log("savedData :>> ", savedData);

    saveMods(savedData, formId, "GetCourse");
  });
});