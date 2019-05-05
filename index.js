var downloadDir = "C:/4chan/";

const puppeteer = require('puppeteer');
const mkdir = require('mkdirp');
const wget = require('node-wget-promise');


var thread = process.argv[2];
// Thread has not been given to us
if(!thread){
    console.log('No thread supplied');
    process.exit();
}
// Thread does not match what we expect
if(!thread.match(/(.*)\/thread\/([0-9]*)/)){
    console.log('Thread does not match expected pattern');
    process.exit();
}
console.log('Reading ' + thread + '...');
var threadChars = thread.split('/');
console.log('Board: ' + threadChars[0]);
console.log('Thread: ' + threadChars[2]);
console.log('Downloading to '+ downloadDir+threadChars[0]+'/'+threadChars[2]);
mkdir(downloadDir+threadChars[0]+'/'+threadChars[2]);
downloadFromThread(thread);

async function downloadFromThread(thread){
    const browser = await puppeteer.launch({
        args: ['--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.goto('https://boards.4chan.org/'+thread);
    var images = await page.$$('.fileThumb');
    for await (var image of images){
        var imageItem = await image.getProperty('href');
        var itemValue = await imageItem.jsonValue();
        var fileName = itemValue.split('/')[4];
        await wget(itemValue,{
            output:downloadDir+threadChars[0]+'/'+threadChars[2]+'/'+fileName,
            onProgress:(val)=>{
                process.stdout.cursorTo(0);
                process.stdout.write(itemValue +' ==> '+ parseFloat(Math.round(val.percentage * 100)).toFixed(2)+'%');
            }
        });
        process.stdout.write("\n");
    }
    await browser.close();
    console.log('Done');
}