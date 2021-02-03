const {handler} = require('../index');

const testCases = [
  require('./medwork/login').default,
  require('./medwork/operatore-sanitario').default,
];

for (const testCase of testCases) {
  //console.log(testCase);
  handler(JSON.stringify(testCase), {}, (error, result) => {
    let resp = result && result.status === 200 ? '+ OK' : '- KO';
    console.log(`${resp} - TEST - ${testCase.testName || 'no test name'}`);
    error && console.error(error);
    console.log(`*******************************************************`);
  });
}