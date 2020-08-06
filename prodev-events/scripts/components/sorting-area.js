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
    labelVal: "Select first",
    labelClassVal: "class='blue-light-text'",
    option: "",
    optionText: ""
  });

  let sortingBloc = ` <div container-fluid row class="sort-select">
    <div class="col-md-4">${primarySelect}</div>
    <div class="col-md-4"></div>
    <div class="col-md-4">Select second</div>
  </div>`;

  return sortingBloc;
};
