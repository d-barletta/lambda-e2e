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

    if (!event.setViewport) {
      event.setViewport = {width: 1280, height: 800};
    }

    result.body.testName = event.testName || 'No named Test';

    let args = chromium.args;
    if (!chromium.headless) {
      //add 130 for info bar that is displayed on non headless chromium - local
      args.push(`--window-size=${event.setViewport.width},${event.setViewport.height + 130}`);
    }

    browser = await chromium.puppeteer.launch({
      args: args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    ////////////////////////////////////////////////////////////// TEST - BEGIN

    let page = await browser.newPage();
    await page.setDefaultTimeout(event.setDefaultTimeout || 30 * 1000);
    await page.setViewport(event.setViewport);
    await page.goto(event.goto);

    // TODO - intercept download urls to check files
    // page.on('response', async response => {
    //   console.log(response.request().resourceType()); //xhr
    // });

    let lastResult = null;
    for (const action of event.actions) {
      //console.log(action);
      let executeOn = action.executeOnPrevious ? lastResult : page;
      if (action.execute) {
        if (!action.params) action.params = [];
        lastResult = await executeOn[action.execute](...action.params);
        //console.log(lastResult);
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
