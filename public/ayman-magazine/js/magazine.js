/* AYMAN AL HUSSAM — interactive magazine engine (RTL page flip, phone reel, zoom viewer). No dependencies. */
(() => {
  const AR = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const $ = s => document.querySelector(s);
  const stage = $('#stage');
  const src = [...document.querySelectorAll('#pages > .pg')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = reduce ? 10 : 900;

  // ---- numbering: desktop index is the canonical page number ----
  let n = 0;
  src.forEach(p => {
    if (p.dataset.only === 'mobile') { p.dataset.dn = n; p.dataset.folio = AR(n) + '–' + AR(n + 1); return; }
    p.dataset.dn = n; p.dataset.folio = AR(n); n++;
  });
  const N = n;                       // desktop pages (even)
  const L = N / 2;                   // leaves
  const sections = src.filter(p => p.dataset.sec).map(p => ({ id: p.dataset.sec, title: p.dataset.title, desc: p.dataset.desc, page: +p.dataset.dn }));

  // folios
  src.forEach(p => {
    if (p.hasAttribute('data-nofolio')) return;
    const cap = p.querySelector('.cap');
    const f = document.createElement('span'); f.textContent = p.dataset.folio;
    if (cap) { f.className = 'fol'; cap.appendChild(f); } else { f.className = 'folio'; p.appendChild(f); }
  });

  // contents page + popover
  const tocList = $('#tocList'), tocPop = $('#tocPop');
  sections.forEach((s, i) => {
    const row = document.createElement('button');
    row.className = 'toc-row'; row.dataset.go = s.page;
    row.innerHTML = `<span class="n">${AR(String(i + 1).padStart(2, '0'))}</span><span><span class="tt">${s.title}</span><span class="dd">${s.desc}</span></span><span class="pp">${AR(s.page)}</span>`;
    tocList.appendChild(row);
    const b = document.createElement('button');
    b.dataset.go = s.page; b.innerHTML = `<span>${s.title}</span><i>${AR(s.page)}</i>`;
    tocPop.appendChild(b);
  });
  const coverBtn = document.createElement('button'); coverBtn.dataset.go = 0; coverBtn.innerHTML = '<span>الغلاف</span><i></i>'; tocPop.prepend(coverBtn);

  // ---- zoomable list for lightbox (unique by src, source order) ----
  const zoomList = []; const seen = new Set();
  src.forEach(p => p.querySelectorAll('img[data-zoom]').forEach(img => {
    const k = img.getAttribute('src'); if (seen.has(k)) return; seen.add(k);
    zoomList.push({ src: k, cap: img.dataset.cap, sec: img.dataset.secName, dark: img.hasAttribute('data-dark') });
  }));

  // ---- state ----
  let mode = null, page = 0, cur = 0; // page = desktop index of focus; cur = flipped leaves
  let leaves = [], slides = [], busy = 0;

  function sizeFor(m) {
    const W = stage.clientWidth, H = stage.clientHeight, r = 0.74;
    if (m === 'desktop') { let ph = Math.min(H - 20, (W - 40) / (2 * r)); return { pw: ph * r, ph }; }
    let pw = Math.min(W - 8, (H - 12) * r); return { pw, ph: pw / r };
  }
  function pickMode() {
    const d = sizeFor('desktop');
    return (stage.clientWidth >= 760 && d.pw >= 270) ? 'desktop' : 'mobile';
  }
  function applySize() {
    const s = sizeFor(mode);
    document.documentElement.style.setProperty('--pw', s.pw.toFixed(1) + 'px');
    document.documentElement.style.setProperty('--ph', s.ph.toFixed(1) + 'px');
  }

  // ---------- DESKTOP ----------
  let book, bookIn;
  function buildDesktop() {
    stage.innerHTML = '';
    book = document.createElement('div'); book.className = 'book';
    bookIn = document.createElement('div'); bookIn.className = 'book-in';
    book.appendChild(bookIn); stage.appendChild(book);
    const dp = src.filter(p => p.dataset.only !== 'mobile');
    leaves = [];
    for (let i = 0; i < L; i++) {
      const leaf = document.createElement('div'); leaf.className = 'leaf'; leaf.dataset.i = i;
      [['front', dp[2 * i]], ['back', dp[2 * i + 1]]].forEach(([side, p]) => {
        const f = document.createElement('div'); f.className = 'face ' + side;
        if (p.dataset.kind) f.classList.add(p.dataset.kind);
        f.appendChild(p.cloneNode(true));
        const sh = document.createElement('div'); sh.className = 'shade'; f.appendChild(sh);
        const c = document.createElement('div'); c.className = 'curl'; f.appendChild(c);
        leaf.appendChild(f);
      });
      bookIn.appendChild(leaf); leaves.push(leaf);
    }
    cur = page === 0 ? 0 : Math.ceil(page / 2);
    if (page >= N - 1) cur = L;
    leaves.forEach((lf, i) => { lf.style.transition = 'none'; setLeaf(lf, i < cur ? 180 : 0); lf.style.zIndex = restZ(i, i < cur); });
    book.offsetWidth; leaves.forEach(lf => lf.style.transition = '');
    shiftBook(true);
    book.addEventListener('pointerdown', onDown);
  }
  const restZ = (i, flipped) => flipped ? 1 + i : 100 - i;
  function setLeaf(lf, deg) { lf.style.transform = `rotateY(${deg}deg)`; lf._deg = deg; }
  function shiftBook(instant) {
    const pw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pw'));
    const x = cur === 0 ? pw / 2 : cur === L ? -pw / 2 : 0;
    if (instant) { bookIn.style.transition = 'none'; bookIn.style.transform = `translateX(${x}px)`; bookIn.offsetWidth; bookIn.style.transition = ''; }
    else bookIn.style.transform = `translateX(${x}px)`;
    book.classList.toggle('at-start', cur === 0); book.classList.toggle('at-end', cur === L);
  }
  function turn(i, forward, delay, dur) {
    const lf = leaves[i];
    setTimeout(() => {
      busy++;
      lf.style.transitionDuration = dur + 'ms';
      lf.style.zIndex = forward ? 300 - i : 300 + i;
      lf.classList.add('anim');
      lf.querySelectorAll('.shade').forEach(s => s.style.animationDuration = dur + 'ms');
      setLeaf(lf, forward ? 180 : 0);
      setTimeout(() => { lf.style.zIndex = restZ(i, forward); }, dur / 2);
      setTimeout(() => { lf.classList.remove('anim'); lf.style.transitionDuration = ''; busy--; }, dur + 20);
    }, delay);
  }
  function flipTo(target) {
    target = Math.max(0, Math.min(L, target));
    if (target === cur) return;
    const steps = Math.abs(target - cur), stagger = steps > 1 ? Math.min(120, 700 / steps) : 0;
    const dur = steps > 1 ? Math.max(500, DUR - 200) : DUR;
    if (target > cur) for (let k = cur, j = 0; k < target; k++, j++) turn(k, true, j * stagger, dur);
    else for (let k = cur - 1, j = 0; k >= target; k--, j++) turn(k, false, j * stagger, dur);
    cur = target;
    page = cur === 0 ? 0 : 2 * cur - 1;
    shiftBook(false); updateUI();
  }

  // drag / click on pages
  let drag = null;
  function onDown(e) {
    if (e.button > 0) return;
    const face = e.target.closest('.face'); if (!face) return;
    const lf = face.parentElement, i = +lf.dataset.i;
    const forward = face.classList.contains('front');
    if ((forward && i !== cur) || (!forward && i !== cur - 1)) return;
    if (e.target.closest('a')) return;
    const r = lf.getBoundingClientRect();
    drag = { lf, i, forward, x0: e.clientX, y0: e.clientY, pw: r.width, moved: false, target: e.target, id: e.pointerId };
    lf.setPointerCapture(e.pointerId);
    lf.addEventListener('pointermove', onMove); lf.addEventListener('pointerup', onUp); lf.addEventListener('pointercancel', onUp);
  }
  function onMove(e) {
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    if (!drag.moved && Math.abs(dx) < 7) return;
    if (!drag.moved) { drag.moved = true; drag.lf.classList.add('drag'); drag.lf.style.transition = 'none'; drag.lf.style.zIndex = 400; }
    let deg = drag.forward ? (dx / (drag.pw * 1.15)) * 180 : 180 + (dx / (drag.pw * 1.15)) * 180;
    deg = Math.max(0, Math.min(180, deg));
    setLeaf(drag.lf, deg);
    const sh = (Math.sin(deg * Math.PI / 180) * 0.45).toFixed(3);
    drag.lf.querySelectorAll('.shade').forEach(s => s.style.setProperty('--sh', sh));
  }
  function onUp(e) {
    if (!drag) return;
    const d = drag; drag = null;
    d.lf.removeEventListener('pointermove', onMove); d.lf.removeEventListener('pointerup', onUp); d.lf.removeEventListener('pointercancel', onUp);
    if (!d.moved) {
      if (e.type === 'pointercancel') return;
      const z = d.target.closest('[data-zoom], .zbtn');
      if (z) { openZoomFrom(d.target); return; }
      const tr = d.target.closest('[data-go]');
      if (tr) { goTo(+tr.dataset.go); return; }
      flipTo(d.forward ? cur + 1 : cur - 1); return;
    }
    d.lf.classList.remove('drag'); d.lf.style.transition = '';
    d.lf.querySelectorAll('.shade').forEach(s => s.style.setProperty('--sh', 0));
    const done = d.forward ? d.lf._deg > 55 : d.lf._deg < 125;
    const remaining = d.forward ? (done ? 180 - d.lf._deg : d.lf._deg) : (done ? d.lf._deg : 180 - d.lf._deg);
    const dur = Math.max(220, DUR * remaining / 180);
    d.lf.style.transitionDuration = dur + 'ms';
    const flipped = d.forward ? done : !done;
    setLeaf(d.lf, flipped ? 180 : 0);
    setTimeout(() => { d.lf.style.zIndex = restZ(d.i, flipped); d.lf.style.transitionDuration = ''; }, dur + 20);
    if (done) { cur += d.forward ? 1 : -1; page = cur === 0 ? 0 : 2 * cur - 1; shiftBook(false); updateUI(); }
  }

  // ---------- MOBILE ----------
  let reel, io;
  function buildMobile() {
    stage.innerHTML = '';
    reel = document.createElement('div'); reel.className = 'reel'; reel.dir = 'rtl'; reel.tabIndex = 0;
    reel.setAttribute('aria-label', 'صفحات المجلة');
    slides = src.filter(p => p.dataset.only !== 'desktop').map(p => {
      const s = document.createElement('div'); s.className = 'slide'; s.dataset.dn = p.dataset.dn;
      if (p.dataset.only === 'mobile') s.dataset.span = 2;
      s.appendChild(p.cloneNode(true)); reel.appendChild(s); return s;
    });
    stage.appendChild(reel);
    io = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting && en.intersectionRatio > 0.55) { page = +en.target.dataset.dn; updateUI(); } });
    }, { root: reel, threshold: [0.55, 0.8] });
    slides.forEach(s => io.observe(s));
    reel.addEventListener('click', e => {
      const tr = e.target.closest('[data-go]'); if (tr) { goTo(+tr.dataset.go); return; }
      if (e.target.closest('[data-zoom], .zbtn')) openZoomFrom(e.target);
    });
    requestAnimationFrame(() => scrollToSlide(page, true));
  }
  function slideIndexFor(p) {
    let best = 0; slides.forEach((s, i) => { if (+s.dataset.dn <= p) best = i; }); return best;
  }
  function scrollToSlide(p, instant) {
    const s = slides[slideIndexFor(p)]; if (!s) return;
    const left = s.offsetLeft - (reel.clientWidth - s.offsetWidth) / 2;
    reel.scrollTo({ left, behavior: instant || reduce ? 'auto' : 'smooth' });
  }
  function mobileStep(dir) {
    const i = slideIndexFor(page) + dir;
    if (i < 0 || i >= slides.length) return;
    page = +slides[i].dataset.dn; scrollToSlide(page); updateUI();
  }

  // ---------- shared nav ----------
  function goTo(p) {
    tocPop.hidden = true; $('#tocBtn').setAttribute('aria-expanded', 'false');
    p = Math.max(0, Math.min(N - 1, p));
    if (mode === 'desktop') { flipTo(p === 0 ? 0 : (p % 2 ? (p + 1) / 2 : p / 2)); }
    else { page = p; scrollToSlide(p); updateUI(); }
  }
  function next() { mode === 'desktop' ? flipTo(cur + 1) : mobileStep(1); }
  function prev() { mode === 'desktop' ? flipTo(cur - 1) : mobileStep(-1); }

  function labelFor(p) { const el = src.find(x => +x.dataset.dn === p && x.dataset.only !== 'mobile'); return el ? el.dataset.label || '' : ''; }
  function updateUI() {
    let txt, frac, lbl;
    if (mode === 'desktop') {
      if (cur === 0) { txt = 'الغلاف'; lbl = 'معرض الأعمال الإبداعي'; }
      else if (cur === L) { txt = 'الغلاف الخلفي'; lbl = 'أيمن الحسّام'; }
      else { const r = 2 * cur - 1, l = 2 * cur; txt = `الصفحتان <em>${AR(r)}–${AR(l)}</em> من ${AR(N - 1)}`; lbl = labelFor(l) || labelFor(r); }
      frac = cur / L;
      $('#prevBtn').disabled = cur === 0; $('#nextBtn').disabled = cur === L;
    } else {
      const i = slideIndexFor(page), s = slides[i];
      if (page === 0) txt = 'الغلاف'; else if (page === N - 1) txt = 'الغلاف الخلفي';
      else txt = s && s.dataset.span ? `الصفحتان <em>${AR(page)}–${AR(page + 1)}</em> من ${AR(N - 1)}` : `الصفحة <em>${AR(page)}</em> من ${AR(N - 1)}`;
      lbl = page === 0 ? 'معرض الأعمال الإبداعي' : labelFor(page) || labelFor(page + 1);
      frac = i / (slides.length - 1);
      $('#prevBtn').disabled = i === 0; $('#nextBtn').disabled = i === slides.length - 1;
    }
    $('#pageOut').innerHTML = txt; $('#secLabel').textContent = lbl; $('#trackBar').style.width = (frac * 100).toFixed(1) + '%';
  }

  function setup() {
    const m = pickMode();
    if (m !== mode) { mode = m; applySize(); m === 'desktop' ? buildDesktop() : buildMobile(); }
    else { applySize(); if (mode === 'desktop') shiftBook(true); else scrollToSlide(page, true); }
    updateUI();
  }

  // ---------- lightbox ----------
  const lb = $('#lb'), view = $('#lbView'), img = $('#lbImg');
  let zi = 0, s = 1, tx = 0, ty = 0, base = 1, lastFocus = null;
  const ptrs = new Map(); let pinch = null, pan = null;
  function openZoomFrom(t) {
    const holder = t.closest('[data-zoom]') ? t.closest('[data-zoom]') : t.closest('.pg').querySelector('[data-zoom]');
    const k = holder.getAttribute('src'); openZoom(Math.max(0, zoomList.findIndex(z => z.src === k)));
  }
  function openZoom(i) {
    lastFocus = document.activeElement; zi = (i + zoomList.length) % zoomList.length;
    const z = zoomList[zi];
    $('#lbTitle').textContent = z.cap; $('#lbSec').textContent = z.sec; $('#lbCnt').textContent = `${AR(zi + 1)} / ${AR(zoomList.length)}`;
    view.classList.toggle('checker', z.dark);
    lb.hidden = false;
    img.onload = fit; img.src = z.src; if (img.complete && img.naturalWidth) fit();
    $('#lbClose').focus();
  }
  function closeZoom() { lb.hidden = true; img.removeAttribute('src'); lastFocus && lastFocus.focus && lastFocus.focus(); }
  function fit() {
    const W = view.clientWidth, H = view.clientHeight;
    base = Math.min((W - 24) / img.naturalWidth, (H - 24) / img.naturalHeight);
    img.style.width = img.naturalWidth * base + 'px'; img.style.height = img.naturalHeight * base + 'px';
    s = 1; tx = -img.naturalWidth * base / 2; ty = -img.naturalHeight * base / 2; apply();
  }
  function apply() {
    const w = img.naturalWidth * base, h = img.naturalHeight * base, W = view.clientWidth, H = view.clientHeight;
    const sw = w * s, sh = h * s;
    // keep image reachable: center when smaller than view, clamp edges when larger
    if (sw <= W) tx = -sw / 2; else tx = Math.min(-W / 2, Math.max(W / 2 - sw, tx));
    if (sh <= H) ty = -sh / 2; else ty = Math.min(-H / 2, Math.max(H / 2 - sh, ty));
    img.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
  }
  function zoomAt(ns, cx, cy) {
    ns = Math.max(1, Math.min(8, ns));
    const r = view.getBoundingClientRect();
    const px = cx - r.left - r.width / 2, py = cy - r.top - r.height / 2;
    tx = px - (px - tx) * (ns / s); ty = py - (py - ty) * (ns / s); s = ns; apply();
  }
  const center = () => { const r = view.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  view.addEventListener('wheel', e => { e.preventDefault(); view.classList.add('live'); zoomAt(s * Math.exp(-e.deltaY * 0.0022), e.clientX, e.clientY); clearTimeout(view._t); view._t = setTimeout(() => view.classList.remove('live'), 120); }, { passive: false });
  view.addEventListener('dblclick', e => zoomAt(s > 1.05 ? 1 : 2.6, e.clientX, e.clientY));
  view.addEventListener('pointerdown', e => {
    view.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); view.classList.add('live', 'grabbing');
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s }; pan = null; }
    else pan = { x: e.clientX, y: e.clientY, tx, ty, x0: e.clientX };
  });
  view.addEventListener('pointermove', e => {
    if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch && ptrs.size === 2) { const [a, b] = [...ptrs.values()]; zoomAt(pinch.s * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); }
    else if (pan && s > 1.01) { tx = pan.tx + e.clientX - pan.x; ty = pan.ty + e.clientY - pan.y; apply(); }
  });
  const endPtr = e => {
    ptrs.delete(e.pointerId);
    if (pan && s <= 1.01 && ptrs.size === 0) { const dx = e.clientX - pan.x0; if (Math.abs(dx) > 60) openZoom(zi + (dx > 0 ? 1 : -1)); }
    if (ptrs.size < 2) pinch = null; if (ptrs.size === 0) { pan = null; view.classList.remove('live', 'grabbing'); }
  };
  view.addEventListener('pointerup', endPtr); view.addEventListener('pointercancel', endPtr);
  $('#lbIn').onclick = () => { const [x, y] = center(); zoomAt(s * 1.5, x, y); };
  $('#lbOut').onclick = () => { const [x, y] = center(); zoomAt(s / 1.5, x, y); };
  $('#lbNext').onclick = () => openZoom(zi + 1);
  $('#lbPrev').onclick = () => openZoom(zi - 1);
  $('#lbClose').onclick = closeZoom;

  // ---------- controls ----------
  $('#nextBtn').onclick = next; $('#prevBtn').onclick = prev;
  $('#tocBtn').onclick = () => { tocPop.hidden = !tocPop.hidden; $('#tocBtn').setAttribute('aria-expanded', String(!tocPop.hidden)); };
  tocPop.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) goTo(+b.dataset.go); });
  document.addEventListener('click', e => { if (!tocPop.hidden && !e.target.closest('#tocPop, #tocBtn')) { tocPop.hidden = true; $('#tocBtn').setAttribute('aria-expanded', 'false'); } });
  $('#fsBtn').onclick = () => { try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); } catch (_) {} };
  document.addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeZoom();
      else if (e.key === 'ArrowLeft') openZoom(zi + 1);
      else if (e.key === 'ArrowRight') openZoom(zi - 1);
      else if (e.key === '+' || e.key === '=') $('#lbIn').click();
      else if (e.key === '-') $('#lbOut').click();
      return;
    }
    if (e.key === 'Escape') { tocPop.hidden = true; return; }
    if (e.target.closest && e.target.closest('input,textarea')) return;
    if (e.key === 'ArrowLeft' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowRight' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') goTo(0); else if (e.key === 'End') goTo(N - 1);
  });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { setup(); if (!lb.hidden) fit(); }, 120); });

  // deep link (#cocoonz, #aywise, #logos, #infographics, #marketing, #closing, #personal)
  const h = (location.hash || '').slice(1); const hs = sections.find(x => x.id === h);
  if (hs) page = hs.page;
  setup();
})();
