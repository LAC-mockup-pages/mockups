//* Adding a new record

function addRecord(e, bloc) {
  e.stopPropagation();
  const blockName = $(bloc)
    .attr("data-blockId")
    .split("-");
  $("#modalBloc").modal("toggle");
  $(".modal-body form").remove();
  let list = [];
  let block = "";
  switch (blockName[1]) {
    case "History":
      list = historyHeaderList;
      break;

    case "Professional Development":
      list = proDevHeaderList;
      break;

    case "Instructional Hours":
      list = instrHrsList;
      break;

    case "Non Instructional Hours":
      list = nonInstrHrsList.slice(0, nonInstrHrsList.length - 1);
      break;

    case "Home Address":
      list = homeAdrsList;
      break;

    case "Work Address":
      list = workAdrsList;
      break;

    default:
      console.log("Message :", `${blockName[1]} Not Done Yet!`);
      break;
  }

  for (let item of list) {
    const identifier = `${$(bloc).attr("data-blockId")}-${item[0]}`;
    block += createInputField(
      identifier,
      item[0].toLowerCase(),
      item[0],
      "",
      "",
      ""
    );
  }
  $(".modal-body").append(`<form id='modal-form'>${block}</form>`);

  return false;
}

//TODO Editing a record in a table
