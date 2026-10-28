/* Easter egg for Ex Machina #500, "The Only Test That Matters".
 *
 * The first letters of the nine paragraphs spell EX MACHINA. Type 5-0-0 on
 * the page (or triple-tap the title on a phone) and those letters slowly grow,
 * hold for a few seconds so readers can scroll and read the word, wobble as
 * if about to go, then fly to the middle of the screen to spell it out and
 * burst into colour. Afterwards the page is as it was. Esc or a click ends it
 * early. Loaded on this one page only (single.html).
 */
(function () {
  "use strict";

  const WORD = "EXMACHINA";
  const SECRET = "500";
  const COLOURS = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#00c7be",
                   "#007aff", "#5856d6", "#af52de", "#ff2d55"];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // The pacing, in milliseconds.
  const GROW = 4000, STAGGER = 400;              // each letter grows over GROW
  const GROWN = GROW + STAGGER * (WORD.length - 1);
  const HOLD = 5000;                             // big and still, to read
  const WOBBLE = 5000;                           // the sense that something is coming

  const body = document.querySelector(".post-content");
  if (!body) return;
  const rule = body.querySelector(":scope > hr");
  const paras = rule
    ? [...body.querySelectorAll(":scope > hr ~ p")]
    : [...body.querySelectorAll(":scope > p")];
  if (paras.length !== WORD.length) return;

  // Wrap each paragraph's first letter, and check they really spell the word.
  const caps = [];
  for (const [i, p] of paras.entries()) {
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode()) && !node.data.trim()) {}
    if (!node) return;
    const at = node.data.search(/\S/);
    if (node.data[at].toUpperCase() !== WORD[i]) return;
    const rest = node.splitText(at);
    rest.splitText(1);
    const span = document.createElement("span");
    span.className = "egg-cap";
    rest.replaceWith(span);
    span.appendChild(rest);
    caps.push(span);
  }

  const css = document.createElement("style");
  css.textContent = `
    .egg-cap { display: inline-block; transform-origin: 50% 85%;
      transition: transform ${GROW}ms cubic-bezier(.45,0,.55,1), margin ${GROW}ms ease,
                  font-weight ${GROW}ms ease, color ${GROW}ms ease; }
    .egg-on .egg-cap { transform: scale(2.1); font-weight: 900; margin: 0 .28em 0 .1em; color: #000; }
    .egg-on > hr ~ p, .egg-off > hr ~ p { transition: color 3s; }
    .egg-on > hr ~ p { color: #bbb; }
    @keyframes egg-wobble {
      0%, 100% { transform: scale(2.1) rotate(0deg) translateY(0); }
      25% { transform: scale(2.1) rotate(-3deg) translateY(-1px); }
      75% { transform: scale(2.1) rotate(3deg) translateY(1px); }
    }
    @keyframes egg-shake {
      0%, 100% { transform: scale(2.15) rotate(0deg) translate(0, 0); }
      20% { transform: scale(2.15) rotate(-7deg) translate(-1px, -2px); }
      40% { transform: scale(2.2) rotate(5deg) translate(1px, 1px); }
      60% { transform: scale(2.15) rotate(-5deg) translate(-1px, 1px); }
      80% { transform: scale(2.2) rotate(7deg) translate(1px, -2px); }
    }
    .egg-wobble .egg-cap { animation: egg-wobble .7s ease-in-out infinite; }
    .egg-shake .egg-cap { animation: egg-shake .32s linear infinite; }
    .egg-on > hr ~ p a { color: inherit; }
    .egg-stage { position: fixed; inset: 0; z-index: 9999; pointer-events: auto;
      background: rgba(255,255,255,0); transition: background .6s; cursor: pointer; }
    .egg-stage.dim { background: rgba(255,255,255,.88); }
    .egg-stage.dark { background: rgba(8,8,12,.94); transition: background .5s; }
    .egg-letter { position: fixed; left: 0; top: 0; margin: 0; line-height: 1;
      font-family: var(--font-stack, sans-serif); font-weight: 900; color: #000;
      will-change: transform; transition: color .4s, text-shadow .4s; }
    .egg-stage.dark .egg-letter { color: #fff; text-shadow: 0 0 24px rgba(255,255,255,.6); }
    .egg-stage canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  `;
  document.head.appendChild(css);

  let running = false;
  let stage = null;
  let timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));

  function reveal() {
    body.classList.add("egg-on");
  }

  // Back to the page as it was: letters shrink, text comes back.
  function restore() {
    body.classList.remove("egg-on", "egg-wobble", "egg-shake");
    body.classList.add("egg-off");
    setTimeout(() => body.classList.remove("egg-off"), 1600);
  }

  function end() {
    timers.forEach(clearTimeout);
    timers = [];
    restore();
    if (stage) {
      const s = stage;
      stage = null;
      s.style.transition = "opacity .6s";
      s.style.opacity = "0";
      setTimeout(() => s.remove(), 650);
    }
    caps.forEach(c => (c.style.visibility = ""));
    running = false;
  }

  function play() {
    if (running) return;
    running = true;
    caps.forEach((c, i) => (c.style.transitionDelay = i * STAGGER + "ms"));
    reveal();
    // Reduced motion: the reveal alone, held, then the page comes back.
    if (reduced) { later(GROWN + HOLD * 2, end); return; }
    later(GROWN, () => caps.forEach(c => (c.style.transitionDelay = "")));
    // Out of sync, so they wobble like nine things, not one.
    caps.forEach(c => (c.style.animationDelay = -Math.random() + "s"));
    later(GROWN + HOLD, () => body.classList.add("egg-wobble"));
    later(GROWN + HOLD + WOBBLE * 0.6, () => body.classList.replace("egg-wobble", "egg-shake"));
    later(GROWN + HOLD + WOBBLE, fly);
  }

  // Step two: clones of the letters leave the page and line up in the middle.
  function fly() {
    stage = document.createElement("div");
    stage.className = "egg-stage";
    stage.addEventListener("click", end);
    document.body.appendChild(stage);
    requestAnimationFrame(() => stage.classList.add("dim"));

    const W = innerWidth, H = innerHeight;
    const size = Math.min(W / 8.2, 150);
    const gap = size * 0.08, space = size * 0.45;
    const probe = document.createElement("span");
    probe.className = "egg-letter";
    probe.style.fontSize = size + "px";
    probe.style.visibility = "hidden";
    stage.appendChild(probe);
    const widths = [...WORD].map(ch => { probe.textContent = ch; return probe.getBoundingClientRect().width; });
    probe.remove();
    const total = widths.reduce((a, b) => a + b, 0) + gap * (WORD.length - 1) + space;
    let x = (W - total) / 2;
    const y = H / 2 - size * 0.55;

    const letters = caps.map((cap, i) => {
      const r = cap.getBoundingClientRect();
      const fromSize = parseFloat(getComputedStyle(cap).fontSize) * 2.1;
      const el = document.createElement("span");
      el.className = "egg-letter";
      el.textContent = WORD[i];
      el.style.fontSize = size + "px";
      stage.appendChild(el);
      const tx = x, ty = y;
      x += widths[i] + gap + (i === 1 ? space : 0);   // the space after EX
      const s0 = fromSize / size;
      el.animate([
        { transform: `translate(${r.left}px, ${r.top - fromSize * 0.2}px) scale(${s0})`, offset: 0 },
        { transform: `translate(${(r.left + tx) / 2}px, ${Math.min(r.top, ty) - H * 0.18}px) scale(${(s0 + 1) / 2}) rotate(${i % 2 ? 14 : -14}deg)`, offset: 0.55 },
        { transform: `translate(${tx}px, ${ty}px) scale(1)`, offset: 1 },
      ], { duration: 1300, delay: i * 140, easing: "cubic-bezier(.45,.05,.25,1)", fill: "both" });
      later(i * 140, () => { cap.style.visibility = "hidden"; });
      return { el, x: tx + widths[i] / 2, y: ty + size / 2, i };
    });

    const landed = 1300 + (WORD.length - 1) * 140;
    later(landed + 150, () => stage && stage.classList.add("dark"));
    later(landed + 300, () => letters.forEach(l => l.el.animate(
      [{ transform: getComputedStyle(l.el).transform }, { transform: getComputedStyle(l.el).transform + " scale(1.12)" },
       { transform: getComputedStyle(l.el).transform }],
      { duration: 420, delay: l.i * 60, easing: "ease-in-out" })));
    later(landed + 1500, () => celebrate(letters, size));
  }

  // Step three: the letters burst, then fireworks and confetti, in colour.
  function celebrate(letters, size) {
    if (!stage) return;
    const canvas = document.createElement("canvas");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    stage.insertBefore(canvas, stage.firstChild);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    // Confetti on its own layer, cleared every frame, so it stays crisp while
    // the fireworks below leave trails.
    const top = document.createElement("canvas");
    top.width = W * dpr; top.height = H * dpr;
    stage.appendChild(top);
    const ctx2 = top.getContext("2d");
    ctx2.scale(dpr, dpr);

    const sparks = [], rockets = [], confetti = [];
    const pick = () => COLOURS[(Math.random() * COLOURS.length) | 0];
    const burst = (x, y, n, colour, speed) => {
      for (let k = 0; k < n; k++) {
        const a = Math.random() * Math.PI * 2, v = speed * (0.35 + Math.random() * 0.65);
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1,
                      decay: 0.008 + Math.random() * 0.012, colour: colour || pick() });
      }
    };

    // Each letter goes off in its own colour, left to right.
    letters.forEach(l => later(l.i * 90, () => {
      if (!stage) return;
      const c = COLOURS[l.i % COLOURS.length];
      l.el.style.transition = "color .15s, opacity .5s, text-shadow .2s";
      l.el.style.color = c;
      l.el.style.textShadow = `0 0 30px ${c}`;
      burst(l.x, l.y, 70, c, size * 0.09);
      later(500, () => (l.el.style.opacity = "0.0"));
    }));

    const launch = () => rockets.push({ x: W * (0.12 + Math.random() * 0.76), y: H,
      vy: -(H * 0.012 + Math.random() * H * 0.006), top: H * (0.12 + Math.random() * 0.3), colour: pick() });
    for (let k = 0; k < 14; k++) later(700 + k * 330 + Math.random() * 200, launch);
    for (let k = 0; k < 220; k++) confetti.push({ x: Math.random() * W, y: -20 - Math.random() * H,
      vy: 1.5 + Math.random() * 2.5, vx: -1 + Math.random() * 2, rot: Math.random() * 6, vr: -0.15 + Math.random() * 0.3,
      w: 6 + Math.random() * 6, h: 3 + Math.random() * 5, colour: pick(), start: 600 + Math.random() * 1800 });


    const t0 = performance.now();
    const step = now => {
      if (!stage) return;
      const t = now - t0;
      // Fade the trails towards transparent (the stage behind is dark), which
      // leaves no grey ghosting the way painting dark over them does.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let k = rockets.length - 1; k >= 0; k--) {
        const r = rockets[k];
        r.y += r.vy;
        ctx.fillStyle = r.colour;
        ctx.fillRect(r.x - 1.5, r.y, 3, 10);
        if (r.y <= r.top) { burst(r.x, r.y, 110, r.colour, 6); burst(r.x, r.y, 30, "#fff", 3); rockets.splice(k, 1); }
      }
      for (let k = sparks.length - 1; k >= 0; k--) {
        const p = sparks[k];
        p.x += p.vx; p.y += p.vy; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.06; p.life -= p.decay;
        if (p.life <= 0) { sparks.splice(k, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.colour;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx2.clearRect(0, 0, W, H);
      for (const c of confetti) {
        if (t < c.start) continue;
        c.y += c.vy; c.x += c.vx + Math.sin((t + c.start) / 400); c.rot += c.vr;
        ctx2.save(); ctx2.translate(c.x, c.y); ctx2.rotate(c.rot);
        ctx2.fillStyle = c.colour; ctx2.fillRect(-c.w / 2, -c.h / 2, c.w, Math.abs(Math.cos(c.rot * 2)) * c.h + 1);
        ctx2.restore();
      }
      if (t < 9000) requestAnimationFrame(step); else end();
    };
    requestAnimationFrame(step);
  }

  // The trigger: type 5-0-0 anywhere on the page, outside a text field.
  let typed = "";
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { if (running) end(); body.classList.remove("egg-on"); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    typed = (typed + e.key).slice(-SECRET.length);
    if (typed === SECRET) { typed = ""; play(); }
  });

  // On a phone: tap the title three times quickly.
  const title = document.querySelector("article h1");
  if (title) {
    let taps = [];
    title.addEventListener("click", () => {
      const now = Date.now();
      taps = taps.filter(t => now - t < 700).concat(now);
      if (taps.length >= 3) { taps = []; play(); }
    });
  }
})();
