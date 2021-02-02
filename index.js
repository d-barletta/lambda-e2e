const chromium = require('chrome-aws-lambda');

const lambdaFunction = async (event, context, callback) => {
  let result = {
    status: 500,
    body: {},
  };
  let browser = null;
  try {
    if (typeof event === 'string') {
      event = JSON.parse(event);
    }

    result.body.testName = event.testName || 'Test senza nome';

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    ////////////////////////////////////////////////////////////// TEST - BEGIN

    let page = await browser.newPage();
    await page.setDefaultTimeout(event.setDefaultTimeout || 30 * 1000);
    await page.setViewport(event.setViewport || {width: 1280, height: 800});
    await page.goto(event.goto);

    let lastResult = null;
    for (const action of event.actions) {
      //console.log(action);
      let executeOn = action.executeOnPrevious ? lastResult : page;
      if (action.execute && action.params) {
        lastResult = await executeOn[action.execute](...action.params);
      }
    }

    ////////////////////////////////////////////////////////////// TEST - FINISH

    result.status = 200;
  } catch (error) {
    return callback(error, result);
  } finally {
    browser && (await browser.close());
  }
  return callback(null, result);
};

exports.handler = lambdaFunction;
