const fs = require('fs');
const lighthouse = require('lighthouse');
const reportsFolderName = 'lighthouse-reports';
const desktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/report/report-generator');

function fromDateToStr(date) {
    date.setTime(date.getTime());
    var estTime = new Date(date.getTime()).toLocaleTimeString([], { timeZone: 'America/New_York', timeStyle: 'short' }); // Time without seconds.
    var estDate = new Date(date.getTime()).toDateString().replace(/^\S+\s/,''); // Date without a day name.

    return estDate.replace(/\s/g, '_') + '-' + estTime.replace(/\s/g, '_').replaceAll(":", "_");
}

module.exports = async function createLighthouseReport(currentState, reportName) {

    try {
        // Run Lighthouse.
        const { lhr } = await lighthouse(currentState.page.url(), currentState.chromeOptions, desktopConfig).then(results => {
            return results;
        });
        const html = reportGenerator.generateReport(lhr, 'html');

        // `.lhr` is the Lighthouse Result as a JS object.
        console.log(`Report is created against ${lhr.finalUrl}`);
        console.log(`${lhr.categories.performance.title} score: ${lhr.categories.performance.score * 100}`);

        // Write html report to the file.
        if (!fs.existsSync(reportsFolderName))
            fs.mkdirSync(reportsFolderName)

        fs.writeFile('lighthouse-reports/' + reportName + '-' + fromDateToStr(new Date()) + '.html', html, (error) => {
            if (error) {
                console.error(`Can not generate report: ${error.message}`);
            }
        });

    } catch(error) {
        console.log('The error occurred while Lighthouse tried to generate a report.');
        console.log(error.message);
    }

}
