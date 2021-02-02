const {handler} = require('./index');
const fs = require('fs');
const TESTS_DIR = './tests';

fs.readdir(TESTS_DIR, (err, list) => {
  const jsonFiles = list.filter(name => name.includes('.json') && !name.includes('disabled'));
  for (const filename of jsonFiles) {
    fs.readFile(`${TESTS_DIR}/${filename}`, (err, data) => {
      handler(data.toString(), {}, (error, result) => {
        let resp = 'KO';
        if (result && result.status === 200) {
          resp = 'OK';
        }
        console.log(`${resp} - TEST ${filename.replace('.json', '')}`);
        error && console.error(error);
      });
    });
  }
});
