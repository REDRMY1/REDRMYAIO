/* ==========================================================================
   REDRMY AIO — APPLICATION LOGIC & DATASET
   ========================================================================== */

/* ── MODALS ── */
function openModal(id){
  const m=document.getElementById(id);if(!m)return;
  if(id==='name-modal'){
    const inp=document.getElementById('name-inp');
    if(inp)inp.value=profileName;
    const prev=document.getElementById('modal-av-preview');
    if(prev)prev.src=profileAvData||getAvatarSrc(profileName);
  }
  if(id==='todo-modal'||id==='goal-modal'){
    renderGoals();
    setTimeout(()=>{
      const inp=document.getElementById('todo-inp')||document.getElementById('goal-inp');
      if(inp){ inp.value=''; inp.focus(); }
    }, 120);
  }
  if(id==='notes-modal'){
    initNotes();
    setTimeout(()=>{
      const area=document.getElementById('notes-area');
      if(area) area.focus();
    }, 120);
  }
  m.classList.add('open');
}
function closeModal(id){
  const m=document.getElementById(id);if(!m)return;
  m.classList.remove('open');
}
function closePopup(){
  const p=document.getElementById('popup');if(!p)return;
  p.style.transition='opacity .38s';p.style.opacity='0';
  setTimeout(()=>{p.style.display='none';},380);
}

/* ── PORTAL GATE INTERSTITIAL ── */
let portalGateDest=null;
function openPortalGate(dest){
  if(localStorage.getItem('red_tg_joined') === 'true'){
    if(dest && dest.startsWith('http')){
      window.open(dest,'_blank');
      return;
    }
  }
  portalGateDest=dest;
  const pg=document.getElementById('portal-gate');
  const popup=document.getElementById('pg-popup');
  if(pg)pg.classList.add('show');
  if(popup)popup.classList.remove('show');
}
function closePortalGate(){
  const pg=document.getElementById('portal-gate');
  const popup=document.getElementById('pg-popup');
  if(pg)pg.classList.remove('show');
  if(popup)popup.classList.remove('show');
  portalGateDest=null;
}
let pgCrossInterval = null;
function openGatePlatform(){
  const popup = document.getElementById('pg-popup');
  if(!popup) return;

  popup.classList.add('show');
  const cross = document.getElementById('pg-pop-cross');
  const cdHint = document.getElementById('pg-countdown-hint');
  const cdSec = document.getElementById('pg-cd-sec');

  let remaining = 5;
  if (cross) {
    cross.style.display = 'flex';
    cross.disabled = true;
    cross.style.cursor = 'default';
    cross.style.color = 'var(--t3)';
    cross.style.fontSize = '11px';
    cross.textContent = remaining + 's';
    cross.setAttribute('aria-label', `Close available in ${remaining} seconds`);
  }
  if (cdHint) cdHint.style.display = 'block';
  if (cdSec) cdSec.textContent = remaining;

  if (pgCrossInterval) clearInterval(pgCrossInterval);
  pgCrossInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      if (cross) {
        cross.textContent = remaining + 's';
        cross.setAttribute('aria-label', `Close available in ${remaining} seconds`);
      }
      if (cdSec) cdSec.textContent = remaining;
    } else {
      clearInterval(pgCrossInterval);
      pgCrossInterval = null;
      if (cross) {
        cross.disabled = false;
        cross.style.cursor = 'pointer';
        cross.style.color = 'var(--t2)';
        cross.style.fontSize = '13px';
        cross.textContent = '✕';
        cross.setAttribute('aria-label', 'Close');
      }
      if (cdHint) cdHint.style.display = 'none';
    }
  }, 1000);
}
function closePgPopup(){
  const popup = document.getElementById('pg-popup');
  if(popup) popup.classList.remove('show');
  if (pgCrossInterval) {
    clearInterval(pgCrossInterval);
    pgCrossInterval = null;
  }
}
function finishPortalGate(){
  if(portalGateDest){
    if(portalGateDest.startsWith('http')){
      window.open(portalGateDest,'_blank');
    }
  }
  closePortalGate();
}

/* ── IMAGE ASSETS MAPPING ── */
const L={
  pw:'https://files.catbox.moe/4bl6pv.jpg',sw:'https://files.catbox.moe/6krtv7.jpg',
  nt:'https://files.catbox.moe/ys0qdf.webp',vk:'https://files.catbox.moe/xx08fu.jpg',
  eb:'https://files.catbox.moe/cpe3bj.webp',siq:'https://files.catbox.moe/e7hpop.png',
  ac:'https://files.catbox.moe/fem3sx.png',mj:'https://files.catbox.moe/jd76df.png',
  tb:'https://files.catbox.moe/nbborq.png',kd:'https://files.catbox.moe/s2xc5l.png',
  cw:'https://files.catbox.moe/fgq76h.png',rwa:'https://files.catbox.moe/o8qm22.png',
  sf:'https://files.catbox.moe/g1a6gu.png',al:'https://files.catbox.moe/iej5nq.png',
  va:'https://files.catbox.moe/hanf2r.jpg',jp:'https://files.catbox.moe/ztj5yr.png',
  un:'https://files.catbox.moe/9189g5.jpg',mb:'https://files.catbox.moe/d85txz.webp',
  rgv:'https://files.catbox.moe/p3i7be.png',ak:'https://files.catbox.moe/0faxp6.png',
  pa:'https://files.catbox.moe/83btjt.png',cds:'https://files.catbox.moe/q7uw12.png',
  kgs:'https://files.catbox.moe/527fju.jpeg',
  kk:'https://files.catbox.moe/329m0d.jpg',
  kka:'https://files.catbox.moe/vup4yy.jpg',
  cx:'logo.png',
  kxu:'https://files.catbox.moe/csc94g.jpg',
  srv:'https://files.catbox.moe/w0qgcl.png',
  cuetl:'https://files.catbox.moe/wxf48g.png',
  ss2:'https://files.catbox.moe/no5ym9.jpg',vs:'https://files.catbox.moe/dohcbz.jpg',
  pwf:'https://files.catbox.moe/ktvkts.png',nm2:'https://files.catbox.moe/33nrrm.jpg',
  ps:'https://files.catbox.moe/oqbtqa.jpg',mtr:'https://files.catbox.moe/0o6ew5.jpg',
  lf:'https://files.catbox.moe/t2gglk.jpg',sp:'https://files.catbox.moe/hycy9z.jpg',
  ez:'https://files.catbox.moe/60e2um.jpg',pwj:'https://files.catbox.moe/eu4e9j.jpg',
  nstu:'https://files.catbox.moe/6w6leb.jpg',ashs:'https://files.catbox.moe/cmrkuj.png',
  gen:'logo.png',
  edn:'https://files.catbox.moe/60pit6.jpg',cnw:'https://files.catbox.moe/gz4og0.jpg',
  pt:'https://files.catbox.moe/xfjbeo.jpg',rb11:'https://files.catbox.moe/ruwegx.png',
  rb12:'https://files.catbox.moe/2h1a00.png',bv:'https://files.catbox.moe/gk0vkr.jpg',
  bk:'https://files.catbox.moe/sn1xpj.png',
  iit:'https://files.catbox.moe/srwr6e.png',pipro:'https://files.catbox.moe/aigz2b.png',
  munil:'https://files.catbox.moe/7bqyaa.png',msahab:'https://files.catbox.moe/54a09n.png',
  tbp:'https://files.catbox.moe/269dlk.png',gb:'https://files.catbox.moe/dc3obk.png',
  sachin:'https://files.catbox.moe/83hb7r.png',asc:'https://files.catbox.moe/cmrkuj.png',
  rgk:'https://files.catbox.moe/w295s2.png',edut:'https://files.catbox.moe/oddn46.png',
  tsagar:'https://files.catbox.moe/5d1r3b.png',mhtcet:'https://files.catbox.moe/giuyjf.png',
};

/* ── MAIN PROVIDERS DATA (ALL LINKS PRESERVED) ── */
const PROV=[
  {id:'redrmyaio',name:'REDRMY AIO',logo:'logo.png',best:true,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pwthor.live/study/batches'},
    {n:'Physics Wallah 2',l:L.pw,t:'web',gate:'https://vidcloud.eu.org/'},
    {n:'Physics Wallah 3',l:L.pw,t:'web',url:'https://m.pwmarco.site/study/batches'},
    {n:'Physics Wallah 4',l:L.pw,t:'web',url:'https://studyrays.cc/'},
    {n:'Physics Wallah 5',l:L.pw,t:'web',url:'https://physicswallah.pwnexus.dpdns.org/study/batches'},
    {n:'Physics Wallah 6',l:L.pw,t:'web',gate:'https://stream.testuk.org'},
    {n:'Physics Wallah 7',l:L.pw,t:'web',gate:'http://pwsphere.vercel.app'},
    {n:'PW Pi',l:L.pipro,t:'web',url:'https://pipro.deltastudy.fun/'},
    {n:'Pi 2',l:L.pipro,t:'web',url:'https://studyaura.online/study/pi'},
    {n:'Digital books',l:L.pw,t:'web',url:'https://books.streamfiles.eu.org/'},
    {n:'Digital book 2',l:L.pw,t:'web',url:'https://books.studybeepro.site/'},
    {n:'Digital Book Test',l:L.pw,t:'web',url:'https://pwxbooks.pages.dev/'},
    {n:'Infinite Practice',l:L.pw,t:'web',url:'https://pwx.pages.dev/batch/infinite-practice'},
    {n:'Infinite Practice 2',l:L.pw,t:'web',url:'https://pwnexus.dpdns.org/pw-infinity-practice'},
    {n:'Allen',l:'https://files.catbox.moe/iej5nq.png',t:'bot',url:'https://t.me/prepneet1bot?start=start'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://nexthope.pages.dev/unacademy/'},
    {n:'Unacademy 2',l:L.un,t:'web',url:'https://unacademy.primestudy.live/'},
    {n:'Unacademy 3',l:L.un,t:'web',url:'https://unacademyy.vercel.app'},
    {n:'KGS 1',l:L.kgs,t:'web',url:'https://sahukgs.vercel.app/batches'},
    {n:'KGS 2',l:L.kgs,t:'web',url:'https://studyapkmodkgs.vercel.app/course'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt.streamfiles.eu.org/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mj.streamfiles.eu.org/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://studybeepro.site/vibrante/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://selection-way-lake.vercel.app/'},
    {n:'Selection Way Test',l:L.sw,t:'web',url:'https://testrankingfree.vercel.app/'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://learnbyakp.site/rwa/batch'},
    {n:'Career Will',l:L.cw,t:'web',url:'https://runtkyp.xo.je/?i=1'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://coursaa-main.vercel.app/'},
    {n:'Apna College 2',l:L.ac,t:'web',url:'https://studyapkmod-apnacollege.vercel.app/'},
    {n:'Target Board',l:L.tb,t:'web',url:'https://studyapkmod-targetboard.vercel.app/'},
    {n:'Vidyagram',l:L.vk,t:'web',url:'https://bat.vidyagram.workers.dev/'},
    {n:'Vidyagram 2',l:L.vk,t:'web',url:'https://learnbyakp.site/vidyagram'},
    {n:'RG Vikramjeet',l:L.rgv,t:'web',url:'https://learnbyakp.site/vikaram'},
    {n:'Pramar Batches',l:'https://files.catbox.moe/3seq41.png',t:'web',url:'https://tgdoraemon.vercel.app'},
    {n:'Vidyakul',l:L.vk,t:'web',url:'https://vidyakool.streamfiles.eu.org/'},
    {n:'Sarvam Crash Course',l:L.srv,t:'web',url:'https://sarvamkota26.netlify.app/'},
    {n:'Sarvam Career Institute',l:L.srv,t:'web',url:'https://sarvamcc2026.netlify.app/'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://spidyiq.vercel.app/'},
    {n:'CDS Journey',l:L.cds,t:'web',url:'https://spidyuniversecds.vercel.app/'},
    {n:'Sachin Academy',l:'https://i.ibb.co/n8PJXJ5X/Screenshot-2026-08-28-16-25-52-876-com-android-chrome.png',t:'web',url:'https://sachinclassex1.vercel.app/'},
    {n:'Sachin Classes 2',l:'https://i.ibb.co/n8PJXJ5X/Screenshot-2026-08-28-16-25-52-876-com-android-chrome.png',t:'web',url:'https://sachin.nexthope.site'},
    {n:'Toppers Wisdom',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://studyapkmod-toperwis.vercel.app/'},
    {n:'GS Vision',l:'https://files.catbox.moe/mzecv5.png',t:'web',url:'https://nexthope.pages.dev/gsvision/'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://nexthope.pages.dev/futurekul/'},
    {n:'MD Classes',l:'https://iili.io/CehU8tn.png',t:'web',url:'https://mdclassesx.vercel.app/'},
    {n:'Eduteria',l:'https://files.catbox.moe/e082of.png',t:'web',url:'https://studyapkmod-eduteria.vercel.app/'},
    {n:'Munil Sir',l:L.munil,t:'web',url:'https://deltastudy.fun/munilsir'},
    {n:'Master Sahab',l:L.msahab,t:'web',url:'https://mastersahab.studybeepro.site/'},
    {n:'Padhle Akshay',l:L.pa,t:'web',url:'https://trms-akshay.nextmate.site/home'},
    {n:'Magnet Brain',l:L.mb,t:'web',url:'https://www.magnetbrains.com/'},
    {n:'Pinnacle Book',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://nexthope.pages.dev/pinnacle/'}]},
  {id:'redrmy2',name:'REDRMY 2.0',logo:'logo.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://redrmy-pw.vercel.app/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://redrmy-sw.vercel.app/'}]},
  {id:'studyrays',name:'StudyRays',logo:'https://files.catbox.moe/2i70nr.png',best:true,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://StudyRays.cc'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://studyiq.streamfiles.eu.org/'},
    {n:'CDS Journey',l:L.cds,t:'web',url:'https://cds.streamfiles.eu.org/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://selectionway.streamfiles.eu.org/'},
    {n:'Vidyakul',l:L.vk,t:'web',url:'https://vidyakool.streamfiles.eu.org/'},
    {n:'IIT School',l:L.iit,t:'web',url:'https://others.streamfiles.eu.org/iit/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt.streamfiles.eu.org/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mj.streamfiles.eu.org/'},
    {n:'Digital books',l:L.pw,t:'web',url:'https://RaysBook.live'}]},
  {id:'asmulti',name:'AS Multiverse',logo:'https://files.catbox.moe/ig737i.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'both',url:'https://asmultiverse.com/5eb393ee95fab7468a79d189/batch-overview'},
    {n:'Utkarsh Classes',l:'https://i.postimg.cc/wv3XtmG8/20260217-013950.jpg',t:'web',url:'https://asmultiverse.com/'},
    {n:'Sketch Book By Abhishek',l:'https://i.postimg.cc/pybKhcQf/Sketchbook-By-Abhishek.png',t:'web',url:'https://asmultiverse.com/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a356fx5/batch-overview'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a79d182/batch-overview'},
    {n:'Vidyakul',l:'https://i.postimg.cc/Vkm2545X/20250929-160150.jpg',t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a79d2853/batch-overview'},
    {n:'Education Baba',l:L.eb,t:'web',url:'https://asmultiverse.com/5eb393ee9586hgvxve76fx5/batch-overview'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://asmultiverse.com/5eb393ee9586hgvxve76fx5/batch-overview'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a79456669/batch-overview'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://asmultiverse.com/69d6a2a167a3a4263ae3d0d0/batch-overview'},
    {n:'Target Board',l:L.tb,t:'web',url:'https://asmultiverse.com/694690cbe1df5128eacc5caa/batch-overview'},
    {n:'KD Live',l:'https://i.postimg.cc/65HVCbLY/20250923-192017.jpg',t:'both',url:'https://asmultiverse.com/5eb393ee95fab7468a79d385/batch-overview'},
    {n:'Career Will',l:L.cw,t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a79d187/batch-overview'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'both',url:'https://asmultiverse.com/5eb393ee95fab7468a795767/batch-overview'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://asmultiverse.com/5eb393ee95fab7468a79d189/batch-overview'}]},
  {id:'studystark',name:'StudyStark',logo:'https://files.catbox.moe/tdfmzz.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://vidcloud.eu.org/'}]},
  {id:'nexthope',name:'NextHope',logo:'https://i.ibb.co/v4k8LdYN/nexthope.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://nexthope.pages.dev/pw/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nexthope.pages.dev/nt/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://nexthope.pages.dev/mj/'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://nexthope.pages.dev/unacademy/'},
    {n:'Unacademy Offline',l:L.un,t:'web',url:'https://nexthope.pages.dev/uncoffline/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://nexthope.pages.dev/vb/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://nexthope.pages.dev/sw/'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://nexthope.pages.dev/rwa/'},
    {n:'GS Vision',l:'https://files.catbox.moe/mzecv5.png',t:'web',url:'https://nexthope.pages.dev/gsvision/'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://nexthope.pages.dev/futurekul/'},
    {n:'Pinnacle Books',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://nexthope.pages.dev/pinnacle/'},
    {n:'Sachin Classes',l:'https://i.ibb.co/n8PJXJ5X/Screenshot-2026-08-28-16-25-52-876-com-android-chrome.png',t:'web',url:'https://sachin.nexthope.site'}]},
  {id:'pwnexus',name:'PW Nexus',logo:'https://files.catbox.moe/kxt4x7.jpg',plats:[
    {n:'Physics Wallah 1',l:L.pw,t:'web',url:'https://pw.pwnexus.dpdns.org/'},
    {n:'Physics Wallah 2',l:L.pw,t:'web',url:'https://physicswallah.pwnexus.dpdns.org/study/batches'},
    {n:'Infinity Practice',l:L.pw,t:'web',url:'https://pwnexus.dpdns.org/pw-infinity-practice'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://pwnexus.dpdns.org/next-topper'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://pwnexus.dpdns.org/mission-jeet'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://pwnexus.dpdns.org/unacademy'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://pwnexus.dpdns.org/vibrant-academy'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://pwnexus.dpdns.org/selection-way'},
    {n:'GS Vision',l:'https://files.catbox.moe/mzecv5.png',t:'web',url:'https://pwnexus.dpdns.org/gs-vision'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://pwnexus.dpdns.org/future-kul'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://pwnexus.dpdns.org/rojgar-with-ankit'},
    {n:'Master Sahab',l:L.msahab,t:'web',url:'https://pwnexus.dpdns.org/master-sahab'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://pwnexus.dpdns.org/khan-global'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://pwnexus.dpdns.org/apna-college'}]},
  {id:'rarestudy',name:'Rare Study',logo:'https://files.catbox.moe/sso18v.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://rarestudy.testuk.org/keygenerate'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt.testuk.org/keygenerate'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mj.testuk.org/keygenerate'}]},
  {id:'delta',name:'Delta Study',logo:'https://files.catbox.moe/ck7ipz.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://deltastudy.fun/study-v2/batches'},
    {n:'Pi Pro',l:L.pipro,t:'web',url:'https://pipro.deltastudy.fun/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://deltastudy.fun/nexttoppers'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://deltastudy.fun/missionjeet'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://deltastudy.fun/vibrant'},
    {n:'Munil Sir',l:L.munil,t:'web',url:'https://deltastudy.fun/munilsir'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://deltastudy.fun/rojgarwithankit'},
    {n:'Science & Fun',l:L.sf,t:'web',url:'https://deltastudy.fun/scienceandfun'},
    {n:'Padhle',l:L.pa,t:'web',url:'https://deltastudy.fun/padhle'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://deltastudy.fun/sway'},
    {n:'Master Sahab',l:L.msahab,t:'web',url:'https://deltastudy.fun/mastersahab'}]},
  {id:'spidey',name:'Spidey Universe',logo:'https://files.catbox.moe/nzrsys.jpg',plats:[
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://spidyrwa.vercel.app/'},
    {n:'CDS Journey',l:L.cds,t:'web',url:'https://spidyuniversecds.vercel.app/'},
    {n:'Khan Global Studies',l:L.kgs,t:'web',url:'https://spidy-kgs.vercel.app/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://spidyuniverseway.vercel.app/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://spidytopper.vercel.app/'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://spidyiq.vercel.app'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://spidyunacademy.vercel.app/'}]},
  {id:'akkix',name:'AkkiXstudy',logo:'https://files.catbox.moe/ihorqr.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://akkistudy.netlify.app/'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://akkistudy.netlify.app/'}]},
  {id:'itrms',name:'ITRMS',logo:'https://files.catbox.moe/5lzb53.jpg',plats:[
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://vibrant.nextmate.site/'},
    {n:'RG Vikramjeet',l:L.rgv,t:'web',url:'https://rgvikramjeet.nextmate.site/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://missionjeet.nextmate.site/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://missionjeet.nextmate.site/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://sw.nextmate.site/'},
    {n:'Vidyakul',l:L.vk,t:'web',url:'https://trmsvidyakul.nextmate.site/'},
    {n:'Padhle Akshay',l:L.pa,t:'web',url:'https://trms-akshay.nextmate.site/'},
    {n:'Test Sagar',l:L.tsagar,t:'web',url:'https://test-sagar-jet.vercel.app/'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://trms-ac.nextmate.site/'}]},
  {id:'pwthor',name:'PW Thor',logo:'https://files.catbox.moe/1k15eb.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pwthor.live/study/batches'}]},
  {id:'studyratna',name:'Study Ratna',logo:'https://files.catbox.moe/tl1on1.jpg',plats:[
    {n:'Unacademy',l:L.un,t:'bot',url:'http://t.me/Study_Ratna_LiteBot/app'},
    {n:'Physics Wallah',l:L.pw,t:'bot',url:'http://t.me/Study_Ratna_LiteBot/app'},
    {n:'KGS',l:L.kgs,t:'bot',url:'http://t.me/Study_Ratna_LiteBot/app'},
    {n:'Vidyakul',l:L.vk,t:'bot',url:'http://t.me/Study_Ratna_LiteBot/app'},
    {n:'Next Topper',l:L.nt,t:'bot',url:'http://t.me/Study_Ratna_LiteBot/app'}]},
  {id:'studypanda',name:'Study Panda',logo:'https://files.catbox.moe/09tz78.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://physicswalla.studypanda.live'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://studypanda.live/nexttoppers'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://studypanda.live/missionjeet'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://studypanda.live/una'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://studypanda.live/vibrant'},
    {n:'Master Sahab',l:L.msahab,t:'web',url:'https://mastersahab.studypanda.live/'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://rwa.studypanda.live/'}]},
  {id:'alpha',name:'AlphaStudySquad',logo:'https://files.catbox.moe/nf0aga.jpg',apk:'https://files.catbox.moe/fr3bnw.apk',plats:[
    {n:'Physics Wallah',l:L.pw,t:'app',url:null}]},
  {id:'promods',name:'PRO Mods',logo:'https://files.catbox.moe/8qxj63.jpg',plats:[
    {n:'Selection Way',l:L.sw,t:'web',url:'https://selectionwayy.vercel.app'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://studyiqq.vercel.app/'},
    {n:'RWA Web',l:L.rwa,t:'web',url:'https://rojgarwithankitt.vercel.app'},
    {n:'Selection Way Test',l:L.sw,t:'web',url:'https://testrankingfree.vercel.app'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://khanglobal.vercel.app'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://unacademyy.vercel.app'}]},
  {id:'sigma',name:'Sigma Study',logo:'https://files.catbox.moe/or00yi.jpg',plats:[
    {n:'Unacademy',l:L.un,t:'app',url:null,apk:'https://files.catbox.moe/zahlci.apk'},
    {n:'Study IQ',l:L.siq,t:'app',url:null,apk:'https://files.catbox.moe/n467aq.apk'},
    {n:'Selection Way',l:L.sw,t:'app',url:null,apk:'https://files.catbox.moe/v7bsbz.apk'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'app',url:null,apk:'https://files.catbox.moe/vqlgjl.apk'},
    {n:'Next Topper',l:L.nt,t:'app',url:null,apk:'https://files.catbox.moe/kf7a2n.apk'},
    {n:'Mission Jeet',l:L.mj,t:'app',url:null,apk:'https://files.catbox.moe/yd00mg.apk'},
    {n:'KGS',l:L.kgs,t:'app',url:null,apk:'https://files.catbox.moe/3tj903.apk'},
    {n:'CDS Journey',l:L.cds,t:'app',url:null,apk:'https://files.catbox.moe/8j32vv.apk'},
    {n:'Physics Wallah',l:L.pw,t:'app',url:null,apk:'https://files.catbox.moe/br5186.apk'}]},
  {id:'rolexcoderz',name:'Rolexcoderz',logo:'https://files.catbox.moe/dj3vjj.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://rolexcoderz.com/PW/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://rolexcoderz.com/VT'},
    {n:'Next Toppers',l:L.nt,t:'web',url:'https://rolexcoderz.in/NT'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://rolexcoderz.in/MissionJeet'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://rolexcoderz.com/Pi/'},
    {n:'Aleena Rais',l:'https://files.catbox.moe/zy574u.png',t:'web',url:'https://rolexcoderz.com/AR/'}]},
  {id:'pwsphere',name:'PWSphere',logo:'https://files.catbox.moe/n7zwh0.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://pwsphere.vercel.app'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://pisphere.vercel.app'}]},
  {id:'studyspark2',name:'StudySpark',logo:L.ss2,plats:[
    {n:'Physics Wallah',l:L.pw,t:'p',url:'http://TheStudySpark.site'}]},
  {id:'vedstudy',name:'Ved Study',logo:L.vs,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://vedstudy.com'}]},
  {id:'primestudy',name:'Prime Study',logo:'https://i.ibb.co/Xr6bD91N/IMG-20260726-184741-330.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw.primestudy.live/auth'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nexttopper.primestudy.live/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mission-jeet.primestudy.live/missionjeet/'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://unacademy.primestudy.live/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://vibrante.primestudy.live/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://sw.primestudy.live/'}]},
  {id:'studybee',name:'Study Bee',logo:'https://i.ibb.co/s9QQQZhb/IMG-20260726-185202-057.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw.studybeepro.site/auth'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt.studybeepro.site/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://studybeepro.site/mj'},
    {n:'Unacademy',l:L.un,t:'web',url:'https://studybeepro.site/unc'},
    {n:'RWA',l:L.rwa,t:'web',url:'https://studybeepro.site/rwax'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://studybeepro.site/selectionbee'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://studybeepro.site/vibrante/'},
    {n:'Target Board',l:L.tb,t:'web',url:'https://studybeepro.site/tb/'},
    {n:'Master Sahab',l:L.msahab,t:'web',url:'https://mastersahab.studybeepro.site/'},
    {n:'Digital Book',l:L.pw,t:'web',url:'https://books.studybeepro.site/'},
    {n:'Sachin Classes',l:'https://i.ibb.co/n8PJXJ5X/Screenshot-2026-08-28-16-25-52-876-com-android-chrome.png',t:'web',url:'https://sachin.studybeepro.site/'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://studybeepro.site/futurekul/'}]},
  {id:'pw4free',name:'PW4FREE',logo:L.pwf,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw4free.in'},
    {n:'Lite PW',l:L.pw,t:'web',url:'https://pw4free.in'}]},
  {id:'nextmate',name:'Next Mate',logo:L.nm2,plats:[
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://vibrant.nextmate.site/'},
    {n:'RG Vikramjeet',l:L.rgv,t:'web',url:'https://rgvikramjeet.nextmate.site/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://missionjeet.nextmate.site/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://missionjeet.nextmate.site/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://sw.nextmate.site/'},
    {n:'Vidyakul',l:L.vk,t:'web',url:'https://vidyakul.nextmate.site/'},
    {n:'Padhle Akshay',l:L.pa,t:'web',url:'https://trms-akshay.nextmate.site/'}]},
  {id:'mtariius',name:'MTARIIUS',logo:L.mtr,plats:[
    {n:'Next Topper',l:L.nt,t:'web',url:'http://Nt.mtaiirus.site'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'http://Mtaiirus.pages.dev/vb'}],note:'🚀 MTARIIUS Official Launch'},
  {id:'learnbyapk',name:'Learn By APK',logo:'https://files.catbox.moe/mtu3r7.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://learnbyakp.site/study-v2/batches'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://learnbyakp.site/missionjeet'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://learnbyakp.site/nexttoppers'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://learnbyakp.site/rwa/batch'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://learnbyakp.site/sway'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://learnbyakp.site/vibrant'},
    {n:'RG Vikramjeet',l:L.rgv,t:'web',url:'https://learnbyakp.site/vikaram'},
    {n:'Vidyagram',l:L.vk,t:'web',url:'https://learnbyakp.site/vidyagram'}]},
  {id:'studyapkmod',name:'Study Apk Mod',logo:'https://i.ibb.co/tTpnf3pW/IMG-20260811-235259-680.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://studyapkmodpw.vercel.app/'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://studyapkmodkgs.vercel.app/home'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://studyapkmod-nexttopers.vercel.app/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://studyapkmodsway.vercel.app/'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://studyapkmod-apnacollege.vercel.app/'},
    {n:'Topper Wisdom',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://studyapkmod-toperwis.vercel.app/'},
    {n:'Gyaan Bindu',l:L.gb,t:'web',url:'https://studyapkmod.vercel.app/home.html?domainId=3377'},
    {n:'Target Board',l:L.tb,t:'web',url:'https://studyapkmod-targetboard.vercel.app/'},
    {n:'Eduteria',l:'https://files.catbox.moe/e082of.png',t:'web',url:'https://studyapkmod-eduteria.vercel.app/'}]},
  {id:'learnfree',name:'Learn Free',logo:L.lf,apk:'https://files.catbox.moe/jjvaqg.apk',plats:[
    {n:'Sigma Study',l:L.pw,t:'app',url:null,apk:'https://files.catbox.moe/4qplbp.apk'},
    {n:'Career Will',l:L.cw,t:'web',url:'https://sangam.free.nf/CW/course_index.html'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://sangam.free.nf/KGSNEW/'},
    {n:'RWA',l:L.rwa,t:'web',url:'https://sangam.free.nf/RWALIVE/'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://sangam.free.nf/studyiq/'},
    {n:'Gyan Bindu',l:L.gb,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Officer Academy',l:L.gen,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Sachin Academy',l:'https://files.catbox.moe/54lri1.png',t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'AS Classes',l:L.asc,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Next Topper',l:L.nt,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Rankers Gurukul',l:L.rgk,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Physics Wallah',l:L.pw,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Target Board',l:L.tb,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Eduteria',l:L.edut,t:'app',url:null,apk:'https://files.catbox.moe/11yg6e.apk'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://mtaiirus.site/futurekul/'}]},
  {id:'pwjarvis',name:'PW Jarvis',logo:L.pwj,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pwjarvis.com/'}]},
  {id:'darkuniverse',name:'Dark Universe',logo:'https://files.catbox.moe/9ivw0m.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://www.codxraj.site'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://www.darkuniverse.site/next-toppers'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://www.darkuniverse.site/kgs'},
    {n:'Pinnacle Book',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://www.darkuniverse.site/pinnacle-books'},
    {n:'GS Vision',l:'https://files.catbox.moe/mzecv5.png',t:'web',url:'https://www.darkuniverse.site/gs-vision'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://www.darkuniverse.site/selection-way'},
    {n:'Future Kul',l:'https://files.catbox.moe/ck8uz5.png',t:'web',url:'https://www.darkuniverse.site/futurekul'},
    {n:'Topper Wisdom',l:'https://www.topperswisdom.com/next_images/logo.png',t:'web',url:'https://www.darkuniverse.site/topper-wisdom'},
    {n:'Apna College',l:L.ac,t:'web',url:'https://www.darkuniverse.site/apna-college'},
    {n:'Study IQ',l:L.siq,t:'web',url:'https://www.darkuniverse.site/studyiq'},
    {n:'CDS Journey',l:L.cds,t:'web',url:'https://www.darkuniverse.site/cds-journey'}]},
  {id:'studyparcham',name:'Study Parcham',logo:L.sp,plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://studyparcham.in/pw/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://studyparcham.in/nt/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://studyparcham.in/mj/'}]},
  {id:'ophub',name:'OP Hub',logo:'https://files.catbox.moe/tfv70j.jpg',plats:[
    {n:'Kompetishuns',l:L.pw,t:'web',url:'https://kuch-nahi-02.github.io/kompetition-dn/'},
    {n:'Allen',l:L.al,t:'web',url:'https://dusra-aur.github.io/alien-jaddu/'},
    {n:'Apni Kaksha',l:L.ak,t:'web',url:'https://mits-ak.github.io/aknews/'},
    {n:'Mathongo',l:L.gen,t:'web',url:'https://op-muthalongo.pages.dev/'},
    {n:'PhysicsNiti',l:L.gen,t:'web',url:'https://physicsniti.pages.dev/'},
    {n:'Esaral',l:L.gen,t:'web',url:'https://chalo-098.github.io/saral-web/'}]},
  {id:'studyratna2',name:'Fake Ratna',logo:'https://files.catbox.moe/tl1on1.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://StudyRatna.cc'}]},
  {id:'kotaking',name:'KOTAKING',logo:'https://files.catbox.moe/329m0d.jpg',plats:[
    {n:'Unacademy',l:L.un,t:'web',url:'https://kotaking.netlify.app/'}]},
  {id:'kotakingacademy',name:'KOTAKING Academy',logo:'https://files.catbox.moe/vup4yy.jpg',plats:[
    {n:'Sarvam Career Institute',l:L.srv,t:'web',url:'https://sarvamcc2026.netlify.app/'},
    {n:'Sarvam Crash Course',l:L.srv,t:'web',url:'https://sarvamkota26.netlify.app/'}]},
  {id:'kotaxunacadmy',name:'KOTAXUNACADMY',logo:'https://files.catbox.moe/csc94g.jpg',plats:[
    {n:'Unacademy',l:L.un,t:'web',url:'https://uc-web.uc27.workers.dev/'}]},
  {id:'pwx',name:'PWX',logo:'https://files.catbox.moe/3s3cin.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pwx.pages.dev/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://vb-studysquad.pages.dev/'},
    {n:'Digital book',l:L.pw,t:'web',url:'https://pwxbooks.pages.dev/'},
    {n:'Infinite Practice',l:L.pw,t:'web',url:'https://pwx.pages.dev/batch/infinite-practice'},
    {n:'Unacademy Online',l:L.un,t:'web',url:'https://un-studysquad.pages.dev/'},
    {n:'Unacademy Offline',l:L.un,t:'web',url:'https://uno-studysquad.pages.dev/'}]},
  {id:'pwmacro',name:'PW Macro',logo:'https://files.catbox.moe/rnjg3r.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://m.pwmarco.site/study/batches'},
    {n:'Rojgar With Ankit',l:L.rwa,t:'web',url:'https://rwamarco.vercel.app/'}]},
  {id:'vidyaverse',name:'Vidyaverse',logo:'https://i.ibb.co/pBRvQqNh/IMG-20260824-085341-961.jpg',plats:[
    {n:'Next Topper',l:L.nt,t:'web',url:'https://vidya-verse.ai.studio/next-toppers'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://vidya-verse.ai.studio/mission-jeet'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://vidya-verse.ai.studio/khan-gs'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://vidya-verse.ai.studio/selection-way'}]},
  {id:'devxcoderz',name:'Devxcoderz',logo:'https://i.ibb.co/SXkTHgzf/IMG-20260824-085812-370.jpg',plats:[
    {n:'Selection Way',l:L.sw,t:'web',url:'https://TheDevcoderZ.pages.dev/sw'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://TheDevcoderZ.pages.dev/nexttoppers'},
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://PW.examcrushers.in'}]},
  {id:'learntopper',name:'Learn Topper',logo:'https://files.catbox.moe/vev4go.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw.learntopper.in/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt1.learntopper.in/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mj.learntopper.in/'},
    {n:'Selection Way',l:L.sw,t:'web',url:'https://sw.learntopper.in/'},
    {n:'GS Vision',l:'https://files.catbox.moe/mzecv5.png',t:'web',url:'https://gs.learntopper.in/'}]},
  {id:'asmultiverseNew',name:'AS Multiverse New',logo:'https://files.catbox.moe/ig737i.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw.gemtara.in'},
    {n:'Books',l:L.pw,t:'web',url:'https://books.asmultiverse.in/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nexttoppers.asmultiverse.in/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://mj.asmultiverse.online'},
    {n:'Tute Dude',l:L.gen,t:'web',url:'http://tutedude.gemtara.in'}]},
  {id:'learnxpw',name:'LearnXpw',logo:'https://files.catbox.moe/t16hya.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://www.learnxpw.site/study/batches'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://www.learnxpw.site/study/pi'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://www.learnxpw.site/study/nexttoppers'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://www.learnxpw.site/study/missionjeet'}]},
  {id:'batuniverse',name:'Bat Universe',logo:'https://files.catbox.moe/7mhvle.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://bat.unuversepw.workers.dev/'},
    {n:'Vidyagram',l:L.vk,t:'web',url:'https://bat.vidyagram.workers.dev/'},
    {n:'KGS',l:L.kgs,t:'web',url:'https://bat.kgss.workers.dev/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://bat.nexttopper.workers.dev'}]},
  {id:'agsir',name:'Ag Sir',logo:'https://files.catbox.moe/53wnbb.jpg',plats:[
    {n:'Ag Sir',l:'https://files.catbox.moe/53wnbb.jpg',t:'bot',url:'https://t.me/ag_sir_2027'}]},
  {id:'sarvam2027',name:'Sarvam 2027',logo:L.srv,plats:[
    {n:'Sarvam 2027',l:L.srv,t:'bot',url:'https://t.me/Sarvaminstitutekota'}]},
  {id:'nextstudy',name:'Next Study',logo:'https://files.catbox.moe/zwlw5l.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://pw.nextstudys.site/'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://next-study-pi.faizan92048.workers.dev/'}]},
  {id:'eduzex2',name:'EduZex',logo:'https://eduzex.is-great.org/pw.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://eduzex-pw.pages.dev/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://eduzex.is-great.org/mj/'},
    {n:'Padhle Akshay',l:L.pa,t:'web',url:'https://eduzex.is-great.org/padhleakshay/batches.php'}]},
  {id:'sdvbot',name:'Svd Bot',logo:'https://files.catbox.moe/3j473z.jpg',plats:[
    {n:'Unacademy',l:L.un,t:'web',url:'https://studyuk.online/'}]},
  {id:'studysparkpro',name:'Study Spark Pro',logo:'https://i.postimg.cc/SQwQYrq5/studyspark-circle.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://studyspark.study/verify'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://pi.studyspark.study/'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://nt.studyspark.pro/'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://jeet.studyspark.pro/'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://vt.studyspark.pro/'}]},
  {id:'studyaura',name:'Study Aura',logo:'https://i.postimg.cc/wTVYMRC4/studylogo.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://studyaura.online/study/batches'},
    {n:'Pi',l:L.pipro,t:'web',url:'https://studyaura.online/study/pi'},
    {n:'Next Topper',l:L.nt,t:'web',url:'https://studyaura.online/study/nt'},
    {n:'Mission Jeet',l:L.mj,t:'web',url:'https://studyaura.online/study/jeet'}]},
  {id:'eduvibe',name:'Edu Vibe',logo:'https://files.catbox.moe/9ydyci.jpg',plats:[
    {n:'Next Topper',l:L.nt,t:'web',url:'https://eduvibe-nt.pages.dev/'}]},
  {id:'studyfox',name:'Study Fox',logo:'https://i.ibb.co/27hXCBDR/IMG-20260819-124208-228.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://study-fox.mscilearn.in/batches'},
    {n:'Vibrant Academy',l:L.va,t:'web',url:'https://study-fox.ai.studio/'}]},
  {id:'thescholarverse2',name:'TheScholarVerse',logo:'https://files.catbox.moe/13o8d8.png',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'https://thescholarverse.site/study/batches'}]},
  {id:'ebookofficial2',name:'Ebook Official',logo:'https://files.catbox.moe/8nucve.jpg',plats:[
    {n:'Next Topper',l:L.nt,t:'web',url:'https://ebooksofficial.pages.dev/'}]},
  {id:'tgdoremon',name:'TG Doremon',logo:'https://files.catbox.moe/ri5tex.jpg',plats:[
    {n:'Pramar Batches',l:'https://files.catbox.moe/3seq41.png',t:'web',url:'https://tgdoraemon.vercel.app/'}]},
  {id:'eduspark2',name:'Edu Spark',logo:'https://files.catbox.moe/koojhn.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'web',url:'http://VidyaX.site'},
    {n:'Vidyakul',l:L.vk,t:'web',url:'https://eduspark-vidyakul.netlify.app/'},
    {n:'Padhle Akshay',l:L.pa,t:'web',url:'https://eduspark-padhleakshay.netlify.app/'}]},
  {id:'rangexcoder2',name:'RangeXCoder',logo:'https://files.catbox.moe/vjpr4e.jpg',plats:[
    {n:'Physics Wallah',l:L.pw,t:'bot',url:'https://t.me/RangeXCoder_studybot?start=ref_7974991150'},
    {n:'Next Topper',l:L.nt,t:'bot',url:'https://t.me/RangeXCoder_studybot?start=ref_7974991150'},
    {n:'Mission Jeet',l:L.mj,t:'bot',url:'https://t.me/RangeXCoder_studybot?start=ref_7974991150'},
    {n:'Vidyakul',l:L.vk,t:'bot',url:'https://t.me/RangeXCoder_studybot?start=ref_7974991150'}]},
];

/* ── STUDY HUBS DATA ── */
const STUDY_HUBS=[
  {id:'freekitaab',name:'Books',logo:'https://files.catbox.moe/7aautc.png',badge:'BOOKS',featured:true,plats:[
    {n:'Free Kitaab',l:'https://files.catbox.moe/7aautc.png',t:'web',url:'http://freekitaab.netlify.app'}]},
  {id:'redrmyhubtest',name:'REDRMY AIO (NEET)',logo:'logo.png',badge:'TESTS',plats:[
    {n:'Neet Test',l:'logo.png',t:'web',url:'https://pikachuxcbt.vercel.app/?view=tests'},
    {n:'All Institute Test',l:'https://files.catbox.moe/iry3w9.png',t:'web',url:'https://testneet.com/tests'},
    {n:'Allen Test 2',l:'https://files.catbox.moe/iej5nq.png',t:'web',url:'https://allenkotatest.netlify.app/'},
    {n:'Unacademy Test',l:'https://files.catbox.moe/9189g5.jpg',t:'web',url:'https://unacademytest.netlify.app/'},
    {n:'Allen Revision Notes',l:'https://files.catbox.moe/iej5nq.png',t:'web',url:'https://pikachuxcbt.vercel.app/?view=notes'},
    {n:'JEE & NEET',l:'logo.png',t:'web',url:'http://Thundertest.indevs.in/jee-neet'},
    {n:'Jee',l:'logo.png',t:'web',url:'https://learnx10test.vercel.app/'},
    {n:'Rank Yoddha',l:'https://files.catbox.moe/fiud51.jpg',t:'web',url:'https://web.rankyodha.com/'},
    {n:'Jee Test',l:'logo.png',t:'web',url:'https://PrepJeeTest.vercel.app'},
    {n:'Jee & Neet Test',l:'logo.png',t:'web',url:'https://spark-kmx-test.onrender.com/'}]},
  {id:'bookish',name:'Bookish',logo:L.bk,badge:'BOOKS · 100K+',featured:true,plats:[
    {n:'Bookish',l:L.bk,t:'web',url:'https://bookish.nextmate.site/'}]},
  {id:'bookverse',name:'Book Verse',logo:'https://i.ibb.co/QjxMsGHn/IMG-20260811-210436-792.jpg',badge:'BOOKS · 100K+',featured:true,plats:[
    {n:'Book Verse',l:'https://i.ibb.co/QjxMsGHn/IMG-20260811-210436-792.jpg',t:'web',url:'https://books.deltastudy.in/'}]},
  {id:'edubook',name:'Edu Book',logo:L.pw,badge:'BOOKS',featured:true,plats:[
    {n:'Edu Book',l:L.pw,t:'web',url:'http://Apex-library.lovable.app'}]},
  {id:'padhlefree',name:'Padhle Free',logo:L.pw,badge:'BOOKS · NEET/JEE',featured:true,plats:[
    {n:'Padhle Free',l:L.pw,t:'web',url:'https://www.padhlefree.xyz/#/materials'}]},
  {id:'prepbooks',name:'PrepBooks',logo:L.pw,badge:'BOOKS',featured:true,plats:[
    {n:'PrepBooks',l:L.pw,t:'web',url:'https://prepbooks.lovable.app/material'}]},
  {id:'kotatest',name:'Kota Test 2026',logo:'https://files.catbox.moe/gdqvt4.png',badge:'TESTS',plats:[
    {n:'Allen',l:'https://files.catbox.moe/iej5nq.png',t:'web',url:'http://kotatest2026.netlify.app'},
    {n:'Unacademy',l:'https://files.catbox.moe/9189g5.jpg',t:'web',url:'http://kotatest2026.netlify.app'},
    {n:'Akash',l:'https://files.catbox.moe/s3u85s.png',t:'web',url:'http://kotatest2026.netlify.app'}]},
  {id:'edunexus',name:'Edu Nexus',logo:L.edn,badge:'STUDY HUB',plats:[
    {n:'MHTCET',l:L.mhtcet,t:'web',url:'https://edunexusprep.in'},
    {n:'MHTCET',l:L.mhtcet,t:'web',url:'http://tuteflow.tech/public'},
    {n:'MHTCET',l:L.mhtcet,t:'web',url:'http://alphax.edunexusprep.in'},
    {n:'MHTCET',l:L.mhtcet,t:'web',url:'https://tuteflow.tech/mht_cet_checker'}]},
  {id:'periodictable',name:'Periodic Table',logo:L.pt,badge:'STUDY HUB',plats:[
    {n:'Periodic Table',l:L.pt,t:'web',url:'http://teamkohinoorperiodic-table.vercel.app'}]},
  {id:'genetry',name:'Genetry',logo:'https://files.catbox.moe/ta74q9.jpg',badge:'NOTES',plats:[
    {n:'Old Batches',l:'https://files.catbox.moe/4fm1zw.png',t:'web',url:'https://genetry.carrd.co'},
    {n:'Old Batches & Module',l:'https://files.catbox.moe/4fm1zw.png',t:'web',url:'https://genetry.carrd.co'}]},
  {id:'thunderstudy',name:'Thunder Study',logo:'https://files.catbox.moe/wdofls.jpg',badge:'TESTS',plats:[
    {n:'CUET Test',l:'https://files.catbox.moe/wxf48g.png',t:'web',url:'http://commercesehoga.github.io/dashboard'},
    {n:'Class 9 to 12 Notes',l:'https://files.catbox.moe/j4l3h8.png',t:'web',url:'https://thunderstudy.github.io/cbse/topper-notes/'}]},
  {id:'allexamtest',name:'All Exam Test',logo:'logo.png',badge:'TESTS',plats:[
    {n:'All Exam Test',l:'logo.png',t:'web',url:'https://prep-os.vercel.app/'},
    {n:'NLM Test 11th',l:'logo.png',t:'web',url:'https://nlm-test.vercel.app/'},
    {n:'Quizrr Part Test',l:'logo.png',t:'web',url:'https://quizrr-test.vercel.app/'}]},
  {id:'ebookofficial',name:'Ebook Official',logo:'https://files.catbox.moe/8nucve.jpg',badge:'BOOKS',plats:[
    {n:'Books',l:'https://files.catbox.moe/uwchqa.png',t:'web',url:'https://freekitaab.netlify.app/'},
    {n:'Books Alt',l:'https://files.catbox.moe/uwchqa.png',t:'web',url:'http://ebooksofficial.vercel.app'},
    {n:'JEE Test',l:'https://files.catbox.moe/v6r3tp.png',t:'web',url:'https://examace-jee.vercel.app/'}]},
  {id:'ophubhub',name:'OP Hub',logo:'https://files.catbox.moe/tfv70j.jpg',badge:'TESTS',plats:[
    {n:'Test Series',l:'https://files.catbox.moe/gglg5n.png',t:'web',url:'https://testseries-books-notes.pages.dev'},
    {n:'Notes',l:'https://files.catbox.moe/98axj1.png',t:'web',url:'https://testseries-books-notes.pages.dev'}]},
  {id:'studygroup',name:'Study Group',logo:'https://files.catbox.moe/s12459.jpg',badge:'TESTS',plats:[
    {n:'Mega JEE',l:'https://files.catbox.moe/v6r3tp.png',t:'web',url:'http://jeemaster-chi.vercel.app'}]},
  {id:'rolexcoderzHub',name:'RolexCoderZ',logo:'https://files.catbox.moe/dj3vjj.jpg',badge:'BOOKS',plats:[
    {n:'Books',l:'https://files.catbox.moe/uwchqa.png',t:'web',url:'https://rcxebook.netlify.app/'},
    {n:'Class 10th Notes',l:'https://files.catbox.moe/j4l3h8.png',t:'web',url:'https://rolexsyntaz.github.io/Nntt'}]},
  {id:'svdbotsHub',name:'Svd Bots',logo:'https://files.catbox.moe/3j473z.jpg',badge:'TESTS',plats:[
    {n:'Test Series',l:'https://files.catbox.moe/gglg5n.png',t:'web',url:'http://Sdvmock.page.gd'}]},
  {id:'edusparkHub',name:'EduSpark',logo:'https://files.catbox.moe/t4chaz.jpg',badge:'BOOKS',plats:[
    {n:'Books',l:'https://files.catbox.moe/uwchqa.png',t:'web',url:'https://edusparkkbook.netlify.app'}]},
];

/* ── DAILY QUOTES ── */
const QS=[
  "Padhai karo, duniya badlo. 🌏",
  "Ek din aayega jab mehnat rang laayegi. 💪",
  "Hard work beats talent when talent doesn't work hard.",
  "Sapne wo nahi jo neend mein aate hain — sapne wo hain jo sone nahi dete.",
  "Consistency is more important than perfection.",
  "India ka beta, duniya ka topper! 🏆",
  "Ek goal set karo, aur bas usi pe dhyan do. 🎯",
  "The pain of discipline is less than the pain of regret.",
  "Your future self is watching you right now. Make them proud.",
  "Struggle today for a better tomorrow.",
  "Success is not given, it's earned every single day.",
  "Focus on the process, results will follow.",
  "Every expert was once a beginner. Keep going! 🚀",
];
let qIdx=parseInt(localStorage.getItem('red_qi')||'0');
function loadQuote(){const el=document.getElementById('daily-quote');if(el)el.innerHTML='"<span>'+QS[qIdx]+'</span>"';}
function nextQuote(){qIdx=(qIdx+1)%QS.length;localStorage.setItem('red_qi',qIdx);loadQuote();showToast('New quote! ✨');}

/* ── TOAST ── */
let toastT=null;
function showToast(msg){
  const t=document.getElementById('toast');if(!t)return;
  t.textContent=msg;t.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ── SEARCH SYNONYMS ── */
const SEARCH_SYNONYMS={
  'pw':'physics wallah','physics wallah':'pw',
  'rwa':'rojgar with ankit','rojgar with ankit':'rwa',
  'kgs':'khan global stud','khan global stud':'kgs','khan sir':'khan global stud',
  'nt':'next topper','next topper':'nt',
  'mj':'mission jeet','mission jeet':'mj',
  'sw':'selection way','selection way':'sw',
  'vk':'vidyakul','vidyakul':'vk',
  'siq':'study iq','study iq':'siq',
  'cds':'cds journey','cds journey':'cds',
  'va':'vibrant academy','vibrant academy':'va',
  'un':'unacademy','unacademy':'un',
  'ac':'apna college','apna college':'ac',
  'gs vision':'gs vision','mb':'magnet brain','magnet brain':'mb',
  'tb':'target board','target board':'tb'
};

function searchMatches(text,q){
  text=text.toLowerCase();
  if(text.includes(q))return true;
  const syn=SEARCH_SYNONYMS[q];
  if(syn&&text.includes(syn))return true;
  return false;
}

function doSearch(){
  const q=document.getElementById('search-inp').value.toLowerCase().trim();
  const res=document.getElementById('search-results');
  if(!q){res.innerHTML='<div class="sr-none">Type website name, domain or platform (e.g. pw, vercel, study)...</div>';return;}
  const hits=[];
  const seen=new Set();

  // Search Main Providers & Platforms
  PROV.forEach(p=>{
    if(searchMatches(p.name,q)||(p.apk&&p.apk.toLowerCase().includes(q))){
      const key=p.name.toLowerCase();
      if(!seen.has(key)){
        seen.add(key);
        hits.push({name:p.name,logo:p.logo,prov:p.name,url:p.plats[0]?.url||p.apk||null,gate:p.plats[0]?.gate||null});
      }
    }
    p.plats.forEach(pl=>{
      const domainMatch=pl.url&&pl.url.toLowerCase().includes(q);
      const nameMatch=searchMatches(pl.n,q);
      if(nameMatch||domainMatch){
        const key=(pl.n+'_'+p.name).toLowerCase();
        if(!seen.has(key)){
          seen.add(key);
          hits.push({name:pl.n,logo:pl.l||p.logo,prov:p.name,url:pl.url,gate:pl.gate||null,domain:pl.url?new URL(pl.url).hostname:''});
        }
      }
    });
  });

  // Search Study Hubs
  if(typeof STUDY_HUBS!=='undefined'){
    STUDY_HUBS.forEach(h=>{
      h.plats.forEach(pl=>{
        const domainMatch=pl.url&&pl.url.toLowerCase().includes(q);
        const nameMatch=searchMatches(pl.n,q);
        if(nameMatch||domainMatch){
          const key=(pl.n+'_'+h.name).toLowerCase();
          if(!seen.has(key)){
            seen.add(key);
            hits.push({name:pl.n,logo:pl.l||h.logo,prov:h.name,url:pl.url,gate:pl.gate||null,domain:pl.url?new URL(pl.url).hostname:''});
          }
        }
      });
    });
  }

  if(!hits.length){res.innerHTML='<div class="sr-none">No website or domain matched "'+q+'" 😕</div>';return;}
  res.innerHTML=`<div style="padding:6px 4px 8px;font-size:.68rem;color:var(--t3)">${hits.length} result${hits.length>1?'s':''} found</div>`+hits.slice(0,60).map(h=>`
    <${h.gate?`div onclick="openPortalGate('${h.gate}')"`:(h.url?`a href="${h.url}" target="_blank"`:'div')} class="sr-item">
      <img src="${h.logo}" class="sr-logo" alt="${h.name}" onerror="this.src='logo.png'">
      <div class="sr-info">
        <div class="sr-name">${h.name}</div>
        <div class="sr-prov">via ${h.prov}${h.domain?` • ${h.domain}`:''}</div>
      </div>
      ${h.url||h.gate?'<span style="color:var(--t1);font-size:.8rem;font-weight:700">LAUNCH →</span>':''}
    </${h.gate?'div':(h.url?'a':'div')}>`).join('');
}


/* ── CALCULATOR ── */
let calcCur='0',calcPrev='',calcOper=null,calcNew=true;
function calcUpdate(){
  const valEl=document.getElementById('calc-val');
  const exprEl=document.getElementById('calc-expr');
  if(valEl)valEl.textContent=calcCur.length>10?parseFloat(calcCur).toExponential(4):calcCur;
  if(exprEl)exprEl.textContent=calcPrev+(calcOper?(' '+{'/':'÷','*':'×','+':'+','-':'−'}[calcOper]+' '):'');
}
function calcNum(d){
  if(calcNew){calcCur=d==='.'?'0.':d;calcNew=false;}
  else if(d==='.'&&calcCur.includes('.'))return;
  else if(calcCur==='0'&&d!=='.')calcCur=d;
  else calcCur+=d;
  calcUpdate();
}
function calcOp(op){if(calcOper&&!calcNew)calcEq();calcPrev=calcCur;calcOper=op;calcNew=true;calcUpdate();}
function calcEq(){
  if(!calcOper)return;
  const a=parseFloat(calcPrev),b=parseFloat(calcCur);
  const ops={'+':a+b,'-':a-b,'*':a*b,'/':a/b};
  const r=ops[calcOper];
  calcCur=isNaN(r)||!isFinite(r)?'Error':String(parseFloat(r.toFixed(10)));
  calcPrev='';calcOper=null;calcNew=true;calcUpdate();
}
function calcFn(f){
  if(f==='C'){calcCur='0';calcPrev='';calcOper=null;calcNew=true;}
  else if(f==='±'){calcCur=String(-parseFloat(calcCur));}
  else if(f==='%'){calcCur=String(parseFloat(calcCur)/100);}
  calcUpdate();
}

/* ── TIMER ── */
let timerDur=25*60,timerRem=25*60,timerRunning=false,timerInterval=null;
function setTimerMode(m){
  resetTimer();timerDur=m*60;timerRem=m*60;
  document.querySelectorAll('.timer-mode-btn').forEach(b=>b.classList.remove('act'));
  const btn=document.getElementById('tm-'+m);if(btn)btn.classList.add('act');
  updateTimerUI();
}
function updateTimerUI(){
  const m=String(Math.floor(timerRem/60)).padStart(2,'0');
  const s=String(timerRem%60).padStart(2,'0');
  const str=m+':'+s;
  const el=document.getElementById('timer-ring-lbl');if(el)el.textContent=str;
  const pd=document.getElementById('prof-timer-disp');if(pd)pd.textContent=timerRunning?('⏱ '+str+' running'):'Pomodoro Ready';
  const fg=document.getElementById('timer-ring-fg');
  if(fg){const pct=timerRem/timerDur;fg.style.strokeDashoffset=String(339*(1-pct));}
  const btn=document.getElementById('timer-start-btn');
  if(btn)btn.textContent=timerRunning?'⏸ PAUSE':'▶ START';
}
function toggleTimer(){
  if(timerRunning){clearInterval(timerInterval);timerRunning=false;}
  else{
    if(timerRem<=0)resetTimer();
    timerRunning=true;
    timerInterval=setInterval(()=>{
      timerRem--;updateTimerUI();
      if(timerRem<=0){clearInterval(timerInterval);timerRunning=false;showToast('🎉 Timer done! Great work!');}
    },1000);
  }
  updateTimerUI();
}
function resetTimer(){clearInterval(timerInterval);timerRunning=false;timerRem=timerDur;updateTimerUI();}
function toggleTimerFullscreen(){
  const tm=document.getElementById('timer-modal');
  if(!tm)return;
  const isFull=tm.classList.toggle('timer-fullscreen-mode');
  const btn=tm.querySelector('.btn-tfull');
  if(btn)btn.textContent=isFull?'✕ Exit Fullscreen':'⛶ Fullscreen Focus';
  if(isFull){
    if(document.documentElement.requestFullscreen){document.documentElement.requestFullscreen().catch(()=>{});}
  }else{
    if(document.fullscreenElement&&document.exitFullscreen){document.exitFullscreen().catch(()=>{});}
  }
}



function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

/* ── TO-DO & STUDY GOALS ── */
let goals = JSON.parse(localStorage.getItem('red_goals') || '[]');

function renderGoals(){
  const doneCount = goals.filter(g=>g.done).length;
  const totalCount = goals.length;
  const statStr = `${doneCount} / ${totalCount} Done`;

  const profCount = document.getElementById('prof-todo-count');
  if (profCount) profCount.textContent = totalCount ? `${doneCount} of ${totalCount} completed` : '0 tasks';

  const badge = document.getElementById('todo-stats-badge');
  if (badge) badge.textContent = statStr;

  const itemHtml = (g, i) => `
    <div class="goal-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
      <div class="goal-check${g.done ? ' done' : ''}" onclick="toggleGoal(${i})" title="${g.done ? 'Mark pending' : 'Mark done'}">
        ${g.done ? '✓' : ''}
      </div>
      <div class="goal-text${g.done ? ' done' : ''}" onclick="toggleGoal(${i})" style="cursor:pointer;flex:1;word-break:break-word">
        ${escapeHtml(g.text)}
      </div>
      <button class="goal-del" onclick="delGoal(${i})" type="button" title="Delete task">🗑</button>
    </div>
  `;

  // Profile goals list
  const el = document.getElementById('goals-list');
  if (el) {
    if (!goals.length) {
      el.innerHTML = '<div class="goals-empty">No tasks yet — Add what you want to study! 🎯</div>';
    } else {
      el.innerHTML = goals.map(itemHtml).join('');
    }
  }

  // Modal tasks list
  const modalList = document.getElementById('todo-items-list');
  if (modalList) {
    if (!goals.length) {
      modalList.innerHTML = '<div class="goals-empty" style="padding:24px 10px;text-align:center">No to-do tasks yet.<br><span style="color:var(--t3);font-size:.7rem">Type what you want to study above and press + ADD!</span></div>';
    } else {
      modalList.innerHTML = goals.map(itemHtml).join('');
    }
  }
}

function saveGoals(){
  localStorage.setItem('red_goals', JSON.stringify(goals));
}

function toggleGoal(i){
  if (!goals[i]) return;
  goals[i].done = !goals[i].done;
  saveGoals();
  renderGoals();
}

function delGoal(i){
  goals.splice(i, 1);
  saveGoals();
  renderGoals();
  showToast('Task removed');
}

function addTodoItem(){
  const inp = document.getElementById('todo-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  goals.push({ text, done: false });
  inp.value = '';
  saveGoals();
  renderGoals();
  showToast('Task added! 📋');
}

function addTodoFromProfile(){
  const inp = document.getElementById('prof-todo-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  goals.push({ text, done: false });
  inp.value = '';
  saveGoals();
  renderGoals();
  showToast('Task added! 📋');
}

function clearCompletedTodos(){
  const before = goals.length;
  goals = goals.filter(g=>!g.done);
  if (goals.length < before) {
    saveGoals();
    renderGoals();
    showToast('Completed tasks cleared! 🧹');
  } else {
    showToast('No completed tasks to clear');
  }
}

function saveGoalModal(){
  const inp = document.getElementById('goal-inp');
  const text = inp ? inp.value.trim() : '';
  if (!text) return;
  goals.push({ text, done: false });
  saveGoals();
  renderGoals();
  closeModal('goal-modal');
  showToast('Task added! 🎯');
}

function addGoalPrompt(){
  openModal('todo-modal');
}

/* ── QUICK NOTES SYSTEM (3 SLOTS) ── */
let currentNoteSlot = 0;
let userNotes = JSON.parse(localStorage.getItem('red_notes') || '["", "", ""]');
if (!Array.isArray(userNotes) || userNotes.length < 3) {
  userNotes = ["", "", ""];
}

function initNotes(){
  const tabs = document.getElementById('notes-tabs');
  if (tabs) {
    tabs.innerHTML = [0, 1, 2].map(i => `
      <button type="button" class="notes-tab-btn${i === currentNoteSlot ? ' act' : ''}" onclick="switchNoteSlot(${i})">
        Note ${i + 1}
      </button>
    `).join('');
  }
  const area = document.getElementById('notes-area');
  if (area) {
    area.value = userNotes[currentNoteSlot] || '';
    updateNotesCount();
  }
}

function switchNoteSlot(slot){
  const area = document.getElementById('notes-area');
  if (area) {
    userNotes[currentNoteSlot] = area.value;
    localStorage.setItem('red_notes', JSON.stringify(userNotes));
  }
  currentNoteSlot = slot;
  initNotes();
}

function notesAutoSave(){
  const area = document.getElementById('notes-area');
  if (!area) return;
  userNotes[currentNoteSlot] = area.value;
  localStorage.setItem('red_notes', JSON.stringify(userNotes));
  updateNotesCount();
}

function saveNote(){
  notesAutoSave();
  showToast('Notes saved successfully! 📝 ✓');
}

function clearNote(){
  const area = document.getElementById('notes-area');
  if (!area) return;
  area.value = '';
  userNotes[currentNoteSlot] = '';
  localStorage.setItem('red_notes', JSON.stringify(userNotes));
  updateNotesCount();
  showToast('Note cleared');
}

function updateNotesCount(){
  const area = document.getElementById('notes-area');
  const count = document.getElementById('notes-count');
  if (area && count) {
    const chars = area.value.length;
    const words = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
    count.textContent = `${chars} chars • ${words} words`;
  }
}

/* ── VISIT COUNTER ── */
function initVisitCounter(){
  let v=parseInt(localStorage.getItem('red_visits')||'0')+1;
  localStorage.setItem('red_visits',v);
  const el=document.getElementById('visit-count');
  if(el)el.textContent=v+(v===1?' Visit':' Visits');
  updateDaysAlive();
}

/* ── PROFILE TABS & ACTIVITY ── */
function switchProfTab(tab){
  const tabs = ['overview', 'stats', 'tools'];
  tabs.forEach(t => {
    const btn = document.getElementById('ptab-' + t);
    const panel = document.getElementById('ptab-panel-' + t);
    if(btn) btn.classList.toggle('active', t === tab);
    if(panel) panel.style.display = (t === tab) ? 'block' : 'none';
  });
  if(tab === 'stats'){
    updateDaysAlive();
    renderPlatformVisits();
  }
}

function updateDaysAlive(){
  const join = parseInt(localStorage.getItem('red_join_date') || String(Date.now()));
  const days = Math.max(1, Math.ceil((Date.now() - join) / (1000 * 60 * 60 * 24)));
  const el = document.getElementById('days-alive');
  if(el) el.textContent = days;
  const v = parseInt(localStorage.getItem('red_visits') || '1');
  const tv = document.getElementById('total-visits-big');
  if(tv) tv.textContent = v;
}

function renderPlatformVisits(){
  const el = document.getElementById('platform-visits-list');
  if(!el) return;
  const topPlats = [
    { n: 'Physics Wallah (PW)', cat: 'JEE & NEET', u: 'https://pw.live', v: 'Popular' },
    { n: 'Next IAS / Vision IAS', cat: 'UPSC CSE', u: 'https://visionias.in', v: 'Featured' },
    { n: 'Unacademy Plus', cat: 'All Competitive Exams', u: 'https://unacademy.com', v: 'Active' },
    { n: 'Telegram Study Bot', cat: 'REDRMY Official', u: 'https://t.me/Redrmy_bot', v: 'Verified' }
  ];
  el.innerHTML = topPlats.map(p => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
      <div>
        <div style="font-family:var(--fb);font-weight:700;font-size:.82rem;color:var(--t1)">${p.n}</div>
        <div style="font-family:var(--fm);font-size:.62rem;color:var(--t3)">${p.cat} • <span style="color:var(--t2)">${p.v}</span></div>
      </div>
      <a href="${p.u}" target="_blank" class="btn-p-edit" style="padding:6px 12px;font-size:.62rem;flex:none;text-decoration:none">LAUNCH →</a>
    </div>
  `).join('');
}

/* ── FLASHCARDS DATA ── */
const CARDS=[
  /* PHYSICS */
  {q:"Newton's First Law kya hai?",a:"Koi bhi object tab tak apni state nahi badlega jab tak bahar se net force na lage. (Law of Inertia)",cat:"Physics"},
  {q:"Kinetic Energy ka formula?",a:"KE = ½mv² — ½ × mass × (velocity)²",cat:"Physics"},
  {q:"Speed of Light kitni hai?",a:"3 × 10⁸ m/s (vacuum mein exactly 299,792,458 m/s)",cat:"Physics"},
  {q:"Ohm's Law kya hai?",a:"V = IR — Voltage = Current × Resistance",cat:"Physics"},
  {q:"Power ka formula?",a:"P = VI = I²R = V²/R — Watts mein measure hoti hai",cat:"Physics"},
  {q:"Newton ka Second Law?",a:"F = ma — Force = mass × acceleration",cat:"Physics"},
  {q:"Gravitational acceleration ka value?",a:"g = 9.8 m/s² (approximately 10 m/s² calculations mein)",cat:"Physics"},
  {q:"Work done ka formula?",a:"W = F·d·cosθ — Force × displacement × cos(angle)",cat:"Physics"},
  {q:"Pressure ka formula?",a:"P = F/A — Force per unit Area. SI unit: Pascal (Pa)",cat:"Physics"},
  {q:"Snell's Law kya hai?",a:"n₁sinθ₁ = n₂sinθ₂ — light refraction ka law",cat:"Physics"},
  /* JEE */
  {q:"[JEE] Escape velocity formula?",a:"vₑ = √(2GM/R) = √(2gR) ≈ 11.2 km/s (Earth ke liye)",cat:"JEE"},
  {q:"[JEE] de Broglie wavelength?",a:"λ = h/mv — h=Planck's constant, m=mass, v=velocity",cat:"JEE"},
  {q:"[JEE] Photoelectric effect — KE_max?",a:"KE_max = hν − φ (h=Planck's constant, ν=frequency, φ=work function)",cat:"JEE"},
  {q:"[JEE] Bohr's 2nd Postulate?",a:"mvr = nh/2π — angular momentum is quantized (n = integer)",cat:"JEE"},
  {q:"[JEE] Electric potential energy?",a:"U = kq₁q₂/r — k=9×10⁹ Nm²/C²",cat:"JEE"},
  /* CHEMISTRY */
  {q:"Avogadro's Number kya hai?",a:"6.022 × 10²³ — ek mole mein particles ki sankhya",cat:"Chemistry"},
  {q:"Le Chatelier's Principle?",a:"Agar equilibrium disturbance ho to system usi change ke opposite direction mein shift karta hai",cat:"Chemistry"},
  {q:"Benzene mein carbon ki hybridization?",a:"sp² — 3 sigma bonds + 1 delocalized pi bond in aromatic ring",cat:"Chemistry"},
  {q:"pH ki definition?",a:"pH = −log[H⁺] — acidic < 7, neutral = 7, basic > 7",cat:"Chemistry"},
  {q:"Mole concept kya hai?",a:"1 mole = 6.022×10²³ particles. Molar mass = mass of 1 mole in grams",cat:"Chemistry"},
  /* BIOLOGY & NEET */
  {q:"Cell ka powerhouse kaun sa hai?",a:"Mitochondria — aerobic respiration aur ATP synthesis ka site",cat:"Biology"},
  {q:"Kidney ka functional unit?",a:"Nephron — blood filter karta hai, nutrients absorb karta hai, urine banata hai",cat:"Biology"},
  {q:"ATP ka full form?",a:"Adenosine Triphosphate — cell ki primary energy currency",cat:"Biology"},
  {q:"DNA replication mein DNA unwind kaun karta hai?",a:"Helicase — hydrogen bonds tod ke two strands alag karta hai",cat:"Biology"},
  {q:"[NEET] Krebs cycle mein kul ATP?",a:"Directly 2 ATP, indirectly 34 ATP via NADH/FADH₂ oxidation — total 36-38 ATP per glucose",cat:"NEET"},
  /* MATHS */
  {q:"Quadratic formula kya hai?",a:"x = (−b ± √(b²−4ac)) / 2a — for ax² + bx + c = 0",cat:"Maths"},
  {q:"Pythagoras theorem?",a:"a² + b² = c² — right triangle mein hypotenuse² = sum of other two sides²",cat:"Maths"},
  {q:"Simple Interest formula?",a:"SI = PRT/100 — P=Principal, R=Rate%, T=Time(years)",cat:"Maths"},
  /* CUET / ENGLISH */
  {q:"'Discovery of India' kisne likhi?",a:"Jawaharlal Nehru — Ahmadnagar Fort mein 1944 mein likhi thi",cat:"CUET"},
  {q:"India ki sabse lambi nadi?",a:"Ganga (~2,525 km) — Gangotri Glacier se Bay of Bengal tak",cat:"CUET"},
  {q:"What is a Synonym?",a:"Word with similar meaning — e.g. Happy → Joyful, Cheerful, Elated",cat:"English"},
  {q:"Active to Passive Voice rule?",a:"Object becomes subject. 'She eats apple' → 'Apple is eaten by her'",cat:"English"},
];

let fcIdx=0,fcFlipped=false;
let fcCategory='All';
let fcFiltered=CARDS;

function setFcCat(cat){
  fcCategory=cat;
  fcFiltered=cat==='All'?CARDS:CARDS.filter(c=>c.cat===cat||c.cat.includes(cat.replace('[','')));
  fcIdx=0;
  document.querySelectorAll('.fc-cat-btn').forEach(b=>b.classList.toggle('act',b.dataset.cat===cat));
  loadCard();
}

function loadCard(){
  const c=fcFiltered[fcIdx];if(!c)return;
  const qEl=document.getElementById('fc-q'),aEl=document.getElementById('fc-a');
  const fc=document.getElementById('flashcard'),pr=document.getElementById('fc-progress');
  const cat=document.getElementById('fc-cat');
  if(qEl)qEl.textContent=c.q;if(aEl)aEl.textContent=c.a;
  if(fc){fc.classList.remove('flipped');fcFlipped=false;}
  if(pr)pr.textContent='Card '+(fcIdx+1)+' / '+fcFiltered.length;
  if(cat)cat.textContent=c.cat||'';
}
function flipCard(){const fc=document.getElementById('flashcard');if(!fc)return;fcFlipped=!fcFlipped;fc.classList.toggle('flipped',fcFlipped);}
function nextCard(){fcIdx=(fcIdx+1)%fcFiltered.length;loadCard();}
function prevCard(){fcIdx=(fcIdx-1+fcFiltered.length)%fcFiltered.length;loadCard();}
function shuffleCards(){
  for(let i=fcFiltered.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[fcFiltered[i],fcFiltered[j]]=[fcFiltered[j],fcFiltered[i]];}
  fcIdx=0;loadCard();showToast('Cards shuffled! 🔀');
}

/* ── MAIN STATE ── */
let favs=JSON.parse(localStorage.getItem('red_favs')||'[]');
let profileName=localStorage.getItem('red_name')||'REDRMY Student';
let profileAvData=localStorage.getItem('red_av')||'';
let currentFx=localStorage.getItem('red_fx')||'none';
let isDark=localStorage.getItem('red_theme')!=='light';
let currentPage='home';

function switchPage(pg){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.bnav-tab').forEach(t=>t.classList.remove('active'));
  const page=document.getElementById('page-'+pg);
  const tab=document.getElementById('tab-'+pg);
  if(page)page.classList.add('active');
  if(tab)tab.classList.add('active');
  currentPage=pg;
  window.scrollTo(0,0);
  observe();
  if(pg==='profile'){
    setTimeout(()=>document.querySelectorAll('#page-profile .rv').forEach(el=>el.classList.add('on')),80);
    if(typeof showProfileA2HSPopup==='function')showProfileA2HSPopup();
  } else {
    if(typeof closeA2HSPopup==='function')closeA2HSPopup();
  }
}

function applyTheme(){
  document.documentElement.setAttribute('data-theme',isDark?'dark':'light');
  const btn=document.getElementById('theme-btn');if(btn)btn.textContent=isDark?'🌙':'☀️';
}
function toggleTheme(){isDark=!isDark;localStorage.setItem('red_theme',isDark?'dark':'light');applyTheme();}

const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function updateTime(){
  const now=new Date();
  const h=String(now.getHours()).padStart(2,'0');
  const mi=String(now.getMinutes()).padStart(2,'0');
  const s=String(now.getSeconds()).padStart(2,'0');
  const timeStr=h+':'+mi+':'+s;
  const t=document.getElementById('time-top');if(t)t.textContent=timeStr;
}
setInterval(updateTime,1000);updateTime();

function buildStreakDays(){
  const g=document.getElementById('streak-days');if(!g)return;
  const labels=['M','T','W','T','F','S','S'];
  const today=new Date().getDay();
  const todayIdx=today===0?6:today-1;
  g.innerHTML='';
  labels.forEach((l,i)=>{
    const cls=i<todayIdx?'done':i===todayIdx?'today':'miss';
    const d=document.createElement('div');
    d.className='streak-dot '+cls;d.textContent=l;
    g.appendChild(d);
  });
}

function getAvatarSrc(name){return 'https://api.dicebear.com/7.x/bottts/svg?seed='+encodeURIComponent(name)+'&backgroundColor=0d1b2a';}
function updateAllAvatars(src){['profile-av','nav-av-mini','modal-av-preview'].forEach(id=>{const el=document.getElementById(id);if(el)el.src=src;});}

function initProfile(){
  const nm=document.getElementById('profile-nm');if(nm)nm.textContent=profileName;
  const handle=document.getElementById('profile-handle');if(handle)handle.textContent='@'+profileName.toLowerCase().replace(/\s+/g,'');
  const src=profileAvData||getAvatarSrc(profileName);
  updateAllAvatars(src);
  updateFavCount();buildStreakDays();renderGoals();initNotes();
}
function triggerAv(){const f=document.getElementById('av-file');if(f)f.click();}
function handleAv(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    profileAvData=ev.target.result;
    localStorage.setItem('red_av',profileAvData);
    updateAllAvatars(profileAvData);
    showToast('Photo updated! 📸');
  };
  r.readAsDataURL(f);
}
function resetAvatar(){
  profileAvData=null;
  localStorage.removeItem('red_av');
  const src=getAvatarSrc(profileName);
  updateAllAvatars(src);
  showToast('Reset to default avatar! ↺');
}
function saveName(){
  const v=document.getElementById('name-inp').value.trim();if(!v)return;
  profileName=v;localStorage.setItem('red_name',v);
  const nm=document.getElementById('profile-nm');if(nm)nm.textContent=v;
  const h=document.getElementById('profile-handle');if(h)h.textContent='@'+v.toLowerCase().replace(/\s+/g,'');
  if(!profileAvData)updateAllAvatars(getAvatarSrc(v));
  closeModal('name-modal');showToast('Name saved! ✓');
}
function shareProfile(){
  if(navigator.share){navigator.share({title:'My REDRMY Profile',text:profileName+' on REDRMY AIO',url:location.href}).catch(()=>{});}
  else{navigator.clipboard&&navigator.clipboard.writeText(location.href).then(()=>showToast('Link copied! 🔗'));}
}
function updateFavCount(){
  ['fav-cnt','stat-favs','fav-cnt-prof'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=favs.length;});
}

function buildPlat(pl,apk,provId){
  const pId=provId||'plat';
  const platId=pl.id||(pId+'_'+pl.n.toLowerCase().replace(/[^\w]/g,'_'));
  const isFav=favs.includes(platId)||(provId&&favs.includes(provId));
  const a=pl.apk||apk;
  const bc=pl.t==='web'?'pbw':pl.t==='app'?'pba':pl.t==='p'?'pba':'pbb';
  const badgeText=pl.t==='p'?'P':(pl.t?pl.t.toUpperCase():'WEB');
  const btn=a?`<a href="${a}" class="btn-dl"><svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor"><path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z"/></svg>DOWNLOAD</a>`:(pl.gate?`<button class="btn-study" onclick="event.stopPropagation();openPortalGate('${pl.gate}')" type="button">LET'S STUDY</button>`:(pl.url?`<a href="${pl.url}" target="_blank" class="btn-study">LET'S STUDY</a>`:''));
  const cardClick=pl.gate?` onclick="openPortalGate('${pl.gate}')"`:(pl.url&&!a?` onclick="window.open('${pl.url}','_blank')"`:'');
  return `<div class="plat-card"${cardClick} data-plat-id="${platId}"><span class="pbadge ${bc}">${badgeText}</span><button class="badge-fav${isFav?' act':''}" onclick="event.stopPropagation();toggleFav('${platId}',this)" type="button" title="Favorite platform" aria-label="Favorite"><svg class="fav-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button><img src="${pl.l}" class="plat-logo" alt="${pl.n}" width="44" height="44" loading="lazy" decoding="async" onerror="this.src='logo.png'"><div class="plat-name">${pl.n}</div>${btn}</div>`;
}

function renderProv(p,container){
  const block=document.createElement('div');block.className='prov-block rv';block.dataset.id=p.id;
  block.innerHTML=`<div class="prov-head"><img src="${p.logo}" class="prov-logo" alt="${p.name}" width="32" height="32" loading="lazy" decoding="async" onerror="this.src='logo.png'"><div class="prov-info"><div class="prov-name">${p.name}</div><div class="prov-cnt">${p.plats.length} Platform${p.plats.length>1?'s':''}${p.apk?' • APK':''}</div></div>${p.best?'<span class="badge-star">★ BEST</span>':''}</div>${p.note?`<div class="prov-note">${p.note}</div>`:''}<div class="plats-grid">${p.plats.map(pl=>buildPlat(pl,p.apk||null,p.id)).join('')}</div>`;
  container.appendChild(block);
}

function renderAll(){
  const g=document.getElementById('prov-grid');if(!g)return;
  g.innerHTML='';PROV.forEach(p=>renderProv(p,g));observe();
}

function buildHubPlat(pl,hubId){
  const hId=hubId||'hub';
  const platId=pl.id||(hId+'_'+pl.n.toLowerCase().replace(/[^\w]/g,'_'));
  const isFav=favs.includes(platId);
  const btn=pl.gate?`<button class="btn-study" onclick="event.stopPropagation();openPortalGate('${pl.gate}')" type="button">LET'S STUDY</button>`:(pl.url?`<a href="${pl.url}" target="_blank" class="btn-study">LET'S STUDY</a>`:'');
  const cardClick=pl.gate?` onclick="openPortalGate('${pl.gate}')"`:(pl.url?` onclick="window.open('${pl.url}','_blank')"`:'');
  return `<div class="plat-card hub-plat-card"${cardClick} data-plat-id="${platId}"><span class="pbadge pbw">WEB</span><button class="badge-fav${isFav?' act':''}" onclick="event.stopPropagation();toggleFav('${platId}',this)" type="button" title="Favorite platform" aria-label="Favorite"><svg class="fav-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button><img src="${pl.l}" class="plat-logo" alt="${pl.n}" width="44" height="44" loading="lazy" decoding="async" onerror="this.src='logo.png'"><div class="plat-name">${pl.n}</div>${btn}</div>`;
}

function renderStudyHubs(){
  const g=document.getElementById('hub-grid');if(!g)return;g.innerHTML='';
  STUDY_HUBS.forEach(h=>{
    const block=document.createElement('div');block.className='prov-block rv'+(h.featured?' hub-featured':'');
    const gridStyle=h.singleCol?'style="grid-template-columns:1fr"':'';
    block.innerHTML=`<div class="prov-head"><img src="${h.logo}" class="prov-logo" alt="${h.name}" width="32" height="32" loading="lazy" decoding="async" onerror="this.src='logo.png'"><div class="prov-info"><div class="prov-name">${h.name}</div><div class="prov-cnt">${h.plats.length} Platform${h.plats.length>1?'s':''}</div></div><span class="badge-star${h.featured?' badge-hot':''}">${h.featured?'🔥 ':'★ '}${h.badge}</span></div>${h.featured?'<div class="hub-feat-tag"><span class="hft-icon">✨</span><span class="hft-text"><strong>100,000+ Free Study Books &amp; Notes</strong> • Direct Library Access</span><span class="hft-badge">EXPLORE →</span></div>':''}${h.note?`<div class="prov-note">${h.note}</div>`:''}<div class="plats-grid" ${gridStyle}>${h.plats.map(pl=>buildHubPlat(pl,h.id)).join('')}</div>`;
    g.appendChild(block);
  });observe();
}


function renderFavs(){
  const sec=document.getElementById('fav-sec');
  const g=document.getElementById('fav-grid');
  updateFavCount();
  if(!favs.length){if(sec)sec.classList.remove('vis');return;}
  if(sec)sec.classList.add('vis');
  if(g){g.innerHTML='';favs.forEach(id=>{const p=PROV.find(x=>x.id===id);if(p)renderProv(p,g,false);});}
  observe();
}

function toggleFav(id,btn){
  if(favs.includes(id)){favs=favs.filter(x=>x!==id);showToast('Removed from favorites');}
  else{favs.push(id);showToast('Added to favorites ⭐');}
  localStorage.setItem('red_favs',JSON.stringify(favs));
  document.querySelectorAll('[data-plat-id="'+id+'"] .badge-fav').forEach(b=>b.classList.toggle('act',favs.includes(id)));
  updateFavCount();
  renderFavs();
  if(typeof applyProvFilter === 'function') applyProvFilter();
}




/* ── NETWORK STATS ── */
function loadNet(){
  const cn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const nt=document.getElementById('nt');const nm=document.getElementById('nm');
  const nq=document.getElementById('nq');const ns=document.getElementById('ns');const nr=document.getElementById('nr');
  if(nt)nt.textContent=cn?(cn.type||'WiFi/Mobile'):'WiFi';
  if(nm)nm.textContent=cn?(cn.effectiveType||'4G').toUpperCase():'WiFi';
  const eff=cn?cn.effectiveType:'4g';
  if(nq)nq.textContent={'slow-2g':'Poor','2g':'Fair','3g':'Good','4g':'Excellent'}[eff]||'Good';
  if(ns)ns.textContent=cn&&cn.downlink?cn.downlink+' Mbps':'~5+ Mbps';
  if(nr)nr.textContent=cn&&cn.rtt?cn.rtt+' ms':'~50 ms';
}

/* ── FX ANIMATIONS ENGINE ── */
var fxTimers=[];
var fxTimer=null;
function clearFx(){
  if(fxTimer){clearInterval(fxTimer);fxTimer=null;}
  fxTimers.forEach(function(id){clearInterval(id);});
  fxTimers=[];
  var l=document.getElementById('fx-layer');
  if(l)l.innerHTML='';
}
function setFx(type){
  clearFx();
  currentFx=type;
  localStorage.setItem('red_fx',type);
  document.querySelectorAll('.fx-btn').forEach(function(b){b.classList.remove('act');});
  var fb=document.getElementById('fx-'+type);
  if(fb)fb.classList.add('act');
  closeModal('fx-modal');
  if(type==='none')return;
  var l=document.getElementById('fx-layer');
  if(!l)return;

  if(type==='snow'){
    var tid=setInterval(function(){
      var s=document.createElement('div');
      var x=Math.random()*window.innerWidth;
      var y=-20;
      var spd=1.2+Math.random()*1.5;
      var drift=Math.random()*0.6-0.3;
      s.textContent='❄';
      s.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;font-size:'+(0.7+Math.random()*0.9)+'rem;opacity:'+(0.5+Math.random()*0.5)+';pointer-events:none;z-index:9990;will-change:transform;';
      l.appendChild(s);
      var mid=setInterval(function(){
        y+=spd;x+=drift;
        s.style.top=y+'px';s.style.left=x+'px';
        if(y>window.innerHeight+30){clearInterval(mid);if(s.parentNode)s.parentNode.removeChild(s);}
      },20);
      fxTimers.push(mid);
    },280);
    fxTimers.push(tid);
  }

  else if(type==='fire'){
    var emojis=['✨','🎆','💥','⭐','🌟','🎇'];
    var tid=setInterval(function(){
      for(var i=0;i<5;i++){
        (function(){
          var f=document.createElement('div');
          var x=(15+Math.random()*70)*window.innerWidth/100;
          var y=(25+Math.random()*60)*window.innerHeight/100;
          var vy=-(1.5+Math.random()*2.5);
          var op=1,sc=1;
          f.textContent=emojis[Math.floor(Math.random()*emojis.length)];
          f.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;font-size:'+(0.9+Math.random()*0.6)+'rem;pointer-events:none;z-index:9990;opacity:1;will-change:transform;';
          l.appendChild(f);
          var mid=setInterval(function(){
            y+=vy;vy*=0.96;op-=0.025;sc*=0.98;
            f.style.top=y+'px';f.style.opacity=op;f.style.transform='scale('+sc+')';
            if(op<=0.05){clearInterval(mid);if(f.parentNode)f.parentNode.removeChild(f);}
          },20);
          fxTimers.push(mid);
        })();
      }
    },350);
    fxTimers.push(tid);
  }

  else if(type==='rain'){
    var tid=setInterval(function(){
      var r=document.createElement('div');
      var x=Math.random()*window.innerWidth;
      var y=-15;
      var spd=9+Math.random()*7;
      var h=10+Math.random()*14;
      r.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;width:2px;height:'+h+'px;background:linear-gradient(rgba(100,200,255,0),rgba(100,200,255,0.55));border-radius:1px;pointer-events:none;z-index:9990;will-change:transform;';
      l.appendChild(r);
      var mid=setInterval(function(){
        y+=spd;r.style.top=y+'px';
        if(y>window.innerHeight+20){clearInterval(mid);if(r.parentNode)r.parentNode.removeChild(r);}
      },16);
      fxTimers.push(mid);
    },55);
    fxTimers.push(tid);
  }

  else if(type==='bijli'){
    var flash=document.createElement('div');
    flash.style.cssText='position:fixed;inset:0;background:rgba(255,255,255,0.06);pointer-events:none;z-index:9989;';
    l.appendChild(flash);
    var doStrike=function(){
      var b=document.createElement('div');
      var x=10+Math.random()*80;
      var ht=30+Math.random()*40;
      b.style.cssText='position:fixed;left:'+x+'%;top:0;width:2px;height:'+ht+'vh;background:linear-gradient(rgba(255,255,150,0.95),rgba(255,255,150,0));pointer-events:none;z-index:9991;border-radius:1px;box-shadow:0 0 10px rgba(255,255,150,0.9);opacity:1;';
      l.appendChild(b);
      var op=1;
      var mid=setInterval(function(){op-=0.12;b.style.opacity=op;if(op<=0){clearInterval(mid);if(b.parentNode)b.parentNode.removeChild(b);}},30);
      fxTimers.push(mid);
    };
    doStrike();
    var tid=setInterval(doStrike,1600+Math.random()*1000);
    fxTimers.push(tid);
  }

  else if(type==='barf'){
    var tid=setInterval(function(){
      var h=document.createElement('div');
      var x=Math.random()*window.innerWidth;
      var y=-20;
      var spd=2+Math.random()*2;
      h.textContent='🌨️';
      h.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;font-size:'+(0.6+Math.random()*0.7)+'rem;opacity:'+(0.5+Math.random()*0.5)+';pointer-events:none;z-index:9990;';
      l.appendChild(h);
      var mid=setInterval(function(){
        y+=spd;h.style.top=y+'px';
        if(y>window.innerHeight+30){clearInterval(mid);if(h.parentNode)h.parentNode.removeChild(h);}
      },20);
      fxTimers.push(mid);
    },180);
    fxTimers.push(tid);
  }

  else if(type==='fireball'){
    var doFb=function(){
      var f=document.createElement('div');
      var startY=(10+Math.random()*70)*window.innerHeight/100;
      var x=-60;
      var spd=4+Math.random()*3;
      f.textContent='☄️';
      f.style.cssText='position:fixed;left:'+x+'px;top:'+startY+'px;font-size:'+(1.2+Math.random()*1)+'rem;pointer-events:none;z-index:9990;';
      l.appendChild(f);
      var mid=setInterval(function(){
        x+=spd;f.style.left=x+'px';
        if(x>window.innerWidth+80){clearInterval(mid);if(f.parentNode)f.parentNode.removeChild(f);}
      },16);
      fxTimers.push(mid);
    };
    doFb();
    var tid=setInterval(doFb,1200);
    fxTimers.push(tid);
  }

  else if(type==='aandhi'){
    var tid=setInterval(function(){
      var w=document.createElement('div');
      var y=Math.random()*window.innerHeight*0.9;
      var x=-150;
      var spd=5+Math.random()*4;
      var wd=80+Math.random()*120;
      w.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;width:'+wd+'px;height:2px;background:linear-gradient(90deg,transparent,rgba(200,200,200,0.3),transparent);pointer-events:none;z-index:9990;border-radius:1px;';
      l.appendChild(w);
      var mid=setInterval(function(){
        x+=spd;w.style.left=x+'px';
        if(x>window.innerWidth+200){clearInterval(mid);if(w.parentNode)w.parentNode.removeChild(w);}
      },16);
      fxTimers.push(mid);
    },70);
    fxTimers.push(tid);
  }
}

/* ── SMART SCROLL, PROGRESS & QUICK UTILITIES ── */
let quickToolsOpen = false;

function scrollToTopSmooth() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottomSmooth() {
  closeQuickTools();
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}

function toggleQuickTools() {
  quickToolsOpen = !quickToolsOpen;
  const menu = document.getElementById('quick-tools-menu');
  const btn = document.getElementById('quick-tools-toggle');
  if (menu) {
    menu.classList.toggle('open', quickToolsOpen);
    menu.setAttribute('aria-hidden', String(!quickToolsOpen));
  }
  if (btn) btn.classList.toggle('active', quickToolsOpen);
}

function closeQuickTools() {
  if (!quickToolsOpen) return;
  quickToolsOpen = false;
  const menu = document.getElementById('quick-tools-menu');
  const btn = document.getElementById('quick-tools-toggle');
  if (menu) {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
  if (btn) btn.classList.remove('active');
}

/* Zen / Focus Mode */
function toggleZenMode() {
  closeQuickTools();
  const isZen = document.body.classList.toggle('zen-mode');
  if (isZen) {
    showToast('🎯 Focus Mode Activated • Press ESC to exit');
  } else {
    showToast('Exited Focus Mode');
  }
}

/* Quick Launchers */
function quickLaunchTimer() {
  closeQuickTools();
  if (typeof openModal === 'function') openModal('timer-modal');
}

function quickLaunchNotes() {
  closeQuickTools();
  if (typeof openModal === 'function') openModal('notes-modal');
}

function copyPageLink() {
  closeQuickTools();
  const url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showToast('🔗 Page link copied to clipboard!'))
      .catch(() => showToast('🔗 ' + url));
  } else {
    showToast('🔗 ' + url);
  }
}

/* Ambient Rain / White Noise (Pure Web Audio API - Zero Assets / Instant 0kb) */
let ambientAudioCtx = null;
let ambientSource = null;
let ambientGain = null;
let isAmbientPlaying = false;

function toggleAmbientSound() {
  if (isAmbientPlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound();
  }
}

function startAmbientSound() {
  try {
    if (!ambientAudioCtx) {
      ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ambientAudioCtx.state === 'suspended') {
      ambientAudioCtx.resume();
    }
    
    // Generate 4s of pink noise buffer
    const sampleRate = ambientAudioCtx.sampleRate;
    const bufferSize = sampleRate * 4;
    const buffer = ambientAudioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }
    
    // Lowpass filter for smooth soft rain frequencies
    const filter = ambientAudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    
    ambientGain = ambientAudioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.01, ambientAudioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.4, ambientAudioCtx.currentTime + 1.2);
    
    ambientSource = ambientAudioCtx.createBufferSource();
    ambientSource.buffer = buffer;
    ambientSource.loop = true;
    ambientSource.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ambientAudioCtx.destination);
    
    ambientSource.start(0);
    isAmbientPlaying = true;
    updateAmbientUI(true);
    showToast('🌧️ Focus Rain Ambience On');
  } catch(e) {
    showToast('Audio not supported');
  }
}

function stopAmbientSound() {
  if (ambientGain && ambientAudioCtx) {
    try {
      ambientGain.gain.linearRampToValueAtTime(0.01, ambientAudioCtx.currentTime + 0.35);
    } catch(e){}
    setTimeout(() => {
      try {
        if (ambientSource) {
          ambientSource.stop();
          ambientSource.disconnect();
        }
      } catch(e){}
      isAmbientPlaying = false;
      updateAmbientUI(false);
      showToast('🔇 Ambience Paused');
    }, 360);
  } else {
    isAmbientPlaying = false;
    updateAmbientUI(false);
  }
}

function updateAmbientUI(playing) {
  const wave = document.getElementById('qt-sound-wave');
  const txt = document.getElementById('qt-ambient-text');
  if (wave) wave.classList.toggle('active', playing);
  if (txt) txt.textContent = playing ? 'Pause Rain' : 'Rain Sound';
}

// Global click & esc listener
document.addEventListener('click', (e) => {
  const widget = document.getElementById('scroll-widget');
  if (widget && !widget.contains(e.target)) {
    closeQuickTools();
  }
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQuickTools();
    if (document.body.classList.contains('zen-mode')) {
      toggleZenMode();
    }
  }
});

/* Scroll Progress & Visibility Handler */
let scrollTicking = false;
let cachedDocH = 0;
let lastDocHCheck = 0;
let lastPct = -1;
let isSc = false;
let isVis = false;

function onPageScroll() {
  const scrollY = window.scrollY || window.pageYOffset || 0;
  const now = Date.now();
  if (now - lastDocHCheck > 1000 || cachedDocH <= 0) {
    cachedDocH = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
    lastDocHCheck = now;
  }
  
  if (cachedDocH > 0) {
    const pct = Math.min(100, Math.max(0, Math.round((scrollY / cachedDocH) * 100)));
    if (pct !== lastPct) {
      lastPct = pct;
      const prog = document.getElementById('progress');
      if (prog) prog.style.width = pct + '%';
      
      // Circular SVG Progress Ring (circumference = 2 * PI * 20 = 125.66)
      const spBar = document.getElementById('sp-bar');
      if (spBar) {
        spBar.style.strokeDashoffset = 125.66 - (pct / 100 * 125.66);
      }
      const stPct = document.getElementById('st-pct');
      if (stPct) stPct.textContent = pct + '%';
    }
  }
  
  const sc = scrollY > 40;
  if (sc !== isSc) {
    isSc = sc;
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('sc', sc);
  }
  
  const vis = scrollY > 120;
  if (vis !== isVis) {
    isVis = vis;
    const widget = document.getElementById('scroll-widget') || document.getElementById('scroll-top');
    if (widget) widget.classList.toggle('vis', vis);
  }
  
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(onPageScroll);
    scrollTicking = true;
  }
}, { passive: true });

const t0=Date.now();
setInterval(()=>{
  const s=Math.floor((Date.now()-t0)/1000);
  const str=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  const el=document.getElementById('dv3');if(el)el.textContent=str;
  const ps=document.getElementById('p-session');if(ps)ps.textContent=str;
  const pm=document.getElementById('pstat-session');if(pm)pm.textContent=Math.floor(s/60)+'m';
},1000);

let lv=247;
setInterval(()=>{lv=Math.max(190,Math.min(370,lv+Math.floor(Math.random()*5)-2));const el=document.getElementById('dv1');if(el)el.textContent=lv;},3800);

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});},{threshold:.04,rootMargin:'0px 0px -12px 0px'});
function observe(){
  if(window.innerWidth <= 768) return;
  document.querySelectorAll('.rv:not(.on)').forEach(el=>obs.observe(el));
}

/* ── EXAM COUNTDOWN ── */
function calcCountdown(){
  const now=new Date();
  const exams={
    upsc:new Date('2027-05-23'),
    jee27:new Date('2027-01-20'),
    neet27:new Date('2027-05-04'),
    cuet27:new Date('2027-05-12')
  };
  Object.entries(exams).forEach(([key,date])=>{
    const el=document.getElementById('ec-'+key);
    if(!el)return;
    const diff=Math.ceil((date-now)/(1000*60*60*24));
    el.textContent=diff>0?diff:'Done';
  });
}
calcCountdown();

/* ── TYPED EFFECT ── */
const typedStrings=['Free Education For All 🎓','JEE · NEET · CUET · UPSC 📚','14+ Providers, 60+ Platforms ⚡','100% Free — Always 🇮🇳'];
let typedI=0,typedJ=0,typedDel=false;
function typeWriter(){
  const el=document.getElementById('typed-text');if(!el)return;
  const str=typedStrings[typedI];
  if(!typedDel){el.textContent=str.slice(0,++typedJ);if(typedJ===str.length){typedDel=true;setTimeout(typeWriter,1600);return;}}
  else{el.textContent=str.slice(0,--typedJ);if(typedJ===0){typedDel=false;typedI=(typedI+1)%typedStrings.length;}}
  setTimeout(typeWriter,typedDel?40:65);
}
setTimeout(typeWriter,800);


/* ── AI CHATBOT PERMANENTLY REMOVED ── */

/* ── MOOD TRACKER ── */
function setMood(emoji,msg){
  document.querySelectorAll('.mood-btn').forEach(b=>{b.classList.toggle('sel',b.textContent===emoji);});
  const el=document.getElementById('mood-label');if(el)el.textContent=emoji+' '+msg;
  localStorage.setItem('red_mood',JSON.stringify({e:emoji,m:msg,d:new Date().toDateString()}));
  showToast('Mood saved '+emoji);
}
function loadMood(){
  try{
    const m=JSON.parse(localStorage.getItem('red_mood')||'{}');
    if(m.d===new Date().toDateString()&&m.e){
      document.querySelectorAll('.mood-btn').forEach(b=>{b.classList.toggle('sel',b.textContent===m.e);});
      const el=document.getElementById('mood-label');if(el)el.textContent=m.e+' '+m.m;
    }
  }catch(e){}
}

/* ── MOTIVATION SPINNER ── */
const MOTIV=[
  {q:"Success is not final, failure is not fatal — it is the courage to continue that counts.",a:"Winston Churchill"},
  {q:"The secret of getting ahead is getting started.",a:"Mark Twain"},
  {q:"Don't watch the clock; do what it does. Keep going.",a:"Sam Levenson"},
  {q:"Education is the most powerful weapon you can use to change the world.",a:"Nelson Mandela"},
  {q:"An investment in knowledge pays the best interest.",a:"Benjamin Franklin"},
  {q:"The beautiful thing about learning is that no one can take it away from you.",a:"B.B. King"},
  {q:"You don't have to be great to start, but you have to start to be great.",a:"Zig Ziglar"},
  {q:"It always seems impossible until it's done.",a:"Nelson Mandela"},
];
let spinIdx=0;
function spinMotivation(){
  const btn=document.getElementById('spin-btn');
  if(btn){btn.style.transform='scale(.92)';setTimeout(()=>btn.style.transform='',300);}
  spinIdx=(spinIdx+1)%MOTIV.length;
  const q=document.getElementById('spin-quote');
  const a=document.getElementById('spin-author');
  if(q){q.style.opacity='0';setTimeout(()=>{q.textContent='"'+MOTIV[spinIdx].q+'"';q.style.opacity='1';},200);}
  if(a){a.style.opacity='0';setTimeout(()=>{a.textContent='— '+MOTIV[spinIdx].a;a.style.opacity='1';},250);}
  showToast('New motivation! 💡');
}
function initMotiv(){
  spinIdx=Math.floor(Math.random()*MOTIV.length);
  const q=document.getElementById('spin-quote');const a=document.getElementById('spin-author');
  if(q){q.style.transition='opacity .2s';q.textContent='"'+MOTIV[spinIdx].q+'"';}
  if(a){a.style.transition='opacity .2s';a.textContent='— '+MOTIV[spinIdx].a;}
}

/* ── WEATHER ── */
function fetchWeather(lat,lon){
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
    .then(r=>r.json())
    .then(d=>{
      const cw=d.current_weather;const temp=Math.round(cw.temperature);const wc=cw.weathercode;
      let icon='🌤️',desc='Partly Cloudy';
      if(wc===0){icon='☀️';desc='Clear Sky';}else if(wc<=3){icon='⛅';desc='Partly Cloudy';}
      else if(wc<=48){icon='🌫️';desc='Foggy';}else if(wc<=57){icon='🌦️';desc='Drizzle';}
      else if(wc<=67){icon='🌧️';desc='Rainy';}else if(wc<=99){icon='⛈️';desc='Thunderstorm';}
      const wi=document.getElementById('weather-icon');if(wi)wi.textContent=icon;
      const wt=document.getElementById('weather-temp');if(wt)wt.textContent=temp+'°C';
      const wd=document.getElementById('weather-desc');if(wd)wd.textContent=desc;
    }).catch(()=>{
      const wd=document.getElementById('weather-desc');if(wd)wd.textContent='Weather unavailable';
      const wt=document.getElementById('weather-temp');if(wt)wt.textContent='--°';
    });
}
function initWeather(){
  const wc=document.getElementById('weather-city');if(wc)wc.textContent='India 🇮🇳';
  fetchWeather(20.5937,78.9629);
}

function copyLink(){
  const url='https://redrmy-aio.vercel.app';
  navigator.clipboard&&navigator.clipboard.writeText(url).then(()=>showToast('Link copied! 🔗')).catch(()=>{});
  const el=document.getElementById('copy-url-text');
  if(el)el.textContent='redrmy-aio.vercel.app';
}

/* ── RIPPLE ── */
function addRipple(e,el){
  const r=document.createElement('span');r.className='ripple';
  const rect=el.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height);
  r.style.cssText='width:'+size+'px;height:'+size+'px;left:'+(e.clientX-rect.left-size/2)+'px;top:'+(e.clientY-rect.top-size/2)+'px';
  el.appendChild(r);setTimeout(()=>r.remove(),700);
}

/* ── COMMAND PALETTE ── */
let cmdSelIdx=-1,cmdItems=[];
function openCmd(){
  const cmd=document.getElementById('cmd-overlay');
  if(cmd)cmd.classList.add('open');
  setTimeout(()=>{const i=document.getElementById('cmd-input');if(i){i.value='';i.focus();cmdSearch('');}},60);
}
function closeCmd(){
  const cmd=document.getElementById('cmd-overlay');
  if(cmd)cmd.classList.remove('open');
  cmdSelIdx=-1;
}
function cmdSearch(q){
  const res=document.getElementById('cmd-results');if(!res)return;
  q=q.toLowerCase().trim();
  cmdItems=[];
  const actions=[
    {icon:'🏠',name:'Home',sub:'Go to Home page',action:()=>{switchPage('home');closeCmd();}},
    {icon:'📚',name:'Study Hub',sub:'Tests, Notes, Resources',action:()=>{switchPage('resources');closeCmd();}},
    {icon:'🤖',name:'REDRMY AI',sub:'AI Assistant',action:()=>{switchPage('ai');closeCmd();}},
    {icon:'👤',name:'Profile',sub:'Your study profile',action:()=>{switchPage('profile');closeCmd();}},
    {icon:'⏱️',name:'Study Timer',sub:'Pomodoro / Focus timer',action:()=>{openModal('timer-modal');closeCmd();}},
    {icon:'🧮',name:'Calculator',sub:'Quick calculator',action:()=>{openModal('calc-modal');closeCmd();}},
    {icon:'📝',name:'Quick Notes',sub:'3-slot note pad',action:()=>{openModal('notes-modal');closeCmd();}},
    {icon:'🌙',name:'Toggle Theme',sub:'Dark / Light mode',action:()=>{toggleTheme();closeCmd();}},
    {icon:'🔗',name:'Copy Link',sub:'Copy site URL',action:()=>{copyLink();closeCmd();}},
  ];
  const provHits=[];
  PROV.forEach(p=>{
    if(!q||p.name.toLowerCase().includes(q)||p.plats.some(pl=>pl.n.toLowerCase().includes(q))){
      provHits.push({logo:p.logo,name:p.name,sub:p.plats.length+' platforms',url:p.plats.find(pl=>pl.url)?.url||null,action:null});
    }
  });
  const filtActions=q?actions.filter(a=>a.name.toLowerCase().includes(q)||a.sub.toLowerCase().includes(q)):actions.slice(0,6);
  let html='';
  if(filtActions.length){
    html+='<div class="cmd-section-label">QUICK ACTIONS</div>';
    filtActions.forEach((a)=>{
      cmdItems.push(a);
      html+=`<div class="cmd-item" onclick="cmdActivate(${cmdItems.length-1})"><div class="cmd-item-icon-emoji">${a.icon}</div><div class="cmd-item-info"><div class="cmd-item-name">${a.name}</div><div class="cmd-item-sub">${a.sub}</div></div><span class="cmd-item-arr">↵</span></div>`;
    });
  }
  if(provHits.length){
    html+='<div class="cmd-section-label">PROVIDERS ('+Math.min(provHits.length,8)+' found)</div>';
    provHits.slice(0,8).forEach(p=>{
      cmdItems.push(p);
      const tag=p.url?`href="${p.url}" target="_blank"`:'';
      html+=`<${p.url?'a':'div'} class="cmd-item" ${tag} onclick="if(!this.href){event.preventDefault();} closeCmd()"><img src="${p.logo}" class="cmd-item-icon" alt="${p.name}" onerror="this.src='logo.png'"><div class="cmd-item-info"><div class="cmd-item-name">${p.name}</div><div class="cmd-item-sub">${p.sub}</div></div><span class="cmd-item-arr">→</span></${p.url?'a':'div'}>`;
    });
  }
  if(!html)html='<div class="cmd-results-empty">No results for "'+q+'" — try a provider name or action</div>';
  res.innerHTML=html;
  cmdSelIdx=-1;
}
function cmdActivate(idx){
  const item=cmdItems[idx];
  if(!item)return;
  if(item.action){item.action();}
  else if(item.url){window.open(item.url,'_blank');}
  closeCmd();
}
function cmdKey(e){
  const items=document.querySelectorAll('#cmd-results .cmd-item');
  if(e.key==='ArrowDown'){e.preventDefault();cmdSelIdx=Math.min(cmdSelIdx+1,items.length-1);}
  else if(e.key==='ArrowUp'){e.preventDefault();cmdSelIdx=Math.max(cmdSelIdx-1,0);}
  else if(e.key==='Enter'){e.preventDefault();if(cmdSelIdx>=0&&items[cmdSelIdx])items[cmdSelIdx].click();return;}
  else if(e.key==='Escape'){closeCmd();return;}
  items.forEach((el,i)=>{el.classList.toggle('sel',i===cmdSelIdx);if(i===cmdSelIdx)el.scrollIntoView({block:'nearest'});});
}

function animateCounter(el,target,duration,suffix){
  if(!el)return;
  const start=0;const step=(target/duration)*16;let current=start;
  const update=()=>{current=Math.min(current+step,target);el.textContent=Math.round(current)+(suffix||'');if(current<target)requestAnimationFrame(update);};
  requestAnimationFrame(update);
}
function initHeroStats(){
  let platCount=0;PROV.forEach(p=>platCount+=p.plats.length);
  animateCounter(document.getElementById('hs-providers'),PROV.length,900,'');
  setTimeout(()=>animateCounter(document.getElementById('hs-platforms'),platCount,1100,'+'),200);
}

/* ── PROVIDER FILTER SYSTEM ── */
let currentFilter='all';
let currentSearch='';
function setFilter(f,btn){
  if(f==='fav' && currentFilter==='fav'){
    currentFilter='all';
  } else {
    currentFilter=f;
  }
  document.querySelectorAll('#filter-bar .filter-pill').forEach(b=>b.classList.remove('act'));
  const favBtn = document.getElementById('btn-fav-filter') || document.querySelector('.btn-fav-search');
  if(favBtn) favBtn.classList.toggle('act', currentFilter==='fav');
  const activePill = document.querySelector(`#filter-bar .filter-pill[data-filter="${currentFilter}"]`);
  if(activePill) activePill.classList.add('act');
  applyProvFilter();
}
function filterProviders(q){
  currentSearch=q.toLowerCase().trim();
  applyProvFilter();
}
function applyProvFilter(){
  let hasAny=false;
  document.querySelectorAll('#prov-grid .prov-block').forEach(block=>{
    const id=block.dataset.id;
    const prov=PROV.find(p=>p.id===id);
    if(!prov){block.style.display='none';return;}
    let show=true;
    if(currentFilter==='web')show=prov.plats.some(pl=>pl.t==='web'||pl.t==='both'||pl.t==='p');
    else if(currentFilter==='app')show=prov.plats.some(pl=>pl.t==='app')||!!prov.apk;
    else if(currentFilter==='best')show=!!prov.best;
    else if(currentFilter==='fav'){
      const hasFavPlat = prov.plats.some(pl => {
        const pId = pl.id || (prov.id+'_'+pl.n.toLowerCase().replace(/[^\w]/g,'_'));
        return favs.includes(pId);
      });
      show = favs.includes(id) || hasFavPlat;
    }
    const cards=block.querySelectorAll('.plats-grid > .plat-card');
    const cnt=block.querySelector('.prov-cnt');
    if(cnt&&cnt.dataset.orig===undefined)cnt.dataset.orig=cnt.textContent;
    let shown=prov.plats.length;
    cards.forEach((c, i)=>{
      let cardShow = true;
      if(currentFilter==='fav' && !favs.includes(id)){
        const pl = prov.plats[i];
        const pId = pl ? (pl.id || (prov.id+'_'+pl.n.toLowerCase().replace(/[^\w]/g,'_'))) : '';
        if(!favs.includes(pId)) cardShow = false;
      }
      c.style.display=cardShow?'':'none';
    });
    if(show&&currentSearch){
      const nameMatch=prov.name.toLowerCase().includes(currentSearch);
      if(!nameMatch){
        shown=0;
        prov.plats.forEach((pl,i)=>{
          const hit=pl.n.toLowerCase().includes(currentSearch);
          if(hit)shown++;
          if(cards[i])cards[i].style.display=hit?'':'none';
        });
        show=shown>0;
      }
    }
    if(cnt)cnt.textContent=(currentSearch&&show&&shown<prov.plats.length)?`${shown} of ${prov.plats.length} Platform${prov.plats.length>1?'s':''}`:cnt.dataset.orig;
    block.style.display=show?'':'none';
    if(show)hasAny=true;
  });
  const emptyEl=document.getElementById('prov-empty');
  if(emptyEl)emptyEl.style.display=hasAny?'none':'block';
}

document.addEventListener('keydown',e=>{
  if(e.ctrlKey&&e.key==='k'){e.preventDefault();openCmd();}
  if(e.key==='Escape'){
    document.querySelectorAll('.modal-ov.open').forEach(m=>m.classList.remove('open'));
    closeCmd();
  }
},{capture:true});

function addTrendingBadges(){
  const trendingIds=['studyrays','asmulti','delta','spidey','itrms'];
  trendingIds.forEach((id,idx)=>{
    const block=document.querySelector(`[data-id="${id}"]`);
    if(!block)return;
    const badge=document.createElement('span');
    badge.className='trending-badge';
    badge.innerHTML=(idx===0?'🔥 MOST POPULAR':idx<3?'⚡ TRENDING':'📈 RISING');
    const head=block.querySelector('.prov-head');
    if(head){head.style.position='relative';head.appendChild(badge);}
  });
}

/* ── THEME SYSTEM ── */
const THEMES=[
  {id:'dark',name:'Dark',emoji:'🌑',bg:'#020408',accent:'#00c8ff'},
  {id:'light',name:'Light',emoji:'☀️',bg:'#eef4ff',accent:'#0088cc'},
  {id:'system',name:'System',emoji:'💻',bg:'#1a1a2e',accent:'#888'},
  {id:'sandalwood',name:'Sandalwood',emoji:'🪵',bg:'#1a1008',accent:'#cd853f'},
  {id:'forest',name:'Forest',emoji:'🌲',bg:'#041008',accent:'#34a853'},
  {id:'emerald',name:'Emerald',emoji:'💎',bg:'#021410',accent:'#00ffd5'},
  {id:'ocean',name:'Ocean Deep',emoji:'🌊',bg:'#010818',accent:'#4ab8ff'},
  {id:'sakura',name:'Sakura Blossom',emoji:'🌸',bg:'#1a0a10',accent:'#ff8fab'},
  {id:'dracula',name:'Dracula',emoji:'🧛',bg:'#0d1117',accent:'#bd93f9'},
  {id:'midnight',name:'Midnight',emoji:'🌃',bg:'#080818',accent:'#8080ff'},
  {id:'lavender',name:'Lavender Mist',emoji:'💜',bg:'#100818',accent:'#c084fc'},
  {id:'cyberpunk',name:'Cyberpunk',emoji:'🤖',bg:'#0a0010',accent:'#f0f'},
  {id:'neon',name:'Neon',emoji:'🟢',bg:'#000a00',accent:'#00ff88'},
  {id:'pink',name:'Pink',emoji:'💗',bg:'#1a0818',accent:'#ff69b4'},
];
let currentThemeId=localStorage.getItem('red_theme_id')||'dark';
function applyFullTheme(id){
  currentThemeId=id;localStorage.setItem('red_theme_id',id);
  if(id==='system'){const sys=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',sys?'dark':'light');isDark=sys;}
  else{document.documentElement.setAttribute('data-theme',id==='light'?'light':id==='dark'?'dark':id);isDark=(id!=='light');}
  const btn=document.getElementById('theme-btn');if(btn)btn.textContent=isDark?'🌙':'☀️';
  document.querySelectorAll('.theme-chip').forEach(ch=>ch.classList.toggle('act',ch.dataset.thid===id));
  showToast('Theme: '+(THEMES.find(t=>t.id===id)?.name||id)+' ✨');
}
function buildThemeGrid(){
  const g=document.getElementById('theme-grid');if(!g)return;
  g.innerHTML=THEMES.map(t=>`<div class="theme-chip${t.id===currentThemeId?' act':''}" data-thid="${t.id}" onclick="applyFullTheme('${t.id}');closeModal('theme-modal')"><div class="theme-chip-preview" style="background:${t.bg};border:2px solid ${t.accent};position:relative;overflow:hidden"><div style="position:absolute;top:3px;left:4px;width:40%;height:40%;background:${t.accent};border-radius:3px;opacity:.7"></div><div style="position:absolute;bottom:3px;right:4px;width:55%;height:3px;background:${t.accent};border-radius:2px;opacity:.5"></div></div><div style="font-size:.78rem;margin-bottom:2px">${t.emoji}</div><div>${t.name}</div></div>`).join('');
}

/* ── EXAMS & ALARMS ── */
const PRESET_EXAMS=['JEE Main','JEE Advanced','NEET UG','CUET UG','BITSAT','MHT-CET','IAT (IISc)','VITEEE','COMEDK','UPSC CSE','UPSC CDS','BPSC','SSC CGL','SSC CHSL','IBPS PO','SBI PO','CAT','MAT','NDA','CLAT','AILET','LSAT','GATE','IIIT Hyderabad','AMU','JMI','ISI Kolkata','TIFR','CMI'];
const EXAM_DATES={'JEE Main':new Date('2027-01-20'),'JEE Advanced':new Date('2027-05-16'),'NEET UG':new Date('2027-05-04'),'CUET UG':new Date('2027-05-12'),'BITSAT':new Date('2027-04-20'),'MHT-CET':new Date('2026-12-15'),'UPSC CSE':new Date('2027-05-23'),'BPSC':new Date('2026-12-01'),'SSC CGL':new Date('2026-09-10'),'GATE':new Date('2027-02-01'),'CAT':new Date('2026-11-23'),'NDA':new Date('2026-09-14'),'CLAT':new Date('2026-12-01')};
let selectedExams=JSON.parse(localStorage.getItem('red_exams')||'[]');
let customExams=JSON.parse(localStorage.getItem('red_custom_exams')||'[]');
let studyPlatform=localStorage.getItem('red_platform')||'';

function buildExamChips(){
  const all=[...PRESET_EXAMS,...customExams];
  const g=document.getElementById('exam-chips');if(!g)return;
  g.innerHTML=all.map(e=>`<div class="exam-chip${selectedExams.includes(e)?' sel':''}" onclick="this.classList.toggle('sel')">${e}</div>`).join('');
  const pi=document.getElementById('exam-platform-inp');if(pi)pi.value=studyPlatform;
}
function addCustomExam(){
  const inp=document.getElementById('exam-custom-inp');const v=inp?inp.value.trim():'';
  if(!v){showToast('Exam name likho!');return;}
  if(!customExams.includes(v)&&!PRESET_EXAMS.includes(v)){customExams.push(v);localStorage.setItem('red_custom_exams',JSON.stringify(customExams));}
  if(inp)inp.value='';buildExamChips();
}
function saveExams(){
  selectedExams=[...document.querySelectorAll('#exam-chips .exam-chip.sel')].map(el=>el.textContent.trim());
  localStorage.setItem('red_exams',JSON.stringify(selectedExams));
  const pi=document.getElementById('exam-platform-inp');studyPlatform=pi?pi.value.trim():'';
  localStorage.setItem('red_platform',studyPlatform);
  renderMyExams();renderExamCountdowns();closeModal('exam-modal');showToast('Exams saved! 🎯');
}
function renderMyExams(){
  const g=document.getElementById('my-exam-tags');if(!g)return;
  const colors=['#00c8ff','#8b5cf6','#ff8fab','#ffd700','#00ffd5','#ff6080','#34d399','#fb923c'];
  if(!selectedExams.length){g.innerHTML='<div style="color:var(--t3);font-family:var(--fm);font-size:.56rem">No exams selected yet...</div>';return;}
  g.innerHTML=selectedExams.map((e,i)=>`<span style="padding:6px 14px;background:rgba(0,200,255,.06);border:1.5px solid ${colors[i%colors.length]};border-radius:100px;font-family:var(--fd);font-size:.74rem;color:${colors[i%colors.length]}">${e}</span>`).join('');
  const pt=document.getElementById('my-platform-tag');if(pt)pt.textContent=studyPlatform||'—';
}
function renderExamCountdowns(){
  const g=document.getElementById('exam-countdown-list');if(!g)return;
  const now=new Date();const examsToShow=selectedExams.length?selectedExams:Object.keys(EXAM_DATES);
  g.innerHTML=examsToShow.slice(0,8).map(name=>{
    const d=EXAM_DATES[name];const days=d?Math.ceil((d-now)/864e5):null;
    const daysStr=days===null?'Date TBA':days<=0?'✓ Done':(days+' days');
    return `<div class="cd-item"><span class="cd-exam">🎯 ${name}</span><div style="text-align:right"><span class="cd-days">${daysStr}</span><span class="cd-sub">${d?d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'—'}</span></div></div>`;
  }).join('')||'<div style="color:var(--t3);font-family:var(--fm);font-size:.56rem">Select exams to see countdown</div>';
}

let alarms=JSON.parse(localStorage.getItem('red_alarms')||'[]');
function setAlarm(){
  const ti=document.getElementById('alarm-time');const li=document.getElementById('alarm-label');
  const time=ti?ti.value:'';if(!time){showToast('Time select karo!');return;}
  const label=(li?li.value.trim():'')||'Study Time!';
  alarms.push({time,label,id:Date.now()});localStorage.setItem('red_alarms',JSON.stringify(alarms));
  renderAlarmList();updateAlarmPreview();showToast('Alarm set for '+time+' ⏰');
  if(ti)ti.value='';if(li)li.value='';
}
function deleteAlarm(id){alarms=alarms.filter(a=>a.id!==id);localStorage.setItem('red_alarms',JSON.stringify(alarms));renderAlarmList();updateAlarmPreview();}
function renderAlarmList(){
  const g=document.getElementById('alarm-list');if(!g)return;
  if(!alarms.length){g.innerHTML='<div style="color:var(--t3);font-family:var(--fm);font-size:.52rem;text-align:center;padding:8px">No alarms set</div>';return;}
  g.innerHTML=alarms.map(a=>`<div class="alarm-item"><div><div class="alarm-time-lbl">${a.time}</div><div class="alarm-lbl-txt">${a.label}</div></div><button class="alarm-del" onclick="deleteAlarm(${a.id})" type="button">🗑</button></div>`).join('');
}
function updateAlarmPreview(){
  const el=document.getElementById('alarm-preview');if(!el)return;
  el.innerHTML=alarms.length?alarms.map(a=>`<span style="display:block;font-family:var(--fd);font-size:.64rem;color:var(--b);margin-bottom:3px">⏰ ${a.time} — ${a.label}</span>`).join(''):'No alarms set';
}
function checkAlarms(){
  const now=new Date();if(now.getSeconds()>8)return;
  const cur=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
  alarms.forEach(a=>{
    if(a.time===cur&&!a.fired){a.fired=true;localStorage.setItem('red_alarms',JSON.stringify(alarms));
      if('Notification' in window&&Notification.permission==='granted')new Notification('⏰ '+a.label,{body:'REDRMY AIO — Padhai start karo! 📚',icon:'logo.png'});
      showToast('⏰ ALARM: '+a.label+'!');
    }
    if(a.time!==cur&&a.fired)delete a.fired;
  });
}
setInterval(checkAlarms,10000);

/* ── PROFILE SUB-TABS ── */
function switchProfTab(tab){
  ['overview','exams','stats','tools'].forEach(t=>{
    const p=document.getElementById('ptab-panel-'+t);const b=document.getElementById('ptab-'+t);
    if(p)p.style.display=t===tab?'block':'none';if(b)b.classList.toggle('active',t===tab);
  });
  if(tab==='stats'){renderPlatformVisits();updateDaysAlive();}
  if(tab==='exams'){buildExamChips();renderMyExams();renderExamCountdowns();}
  if(tab==='tools')loadNetFull();
}

/* ── WELCOME POPUP FOR DASHBOARD ONBOARDING (ASKED ONLY ONCE) ── */
function checkWelcome(){
  const el=document.getElementById('welcome-overlay');if(!el)return;
  // If user has already visited or completed/skipped onboarding, never ask again
  if(localStorage.getItem('red_onboarded')==='true'){
    el.style.display='none';
    return;
  }
  el.style.display='flex';
  setTimeout(()=>{
    const inp=document.getElementById('welcome-name-inp');
    if(inp){
      const saved=localStorage.getItem('red_name');
      if(saved && saved!=='REDRMY Student') inp.value=saved;
      inp.focus();
    }
  },300);
}
function closeWelcome(){
  localStorage.setItem('red_onboarded','true');
  const el=document.getElementById('welcome-overlay');
  if(el){
    el.style.transition='opacity 0.25s ease';
    el.style.opacity='0';
    setTimeout(()=>{el.style.display='none';el.style.opacity='1';},250);
  }
}
function saveWelcomeName(){
  const inp=document.getElementById('welcome-name-inp');
  const v=inp?inp.value.trim():'';
  const finalName=v||'REDRMY Student';
  profileName=finalName;
  localStorage.setItem('red_name',finalName);
  localStorage.setItem('red_custom_name','true');
  localStorage.setItem('red_onboarded','true');
  const nm=document.getElementById('profile-nm');if(nm)nm.textContent=finalName;
  const h=document.getElementById('profile-handle');if(h)h.textContent='@'+finalName.toLowerCase().replace(/\s+/g,'');
  if(!profileAvData)updateAllAvatars(getAvatarSrc(finalName));
  showToast(v?'Welcome to your Dashboard, '+v+'! 🚀':'Welcome to REDRMY AIO! 🚀');
  closeWelcome();
  if(!localStorage.getItem('red_join_date'))localStorage.setItem('red_join_date',Date.now());
}


/* ── STATS & UID ── */
function updateDaysAlive(){
  const join=parseInt(localStorage.getItem('red_join_date')||Date.now());
  const days=Math.max(1,Math.floor((Date.now()-join)/864e5));
  const el=document.getElementById('days-alive');if(el)el.textContent=days;
  const tv=document.getElementById('total-visits-big');if(tv)tv.textContent=localStorage.getItem('red_visits')||'1';
}
function initUID(){
  let uid=localStorage.getItem('red_uid');
  if(!uid){uid='RED#'+Math.random().toString(36).substr(2,6).toUpperCase();localStorage.setItem('red_uid',uid);}
  const el=document.getElementById('user-uid');if(el)el.textContent=uid;
}
function copyUID(){const uid=localStorage.getItem('red_uid')||'RED#000000';navigator.clipboard&&navigator.clipboard.writeText(uid).then(()=>showToast('UID copied! '+uid));}

let platVisits=JSON.parse(localStorage.getItem('red_plat_visits')||'{}');
function trackPlatVisit(name){platVisits[name]=(platVisits[name]||0)+1;localStorage.setItem('red_plat_visits',JSON.stringify(platVisits));}
function renderPlatformVisits(){
  const g=document.getElementById('platform-visits-list');if(!g)return;
  const sorted=Object.entries(platVisits).sort((a,b)=>b[1]-a[1]).slice(0,12);
  if(!sorted.length){g.innerHTML='<div style="color:var(--t3);font-family:var(--fm);font-size:.56rem;text-align:center;padding:10px">Koi platform visit nahi kiya abhi</div>';return;}
  const max=sorted[0][1];
  g.innerHTML=sorted.map(([name,count])=>`<div class="pv-item"><span class="pv-name">${name}</span><div style="flex:1;margin:0 8px"><div class="pv-bar" style="width:${Math.round(count/max*100)}%"></div></div><span class="pv-count">${count}</span></div>`).join('');
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('.btn-study,.btn-dl');if(!btn)return;
  const card=btn.closest('.plat-card');if(!card)return;
  const name=card.querySelector('.plat-name');if(name)trackPlatVisit(name.textContent.trim());
});

async function loadNetFull(){
  const cn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const tp=document.getElementById('pf-type'),sp=document.getElementById('pf-speed'),pg=document.getElementById('pf-ping'),ql=document.getElementById('pf-quality');
  if(tp)tp.textContent=cn?(cn.effectiveType||'WiFi').toUpperCase():'WiFi';
  if(sp)sp.textContent=cn&&cn.downlink?cn.downlink+' Mbps':'~5+ Mbps';
  const eff=cn?cn.effectiveType:'4g';
  if(ql)ql.textContent={'slow-2g':'Poor','2g':'Fair','3g':'Good','4g':'Excellent'}[eff]||'Good';
  if(pg){
    pg.textContent='Pinging...';
    try{const t0=performance.now();await fetch('https://api.cloudflare.com/cdn-cgi/trace',{cache:'no-store',mode:'no-cors'});const ping=Math.round(performance.now()-t0);pg.textContent=ping+' ms';pg.style.color=ping<80?'#00ffd5':ping<200?'#ffd700':'#ff4466';}
    catch(e){const nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];pg.textContent=(nav?Math.round(nav.responseStart-nav.requestStart):cn&&cn.rtt?cn.rtt:50)+' ms';}
  }
  loadNet();
}

/* ── LIQUID BACKGROUND CANVAS ENGINE ── */
function initLiquidBackground(){
  const canvas = document.getElementById('canvas-bg');
  if(!canvas) return;

  // On mobile, size the canvas once and leave it static so bw_bg.jpg renders properly without GPU loop
  if (window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024)) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return;
  }

  const ctx = canvas.getContext('2d');
  if(!ctx) return;

  let width = 0, height = 0;
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
  const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if(mouse.x === 0 && mouse.y === 0){
      mouse.x = mouse.targetX = width / 2;
      mouse.y = mouse.targetY = height / 2;
    }
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if(e.touches && e.touches[0]){
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
    }
  }, { passive: true });

  // 5 organic fluid metaballs
  const blobs = [
    { x: 0.22, y: 0.28, r: 260, color: [59, 130, 246], phase: 0, speed: 0.0008 },
    { x: 0.78, y: 0.22, r: 300, color: [99, 102, 241], phase: 1.5, speed: 0.0006 },
    { x: 0.5, y: 0.65, r: 270, color: [6, 182, 212], phase: 3.1, speed: 0.0007 },
    { x: 0.88, y: 0.78, r: 240, color: [168, 85, 247], phase: 4.5, speed: 0.0005 },
    { x: 0.12, y: 0.82, r: 250, color: [37, 99, 235], phase: 2.2, speed: 0.0008 }
  ];

  let t = 0;
  function draw(){
    if(document.hidden){
      requestAnimationFrame(draw);
      return;
    }
    t += 0.015;
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    blobs.forEach((b, i) => {
      const cx = (b.x + Math.sin(t * 0.7 + b.phase) * 0.1) * width + (mouse.x - width/2) * 0.04 * (i % 2 === 0 ? 1 : -1);
      const cy = (b.y + Math.cos(t * 0.6 + b.phase) * 0.1) * height + (mouse.y - height/2) * 0.04 * (i % 2 === 0 ? -1 : 1);
      const cr = b.r * (1 + Math.sin(t * 1.1 + b.phase) * 0.12);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      const [r, g, bl] = b.color;
      grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, 0.24)`);
      grad.addColorStop(0.55, `rgba(${r}, ${g}, ${bl}, 0.08)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ── INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.setAttribute('data-theme', 'dark');
  initLiquidBackground();
  if(typeof loadQuote === 'function') loadQuote();
  if(typeof initProfile === 'function') initProfile();
  if(typeof renderAll === 'function') renderAll();
  if(typeof renderFavs === 'function') renderFavs();
  if(typeof renderStudyHubs === 'function') renderStudyHubs();
  if(typeof updateTimerUI === 'function') updateTimerUI();
  if(typeof initMotiv === 'function') initMotiv();
  if(typeof initWeather === 'function') initWeather();
  if(typeof loadMood === 'function') loadMood();
  if(typeof initVisitCounter === 'function') initVisitCounter();
  if(typeof loadCard === 'function') loadCard();
  if(typeof observe === 'function') observe();
  checkWelcome();
  initUID();
  updateDaysAlive();
  if(typeof renderMyExams === 'function') renderMyExams();
  if(typeof renderAlarmList === 'function') renderAlarmList();
  if(typeof updateAlarmPreview === 'function') updateAlarmPreview();
  if(!localStorage.getItem('red_join_date'))localStorage.setItem('red_join_date',Date.now());
  
  // 8-Second Telegram Popup Trigger (shows on refresh & new visits)
  setTimeout(() => {
    showTgPopup();
  }, 8000);
});

let tgCrossInterval = null;

function showTgPopup() {
  const pop = document.getElementById('tg-pop-10s');
  if (!pop) return;

  const cross = document.getElementById('tg-pop-cross');
  const cdHint = document.getElementById('tg-countdown-hint');
  const cdSec = document.getElementById('tg-cd-sec');

  let remaining = 5;

  if (cross) {
    cross.style.display = 'flex';
    cross.disabled = true;
    cross.style.cursor = 'default';
    cross.style.color = 'var(--t3)';
    cross.style.fontSize = '12px';
    cross.textContent = remaining + 's';
    cross.setAttribute('aria-label', `Close available in ${remaining} seconds`);
  }

  if (cdHint) cdHint.style.display = 'block';
  if (cdSec) cdSec.textContent = remaining;

  pop.style.display = 'flex';

  if (tgCrossInterval) clearInterval(tgCrossInterval);

  tgCrossInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      if (cross) {
        cross.textContent = remaining + 's';
        cross.setAttribute('aria-label', `Close available in ${remaining} seconds`);
      }
      if (cdSec) cdSec.textContent = remaining;
    } else {
      clearInterval(tgCrossInterval);
      tgCrossInterval = null;
      if (cross) {
        cross.disabled = false;
        cross.style.cursor = 'pointer';
        cross.style.color = 'var(--t2)';
        cross.style.fontSize = '15px';
        cross.textContent = '✕';
        cross.setAttribute('aria-label', 'Close');
      }
      if (cdHint) cdHint.style.display = 'none';
    }
  }, 1000);
}

function closeTg10sPop() {
  const pop = document.getElementById('tg-pop-10s');
  if (pop) pop.style.display = 'none';
  if (tgCrossInterval) {
    clearInterval(tgCrossInterval);
    tgCrossInterval = null;
  }
}

function onTgCrossClick() {
  const tgCross = document.getElementById('tg-pop-cross');
  if (tgCross && tgCross.disabled) return;
  const pgCross = document.getElementById('pg-pop-cross');
  const pgPop = document.getElementById('pg-popup');
  if (pgCross && pgCross.disabled && pgPop && pgPop.classList.contains('show')) return;

  closeTg10sPop();
  closePgPopup();
}

/* ── TELEGRAM JOIN VERIFICATION (LOCK UNTIL JOINED & RETURNED) ── */
let isPendingTgJoin = false;

function startTgJoin(url) {
  isPendingTgJoin = true;
  try {
    sessionStorage.setItem('red_pending_tg', '1');
  } catch(e) {}

  // Update status and show verification button on 10s popup
  const status10s = document.getElementById('tg-join-status');
  const verify10s = document.getElementById('tg-verify-btn');
  if (status10s) status10s.style.display = 'block';
  if (verify10s) verify10s.style.display = 'inline-flex';

  // Update status and show verification button on portal gate popup
  const pgStatus = document.getElementById('pg-popup-status');
  const pgVerify = document.getElementById('pg-verify-btn');
  if (pgStatus) pgStatus.style.display = 'block';
  if (pgVerify) pgVerify.style.display = 'inline-flex';
}

function checkAndCompleteTgJoin(force = false) {
  let pending = isPendingTgJoin;
  try {
    if (sessionStorage.getItem('red_pending_tg') === '1') {
      pending = true;
    }
  } catch(e) {}

  if (!force && !pending) return;

  isPendingTgJoin = false;
  try {
    sessionStorage.removeItem('red_pending_tg');
    localStorage.setItem('red_tg_joined', 'true');
  } catch(e) {}

  closeTg10sPop();

  if (typeof finishPortalGate === 'function' && portalGateDest) {
    finishPortalGate();
  }

  if (typeof showToast === 'function') {
    showToast('🎉 Welcome! Telegram joined — Access granted');
  }
}

// When user returns to this tab/window after joining Telegram
window.addEventListener('focus', () => {
  checkAndCompleteTgJoin(false);
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    checkAndCompleteTgJoin(false);
  }
});

/* ── ADD TO HOMESCREEN (A2HS) & PWA SUPPORT ── */
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  closeA2HSPopup();
  showToast('REDRMY added to your Home Screen! 🎉');
});

// Register service worker if supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

function showProfileA2HSPopup() {
  const banner = document.getElementById('a2hs-top-banner');
  if (!banner) return;
  // If already running in standalone PWA mode, don't show prompt
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    return;
  }
  // Smoothly slide down from upside
  setTimeout(() => {
    banner.classList.add('show');
  }, 220);
}

function closeA2HSPopup() {
  const banner = document.getElementById('a2hs-top-banner');
  if (banner) banner.classList.remove('show');
}

function installAppPrompt() {
  closeA2HSPopup();
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult && choiceResult.outcome === 'accepted') {
        showToast('Installing REDRMY to Home Screen... 📲');
      }
      deferredInstallPrompt = null;
    }).catch(() => {
      showA2HSGuideModal();
    });
  } else {
    showA2HSGuideModal();
  }
}

function showA2HSGuideModal() {
  const container = document.getElementById('a2hs-steps-container');
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);

  if (container) {
    if (isIOS) {
      container.innerHTML = `
        <div style="font-weight:700;color:var(--t1);margin-bottom:10px">📲 Instructions for iPhone / iPad (Safari):</div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">1</span>
          <span>Tap the <strong>Share</strong> button <span style="background:rgba(255,255,255,0.12);padding:1px 6px;border-radius:4px">⎋</span> at the bottom of Safari.</span>
        </div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">2</span>
          <span>Scroll down and tap <strong>"Add to Home Screen"</strong> <span style="background:rgba(255,255,255,0.12);padding:1px 6px;border-radius:4px">⊞</span>.</span>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">3</span>
          <span>Tap <strong>"Add"</strong> in the top-right corner to finish!</span>
        </div>
      `;
    } else if (isAndroid) {
      container.innerHTML = `
        <div style="font-weight:700;color:var(--t1);margin-bottom:10px">📲 Instructions for Android (Chrome / Browser):</div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">1</span>
          <span>Tap the <strong>three dots</strong> menu <span style="background:rgba(255,255,255,0.12);padding:1px 6px;border-radius:4px">⋮</span> at the top right of your browser.</span>
        </div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">2</span>
          <span>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.</span>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">3</span>
          <span>Tap <strong>"Add"</strong> / <strong>"Install"</strong> to confirm!</span>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="font-weight:700;color:var(--t1);margin-bottom:10px">📲 Instructions for Desktop / Laptop:</div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">1</span>
          <span>Click the <strong>Install</strong> icon ⊕ on the right side of the address bar.</span>
        </div>
        <div style="margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">2</span>
          <span>Or open browser menu <span style="background:rgba(255,255,255,0.12);padding:1px 6px;border-radius:4px">⋮</span> &gt; choose <strong>Install REDRMY AIO</strong>.</span>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="background:rgba(255,255,255,0.12);padding:2px 7px;border-radius:6px;font-weight:700;font-family:var(--fm)">3</span>
          <span>Or press <strong>Ctrl + D</strong> (Cmd + D) to bookmark!</span>
        </div>
      `;
    }
  }
  openModal('a2hs-guide-modal');
}


