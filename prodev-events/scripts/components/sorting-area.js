// Block for sorting events in main-table

export const createSortZone = () => {
  const selectList = [
    {
      ProfDevActivityName: "Name",
      ProfDevDate: "Date",
      ProfDevProviderID: "Provider",
      ProfDevLocationID: "Location",
      ProfDevCategoryID: "Category",
      ProfDevSubjectID: "Subject",
      ProfDevFacilitator: "Facilitator"
    }
  ];

  const primaryList = Object.keys(selectList[0]).map((key) => {
    const value = selectList[0][key];
    return { key, value };
  });
  console.log("primaryList :>> ", primaryList);

  const primarySelect = elementSelectModal({
    hashTable: primaryList,
    keyValue: "primary-sort",
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
