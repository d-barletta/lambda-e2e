const chromium = require('chrome-aws-lambda');

const lambdaFunction = async (event, context, callback) => {
  let result = {
    status: 500,
    body: {},
  };
  let browser = null;

  try {
    if (typeof event === 'string') event = JSON.parse(event);

    // include request in response but masking sensible data
    result.request = {...event, actions: '*** hidden ***'};

    if (!event.setViewport) event.setViewport = {width: 1280, height: 800};

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
    //   const type = response.request().resourceType(); //xhr
    //   const url = response.url(); // stampaProtocollo?access_token=...
    //   const status = response.status(); //200
    //   //todo check
    // });

    let lastResult = null;
    for (const action of event.actions) {
      //console.log(action);
      result.running = action;
      result.currenturl = page.url();
      let executeOn = action.executeOnPrevious ? lastResult : page;
      if (action.execute) {
        if (!action.params) action.params = [];
        lastResult = await executeOn[action.execute](...action.params);
        result.lastresult = action.saveLastResult ? lastResult : '';
        //console.log(lastResult);
      }
    }

    ////////////////////////////////////////////////////////////// TEST - FINISH

    delete result.running;
    delete result.lastresult;
    delete result.currenturl;
    result.status = 200;
  } catch (error) {
    result.status = 500;
    result.error = error;
    return callback(null, result);
  } finally {
    browser && (await browser.close());
  }
  return callback(null, result);
};

exports.handler = lambdaFunction;
