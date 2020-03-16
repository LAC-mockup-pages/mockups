// Actions and logic

const createNewRecord = () => {
  for (let i = 0; i < placeholderList.length; i++) {
    const elmnt = placeholderList[i];
    const optionReq = elmnt !== "Length of Stay (yrs)" ? "required" : "";

    if (elmnt instanceof Array) {
      const [nameElmnt, elmntValues] = elmnt;
      let options = `<option class='red-text' selected disabled>Select ${nameElmnt}</option>`;

      for (value in elmntValues) {
        options += `<option class='blue-text' value=${value}>${elmntValues[value]}</option> `;
      }

      $("#new-personnel").append(
        `<select name='${nameElmnt}' class='form-control red-text' required>${options}</select>`
      );
    } else {
      let optionClass = "";
      if (elmnt === "Start Date" || elmnt === "Seniority")
        optionClass = "medium-cell";
      $("#new-personnel").append(`<input
    type="text"
    class="form-control ${optionClass}"
    placeholder='${elmnt}'
    ${optionReq}
  />`);
    }
  }

  $("#new-personnel").append(
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add</button>`
  );
};

const viewHeaders = () => {
  for (let i = 1; i < headerList.length; i++) {
    $(".table thead").append(`<th>${headerList[i]}</th>`);
  }
};

const createDataRow = (obj, list) => {
  let row = "";
  const rowLabel = Object.keys(obj);
  const rowData = rowLabel.map(label => obj[label]);
  const lengthKeyList = rowLabel.length;
  for (let i = 1; i < lengthKeyList; i++) {
    const option = list[i].replace(/\s/gi, "-").toLowerCase();
    row += `<td class="cell-data ${option}">${rowData[i]}</td>`;
  }
  return row;
};

const viewData = (arr, element) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    $(element).append(
      `<tr class='table-row' id=${
        arr[i].id
      } title='click to Edit'>${createDataRow(arr[i], headerList)}</tr>`
    );
  }
};

//* Flattens a nested JSON object
const flatten = (obj, path = "") => {
  if (!(obj instanceof Object)) return { [path.replace(/\.$/g, "")]: obj };

  return Object.keys(obj).reduce((output, key) => {
    return obj instanceof Array
      ? { ...output, ...flatten(obj[key], path) }
      : { ...output, ...flatten(obj[key], path + key + "-") };
  }, {});
};

const createListFields = num => {
  const selectedRecord = personnelData.filter(record => record.id === num);
  const flattenedRecord = flatten(selectedRecord);
  const keyList = Object.keys(flattenedRecord);
  const list = keyList.map((key, indx) => [
    key.slice(0, key.length - 1),
    flattenedRecord[key]
  ]);

  return list;
};

const searchVal = () => {
  const searchArg = $("#search-input")
    .val()
    .toLowerCase();

  if (searchArg.length < 3) {
    alert("Please enter at least the first 3 letters");
    return false;
  }

  if (searchArg.match(/\W|[0-9]|[_]/gi)) {
    alert("Please enter only alphabetical characters");
    return false;
  }

  const selectedStaff = personnelData
    .filter(
      person =>
        person.LastName.toLowerCase().includes(searchArg) ||
        person.FirstName.toLowerCase().includes(searchArg)
    )
    .sort((a, b) => (a.LastName > b.LastName ? 1 : -1))
    .map(person => {
      const { id, LastName, FirstName, DateStarted, Position } = person;
      const yearStarted = DateStarted.substr(-4);
      const fullPosition = positionList[Position];
      return { id, LastName, FirstName, yearStarted, fullPosition };
    });
  viewHeaders();
  viewData(selectedStaff, ".table tbody");
};

$(document).ready(() => {
  //* Back to Top button
  const btnToTop = $("#btn-top");
  $("window").scroll(() => {
    btnToTop.style.display =
      $("window").scrollTop() > 600 || $("body".scrollTop() > 600)
        ? "inline-block"
        : "none";
  });
  btnToTop.click(e => {
    e.stopPropagation();
    $("html, body").animate({ scrollTop: 0 }, "600");
  });

  // * data viewing
  createNewRecord();

  //* Adding a new team member
  $("#add-new-member").click(function(e) {
    e.stopPropagation();
    $("#new-personnel").toggleClass("hidden");
  });

  //* Search Team Members
  $("#search-input").keypress(function(e) {
    e.stopPropagation();
    e.preventDefault();
    let value = $(this).val();
    if (e.which === 13) {
      searchVal();
    } else {
      $(this).val((value += String.fromCharCode(e.which)));
    }
  });
  $("#search-btn").click(e => {
    e.stopPropagation();
    e.preventDefault();
    searchVal();
  });

  //* Cancel or Save
  $("#btn-cancel").click(() => {
    location.reload();
  });

  $("#btn-save").click(() => {
    location.reload();
  });

  //* Select person in short list
  $("tbody").on("click", "[title^='click']", function(e) {
    e.stopPropagation();
    e.preventDefault();
    const rowID = Number($(this).attr("id"));
    const listFields = createListFields(rowID);

    // If ExperienceYears > 3
    if (listFields[8][1] > 3) listFields[8][1] = 3;

    // Cleaning up
    $(".data-view").remove();
    $("#search-input").val("");

    const homeAdrsFields = [
      ["id", listFields[0][1]],
      ...listFields.filter(item => item[0].startsWith("HomeAdrs"))
    ];
    const workAdrsFields = [
      ["id", listFields[0][1]],
      ...listFields.filter(item => item[0].startsWith("WorkAdrs"))
    ];

    const additionalInfoFields = [
      ["id", listFields[0][1]],
      ...listFields.filter(item => item[0].startsWith("AdditionalInfo"))
    ];

    // Invoking all the blocs for personView
    const blocPerso = persoInfo(
      rowID,
      listFields.slice(1, 9),
      homeAdrsFields.slice(4)
    );
    const historyView = personHistory(rowID);
    const proDevView = personProDev(rowID);
    const instructionalHoursView = personInstrHrs(
      rowID,
      instrHrsData,
      instrHrsList,
      "Instructional Hours",
      createInstrHrsBody
    );

    const nonInstrHoursView = personInstrHrs(
      rowID,
      nonInstrHrsData,
      nonInstrHrsList,
      "Non Instructional Hours",
      createNonInstrHrsBody
    );

    const homeAddressView = personAddresses(homeAdrsFields, "Home Address");
    const workAddressView = personAddresses(workAdrsFields, "Work Address");
    const additionalInfo = personAdditionalInfo(
      rowID,
      additionalInfoFields, // datalist
      addInfoList, // labelList
      "Additional Information"
    );
    const commnentsView = personComment(
      rowID,
      commentsData,
      "Notes and Comments"
    );
    const contactsView = personInstrHrs(
      rowID,
      contactData,
      contactList,
      "Contact History",
      contactBody
    );

    $(".personnel-entry").toggleClass("hidden");
    $(".personnel-search").toggleClass("hidden");

    $(".hero").append(`<div class="container personView" id=${rowID}>
    <div class="row">
        <form class="bloc-perso col-md-5">${blocPerso}</form>
          <div class="bloc-history-proDev col-md-7" id='${rowID}-history'>
            <div class="bloc-history">${historyView}</div>
            <div class="bloc-proDev">${proDevView}</div>
        </div>
    </div>
    <div class="container row bloc-hours">
      <div class="bloc-instr-hours col-md-5">${instructionalHoursView}</div>
      <div class="bloc-nonInstr-hours col-md-7">${nonInstrHoursView}</div>
    </div>
    <div class="container row bloc-address">
      <div class="bloc-home col-md-6">${homeAddressView}</div>
      <div class="bloc-work col-md-6">${workAddressView}</div>
    </div>
    <div class="container-fluid bloc-additionalInfo">
      ${additionalInfo}
    </div>
    <div class="container row bloc-comments-contacts">
      <div class="bloc-comments col-md-5">${commnentsView}</div>
      <div class="bloc-contact-history col-md-7">${contactsView}</div>
  </div>
</div>`);

    return false;
  });
});
