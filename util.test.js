const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');

// UNIT TESTS
test('Outputs name and text', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

test('Outputs data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
});

// INTEGRATION TEST (checkAndGenerate calls another function, 'validateInput')
test('Generates a valid text output', () => {
  const text = checkAndGenerate('max', 29);
  expect(text).toBe('max (29 years old)');
});

// END-TO-END TEST with Puppeteer
test('Creates an element with correct text and class', async () => {
  // 1) Set up a puppeteer browser
  const browser = await puppeteer.launch({
    // Uncomment this block to see puppeteer perform the actions in a GUI (Chromium)
    // headless: false,
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  });

  // 2) Define a new page
  const page = await browser.newPage();

  // 3) Tell the page to go to the specified url
  await page.goto(
    'file:///C:/Users/Ricardo/Downloads/Web%20Development/Projects/quasar-intro/testing-demo/js-testing-introduction/index.html'
  );

  // 4) Click on the input with an id of #name
  await page.click('input#name');

  // 5) Type into the #name input
  await page.type('input#name', 'Nikola Tesla');

  // 6) Same as above but with age
  await page.click('input#age');
  await page.type('input#age', '28');

  // 7) Click the buttons that adds a user
  await page.click('button#btnAddUser');

  // 8) Get the text from the added item and check if it's correct
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Nikola Tesla (28 years old)');

  // 9) Close the puppeteer browser to prevent errors with Jest
  browser.close();
}, 10000);
