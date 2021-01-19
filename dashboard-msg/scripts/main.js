//*=================================================
//* Action and logic for the page.
//* JS and jQuery
//*=================================================

import { tileSet, createTile } from "../../dashboard-landing/scripts/main.js";

const dataSet1 = [
  { Site: "Enterprise site", Enrollment: "560", MSG: "0.64" },
  { Site: "Voyager site", Enrollment: "299", MSG: "0.57" }
];

const dataSet2 = [
  { Teacher: "James T. Kirk", Enrollment: "18", MSG: "0.22" },
  { Teacher: "Katherine Janway", Enrollment: "22", MSG: "0.72" },
  { Teacher: "Phillippa Gorgious", Enrollment: "31", MSG: "0.66" },
  { Teacher: "Ben Sisko", Enrollment: "22", MSG: "0.35" }
];

const createLeftNavBar = () => {
  let block = "";
  for (const record of tileSet) {
    let buttonClass = "";
    let tileClass = "";

    switch (record.id) {
      case "tile0":
        tileClass = "large-tile";
        break;
      case "tile1":
      case "tile2":
      case "tile3":
        tileClass = "medium-tile";
        break;
      default:
        tileClass = "small-tile";
        break;
    }

    block += createTile(record, buttonClass, tileClass);
  }
  return block;
};

//TODO Add logic to reorder the tiles depending on the selected
//TODO dashboard. Also add an object "Back to Portal" as a 1st tile.
const shuffleTileSet = (list, tileId) => {};

const percentFormat = (str) => {
  return `${str.replace("0.", "")}%`;
};

const createTableHeader = (list) => {
  const headers = list.map((str) => `<th>${str}</th>`).join("");
  return `<thead><tr>${headers}</tr></thead>`;
};

// list = dataSet#
const createTableBody = (list) => {
  let body = "";
  let orderedList = [];
  if (list === dataSet1) {
    orderedList = list.sort((item1, item2) =>
      item1.Site < item2.Site ? -1 : item1.Site > item2.Site ? 1 : 0
    );
  } else {
    orderedList = list.sort((item1, item2) =>
      item1.Teacher < item2.Teacher ? -1 : item1.Teacher > item2.Teacher ? 1 : 0
    );
  }
  for (const obj of orderedList) {
    let row = "";
    for (const key of Object.keys(obj)) {
      const value = key === "MSG" ? percentFormat(obj[key]) : obj[key];
      row += `<td class="cell-data">${value}</td>`;
    }
    body += `<tr>${row}</tr>`;
  }
  return `<tbody>${body}</tbody>`;
};

const createTable = (dataList) => {
  const tableHeader = createTableHeader(Object.keys(dataList[0]));
  const tableBody = createTableBody(dataList);
  return `<table class="table">${tableHeader}${tableBody}</table>`;
};

//*=================================================
//* jQuery section
//*=================================================

$(document).ready(() => {
  const leftNavBar = createLeftNavBar();
  const table1 = createTable(dataSet1);
  const table2 = createTable(dataSet2);

  $("#side-nav").append(leftNavBar);
  $(".table1").append(table1);
  $(".table2").append(table2);
});
