const mapCookies = require('../utils/cookiesMapping');
const cookies = mapCookies();
const Puppeteer = require('puppeteer-extra').PuppeteerExtra;
const pptr = require('puppeteer');
const puppeteer = new Puppeteer(pptr);
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const userAgent = require('user-agents');
const { startSelector } = require('../configs/aternos_css_config');
const checkStatus = require('./checkServerStatus');

// --- puppeteer plugins start --
puppeteer.use(StealthPlugin());
// --- plugins section end ---

async function startServer() {
  let browser = await puppeteer.launch({ headless: true });
  try {
    let page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    await page.setCookie(...cookies);
    await page.goto('https://aternos.org/server/');
    let status = await checkStatus();
    if (status != 'Offline')
      return `Server isn't offline current status:"${status}"`;
    await page.click(startSelector);
    await page.waitForSelector('.online', { timeout: 0 });
    return 'server started successfully';
  } catch (error) {
    console.log(error);
  } finally {
    const pages = await browser.pages();
    for (const page of pages) await page.close();
    await browser.close();
  }
}

module.exports = startServer;
