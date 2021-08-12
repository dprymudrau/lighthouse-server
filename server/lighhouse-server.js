const http = require('http');
const fs = require('fs');
launchChromeAndGoToPage = require('../browser/session-start.js');
killBrowser = require('../browser/session-kill.js');
createLighthouseReport = require('../lighthouse/report-generator.js');
const host = 'localhost';
const port = 7991;

var chromeOptions = JSON.parse(fs.readFileSync('configs/chrome-options.json'));

const server = http.createServer((req, res) => {
    let jsonData = '';
    req.on('data', body => {
        jsonData += body;   
    })
    var message = 'ok';
    req.on('end', async () => {
        try {
        let requestJson = JSON.parse(jsonData);
        chromeOptions.extraHeaders = requestJson.extraHeaders;

        console.log(JSON.stringify(chromeOptions));
        let targetUrl = requestJson.baseUrl;
        console.log(`Target URL -> ${targetUrl}`);
        locale = targetUrl.substring(targetUrl.length - 3, targetUrl.length -1 ).toLowerCase();


        let currentStateTest = await launchChromeAndGoToPage(targetUrl, chromeOptions, targetUrl);
        await page.close();
        await createLighthouseReport(currentStateTest, 'page');
        await killBrowser(currentStateTest);

        
        res.statusCode = 200;
        } catch(e) {
            message = 'Invalid JSON'
            console.log(e);
            res.statusCode = 500;
        } finally {
            res.end(message); 
        }
        
    })
    
});
server.listen(port, host, () => {
    console.log(`Server is up and running on http://${host}:${port}`);
})