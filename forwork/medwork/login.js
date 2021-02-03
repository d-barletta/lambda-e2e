const {click, type, exists, visit} = require('../utility');
const general = require('../general').default;

exports.default = {
  ...general,
  testName: 'Login and check is logged correctly',
  actions: [
    ...visit('/medwork/#'),
    ...type('[name=username]', '***@nsi.it'),
    ...type('[name=password]', '****'),
    ...click("//fws-button[contains(., 'Accedi')]"),
    ...exists('.introduction'),
  ],
};
