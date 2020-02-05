// Actions and logic

const outcomesData = [
  {
    id: 1,
    CategoryName: "Social Services",
    Descriptions: [
      { Text: "Operative tertiary application" },
      { Text: "Organic foreground task-force" },
      { Text: "User-friendly optimal orchestration" },
      { Text: "Switchable 24 hour Graphic Interface" }
    ]
  },
  {
    id: 2,
    CategoryName: "Functional Literacy",
    Descriptions: [{ Text: "Reactive real-time pricing structure" }]
  },
  {
    id: 3,
    CategoryName: "Community Outcomes",
    Descriptions: [
      { Text: "Enhanced encompassing toolset" },
      { Text: "Synchronised reciprocal approach" }
    ]
  },
  {
    id: 4,
    CategoryName: "School Relations",
    Descriptions: [
      { Text: "Vision-oriented radical help-desk" },
      { Text: "Optional well-modulated help-desk" },
      { Text: "Distributed asymmetric data-warehouse" },
      { Text: "Monitored regional productivity" }
    ]
  },
  {
    id: 5,
    CategoryName: "Health Literacy",
    Descriptions: [
      { Text: "Enterprise-wide foreground strategy" },
      { Text: "Networked next generation capacity" },
      { Text: "Streamlined 5th generation installation" }
    ]
  },
  {
    id: 6,
    CategoryName: "Workforce Readiness",
    Descriptions: [
      { Text: "Self-enabling next generation open architecture" },
      { Text: "Diverse even-keeled leverage" },
      { Text: "Assimilated composite info-mediaries" },
      { Text: "Fully-configurable exuding synergy" }
    ]
  },
  {
    id: 7,
    CategoryName: "Financial Literacy",
    Descriptions: [
      { Text: "Fundamental even-keeled database" },
      { Text: "Upgradable heuristic middleware" },
      { Text: "Distributed multi-state internet solution" },
      { Text: "Assimilated high-level application" }
    ]
  },
  {
    id: 8,
    CategoryName: "Legal Services",
    Descriptions: [
      { Text: "Decentralized empowering flexibility" },
      { Text: "Reverse-engineered cohesive challenge" },
      { Text: "Down-sized upward-trending superstructure" },
      { Text: "De-engineered uniform architecture" }
    ]
  },
  {
    id: 9,
    CategoryName: "Citizenship",
    Descriptions: [
      { Text: "Advanced value-added intranet" },
      { Text: "Public-key zero administration implementation" },
      { Text: "Right-sized context-sensitive intranet" }
    ]
  }
];

const placeholderList = ["id", "Category", "Description"];

const headerList = ["id", "Category", "Description"];

const labelList = ["id", "Category", "Description"];

const categoryList = outcomesData
  .sort((a, b) => (a.CategoryName > b.CategoryName ? 1 : -1))
  .map(item => [item.id, item.CategoryName]);

const createNewRecord = () => {
  // for (let i = 0; i < placeholderList.length; i++) {
  //   $("#new-partner").append(`<input
  //   type="text"
  //   class="form-control"
  //   placeholder='${placeholderList[i]}'
  //   required
  // />`);
  // }
  let optionList = "";
  for (let category of categoryList) {
    optionList += `<option id=${category[0]} value='${category[1]}'>${category[1]}</option>`;
  }

  $("#new-outcome").append(
    ` <label for="new-select">Category</label>
          <select id="new-select" form="new-outcome">${optionList}</select>
        <label for="input-new-outcome">Description</label>
        <input type="text" id="input-new-outcome" class="form-control">
    <button type="submit" id="submit-btn" class="btn btn-primary">Add</button>`
  );
};

const viewHeaders = () => {
  for (let i = 1; i < headerList.length; i++) {
    $(".table thead").append(`<th>${headerList[i]}</th>`);
  }
};

const createDataRow = (numID, arrText) => {
  let insideRow = "";
  const arrTextIndexed = arrText.map((line, indx) => [indx, line.Text]);

  for (let textLine of arrTextIndexed.sort((a, b) => (a[1] > b[1] ? 1 : -1))) {
    insideRow += `<tr class="inside-row" id=${numID +
      "-" +
      textLine[0]} title="click to Edit"><td>${textLine[1]}</td></tr>`;
  }
  return insideRow;
};

const viewData = arr => {
  for (record of arr.sort((a, b) =>
    a.CategoryName > b.CategoryName ? 1 : -1
  )) {
    const { id, CategoryName, Descriptions } = record;
    const row = createDataRow(id, Descriptions);
    $(".table-body").append(
      `<tr id=${id}><td class="cell-data">${CategoryName}</td><td><table>${row}</table></td></tr>`
    );
  }
};

$(document).ready(() => {
  // * from navBar/index.js
  $("#nav-icon").click(function() {
    $(this).toggleClass("open");
  });

  $("#parentMenu1 li").click(() => {
    $("#nav-icon").removeClass("open");
  });

  $("#main-logo").click(() => {
    alert("Redirect to Home Page");
  });

  // * sub-navbar/index.js
  $("#sub-nav li").click(function() {
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
  btnToTop.click(e => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "600");
  });

  // * data viewing
  createNewRecord();
  viewHeaders();
  viewData(outcomesData);

  //* Adding a new outcome

  //* Select outcome
  $("[title^='click'").click(function() {
    const rowID = $(this)
      .attr("id")
      .split("-")
      .map(item => Number(item));
    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();
    $(".modal-body").append("<form id='modal-form'></form>");

    const textValue = outcomesData.filter(obj => obj.id === rowID[0])[0]
      .Descriptions[rowID[1]].Text;
    let optionList = "";

    for (let category of categoryList) {
      const attrOption = category[0] === rowID[0] ? "selected" : "";
      optionList += `<option id=${category[0]} value='${category[1]}' ${attrOption}>${category[1]}</option>`;
    }

    $("#modal-form").append(
      `<div class="input-field">
          <label for="modal-select">Category</label>
          <select id="modal-select" form="modal-form">${optionList}</select>
      </div>
      <div class="input-field">
        <label for=${rowID.join("-")}>Description</label>
        <input type="text" id=${rowID.join("-")} value='${textValue}'>
      </div>`
    );
  });
});
