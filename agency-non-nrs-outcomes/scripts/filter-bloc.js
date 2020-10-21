//* Filter by category

import { dataOutcomes, categories } from "./index.js";

export const createFilterBloc = () => {
  const tempSet = new Set();
  for (const record of dataOutcomes) {
    const { Category } = record;
    tempSet.add(Category);
  }
  const categoryList = Array.from(tempSet).sort((item1, item2) =>
    item1 < item2 ? -1 : item1 > item2 ? 1 : 0
  );
  const hashTable = categories.filter((record) =>
    categoryList.includes(record.Category)
  );

  const primarySelect = elementSelectModal({
    hashTable,
    keyValue: "OutComeSortOrder",
    selectedValue: "",
    labelVal: "Filter by: ",
    labelClassVal: "class='blue-light-text filter-select'",
    option: "",
    optionText: ""
  });

  let bloc = `
<form  class="form sort-select container-fluid row" role="form" id="filter-form">
  <div class="col-md-8" id="primary-select">${primarySelect}</div>
  <div class="col-md-4">
    <button type="button" id="filter-cancel-btn" form="filter-form" class="btn btn-default">Clear filters</button>
  </div>
</form>`;

  return bloc;
};
