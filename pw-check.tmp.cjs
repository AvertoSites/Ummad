const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(String(err)));
  await page.goto('http://localhost:5174/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/DEFAUL~1.ANC/AppData/Local/Temp/pw-home-top.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/DEFAUL~1.ANC/AppData/Local/Temp/pw-home-top-mobile.png' });
  console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
