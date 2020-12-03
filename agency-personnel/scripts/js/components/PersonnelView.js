// Main component to display details for
// a selected Personnel.
// Input: a string of digits, unique ID autogenerated
// by database.

import { personView } from "./PersonInfo.js";
import { historyView } from "./History.js";
import proDevView from "./ProDev.js";
import instructionalHoursView from "./InstHours.js";
import { nonInstrHoursView } from "./NonInstrHours.js";
import { homeAddress, workAddress } from "./Address.js";
import addInfoView from "./AdditionalInfo.js";
import commentsView from "./Comments.js";
import { contactsView } from "./Contacts.js";
import { personnelData } from "../main.js";

export const displayPersonnelDetails = (id) => {
  const identifier = personnelData[0].PersonnelID;
  // Adding blocs
  const personInfoBloc = personView(id);
  const historyBloc = historyView(identifier);
  const proDevBloc = proDevView();
  const instructionalHoursBloc = instructionalHoursView();
  const nonInstrHoursBloc = nonInstrHoursView(identifier);
  const homeAddressBloc = homeAddress();
  const workAddressBloc = workAddress();
  const addInfoBloc = addInfoView();
  const commentsBloc = commentsView();
  const contactsBloc = contactsView(identifier);

  const view = `
  <div class="container-fluid row personView" id=${id}>
    <div class="row">
      <div class="person-main col-md-5">
        ${personInfoBloc}
      </div>
      <div class="bloc-history-proDev col-md-7" id='${id}-history'>
        <div class="bloc-history">${historyBloc}</div>
        <div class="bloc-proDev">${proDevBloc}</div>
      </div>
    </div>
    <div class="bloc-hours container-fluid row">
        <div class="bloc-instr-hours col-md-5">${instructionalHoursBloc}</div>
        <div class="bloc-nonInstrHours col-md-7">${nonInstrHoursBloc}</div>
    </div>
    <div class="container-fluid row bloc-address">
        <div class="bloc-home col-md-6">${homeAddressBloc}</div>
        <div class="bloc-work col-md-6">${workAddressBloc}</div>
    </div>
    <div class="container-fluid bloc-additionalInfo">
      ${addInfoBloc}
    </div>
    <div class="container-fluid row bloc-comments-contacts">
      <div class="bloc-comments col-md-6">${commentsBloc}</div>
      <div class="bloc-contacts col-md-6">${contactsBloc}</div
    </div>
  </div>`;

  return view;
};
