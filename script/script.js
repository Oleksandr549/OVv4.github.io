
gsap.registerPlugin(ScrollTrigger);

/* ─── NAV + BURGER ─── */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('s',scrollY>60));
(function(){
  const burger=document.getElementById('navBurger');
  const mobile=document.getElementById('navMobile');
  if(!burger||!mobile)return;
  const toggle=()=>{
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
    document.body.style.overflow=mobile.classList.contains('open')?'hidden':'';
  };
  burger.addEventListener('click',toggle);
  mobile.querySelectorAll('.nm-link').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');mobile.classList.remove('open');document.body.style.overflow='';
  }));
})();

/* ─── HERO INTRO ─── */
gsap.fromTo('#heroTag',{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.4,ease:'power3.out'});
gsap.fromTo('#heroL1',{y:'110%'},{y:'0%',duration:1,delay:.5,ease:'power4.out'});
gsap.fromTo('#heroL2',{y:'110%'},{y:'0%',duration:1,delay:.7,ease:'power4.out'});
gsap.fromTo('#heroSub',{opacity:0,y:30},{opacity:1,y:0,duration:.9,delay:.9,ease:'power3.out'});
gsap.fromTo('#heroBtns',{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:1.1,ease:'power3.out'});
// photo and stats removed
gsap.fromTo('#heroScroll',{opacity:0},{opacity:1,duration:.8,delay:1.6});

/* hero parallax */
gsap.to('#heroOrb',{yPercent:30,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero-c',{yPercent:18,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});

/* ─── GSAP SCROLL ANIMATIONS — scrub = follows scroll direction ─── */

/* Generic fade-up: scrub so reversing scroll reverses animation */
gsap.utils.toArray('.gsap-fade').forEach(el=>{
  gsap.fromTo(el,
    {opacity:0,y:45},
    {opacity:1,y:0,ease:'power2.out',
     scrollTrigger:{trigger:el,start:'top 90%',end:'top 55%',scrub:1.2}}
  );
});

/* Split text lines — scrub per line */
gsap.utils.toArray('.gsap-splitlines').forEach(el=>{
  const lines=el.innerHTML.split('<br>');
  if(lines.length>1){
    el.innerHTML=lines.map(l=>`<span style="display:block;overflow:hidden"><span class="gsap-line" style="display:block">${l}</span></span>`).join('');
    el.querySelectorAll('.gsap-line').forEach((line,i)=>{
      gsap.fromTo(line,
        {y:'100%',opacity:0},
        {y:'0%',opacity:1,ease:'power3.out',
         scrollTrigger:{trigger:el,start:'top 88%',end:`top ${58-i*8}%`,scrub:1}}
      );
    });
  }else{
    gsap.fromTo(el,{opacity:0,y:35},{opacity:1,y:0,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 88%',end:'top 55%',scrub:1}});
  }
});

/* Stagger — each child scrubs independently */
gsap.utils.toArray('.gsap-stagger').forEach(el=>{
  Array.from(el.children).forEach((child,i)=>{
    gsap.fromTo(child,
      {opacity:0,y:35},
      {opacity:1,y:0,ease:'power2.out',
       scrollTrigger:{trigger:el,start:`top ${90-i*2}%`,end:`top ${58-i*2}%`,scrub:1.2}}
    );
  });
});

/* Skill cards — staggered scrub */
document.querySelectorAll('.gsap-card').forEach((card,i)=>{
  gsap.fromTo(card,
    {opacity:0,y:55,scale:.95},
    {opacity:1,y:0,scale:1,ease:'power2.out',
     scrollTrigger:{trigger:'.sk-grid',start:`top ${92-i*1.5}%`,end:`top ${55-i*1.5}%`,scrub:1.2}}
  );
});

/* ─── SKILL SVG BORDER TRACE — scrub ─── */
(function(){
  const cards=document.querySelectorAll('.sk-card');
  cards.forEach((card,i)=>{
    const svg=card.querySelector('.sk-border-svg');
    const path=card.querySelector('.sk-border-path');
    if(!svg||!path)return;

    // measure card and set SVG rect to exact pixel dims
    function syncSize(){
      const w=card.offsetWidth, h=card.offsetHeight;
      svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      path.setAttribute('width',w-2);
      path.setAttribute('height',h-2);
      const perim=2*(w-2+h-2);
      path.style.strokeDasharray=perim;
      path.style.strokeDashoffset=perim;
      path._perim=perim;
    }
    syncSize();
    window.addEventListener('resize',syncSize);

    // scrub: offset goes from perim → 0 as card scrolls into view
    ScrollTrigger.create({
      trigger:card,
      start:'top 88%',
      end:'top 38%',
      scrub:1.4,
      onUpdate(self){
        if(!path._perim)return;
        path.style.strokeDashoffset=path._perim*(1-self.progress);
        // glow intensity follows progress
        const glow=self.progress*6;
        path.style.filter=`drop-shadow(0 0 ${glow}px rgba(61,255,143,${.4+self.progress*.4}))`;
        path.style.opacity=.3+self.progress*.7;
      }
    });
  });
})();

/* ─── PROJECTS HORIZONTAL SCROLL — pure CSS sticky + native scroll ─── */
(function(){
  const wrap   = document.getElementById('projScrollWrap');
  const sticky = document.getElementById('projSticky');
  const track  = document.getElementById('projTrack');
  const fill   = document.getElementById('progFill');
  const curNum = document.getElementById('projCurNum');
  const slides = Array.from(track.querySelectorAll('.proj-slide'));

  document.getElementById('projTotalNum').textContent = String(slides.length).padStart(2,'0');

  let maxX = 0;

  function measure(){
    /* 1. kill any lingering transform so scrollWidth is accurate */
    track.style.transform = 'translateX(0)';
    /* 2. force reflow so browser resolves current media-query styles */
    void track.offsetWidth;
    maxX = Math.max(0, track.scrollWidth - window.innerWidth);
    wrap.style.height = (maxX + window.innerHeight) + 'px';
  }

  /* active slide */
  let activeIdx = -1;
  function setActive(idx){
    if(idx === activeIdx) return;
    activeIdx = idx;
    slides.forEach((s,i) => s.classList.toggle('active', i === idx));
    if(curNum) curNum.textContent = String(idx+1).padStart(2,'0');
  }
  setActive(0);

  /* scroll handler — pure geometry */
  function onScroll(){
    const wTop    = wrap.getBoundingClientRect().top;
    const scrolled = -wTop;

    if(scrolled <= 0){
      track.style.transform = 'translateX(0)';
      fill.style.width = '0%';
      setActive(0);
      return;
    }
    const total = wrap.offsetHeight - window.innerHeight;
    if(total <= 0) return;

    const prog = Math.min(1, scrolled / total);
    const x    = prog * maxX;
    track.style.transform = 'translateX(' + (-x) + 'px)';
    fill.style.width = (prog * 100) + '%';

    /* find slide closest to viewport center */
    const center = window.innerWidth / 2 + x;
    let best = 0, bestDist = Infinity;
    slides.forEach((s,i) => {
      const mid = s.offsetLeft + s.offsetWidth / 2;
      const d   = Math.abs(mid - center);
      if(d < bestDist){ bestDist = d; best = i; }
    });
    setActive(best);
  }

  window.addEventListener('scroll', onScroll, {passive:true});

  /* rebuild on resize — double rAF ensures media-query styles are fully
     applied before we read any layout dimensions                        */
  let rTimer;
  function rebuild(){
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measure();
        onScroll();
      });
    });
  }

  let rDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(rDebounce);
    rDebounce = setTimeout(rebuild, 60);
  });
  window.addEventListener('orientationchange', () => setTimeout(rebuild, 350));

  /* ResizeObserver on track catches CSS-driven width changes
     (e.g. media-query changes padding/slide-width) that window.resize misses */
  if(typeof ResizeObserver !== 'undefined'){
    let roTimer;
    new ResizeObserver(() => {
      clearTimeout(roTimer);
      roTimer = setTimeout(rebuild, 60);
    }).observe(track);
  }

  measure();
  onScroll();
})();

/* ─── REVEAL BUTTON — soft top glow + sparks ─── */
(function(){
  const section=document.getElementById('projReveal');
  const btn=document.getElementById('revealBtn');
  const lbl=document.getElementById('revealLabel');
  const canvas=document.getElementById('revealCanvas');
  if(!section||!canvas)return;

  const ctx=canvas.getContext('2d');
  let W,H,sparks=[];
  function resize(){
    W=canvas.width=section.offsetWidth;
    H=canvas.height=section.offsetHeight;
  }
  resize();
  window.addEventListener('resize',()=>{clearTimeout(window._rvt);window._rvt=setTimeout(resize,150)});

  function spawnSparks(n){
    const cx=W/2, cy=H*.45;
    for(let i=0;i<n;i++){
      const a=(Math.random()-.5)*Math.PI*.9 - Math.PI/2; // mostly upward spread
      const spd=.6+Math.random()*2.2;
      sparks.push({
        x:cx+(Math.random()-.5)*80,
        y:cy+(Math.random()-.5)*20,
        vx:Math.cos(a)*spd,
        vy:Math.sin(a)*spd,
        r:.5+Math.random()*1.2,
        alpha:.8+Math.random()*.2,
        life:0,
        maxLife:50+Math.random()*40,
        glow:Math.random()>.5
      });
    }
  }

  let t=0, progress=0;

  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=.018;

    if(progress>0.01){
      const cx=W/2;
      // soft glow curtain falling from top onto button
      // layer 1 — wide soft ceiling glow
      const g1=ctx.createRadialGradient(cx,0,0,cx,0,H*.9);
      g1.addColorStop(0,`rgba(61,255,143,${.09*progress})`);
      g1.addColorStop(.35,`rgba(61,255,143,${.04*progress})`);
      g1.addColorStop(1,'rgba(61,255,143,0)');
      ctx.fillStyle=g1;
      ctx.fillRect(0,0,W,H);

      // layer 2 — tighter beam focused on button center
      const by=H*.45;
      const g2=ctx.createRadialGradient(cx,0,0,cx,by,H*.55);
      g2.addColorStop(0,`rgba(61,255,143,${.12*progress})`);
      g2.addColorStop(.5,`rgba(61,255,143,${.05*progress})`);
      g2.addColorStop(1,'rgba(61,255,143,0)');
      ctx.fillStyle=g2;
      ctx.fillRect(0,0,W,H);

      // layer 3 — halo right on the button, pulses gently
      const pulse=.85+Math.sin(t*1.8)*.15;
      const g3=ctx.createRadialGradient(cx,by,0,cx,by,160*progress);
      g3.addColorStop(0,`rgba(61,255,143,${.14*progress*pulse})`);
      g3.addColorStop(.5,`rgba(61,255,143,${.05*progress*pulse})`);
      g3.addColorStop(1,'rgba(61,255,143,0)');
      ctx.fillStyle=g3;
      ctx.beginPath();ctx.arc(cx,by,160*progress,0,6.283);ctx.fill();
    }

    // sparks
    sparks=sparks.filter(s=>{
      s.life++;
      s.x+=s.vx; s.y+=s.vy;
      s.vy+=.04; // gentle gravity
      const p=1-s.life/s.maxLife;
      ctx.globalAlpha=s.alpha*p;
      if(s.glow){ctx.shadowColor='#3DFF8F';ctx.shadowBlur=6;}
      ctx.fillStyle='#3DFF8F';
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.283);ctx.fill();
      if(s.glow){ctx.shadowBlur=0;}
      ctx.globalAlpha=1;
      return s.life<s.maxLife;
    });

    requestAnimationFrame(draw);
  }
  draw();

  // scrub progress with scroll
  ScrollTrigger.create({
    trigger:section,
    start:'top 90%',
    end:'top 35%',
    scrub:1.8,
    onUpdate(self){
      const prev=progress;
      progress=self.progress;
      if(prev<.2&&progress>=.2) spawnSparks(22);
      if(prev<.55&&progress>=.55) spawnSparks(14);
      if(prev<.85&&progress>=.85) spawnSparks(10);
    }
  });

  gsap.fromTo(lbl,{opacity:0,y:14},{opacity:1,y:0,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 82%',end:'top 52%',scrub:1.2}});

  gsap.fromTo(btn,{opacity:0,y:28,scale:.88},{opacity:1,y:0,scale:1,ease:'power3.out',
    scrollTrigger:{trigger:section,start:'top 75%',end:'top 42%',scrub:1.2}});
})();

/* ─── FOOTER CANVAS PARTICLES ─── */
(function(){
  const footer=document.getElementById('footer');
  const fc=document.getElementById('footCanvas');
  if(!footer||!fc)return;
  const fctx=fc.getContext('2d');
  let fW,fH,fp=[];
  function fResize(){fW=fc.width=footer.offsetWidth;fH=fc.height=footer.offsetHeight;}
  fResize();window.addEventListener('resize',()=>{clearTimeout(window._frt);window._frt=setTimeout(fResize,150)});

  class FP{
    constructor(){this.reset(true)}
    reset(init){
      this.x=Math.random()*fW;
      this.y=init?Math.random()*fH:fH+10;
      this.vx=(Math.random()-.5)*.15;
      this.vy=-(Math.random()*.2+.06);
      this.r=Math.random()*1.2+.2;
      this.alpha=Math.random()*.28+.05;
      this.life=0;this.maxLife=220+Math.random()*260;
      this.glow=Math.random()>.78;
    }
    update(){this.x+=this.vx;this.y+=this.vy;this.life++;if(this.life>this.maxLife||this.y<-5)this.reset();}
    draw(){
      const p=this.life/this.maxLife;
      const fade=p<.12?p/.12:p>.8?(1-p)/.2:1;
      fctx.globalAlpha=this.alpha*fade;
      if(this.glow){fctx.shadowColor='#3DFF8F';fctx.shadowBlur=8;}
      fctx.fillStyle='#3DFF8F';
      fctx.beginPath();fctx.arc(this.x,this.y,this.r,0,6.283);fctx.fill();
      if(this.glow)fctx.shadowBlur=0;
    }
  }
  for(let i=0;i<40;i++)fp.push(new FP());

  let footerVisible=false;
  new IntersectionObserver(e=>{footerVisible=e[0].isIntersecting},{threshold:0}).observe(footer);
  function fLoop(){fctx.clearRect(0,0,fW,fH);fctx.globalAlpha=1;if(footerVisible)fp.forEach(p=>{p.update();p.draw();});requestAnimationFrame(fLoop);}
  fLoop();

  /* staggered GSAP reveals */
  gsap.utils.toArray('.foot-brand-col,.foot-col-title,.foot-links,.foot-contact-item,.foot-soc-row').forEach((el,i)=>{
    gsap.fromTo(el,{opacity:0,y:22},{opacity:1,y:0,ease:'power2.out',
      scrollTrigger:{trigger:footer,start:`top ${92-i*1.5}%`,end:`top ${60-i*1.5}%`,scrub:1}});
  });
})();


/* ─── GRID HOVER LIGHTING ─── */
(function(){
  const hero=document.getElementById('hero');
  const lit=document.getElementById('heroGridLit');
  if(!hero||!lit)return;

  let active=false;
  const R=220; // spotlight radius px

  hero.addEventListener('mouseenter',()=>{
    active=true;
    lit.style.opacity='1';
  });
  hero.addEventListener('mouseleave',()=>{
    active=false;
    lit.style.opacity='0';
  });

  hero.addEventListener('mousemove',e=>{
    if(!active)return;
    const rect=hero.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const xPct=(x/rect.width*100).toFixed(2);
    const yPct=(y/rect.height*100).toFixed(2);
    const mask=`radial-gradient(circle ${R}px at ${xPct}% ${yPct}%, black 0%, black 55%, transparent 100%)`;
    lit.style.maskImage=mask;
    lit.style.webkitMaskImage=mask;
  });
})();

/* ─── REVIEWS INFINITE SCROLL COLUMNS ─── */
(function(){
  const grid=document.getElementById('reviewsGrid');
  if(!grid)return;

  // collect cards per column
  const cols=[[], [], []];
  grid.querySelectorAll('.review-card').forEach(card=>{
    const c=parseInt(card.dataset.col)||0;
    cols[c].push(card);
  });

  // clear grid, build column wrappers
  grid.innerHTML='';

  cols.forEach((cards,ci)=>{
    if(!cards.length)return;
    const col=document.createElement('div');
    col.className=`reviews-col col-${ci}`;

    // original set
    cards.forEach(c=>col.appendChild(c));
    // duplicate for seamless loop
    cards.forEach(c=>col.appendChild(c.cloneNode(true)));

    grid.appendChild(col);
  });
})();

(function(){
  const wrap = document.getElementById('aboutPhotoWrap');
  const photo = document.getElementById('aboutPhoto');
  if(!wrap || !photo) return;

  // photo reveal — scrub in
  gsap.fromTo(photo,
    { opacity: 0, y: 40, scale: 0.96 },
    { opacity: 1, y: 0,  scale: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        end:   'top 25%',
        scrub: 1.8
      }
    }
  );

  // glow ring — just fade in once, then let CSS spin animation take over freely
  const bg = wrap.querySelector('.about-photo-bg');
  if(bg){
    bg.style.opacity = '0';
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 65%',
      once: true,
      onEnter(){
        gsap.to(bg, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', clearProps: 'scale' });
      }
    });
  }

  // badges slide in once
  wrap.querySelectorAll('.about-badge').forEach((badge, i) => {
    const isLeft = badge.classList.contains('b1');
    gsap.fromTo(badge,
      { opacity: 0, x: isLeft ? -20 : 20 },
      { opacity: 1, x: 0,
        duration: 0.8, ease: 'power3.out', delay: i * 0.15,
        scrollTrigger: {
          trigger: '#about',
          start: 'top 60%',
          once: true
        }
      }
    );
  });
})();

/* ─── FLOATING ICONS ─── */
(function(){
  const wrap=document.getElementById('fiWrap');
  if(!wrap)return;

  const ICONS=[
    {label:'HTML5',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
    {label:'CSS3',     img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
    {label:'JavaScript',img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
    {label:'PHP',      img:'https://cdn.simpleicons.org/php/8892BF'},
    {label:'Python',   img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
    {label:'Figma',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
    {label:'GitHub',   img:'https://cdn.simpleicons.org/github/ffffff'},
    {label:'MySQL',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'},
    {label:'Git',      img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'},
    {label:'GSAP',     img:'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg'},
    {label:'VS Code',  img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'},
    {label:'Tailwind', img:'https://cdn.simpleicons.org/tailwindcss/06B6D4'},
  ];

  const POSITIONS=[
    {x:7,  y:14},{x:88, y:10},{x:15, y:80},{x:82, y:78},
    {x:48, y:6}, {x:4,  y:46},{x:93, y:44},{x:46, y:91},
    {x:24, y:28},{x:74, y:24},{x:26, y:65},{x:72, y:68},
    {x:58, y:88},{x:36, y:90},{x:88, y:58},{x:10, y:58},
  ];

  const mouse={x:-9999,y:-9999};
  if(window.matchMedia('(pointer:fine)').matches){
    document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
  }

  const nodes=[];

  ICONS.forEach((ic,i)=>{
    const pos=POSITIONS[i%POSITIONS.length];
    const el=document.createElement('div');
    el.className='fi';
    el.style.cssText=`left:${pos.x}%;top:${pos.y}%;opacity:0;transform:translate(-50%,-50%) scale(0)`;
    el.innerHTML=`<div class="fi-inner"><img src="${ic.img}" alt="${ic.label}" width="26" height="26" style="display:block;width:26px;height:26px;object-fit:contain"/></div><div class="fi-tooltip">${ic.label}</div>`;
    wrap.appendChild(el);

    const fAx=5+Math.random()*8, fAy=7+Math.random()*10;
    const fSpd=4500+Math.random()*4000;
    const fPh=Math.random()*Math.PI*2;
    const rA=3+Math.random()*5;
    let rx=0,ry=0,cx=0,cy=0,appeared=false;

    nodes.push({el,fAx,fAy,fSpd,fPh,rA,
      get rx(){return rx},set rx(v){rx=v},
      get ry(){return ry},set ry(v){ry=v},
      get cx(){return cx},set cx(v){cx=v},
      get cy(){return cy},set cy(v){cy=v},
      get appeared(){return appeared},set appeared(v){appeared=v},
    });

    // staggered spread-in from center
    setTimeout(()=>{
      appeared=true;
      el.style.transition='opacity .8s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity='1';
      el.style.transform='translate(-50%,-50%) scale(1)';
    },1300+i*85);
  });

  let lastT=0;
  (function loop(t){
    requestAnimationFrame(loop);
    lastT=t;
    nodes.forEach(n=>{
      if(!n.appeared)return;
      const fx=Math.sin(t/n.fSpd*Math.PI*2+n.fPh)*n.fAx;
      const fy=Math.sin(t/n.fSpd*Math.PI*2+n.fPh+1.2)*n.fAy;
      const fr=Math.sin(t/n.fSpd*Math.PI*2+n.fPh+2.4)*n.rA;

      // repel
      const rect=n.el.getBoundingClientRect();
      const ix=rect.left+rect.width/2, iy=rect.top+rect.height/2;
      const dist=Math.sqrt((mouse.x-ix)**2+(mouse.y-iy)**2);
      const R=165;
      let tx=fx,ty=fy;
      if(dist<R&&dist>0){
        const ang=Math.atan2(iy-mouse.y,ix-mouse.x);
        const force=(1-dist/R)*60;
        n.rx+=(Math.cos(ang)*force-n.rx)*.16;
        n.ry+=(Math.sin(ang)*force-n.ry)*.16;
      } else {
        n.rx+=(0-n.rx)*.09;
        n.ry+=(0-n.ry)*.09;
      }
      tx+=n.rx; ty+=n.ry;
      n.cx+=(tx-n.cx)*.07;
      n.cy+=(ty-n.cy)*.07;
      n.el.style.transform=`translate(-50%,-50%) translate(${n.cx}px,${n.cy}px) rotate(${fr}deg)`;
    });
  })(0);
})();

ScrollTrigger.refresh();
