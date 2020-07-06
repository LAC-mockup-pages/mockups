// Actions and logic

const dataOutcomes = outcomesData.slice(0);
const categories = categoryData.slice(0);

const rowLabels = [
  {
    ID: "ID",
    AgencyID: "agencyId",
    OutcomeSortOrder: "Category",
    Category: "Category",
    Description: "Description",
  },
];

const createNewRecord = (labelsList) => {
  let result = [];
  const labelObj = labelsList[0];
  const requiredList = ["OutcomeSortOrder", "Description"];
  const hiddenList = ["Category"];
  const keyList = Object.keys(labelObj).filter(
    (key) => !["ID", "AgencyID"].includes(key)
  );

  for (key of keyList) {
    let element = "";
    let option = "";
    let type = "text";
    let classOption = " input-field";
    const placehold = labelObj[key];
    if (key === "OutcomeSortOrder") {
      // elementSelectNewRecord() <== helperFunctions()
      element = elementSelectNewRecord({
        hashTable: categories,
        keyValue: key,
        option: " required title='Please fill this field'",
        optionText: "a category",
        classOption,
      });
    } else {
      if (requiredList.includes(key)) {
        option = " required title='Please fill this field'";
      }
      if (hiddenList.includes(key)) classOption += " hidden";

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

  result.push(
    `<button type="button" id="submit-btn" form="new-entry" class="btn btn-primary">Add</button>
    <button type="button" id="cancel-btn" form="new-entry" class="btn btn-default">Cancel</button>`
  );
  return result.join("");
};

// const createDataList = (list) => {
//   const catList = [];
//   for (const item of list) {
//     if (!catList.includes(item.OutcomeSortOrder)) {
//       catList.push(item.OutcomeSortOrder);
//     }
//   }
//   const dataList = catList.map((num) => {
//     const category = categoryData.filter(
//       (item) => item.OutcomeSortOrder === num
//     )[0].Category;
//     const outcomes = dataOutcomes
//       .filter((item) => item.OutcomeSortOrder === num)
//       .map((item) => [item.ID, item.Description]);
//     return { cat: category, catId: num, outcomes: outcomes };
//   });
//   return dataList;
// };

// const createBody = (list) => {
//   const dataList = createDataList(list);
//   const agId = dataOutcomes[0].AgencyID;

//   const rows = dataList
//     .map((item) => {
//       const values = item.outcomes
//         .map((arr) => {
//           return `<div class="inside-value" id=${arr[0]} title="Click to edit" data-catid=${item.catId}>${arr[1]}</div>`;
//         })
//         .join("");

//       return `<tr id=${item.catId}><td class="cell-data">${item.cat}</td>
//     <td>${values}</td>
//     </tr>`;
//     })
//     .join("");

//   return `<tbody class="table-body" id=${agId}>${rows}</tbody>`;
// };

const createTableHeader = (labelsObject) => {
  const list = Object.entries(labelsObject)
    .filter(
      (label) => !["ID", "AgencyID", "OutcomeSortOrder"].includes(label[0])
    )
    .map((label) => label[1]);

  // createHeaders() <== helperFunctions.js
  return createHeaders(list);
};

const displayDescriptions = (outcomeList, labelObj) => {
  console.log("outcomeList :>> ", outcomeList);
  let descriptionBloc = "";
  for (const desc of outcomeList) {
    // console.log("desc :>> ", desc);
    if (desc) {
      const { ID, Description } = desc;

      descriptionBloc += `<div class="outcome-view" id=${ID} title="Click to Edit" data-obj="[${JSON.stringify(
        desc
      )}]">${Description || ""}</div>`;
    }
  }
  return descriptionBloc;
};

const createCard = (dataList, labelObj) => {
  let body = "";
  for (const field of categories) {
    const outcomes = dataList
      .filter((record) => record.OutcomeSortOrder === field.OutcomeSortOrder)
      .sort((item1, item2) => item2.ID - item1.ID); // Sort by desc. ID

    if (outcomes.length < 1) outcomes.push(field);

    console.log("outcomes :>> ", outcomes);

    const descriptions = displayDescriptions(outcomes, labelObj);

    const card = `<div class="container-fluid card row" >
    <div class="category-view col-md-4">${field.Category}</div>
    <div class="description-view col-md-8">${descriptions}</div>
    </div>`;
    body += card;
  }

  return body;
};

const createViewBloc = () => {
  // const tableHeader = createTableHeader(rowLabels[0]);

  // Sorting data by increasing OutcomeSortOrder value
  const sortedList = dataOutcomes.sort(
    (item1, item2) => item1.OutcomeSortOrder - item2.OutcomeSortOrder
  );
  const viewBloc = createCard(sortedList, rowLabels[0]);
  return viewBloc;
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

  //* Data viewing
  $("#new-entry").append(createNewRecord(rowLabels));
  $("#main-table").append(createTableHeader(rowLabels[0]));
  $("#view-bloc").append(createViewBloc());

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
  //* Select outcome for editing
  $(document).on("click", ".table tbody tr td div", function (evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const catId = $(this).attr("data-catid");
    const recordId = $(this).attr("id");
    const descriptionText = $(this).text();

    const optionList = categories
      .map((item) => {
        const selected = item.OutcomeSortOrder === catId ? " selected" : "";
        return `<option value=${item.OutcomeSortOrder}${selected}>
        ${item.Category}</option>`;
      })
      .join("");

    const editForm = `
    <input type="text" class="hidden" name="ID" value=${recordId} />
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
    $("#modal-form").empty().append(editForm);
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
