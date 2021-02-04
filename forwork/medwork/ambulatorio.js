const {click, type, select, exists, visit, wait} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  testName: 'Login and insert new ambulatorio and delete it after',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Ambulatori')]"),
    //insert ambulatorio
    ...visit('/medwork/#/ambulatori/nuovo'),
    ...type('[name=description]', 'NeuroDev Ambulatorio'),
    ...type('[name=address]', 'Piazza Padre Giacinto'),
    ...select('[name=comune]', 'Isernia'),
    ...wait(0.1),
    ...click("//fws-toolbar//fws-button[contains(., 'Salva')]"),
    ...exists("//fws-interactive-feedback[contains(., 'NeuroDev')]"),
    //delete ambulatorio
    ...visit('/medwork/#/ambulatori'),
    ...click("//table-row[contains(., 'NeuroDev')]//fws-checkbox"),
    ...click("//a[contains(., 'Elimina')]"),
    ...click("//fws-confirm-dialog//fws-button[contains(., 'Elimina')]"),
    ...exists("//fws-simple-feedback[contains(., 'eliminato')]"),
  ],
};
