const puppeteer = require('puppeteer');

const buttonClass = '.uArJ5e.UQuaGc.YhQJj.zo8FOc.ctEux';
const nextButtonClass = 'OCpkoe';
const prevButtonClass = 'GeGHKb';
const prefix = `lactf{`

const isFinished = false;

var flag = '';

(async () => {
    const browser = await puppeteer.launch({headless:false});
    console.log("Starting");
    const page = await browser.newPage();

    // First page
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSc-A-Vmx_Te-bAqnu3TrRj-DAsYTgn52uSk92v3fECQb3T83A/viewform');

    await page.waitForSelector('.whsOnd.zHQkBf');

    await page.focus('.whsOnd.zHQkBf')
    await new Promise(r => setTimeout(r, 500));
    await page.keyboard.type('test')

    await page.click(`${buttonClass}`);

    // Letters

    await page.waitForSelector('div[role="listbox"]');

    var nodes = await page.$$(".MocG8c.HZ3kWc.mhLiyf.OIC90c.LMgvRb")
    var symbols = [];

    for( let node of nodes ){
        var attr = await page.evaluate(el => el.getAttribute("data-value"), node);
        symbols.push(attr);
    }

    console.log(symbols);

    while(!isFinished){

        for( let i in symbols){
            await page.waitForSelector('div[role="listbox"]');
            await page.click('div[role="listbox"]');
            console.log(symbols[i]);
            var numberOfTimesToClickDown = 1;

            if(flag.length < prefix.length)
            {
                numberOfTimesToClickDown = symbols.findIndex(el => el === prefix[flag.length]) + 1;
            }

            var selectorForDropdown = `.MocG8c.HZ3kWc.mhLiyf.OIC90c.LMgvRb[data-value='${symbols[i]}']`;
            await page.waitForSelector(selectorForDropdown);

            for(var c = 0; c < numberOfTimesToClickDown; c++)
            {
                await new Promise(r => setTimeout(r, 200));
                await page.keyboard.press('ArrowDown');
            }
            
            await new Promise(r => setTimeout(r, 500));
            await page.keyboard.press('Enter');
            await new Promise(r => setTimeout(r, 500));

            await page.click(`${buttonClass}[jsname="${nextButtonClass}"]`);

            await page.waitForSelector('input[name="pageHistory"]');

            var pageHistory = await page.$('input[name="pageHistory"]')
            var pageHistoryValue = await page.evaluate(el => el.getAttribute("value"), pageHistory);
            var lastPage = pageHistoryValue.split(',').pop();

            if(lastPage % 2 == 0)
            {
                flag += symbols[i];
                console.log("flag so far -> " + flag)

                if(lastPage >= 62)
                    isFinished = true;
                
                break;
            }
            
            await page.click(`${buttonClass}[jsname="${prevButtonClass}"]`);
        }
    }
    console.log(flag);
})();