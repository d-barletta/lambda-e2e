const {click, type, select, exists, visit, wait} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  testName: 'Login and insert new protocollo dimissione and delete it after',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Protocolli')]"),
    //insert protocollo dimissione
    ...visit('/medwork/#/protocolli/protocolli-dimissione'),
    ...click("//fws-toolbar//fws-button[contains(., 'Nuovo')]"),
    ...select('[name=mansione]', 'A'), //il primo che trovo con la a
    ...type('[name=descrizione]', 'Protocollo dimissione Barley'),
    ...click("//fws-toolbar//fws-button[contains(., 'Salva')]"),
    ...wait(0.1),
    ...click("//fws-alert-dialog//fws-button[contains(., 'Ok')]"),
    ...wait(0.1),
    //delete protocollo dimissione
    ...visit('/medwork/#/protocolli/protocolli-dimissione'),
    ...click("//table-row[contains(., 'dimissione Barley')]//fws-checkbox"),
    ...click("//a[contains(., 'Elimina')]"),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Elimina')]"),
    ...exists("//fws-simple-feedback[contains(., 'eliminato')]"),
  ],
};
