// const puppeteer = require('puppeteer');

QUnit.module('End-to-end | IssuesDataStorage', {
  beforeEach: () => {
    // prepare something before each test
  },
  afterEach: () => {
    // do something after each test
  },
});

// -------- createIssue tests --------

const getIssueForTest = () => ({
  id: '234-13425-21223',
  description: 'Сломался утюг',
  severity: 'Low',
  assignedTo: 'Иванов И.И',
  status: 'Open',
});

QUnit.skip('Add issue', async assert => {
  // Arrange;
  assert.expect(0);
  const browser = await puppeteer.launch({
    hadless: false,
    slowMo: 250,
    args: ['--window-size=1920,1080'],
  });

  // Act
  const page = await browser.newPage();
  await page.goto('file:///D:/Temp/issue-tracker-demo/dist/index.html');

  // Assert
});
