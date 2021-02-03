const {click, type, select, exists, visit, wait} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  setDefaultTimeout: 200000,
  testName: 'Login and insert new operatore sanitario',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Lavoratori')]"),
    //insert lavoratore
    ...visit('/medwork/#/lavoratori/nuovo/generali'),
    ...type('[name=cognome]', 'Barletta'),
    ...type('[name=nome]', 'Davide'),
    ...select('[name=sesso]', 'Maschio'),
    ...type('[name=dataNascita]', '22/08/1986'),
    //inizio - pork-around
    ...click('[name=comune]'), //todo - remove
    ...wait(1), //todo - remove
    //fine  - pork-around
    ...select('[name=comune]', 'Isernia'),
    ...type('[name=codiceFiscale]', 'BRLDVD86M22E335L'),
    ...select('[name=statoLavorativo]', 'Attivo'),
    ...select('[name=azienda]', 'NOT-delete-company'),
    ...click("//fws-table-required[@name='Mansioni']//fws-button[contains(., 'Aggiungi')]"),
    ...type("fws-confirm-dialog input[name='start_date']", '25/12/2000'),
    ...select("fws-confirm-dialog input[name='select_mansione']", 'Addetto cassa'),
    ...wait(0.1),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Conferma')]"),
    ...wait(0.5),
    ...exists("//table-row[contains(., 'Addetto cassa')]"),
    ...click("//fws-toolbar//fws-button[contains(., 'Salva')]"),
    ...exists("//fws-interactive-feedback[contains(., 'Barletta')]"),
    //delete lavoratore
    ...visit('/medwork/#/lavoratori'),
    ...click("//table-row[contains(., 'Barletta')]//fws-checkbox"),
    ...click("//a[contains(., 'Elimina')]"),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Elimina')]"),
    ...exists("//fws-simple-feedback[contains(., 'eliminato')]"),
  ],
};
