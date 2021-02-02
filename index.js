const chromium = require('chrome-aws-lambda');

const lambdaFunction = async (event, context, callback) => {
  let result = null;
  let browser = null;
  try {
    if (typeof event === 'string') {
      event = JSON.parse(event);
    }

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

    for (const action of event.actions) {
      console.log(action);
      await page[action.execute](...action.params);
    }

    ////////////////////////////////////////////////////////////// TEST - FINISH

    result = {status: 200};
  } catch (error) {
    return callback(error);
  } finally {
    browser && (await browser.close());
  }
  return callback(null, result);
};

exports.handler = lambdaFunction;
