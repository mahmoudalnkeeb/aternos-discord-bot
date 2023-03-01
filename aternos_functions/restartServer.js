const mapCookies = require('../utils/cookiesMapping');
const cookies = mapCookies();
const Puppeteer = require('puppeteer-extra').PuppeteerExtra;
const pptr = require('puppeteer');
const puppeteer = new Puppeteer(pptr);
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const userAgent = require('user-agents');
const { restartSelector } = require('../configs/aternos_css_config');
const checkStatus = require('./checkServerStatus');

// --- puppeteer plugins start --
puppeteer.use(StealthPlugin());
// --- plugins section end ---

async function restartServer() {
  let browser = await puppeteer.launch({ headless: true });
  try {
    let page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    await page.setCookie(...cookies);
    await page.goto('https://aternos.org/server/');
    let status = await checkStatus();
    if (status != 'Online')
      return `Server isn't Online running current status:"${status}"`;
    await page.click(restartSelector);
    await page.waitForSelector('.online', {timeout:100000});
    return 'server restarted successfully';
  } catch (error) {
    console.log(error);
  } finally {
    const pages = await browser.pages();
    for (const page of pages) await page.close();
    await browser.close();
  }
}

module.exports = restartServer;
