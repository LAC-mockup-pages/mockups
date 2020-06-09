// Actions and logic

const dataOutcomes = outcomesData.slice(0);
const categories = categoryData.slice(0);

const createNewRecord = (list) => {
  // elementSelectNewRecord() <== helpers/helperFunctions.js
  const selectCategory = elementSelectNewRecord({
    hashTable: categories,
    keyValue: "OutcomeSortOrder",
    option: "required",
  });

  $("#new-outcome").append(
    `${selectCategory}
      <input type="text" id="input-new-outcome" class="form-control" name="Description" placeholder="Description" autocomplete="off" spellcheck="true" required>
    <button type="button" id="submit-btn" form="new-outcome" class="btn btn-primary">Add</button>
    <button type="button" id="cancel-btn" class="btn btn-default">Cancel</button>`
  );
};

const createDataList = (list) => {
  const catList = [];
  for (const item of list) {
    if (!catList.includes(item.OutcomeSortOrder)) {
      catList.push(item.OutcomeSortOrder);
    }
  }
  const dataList = catList.map((num) => {
    const category = categoryData.filter(
      (item) => item.OutcomeSortOrder === num
    )[0].Category;
    const outcomes = dataOutcomes
      .filter((item) => item.OutcomeSortOrder === num)
      .map((item) => [item.ID, item.Description]);
    return { cat: category, catId: num, outcomes: outcomes };
  });
  return dataList;
};

const createHeader = (list) => {
  const result = list.map((item) => `<th>${item}</th>`).join("");
  return `<thead>${result}</thead>`;
};

const createBody = (list) => {
  const dataList = createDataList(list);
  const agId = dataOutcomes[0].AgencyID;

  const rows = dataList
    .map((item) => {
      const values = item.outcomes
        .map((arr) => {
          return `<div class="inside-value" id=${arr[0]} title="Click to edit" data-catid=${item.catId}>${arr[1]}</div>`;
        })
        .join("");

      return `<tr id=${item.catId}><td class="cell-data">${item.cat}</td>
    <td>${values}</td>
    </tr>`;
    })
    .join("");

  return `<tbody class="table-body" id=${agId}>${rows}</tbody>`;
};

const createView = (list) => {
  const headerValues = Object.keys(list[0]).slice(3);
  const tableHead = createHeader(headerValues);
  const orderedList = list.sort((a, b) => (a.Category > b.Category ? 1 : -1));
  const tableBody = createBody(orderedList);
  return `<table class="table">${tableHead}${tableBody}</table>`;
};

const mergeArraysToObject = (keysArray, valuesArray) => {
  const result = {};
  const len = keysArray.length;
  for (let i = 0; i < len; i++) {
    const val = valuesArray[i] ? valuesArray[i] : "";
    result[keysArray[i]] = val;
  }
  return result;
};

const mergeHashToObject = (hashTable, obj) => {
  for (let record of hashTable) {
    obj[record.name] = record.value;
  }
  return obj;
};

const saveMods = (formId) => {
  const { AuditUserID, AgencyID } = sessionVariable;
  const resultObj = { AuditUserID, AgencyID };
  const submittedData = $(formId).serializeArray();
  $(`${formId} input`).removeClass("yellow-bg");

  const newDescription = submittedData[1].value;
  if (!alphaNumCheck(newDescription)) {
    $("#input-new-outcome").toggleClass("yellow-bg");
    return;
  }

  for (const field of submittedData) {
    resultObj[field.name] = field.value;
  }

  const message = `Result from ${formId} : >> `;
  console.table(resultObj);
  const result = ["outcomesData", JSON.stringify(resultObj)];
  //! =================================================
  //! JSON Object to send back to database
  console.log(message, result);
  //! =================================================

  //ToDO Reloading/resetting with new data
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

  // * Data viewing
  createNewRecord(categories);
  $("#view-bloc").append(createView(dataOutcomes));

  //* Adding a new outcome
  $("#OutcomeSortOrder-view").bind("change", function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
    const selectedOption = $(this).val();
    const row = $(`#${selectedOption}`).get();
    $(".table-body").empty().append(row);
  });

  $("#input-new-outcome").bind("focus", function (evnt) {
    evnt.stopPropagation();
    $(this).toggleClass("dark-text").prop("required", false);
  });

  $("#cancel-btn").click(() => {
    location.reload();
  });

  $(document).on("click", "#submit-btn", function (evnt) {
    evnt.stopPropagation();
    const formId = `#${$(this).attr("form")}`;
    saveMods(formId);
  });
  //* Select outcome
  $(document).on("click", ".table tbody tr", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const catId = $(this).attr("data-catid");
    const descriptionText = $(this).text();
    const identifier = `${$(this).attr("id")}-${$("tbody").attr("id")}`;

    const optionList = categories
      .map((item) => {
        const selected = item.OutcomeSortOrder === catId ? " selected" : "";
        return `<option value=${item.OutcomeSortOrder}${selected}>
        ${item.Category}</option>`;
      })
      .join("");

    const editForm = `
    <div class="form-group input-field">
      <label for="Category">Category</label>
      <select id="Category" class="modal-select" name="Category">${optionList}</select>
    </div>
    <div class="form-group input-field">
      <label for="Description">Description</label>
      <input type="text" name="Description"
          value='${descriptionText}' spellcheck="true">
    </div>
    `;

    $("#modalBloc").modal("toggle");
    $("#modal-form")
      .empty()
      .append(editForm)
      .attr("data-identifier", identifier);
  });

  //* Saving mods after editing selected outcome
  $("#save-btn").click(function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const form = `#${$(this).attr("form")}`;
    saveMods(form);
    $("#modalBloc").modal("toggle");
  });
});
