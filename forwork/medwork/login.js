const {click, type, exists, navigate} = require('../utility');
const general = require('../general').default;

exports.default = {
  ...general,
  testName: 'Login and check is logged correctly',
  actions: [
    ...navigate('/medwork/#'),
    ...type('[name=username]', '***@nsi.it'),
    ...type('[name=password]', '***'),
    ...click("//fws-button[contains(., 'Accedi')]"),
    ...exists('.introduction'),
  ],
};
