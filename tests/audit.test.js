const fs = require('fs');
launchChromeAndGoToPage = require('../browser/session-start.js');
killBrowser = require('../browser/session-kill.js');
createLighthouseReport = require('../lighthouse/report-generator.js');

describe('Test suite',  () => {

    let chromeOptions = {};
    let performanceData = {};

    before(() => {

        chromeOptions = JSON.parse(fs.readFileSync('configs/chrome-options.json'));
        performanceData = JSON.parse(fs.readFileSync('test-data/performanceData.json'));

        targetUrl = process.env.URL || performanceData.baseUrl;

        // get two last characters of the url before the last slash
        locale = targetUrl.substring(targetUrl.length - 3, targetUrl.length -1 ).toLowerCase();
    });

    it('get target page using extra headers', async () => {

        let currentStateTest = await launchChromeAndGoToPage(targetUrl, chromeOptions, performanceData);

        await page.close();

        await createLighthouseReport(currentStateTest, 'page');

        await killBrowser(currentStateTest);

    }).timeout(3 * 60000);

});
