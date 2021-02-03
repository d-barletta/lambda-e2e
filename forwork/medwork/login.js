const {click, type, exists, navigate} = require('../utility');
const general = require('../general').default;

exports.default = {
  ...general,
  testName: 'Login and check is logged correctly',
  actions: [
    ...navigate('/medwork/#'),
    ...type('[name=username]', 'd.barletta@nsi.it'),
    ...type('[name=password]', 'Medwork123!'),
    ...click("//fws-button[contains(., 'Accedi')]"),
    ...exists('.introduction'),
  ],
};
