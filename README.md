***
# **Setup**

**Install**
- `npm install`

**Local development**
- `npm run start`

**Create Lambda**
- `npm run build-lambda`
- Upload created .zip file to Amazon Lambda Function
- Increase Lambda memory to min 1024m 
- Increase Lambda timeout to 5 min
# **Usage**

- Create a json file in `tests` folder (local development)
- Insert those properties:
  - `"testName": "Test exampe name"` optional
  - `"setDefaultTimeout": 30000,` optional
  - `"setViewport": { "width": 1280, "height": 800 }` optional 
  - `"goto": "https://example.com/"` *required
  - `"actions": [...]` *required
- `actions` is an array of objects (functions to call) composed of:
  - `"execute": "waitForXPath"` *required - is a function to call on page or previous result
  - `"params": []` optional - array of params to pass to the function
  - `"executeOnPrevious": true` optional - if true call func on result of previous action instead of on page
  - `"description": "Example of description"` optional - document you action if you want

A login example is `example.json` in `tests` folder
***
**Info**
- https://github.com/alixaxel/chrome-aws-lambda
- https://github.com/puppeteer/puppeteer/blob/main/docs/api.md
- https://pptr.dev/