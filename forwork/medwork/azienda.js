const {click, type, select, exists, visit, wait} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  testName: 'Login and insert new azienda',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Aziende')]"),
    //insert azienda
    ...visit('/medwork/#/aziende/nuovo/generali'),
    ...type('[name=ragioneSociale]', 'TestCompany srl'),
    ...type('[name=piva]', 'IT12345678900'),
    ...type('[name=indirizzo]', 'via Leonardo Da Vinci'),
    ...select('[name=comune]', 'Isernia'),
    ...wait(0.1),
    ...click("//fws-toolbar//fws-button[contains(., 'Salva')]"),
    ...exists("//fws-interactive-feedback[contains(., 'TestCompany')]"),
    //delete azienda
    ...visit('/medwork/#/aziende'),
    ...click("//table-row[contains(., 'TestCompany srl')]//fws-checkbox"),
    ...click("//a[contains(., 'Elimina')]"),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Elimina')]"),
    ...exists("//fws-simple-feedback[contains(., 'eliminata')]"),
  ],
};
