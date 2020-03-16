//* Adding a new record

function addRecord(e, bloc) {
  e.stopPropagation();
  const blockName = $(bloc)
    .attr("data-blockId")
    .split("-");
  console.log("blockName :", blockName);
  $("#modalBloc").modal("toggle");
  $(".modal-body form").remove();
  $(".modal-body").append("<form id='modal-form'>Form Here</form>");
  let list;
  // switch (blockName) {
  //   case "History":
  //     list=
  //     break;

  //   default:
  //     console.log('blockName :', `${blockName} Not Found!`);
  //     break;
  // }
  return false;
}

//TODO Editing a record in a table
