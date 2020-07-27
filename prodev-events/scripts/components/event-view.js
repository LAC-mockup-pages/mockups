// event-view after selecting an avent in list

import { createRosterBloc } from "./roster-view.js";
import {
  sessionList,
  providerList,
  locationList,
  categoryList,
  subjectList,
  facilitatorList,
} from "./../main.js";

const createViewBloc = (fieldList, selectObj, requiredList) => {
  let bloc = "";
  const selectList = Object.keys(selectObj);
  for (const field of fieldList) {
    let keyVal = $(field).attr("data-name"),
      labelVal = $(field).attr("data-label"),
      value = $(field).text(),
      labelClassVal = "",
      option = "";

    if (requiredList.includes(keyVal)) {
      labelClassVal = "class='red-text'";
      option = "required";
    }
    if (selectList.includes(keyVal)) {
      const { hashTable, optionText } = selectObj[keyVal];
      bloc += elementSelectModal({
        hashTable,
        keyValue: keyVal,
        selectedValue: value,
        labelVal,
        labelClassVal,
        option,
       optionText,
      });
    } else {
      let optionHidden = " form-group";
      if (keyVal === "ID") optionHidden += " hidden";
      bloc += elementInput({
        keyVal,
        labelVal,
        value,
        labelClassVal,
        classVal: "",
        option,
        optionHidden,
      });
    }
  }
  return bloc;
};

export const createEventView = (tdList, requiredList) => {
  const filteredList = tdList.reduce((accumulator, item) => {
    const fieldName = $(item).attr("data-name");
    if (!fieldName.startsWith("profdev")) accumulator.push(item);
    return accumulator;
  }, []);
  const fullLength = filteredList.length;
  const halfLength = Math.ceil(fullLength / 2);
  let rosterBloc = createRosterBloc();

  const facilitators = facilitatorList.map((item) => {
    const { ID, FacFirstName, FacLastName } = item;
    const name = `${FacLastName}, ${FacFirstName}`;
    return { ID, name };
  });
  const selectElementObj = {
    ProfDevDescription: { hashTable: sessionList, optionText: "a session" },
    ProfDevProviderID: { hashTable: providerList, optionText: "a provider" },
    ProfDevLocationID: { hashTable: locationList, optionText: "a location" },
    ProfDevCategoryID: { hashTable: categoryList, optionText: "a category" },
    ProfDevSubjectID: { hashTable: subjectList, optionText: "a subject" },
    ProfDevFacilitator1: {
      hashTable: facilitators,
      optionText: "a facilitator",
    },
    ProfDevFacilitator2: {
      hashTable: facilitators,
      optionText: "a facilitator",
    },
    ProfDevFacilitator3: {
      hashTable: facilitators,
      optionText: "a facilitator",
    },
  };

  const leftBloc = createViewBloc(
    filteredList.slice(0, halfLength),
    selectElementObj,
    requiredList
  );
  const rightBloc = createViewBloc(
    filteredList.slice(halfLength),
    selectElementObj,
    requiredList
  );

  const eventView = `${rosterBloc}
  <form role="form" id="event-view-form" class="container-fluid row event-view">
      <div class="col-md-6 left-event-view">${leftBloc}</div>
      <div class="col-md-6 right-event-view">${rightBloc}</div>
      <button type="button" id="save-changes-btn" form="event-view-form" class="btn btn-primary">Save Changes</button>
      <button type="button" id="cancel-changes-btn" form="event-view-form" class="btn btn-default">Cancel</button>
    </form>
  `;
  return eventView;
};
