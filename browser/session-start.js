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

    await page.setExtraHTTPHeaders({
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'crl8.fpcuid=7c931135-3abc-4d34-a660-1c04fa2ec6ec; _pxvid=0cdc24f0-adb2-11eb-a6c6-3139139bfa40; _gcl_au=1.1.1217705714.1620226583; __cq_uuid=abvuU4C4mwOVAXwxYnxEOT1kpm; _mibhv=anon-1620226583219-9651005831_7215; _scid=903db940-d361-40d4-a957-4343cf0a4c9d; _fbp=fb.1.1620226583307.1205221203; QuantumMetricUserID=9c20dde66305ea1c6e34ce30d9bec58f; _pin_unauth=dWlkPVpEYzJabVl3WmpRdE1qa3dZaTAwWldVeUxXRXdZemt0T0dJeVlUSTJNV1poTnpsaQ; BVBRANDID=36d20432-99d8-4d76-97ee-741f743033cf; sr_browser_id=50b3b2b6-92f1-45ab-b2a8-97387b7bd15b; cbt-consent-banner=CROSS-BORDER%20Consent%20Banner; amp_e8da3b=2vfn779maA-xfS8MtR_cWp...1f7r7eard.1f7r7eb60.7.0.7; _cc=AeKglHi8ND%2BJpU9SpM%2BIuYi9; ku1-vid=05c91c35-0b8c-2daf-f4bc-068003076528; _pxhd=lSCPOhUsKyMdUBIujexddXObz0nzhO/TjIDJP6qfNNxWqkmoLdLXwCLYD-yeUKytUNtlg27rp5Kfi8NV5kmoNg==:4TTvZy2VcpQHriC5FjABlWq8bmRQREQvIr0R7jedAZKSMkcBEhfRkwoDkcUfXwAL9UXhRJW/e-dxyOz6XoIBTyvSNOBIdqi0ufTCxfG9yJk=; __cq_dnt=0; dw_dnt=0; at_check=true; notice_behavior=implied,eu; ku1-sid=jbRvwuyRCgbzwEy5MjYMC; ua_exp_gei_928=1; consentCookie=first; pxcts=f51bfdd0-ee0d-11eb-8de2-697cd6452d6d; xdVisitorId=13AE0_fDi9Bn8UjMo6xv3m2qWXTMGfAkdO1PScOHCWaTfiQ75C5; atgRecVisitorId=13AE0_fDi9Bn8UjMo6xv3m2qWXTMGfAkdO1PScOHCWaTfiQ75C5; AMCVS_A9733BC75245B1A30A490D4D%40AdobeOrg=1; c_m=Direct%20LoadundefinedDirect%20Load; s_cc=true; emailSubscribeCookie=second; __cq_bc=%7B%22bcvk-US%22%3A%5B%7B%22id%22%3A%223024016%22%2C%22sku%22%3A%22195252032050%22%7D%2C%7B%22id%22%3A%223023545%22%2C%22sku%22%3A%22194514283568%22%7D%2C%7B%22id%22%3A%221360733%22%2C%22sku%22%3A%22194513367207%22%7D%2C%7B%22id%22%3A%223023004%22%2C%22sku%22%3A%22195250181170%22%7D%2C%7B%22id%22%3A%221361560%22%2C%22sku%22%3A%22194513882410%22%7D%2C%7B%22id%22%3A%223024720%22%2C%22sku%22%3A%22194514422585%22%7D%2C%7B%22id%22%3A%223023010%22%2C%22sku%22%3A%22194514247348%22%7D%5D%7D; BVImplmain_site=2471; tfc-l=%7B%22u%22%3A%7B%22v%22%3A%22o7smgud6krv5ldoblufo3atrha%22%2C%22e%22%3A1683736450%7D%2C%22s%22%3A%7B%22v%22%3A%22%22%2C%22e%22%3A1683736450%7D%2C%22k%22%3A%7B%22v%22%3A%22o7smgud6krv5ldoblufo3atrha%22%2C%22e%22%3A1683736450%7D%2C%22a%22%3A%7B%22v%22%3A%222395575a-2026-4851-b064-b75513c4a3e0%22%2C%22e%22%3A1627488282%7D%7D; tfc-s=%7B%22v%22%3A%22tfc-fitrec-product%3D1%22%7D; _ga=GA1.2.1332256098.1628066303; _clck=1mult5j|1; dwanonymous_7254072e2668c23dc3bf6cca213a6657=abr3bkcda4c3WpPTC3knal2DVu; cqcid=abr3bkcda4c3WpPTC3knal2DVu; UAVisitorType="logged in"; dwcustomer_7254072e2668c23dc3bf6cca213a6657=ab1m1v7LztqWS3LHjzkIDkcMeN; cquid=I3wAlP21a9OzBFe+haZp/fPu92n01bhDl5rGnm2hGW4=|66e35065b9b0aa5563aae01ccbdfee2c681923c6bbefd33454b699c075ca706a|5c31beef39558325b8870743b301b75352c9cdd76f1082fe623be0b96776596a; __cq_seg=0~-0.32!1~-0.32!2~-0.03!3~0.56!4~-0.30!5~0.51!6~-0.15!7~0.15!8~0.07!9~-0.30; UAActiveSession=1628269363.935; bfx.apiKey=41a1f990-a119-11ea-9767-f9dfebd38fce; bfx.env=PROD; bfx.logLevel=ERROR; bfx.sessionId=cd5b98e1-5bdb-4438-866f-73ed2aa9ff45; bfx.country=US; bfx.currency=USD; bfx.language=en; bfx.isInternational=false; _gid=GA1.2.556394135.1628590469; dwac_b69c08bd482c4e7baa999dc69c=6wSJAc7o8UKDl8-LtER6CImsNd8OhW8_ChQ%3D|dw-only|8713f19b-e427-48d6-b00c-8fb987bff99b||USD|false|US%2FEastern|true; sid=6wSJAc7o8UKDl8-LtER6CImsNd8OhW8_ChQ; dwsid=5YDI35mEYfmywYXC7ucUC4codAFZ6f-EO0IALh1QXgWiFJi42Cwxmjc6n79oi3DPyuEDx50-NaPur9ko5jv8pg==; AMCV_A9733BC75245B1A30A490D4D%40AdobeOrg=1585540135%7CMCMID%7C35883745290201757601027012428969546209%7CMCAAMLH-1629274923%7C7%7CMCAAMB-1629274923%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1628677323s%7CNONE%7CvVersion%7C4.4.0; _sctr=1|1628629200000; mbox=PC#f3aada76fd1d4b88868b6f38bb21db20.34_0#1691917566|session#22fa22b86aa048559aa6fd7be071851d#1628674625; mboxEdgeCluster=34; _dpm_ses.806f=*; _dpm_id.806f=a52235a2-c9df-42c5-8648-89a510630ea8.1625234357.31.1628672766.1628670124.464dc4c7-b97a-45ca-9d0b-4552d5d7836c; s_dl=1; atgRecSessionId=QeA0djBZ5f3xBw9whzySIDiu7VIBsPex-Z1udhJjVE1VWKRGZ8MM!-1336849021!1265651064; _uetsid=bc4b3370f9c311ebae6a29a4315eda01; _uetvid=b0a136f0db3d11eba7e693dea1c70e45; mp_underarmour_mixpanel=%7B%22distinct_id%22%3A%20%2217a67843acc50c-067096dba0399b-113a6054-13c680-17a67843acd678%22%2C%22bc_persist_updated%22%3A%201628252900015%2C%22bc_id%22%3A%20-501796326%7D; cto_bundle=WcZXbl9lN3F4WVh5NTlEUThoZkUxU0tkNjFyZjVFWkFVcDJpeUZZV0t1SXMwM2hHaFlpUUJmTkJNalhlJTJGOXFaT24lMkJNZUxOeng3WWtyWjg2NGlUZkRHVXBMRG0lMkJ5Z2diVzBhSG0lMkZJSVJsNzc3VUdFTEZHeGM5Y3Nrd2dEYiUyRnc2UHExcnpvMkZVbUVTZUFEZlFBQVZweDZBUCUyQnclM0QlM0Q; _derived_epik=dj0yJnU9NDZ1NTdEWGszYWdMR01XczNFcmR3OGU4aE5BSkN1b0wmbj05VGxNVFZxZVg0MVhOd1B6RWhWMGZRJm09MSZ0PUFBQUFBR0VUa3Y0JnJtPTEmcnQ9QUFBQUFHRVRrdjQ; _evga_63de={%22uuid%22:%22d62ef0cd18c11c78%22%2C%22puid%22:%22TGin7jUmH6elGbLj07QL7mpH61UPoA18vGgYWN2VEqz3ImLsn-Jt1VDWrqACzXY6cWxY3rbRzNDcFTptUqbttEyxVrEo4clBBNjWGAqkpjE9KZmmVmgynaBrPCIMscy89LXh8cez725qE4dyLAYAvQ%22%2C%22affinityId%22:%220GF%22}; _px3=f5664c4f1471c05bf17734701a022d8598481aa3df09bf2aa9b25040bfee6290:jnkMzCabGblaWNfCJEHvj8XZV7VvbQNlFQUQmVVY+eEYQS7/CgqTtCDVwJbnnEogmIS/EpHicVsez/AGtW+B3A==:1000:ZhRDMZFl0Qds9eBNKMZNpg2BPO1tQoqsLVH3XCjIsuLAeFGgja9Jk5SP/Dt7zTbJZXiXgJFyCdG6SR58VwhTnjvh+11QFQof5J+CLxItZCPYj4/t83WmB7jFgJoqPEEqIn/yQbTQ4lw0HAesARu/M/Tn3cAsibilr+Wgx2MU9jkNrxeyBc5/Kate/zNB4mYSRDoewffS1sgJeuzVcp/0Cw==; _gat_gtag_UA_39057133_1=1; utag_main=v_id:017a678434c20001e2282434447603078002207000942$_sn:31$_se:2$_ss:0$_st:1628674567053$vapi_domain:underarmour.com$_previouspage:home%3Bexp-1628676367063$ses_id:1628672765584%3Bexp-session$_pn:1%3Bexp-session; _clsk=15p9720|1628672767733|1|1|eus/collect|www.clarity.ms; s_ppvl=home%2C20%2C20%2C709%2C1440%2C709%2C1440%2C900%2C2%2CP; QuantumMetricSessionID=d5486cd931d5f8fa3e10fe96873ba6a7; s_ppv=home%2C14%2C14%2C709%2C1440%2C351%2C1440%2C900%2C2%2CP; s_sq=underarmourcom%252Cunderarmour%3D%2526c.%2526a.%2526activitymap.%2526page%253Dhome%2526link%253D1%2526region%253DbodyPage%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dhome%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fwww.underarmour.com%25252Fen-us%25252Fcart%2526ot%253DA; RT="z=1&dm=www.underarmour.com&si=d070b5b6-b57e-4f0f-91a2-3046a6e176cb&ss=ks79pn89&sl=0&tt=0&bcn=%2F%2F173c5b0b.akstat.io%2F&ld=1d0hmx&nu=3rp5zgxo&cl=p87&ul=p9e'
    });

    // Navigate to the target URL.
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    return {
        page: page,
        chromeOptions: localChromeOptions,
        browser: browser,
        chrome: chrome
    }
}