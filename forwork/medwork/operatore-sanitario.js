const {click, type, select, exists, wait, navigate} = require('../utility');
const login = require('./login').default;

exports.default = {
  ...login,
  testName: 'Login and insert new operatore sanitario',
  actions: [
    ...login.actions,
    ...click("//fws-sidenav-item[contains(., 'Operatori sanitari')]"),
    ...wait(0.3),
    ...navigate("/medwork/#/operatori-sanitari/nuovo/generali"),
    ...type('[name=last_name]', 'Barletta'),
    ...type('[name=first_name]', 'Davide'),
    ...select('[name=gender]', 'Maschio'),
    ...type('[name=anno]', '22/08/1987'),
    ...select('[name=comune]', 'Isernia'),
    ...type('[name=fiscal_code]', 'BRLDVD87M22E335L'),
    ...select('[name=medico_type]', 'Medico competente'),
    ...click("//fws-button[contains(., 'Salva')]"),
    ...exists("//fws-interactive-feedback[contains(., 'Davide Barletta')]"),
  ],
};
