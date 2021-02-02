const chromium = require('chrome-aws-lambda');
 
const lambdaFunction = async (event, context, callback) => {
  let result = null;
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    ////////////////////////////////////////////////////////////// TEST - BEGIN
    
    let page = await browser.newPage();
    await page.goto(event.url);
    result = await page.title();

    ////////////////////////////////////////////////////////////// TEST - FINISH
  } catch (error) {
    return callback(error);
  } finally {
    browser && await browser.close();
  }
  return callback(null, result);
};

exports.handler = lambdaFunction;