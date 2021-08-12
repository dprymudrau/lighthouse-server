const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const request = require('request');
const util = require('util');

module.exports = async function launchChromeAndGoToPage(targetUrl, localChromeOptions, performanceData) {

    // Launch chrome using chrome-launcher.
    const chrome = await chromeLauncher.launch(localChromeOptions);
    localChromeOptions.port = chrome.port;

    // Connect to it using puppeteer.connect().
    const { body } = await util.promisify(request)(`http:/\/localhost:${localChromeOptions.port}/json/version`);
    const { webSocketDebuggerUrl } = JSON.parse(body);
    const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });

    // Create a new page.
    page = await browser.newPage();
    page.setDefaultTimeout(1000 * 60 * 5);
    await page.setViewport({
        width: localChromeOptions.defaultViewport.width,
        height: localChromeOptions.defaultViewport.height
    });

    await page.setExtraHTTPHeaders(localChromeOptions.extraHeaders);

    // Navigate to the target URL.
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    return {
        page: page,
        chromeOptions: localChromeOptions,
        browser: browser,
        chrome: chrome
    }
}
