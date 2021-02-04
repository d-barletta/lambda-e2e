const {click, type, select, exists, visit, wait} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  testName: 'Login and insert new protocollo mansione',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Protocolli')]"),
    //insert protocollo mansione
    ...visit('/medwork/#/protocolli/protocolli-mansione'),
    ...click("//fws-toolbar//fws-button[contains(., 'Nuovo')]"),
    ...select('[name=mansione]', 'A'), //il primo che trovo con la a
    ...type('[name=descrizione]', 'Protocollo Barley'),
    ...select('[name=rischi]', 'A'), //il primo che trovo con la a
    ...click("//fws-table-heading[@tablelabel='Visite e accertamenti']//fws-button[contains(., 'Aggiungi')]"),
    ...type("fws-confirm-dialog input[name='select_periodicita']", '2A'),
    ...select("fws-confirm-dialog input[name='select_accertamenti']", 'A'), //il primo che trovo con la a
    ...wait(0.1),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Aggiungi')]"),
    ...wait(0.1),
    ...exists("//table-row[contains(., '2A')]"),
    ...click('table-data.fws-column-principale div'), //non funzia
    ...wait(0.1),
    ...wait(10),
    // ...click("//fws-toolbar//fws-button[contains(., 'Salva')]"),
    // ...exists("//fws-interactive-feedback[contains(., 'Barley')]"),
    // //delete ambulatorio
    // ...visit('/medwork/#/ambulatori'),
    // ...click("//table-row[contains(., 'NeuroDev')]//fws-checkbox"),
    // ...click("//a[contains(., 'Elimina')]"),
    // ...click("//fws-confirm-dialog//fws-button[contains(., 'Elimina')]"),
    // ...exists("//fws-simple-feedback[contains(., 'eliminato')]"),
  ],
};
