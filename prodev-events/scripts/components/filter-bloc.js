// Block for sorting events in main-table
import {
  facilitatorList,
  providerList,
  locationList,
  categoryList,
  subjectList,
  fiscalYearList
} from "./../main.js";

export const createFilterBloc = () => {
  const selectList = [
    {
      ProfDevActivityName: "Name",
      ProfDevDate: "Date",
      ProfDevFY: "Fiscal Year",
      ProfDevProviderID: "Provider",
      ProfDevLocationID: "Location",
      ProfDevCategoryID: "Category",
      ProfDevSubjectID: "Subject",
      ProfDevFacilitator: "Facilitator"
    }
  ];

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
  // console.log("primaryList :>> ", primaryList);

  const primarySelect = elementSelectModal({
    hashTable: primaryList,
    keyValue: "primary-filter",
    selectedValue: "",
    labelVal: "Select first:",
    labelClassVal: "class='blue-light-text'",
    option: "",
    optionText: ""
  });

  let sortingBloc = ` <div  class="sort-select container-fluid row">
    <div class="col-md-5">${primarySelect}</div>
    <div class="col-md-2"></div>
    <div class="col-md-5" id="secondary-select">
      <div class="input-field form-group">
        <label for="secondary" class="blue-light-text">Select second:</label>
        <select class="modal-select" name="secondary" disabled>
        <option>Select an option</option></select>
      </div>
    </div>
  </div>`;

  return sortingBloc;
};

export const createSecondarySelect = (fieldName) => {
  console.log("fieldName :>> ", fieldName);
  let secondary =
    "<div class='col-md-5' id='new-secondary-select'><h3>Secondary select</h3></div>";
  // const tdList = $(`[data-name=${fieldName}]`).get();
  const tdList = $("[data-label='Subject']").get();

  console.log("tdList :>> ", tdList);
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

  const hashTable = secondaryList.sort((rec1, rec2) => {
    return rec1.value < rec2.value ? -1 : rec1.value > rec2.value ? 1 : 0;
  });
  console.log("secondaryList :>> ", secondaryList);
  console.log("hashTable :>> ", hashTable);

  const secondarySelect = elementSelectModal({
    hashTable,
    keyValue: "secondary-filter",
    selectedValue: "",
    labelVal: "Select second:",
    labelClassVal: "class='blue-light-text'",
    option: `data-field=${fieldName}`,
    optionText: ""
  });

  return `<div class="col-md-5" id="secondary-select">${secondarySelect}</div>`;
};