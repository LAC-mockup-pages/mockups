// Block for sorting events in main-table

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

  const primaryList = Object.keys(selectList[0]).map((key) => {
    const value = selectList[0][key];
    return { key, value };
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

export const createSecondarySelect = () => {
  let secondary =
    "<div class='col-md-5' id='new-secondary-select'><h3>Secondary select</h3></div>";
  return secondary;
};
