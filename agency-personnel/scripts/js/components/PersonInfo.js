//* Viewing personnel info: Person

import { topBanner } from "../main.js";

const personView = (selectedID) => {
  const personData = getPersonnel.filter(
    (person) => person.ID === selectedID
  )[0];
  const title = "Personnel Information";
  const labels = {
    ID: "Id",
    PersonnelID: "Personnel ID",
    PersFirst: "First Name",
    PersLast: "Last Name",
    PersPositionID: "Position",
    PersSubject: "Subject",
    PersStartDate: "Start Date",
    lengthstay: "Length of Stay (yrs)",
    PersPayStatus: "Paid/Volunteer",
    PersTimeStatus: "Time Status",
    PersExpYears: "Experience",
    PersHomePhone: "Home Phone",
    PersMobilePhone: "Mobile Phone",
    PersEmail: "Email",
    PersAltEmail: "Alt Email"
  };

  const fieldList = Object.keys(labels);
  const fields = fieldList.map((key) => {
    let labelClassVal = "";
    const labelVal = labels[key];
    let classVal = "";
    let value = personData[key];
    let option = "";
    let optionHidden = "form-group";
    let type = "";

    if (key === "ID") {
      optionHidden += " hidden";
    }
    if (
      [
        "PersonnelID",
        "PersFirst",
        "PersLast",
        "PersPositionID",
        "PersSubject",
        "PersStartDate",
        "PersPayStatus",
        "PersTimeStatus",
        "PersExpYears"
      ].includes(key)
    ) {
      option = "required";
      labelClassVal = "class='red-text'";
    }

    if (key === "lengthstay") option = "disabled";

    if (["PersHomePhone", "PersMobilePhone"].includes(key)) {
      value = phoneFormat(value);
    }
    if (["PersEmail", "PersAltEmail"].includes(key)) type = "email";

    const argumentsObj = {
      keyVal: key,
      labelClassVal,
      labelVal,
      classVal,
      value,
      option,
      optionHidden,
      type
    };

    if (
      [
        "PersPositionID",
        "PersSubject",
        "PersPayStatus",
        "PersTimeStatus",
        "PersExpYears"
      ].includes(key)
    ) {
      let hashTable = [];
      switch (key) {
        case "PersPositionID":
          hashTable = GetPosition;
          break;
        case "PersSubject":
          hashTable = GetSubject;
          break;
        case "PersPayStatus":
          hashTable = ddlPaidVolunteer;
          break;
        case "PersTimeStatus":
          hashTable = ddlTimeStatus;
          break;
        case "PersExpYears":
          hashTable = ddlExperienceYears;
          break;

        default:
          break;
      }
      const argumentsSelect = {
        hashTable,
        keyValue: key,
        selectedValue: personData[key],
        labelVal,
        labelClassVal,
        option
      };

      // elementSelectModal() elementInput() <== helperFunctions.js
      return elementSelectModal(argumentsSelect);
    } else {
      return elementInput(argumentsObj);
    }
  });

  const header = topBanner(title);
  return `<div class="person-main col-md-5">
      ${header}
    <form class="bloc-perso" id='${title
      .toLowerCase()
      .replace(/\W/gi, "-")}' data-table="Personnel">${fields.join("")}
    </form>
  </div>`;
};

export default personView;