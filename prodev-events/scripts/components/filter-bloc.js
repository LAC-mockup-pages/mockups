// Block for sorting events in main-table
import { dataSource } from "./../main.js";
const selectList = [
  {
    ProfDevFY: "Fiscal Year",
    ProfDevProviderID: "Provider",
    ProfDevLocationID: "Location",
    ProfDevCategoryID: "Category",
    ProfDevSubjectID: "Subject"
  }
];

export const createFilterBloc = () => {
  const primaryList = Object.keys(selectList[0])
    .map((key) => {
      const value = selectList[0][key];
      return { key, value };
    })
    .sort((record1, record2) => {
      return record1.value < record2.value
        ? -1
        : record1.value > record2.value
        ? 1
        : 0;
    });
  const primarySelect = elementSelectModal({
    hashTable: primaryList,
    keyValue: "primary-filter",
    selectedValue: "",
    labelVal: "First ",
    labelClassVal: "class='blue-light-text filter-select'",
    option: "",
    optionText: "filter option"
  });

  let sortingBloc = `<form  class="form sort-select container-fluid row" role="form" id="filter-form">
    <div class="col-md-4" id="primary-select">${primarySelect}</div>
    <div class="col-md-6" id="secondary-select">
      <div class="input-field form-group">
        <label for="secondary" class="blue-light-text filter-select">Then </label>
        <select class="modal-select" name="secondary" disabled>
        <option>Select filter value</option></select>
      </div>
    </div>
    <div class="col-md-2">
      <button type="button" id="filter-cancel-btn" form="filter-form" class="btn btn-default">Clear filters</button>
    </div>
  </form>`;

  return sortingBloc;
};

export const createSecondarySelect = (fieldName) => {
  let hashTable = [];
  if (fieldName === "ProfDevFY") {
    hashTable = FiscalYear.map((yearObj) => {
      return { FYID: yearObj.FiscalYear, FYValue: yearObj.FiscalYear };
    });
  } else {
    const label = selectList[0][fieldName];
    const tdList = $(`[data-label=${label}]`).get();
    const len = tdList.length;
    const secondaryList = [];
    for (let i = 0; i < len; i += 2) {
      const key = $(tdList[i]).text();
      const value = $(tdList[i + 1]).text();
      if (value) {
        if (!secondaryList.find((obj) => obj.key === key)) {
          secondaryList.push({ key, value });
        }
      }
    }
    hashTable = secondaryList.sort((rec1, rec2) => {
      return rec1.value < rec2.value ? -1 : rec1.value > rec2.value ? 1 : 0;
    });
  }

  const secondarySelect = elementSelectModal({
    hashTable,
    keyValue: "secondary-filter",
    selectedValue: "",
    labelVal: "Then ",
    labelClassVal: "class='blue-light-text filter-select'",
    option: `data-field=${fieldName}`,
    optionText: "filter value"
  });

  return `<div class="col-md-6" id="secondary-select">${secondarySelect}</div>`;
};

export const createShortList = (selectedVal, selectedField) => {
  let selectedData = dataSource;
  //! =================================================
  //! if (selectedField === "ProfDevFY"){
  //!   selectedData = newRequest()
  //!   <make new request to server for data object with>
  //!   <selectedVal and selectedField parameters>
  //! }
  //! =================================================

  const recordList = selectedData.filter(
    (record) => record[selectedField] === selectedVal
  );
  return recordList;
};
