const general = require('./general').default;

const getSelectorType = selector => (selector.startsWith('//') ? 'waitForXPath' : 'waitForSelector');
const getOptions = options => (options ? options : {visible: true});

const click = (exports.click = (selector, options) => {
  if (!selector) {
    throw Error('Element selector is needed');
  }
  return [
    {
      execute: getSelectorType(selector),
      params: [selector, getOptions(options)],
    },
    {
      execute: 'click',
      executeOnPrevious: true,
    },
  ];
});

const type = (exports.type = (selector, value, options) => {
  if (!value) {
    throw Error('Value to type is needed');
  }
  const clicked = click(selector, options);

  return [
    ...clicked,
    ...[
      {
        execute: 'type',
        params: [selector, value],
      },
    ],
  ];
});

const select = (exports.select = (selector, value, options) => {
  if (!value) {
    throw Error('Value to select is needed');
  }
  const typed = type(selector, value, options);
  return [...typed, ...click(`//mat-option[contains(., '${value}')]`, value)];
});

const exists = (exports.exists = (selector, options) => {
  if (!selector) {
    throw Error('Element selector is needed');
  }
  return [
    {
      execute: getSelectorType(selector),
      params: [selector, getOptions(options)],
    },
  ];
});

const wait = (exports.wait = seconds => {
  if (!seconds) seconds = 0;
  return [
    {
      execute: 'waitForTimeout',
      params: [seconds * 1000],
    },
  ];
});

const visit = (exports.visit = path => {
  if (!path) {
    throw Error('Url path is needed');
  }
  return [
    {
      execute: 'goto',
      params: [`${general.goto}${path}`],
    },
  ];
});
