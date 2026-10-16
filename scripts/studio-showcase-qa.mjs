// Local QA only. Requires Playwright in NODE_PATH and CHROMIUM_EXECUTABLE_PATH.
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const {chromium}=createRequire(import.meta.url)('playwright');
const output='/tmp/ayman-showcase-qa';await mkdir(output,{recursive:true});
// Existing home, theme, copy, photos and CV must remain byte-for-byte identical.
const protectedFiles=['app/page.tsx','app/layout.tsx','app/globals.css','tailwind.config.ts','lib/data.ts','lib/i18n.tsx',...execFileSync('git',['ls-tree','-r','--name-only','HEAD','public'],{encoding:'utf8'}).trim().split('\n')];
for(const path of protectedFiles)assert.deepEqual(await readFile(path),execFileSync('git',['show','HEAD:'+path],{maxBuffer:8*1024*1024}),'Protected file changed: '+path);
let server;
const evidence=[];
try{
server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','localhost','--port','3151'],{stdio:['ignore','pipe','pipe']});
await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Startup timeout')),15000);server.stdout.on('data',x=>{if(String(x).includes('Ready')){clearTimeout(timer);resolve();}});server.on('error',reject);});
for(const width of [360,390,1440]){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--disable-dev-shm-usage','--no-zygote','--single-process']});
 try{
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3151/');const images=page.locator('#portfolio .columns-2 img');assert.equal(await images.count(),19);
 const card=page.locator('article[aria-labelledby="studio-project-title"]');await card.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
 assert.ok((await card.innerText()).includes('has not yet been live-tested or activated'));assert.equal(await card.getByRole('link',{name:'Explore the studio'}).getAttribute('href'),'https://ayman-ai-studio.vercel.app/');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await card.screenshot({path:output+'/card-en-'+width+'.png'});
 await page.getByRole('button',{name:'Switch language',exact:true}).click();assert.equal(await page.locator('html').getAttribute('dir'),'rtl');assert.ok((await card.innerText()).includes('لم يُختبر'));await card.screenshot({path:output+'/card-ar-'+width+'.png'});
 // Existing image viewer still works.
 await page.locator('#portfolio .columns-2 button').first().click();await page.getByRole('button',{name:'Close',exact:true}).waitFor();await page.keyboard.press('Escape');
 await card.getByRole('link',{name:'دراسة المشروع'}).click();await page.getByRole('heading',{name:'AYMAN AI STUDIO',exact:true}).waitFor();
 await page.getByText('لم يُتحقق', {exact:false}).waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.getByRole('button',{name:'تغيير اللغة',exact:true}).click();assert.equal(await page.locator('html').getAttribute('dir'),'ltr');assert.ok((await page.locator('main').innerText()).includes('has not been verified or activated'));
 await page.screenshot({path:output+'/case-study-'+width+'.png'});await page.reload();await page.getByRole('heading',{name:'AYMAN AI STUDIO',exact:true}).waitFor();assert.deepEqual(errors,[]);
 evidence.push({width,result:'PASS',languages:['en','ar'],galleryImages:19,lightbox:'PASS',links:'PASS',caseStudy:'PASS',overflow:'none',pageErrors:errors});
 }finally{await browser.close();}
}
const report={protectedFiles:protectedFiles.length,protectedFilesIdentical:true,evidence,limitations:['Chromium emulation, not physical phones or Safari','No hosted preview test yet']};await writeFile(output+'/summary.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{server?.kill('SIGTERM');}
