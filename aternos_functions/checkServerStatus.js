const fs = require('fs');
const cookies = JSON.parse(fs.readFileSync('./cookies/aternos.json')).cookies;
const Puppeteer = require('puppeteer-extra').PuppeteerExtra;
const pptr = require('puppeteer');
const puppeteer = new Puppeteer(pptr);
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const userAgent = require('user-agents');
const { statusSelector } = require('../configs/aternos_css_config');

// --- puppeteer plugins start --
puppeteer.use(StealthPlugin());
// --- plugins section end ---

async function checkStatus() {
  let browser = await puppeteer.launch({ headless: true });
  try {
    let page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    await page.setCookie(...cookies);
    await page.goto('https://aternos.org/server/');
    let statusElement = await page.$(statusSelector);
    let status = await page.evaluate((element) => {
      return element.textContent;
    }, statusElement);
    return status.trim();
  } catch (error) {
    console.log(error);
  } finally {
    const pages = await browser.pages();
    for (const page of pages) await page.close();
    await browser.close();
  }
}

module.exports = checkStatus;
