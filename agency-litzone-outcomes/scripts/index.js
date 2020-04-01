// Actions and logic

const agencyData = [
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
const data = outcomesData;
const categories = categoryData;

const placeholderList = ["id", "Category", "Description"];

const headerList = ["id", "Category", "Description"];

const labelList = ["id", "Category", "Description"];

const categoryList = agencyData
  .sort((a, b) => (a.CategoryName > b.CategoryName ? 1 : -1))
  .map(item => [item.id, item.CategoryName]);

const createNewRecord = () => {
  let optionList =
    "<option class='red-text' disabled selected>Select a Category</option>";
  for (let category of categoryList) {
    optionList += `<option class="blue-text" value='${category[0]}'>${category[1]}</option>`;
  }

  $("#new-outcome").append(
    `<select id="new-select" form="new-outcome" class="form-control red-text">${optionList}</select>
        <input type="text" id="input-new-outcome" class="form-control blue-text" placeholder="Description" spellcheck="true" required>
    <button type="submit" id="submit-btn" class="btn btn-primary">Add</button>
    <button type="button" id="cancel-btn" class="btn btn-default">Cancel</button>`
  );
};

const createDataList = list => {
  const catList = [];
  for (const item of list) {
    if (!catList.includes(item.OutcomeSortOrder)) {
      catList.push(item.OutcomeSortOrder);
    }
  }
  const dataList = catList.map(num => {
    const category = categoryData.filter(
      item => item.OutcomeSortOrder === num
    )[0].Category;
    const outcomes = data
      .filter(item => item.OutcomeSortOrder === num)
      .map(item => [item.ID, item.Description]);
    return { cat: category, catId: num, outcomes: outcomes };
  });
  return dataList;
};

const createHeader = list => {
  const result = list.map(item => `<th>${item}</th>`).join("");
  return `<thead>${result}</thead>`;
};

const createBody = list => {
  const dataList = createDataList(list);
  const agId = data[0].AgencyID;

  const rows = dataList.map(item => {
    const values = item.outcomes
      .map(arr => {
        return `<div class="inside-value" id=${arr[0]} title="Click to edit" data-catid=${item.catId}>${arr[1]}</div>`;
      })
      .join("");

    return `<tr id=${item.catId}>
    <td class="cell-data">${item.cat}</td>
    <td>${values}
    </td>
    </tr>`;
  });

  return `<tbody class="table-body" id=${agId}>${rows}</tbody>`;
};

const createView = list => {
  const headerValues = Object.keys(list[0]).slice(3);
  const tableHead = createHeader(headerValues);
  const orderedList = list.sort((a, b) => (a.Category > b.Category ? 1 : -1));
  const tableBody = createBody(orderedList);
  return `<table class="table">
    ${tableHead}
    ${tableBody}
  </table>`;
};

$(document).ready(() => {
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
  $(".data-view").append(createView(data));

  //* Adding a new outcome
  $("#new-select").change(function() {
    const selectedOption = Number($(this).val());
    const selectedObj = agencyData.filter(obj => obj.id === selectedOption);
    $(".table-body").empty();
    viewData(selectedObj);

    $("#cancel-btn").click(() => {
      location.reload();
    });
  });

  //* Select outcome
  $("[title^='Click']").click(function(evnt) {
    evnt.preventDefault();
    evnt.stopPropagation();

    const catId = $(this).attr("data-catid");
    const agencyId = $("tbody").attr("id");
    const selectedTds = $(`#${catId}`).get(0).cells;

    console.log("agencyId : ", agencyId);

    const formEdit = `
    <form role="form" class="form-inline">
    <label for="Category">Category</label>
    <input type="text" id=${$(selectedTds[0]).text()}>

    </form>`;

    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();

    $(".modal-body").append(
      "<form id='modal-form'>Selected outcome here</form>"
    );

    // const textValue = agencyData.filter(obj => obj.id === rowID[0])[0]
    //   .Descriptions[rowID[1]].Text;
    // let optionList = "";

    // for (let category of categoryList) {
    //   const attrOption = category[0] === rowID[0] ? "selected" : "";
    //   optionList += `<option id=${category[0]} value='${category[1]}' ${attrOption}>${category[1]}</option>`;
    // }

    // $("#modal-form").append(
    //   `<div class="input-field">
    //       <label for="modal-select">Category</label>
    //       <select id="modal-select" form="modal-form">${optionList}</select>
    //   </div>
    //   <div class="input-field">
    //     <label for=${rowID.join("-")}>Description</label>
    //     <input type="text" id=${rowID.join("-")} value='${textValue}'>
    //   </div>`
    // );
  });
});
