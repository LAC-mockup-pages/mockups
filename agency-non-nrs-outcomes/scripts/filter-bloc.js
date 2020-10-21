//* Filter by category

export const createFilterBloc = () => {
  const primarySelect = "Category select";

  let bloc = `
<form  class="form sort-select container-fluid row" role="form" id="filter-form">
  <div class="col-md-8" id="primary-select">${primarySelect}</div>
  <div class="col-md-4">
    <button type="button" id="filter-cancel-btn" form="filter-form" class="btn btn-default">Clear filters</button>
  </div>
</form>`;

  return bloc;
};
