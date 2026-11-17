(function () {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const chars = (t) => t.split(" ").map((w) => `<span class="word">${[...w].map((c) => `<span class="char">${esc(c)}</span>`).join("")}</span>`).join(" ");
  const gradient = (c) => `linear-gradient(135deg, ${c[0]}, ${c[1]})`;

  gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  ScrollTrigger.clearScrollMemory("manual");
  scrollTo(0, 0);

  /* =====================================================
     1. 渲染内容
     ===================================================== */
  $("#heroTitle").innerHTML = S.nameEn.map((w) => `<span class="line">${chars(w)}</span>`).join("");
  $("#heroCn").textContent = S.name;
  $("#heroLead").innerHTML = S.heroLead;
  $("#heroRoles").innerHTML = S.roles.map((r) => `<span>${esc(r)}</span>`).join("");

  // 宣言：*词* 高亮为衬线斜体
  $("#manifestoEn").innerHTML = S.manifesto.en
    .map((row) => `<span class="row"><span>${esc(row).replace(/\*(.+?)\*/g, '<em class="hl">$1</em>')}</span></span>`)
    .join("");
  $("#manifestoCn").innerHTML = [...S.manifesto.cn].map((c) => `<span class="w">${esc(c)}</span>`).join("");
  $("#edu").innerHTML = S.education
    .map((e, i) => `
    <article class="edu-card edu-card--${i}">
      <div class="edu-card__glow"></div>
      <div class="edu-card__inner">
        <div class="edu-card__top mono"><span>${esc(e.level)}</span><span>${esc(e.period)}</span></div>
        <div class="edu-card__short">${chars(e.short)}</div>
        <div class="edu-card__names">
          <div class="edu-card__cn">${esc(e.cn)}</div>
          <div class="edu-card__en serif">${esc(e.en)}</div>
        </div>
        <div class="edu-card__deg">${esc(e.degreeCn)}<small>${esc(e.degreeEn)}</small></div>
        <div class="edu-card__badges">
          ${e.badges.map(([pre, n, suf, label, from]) => `
            <div class="badge"><div class="badge__num">${pre ? `<i>${esc(pre)}</i>` : ""}<span data-from="${from}" data-to="${n}">${n}</span>${suf ? `<i class="suf">${esc(suf)}</i>` : ""}</div><div class="badge__label">${esc(label)}</div></div>`).join("")}
        </div>
      </div>
      ${e.seal ? `<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sealPath${i}" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#sealPath${i}">${esc(e.seal.repeat(2))}</textPath></text><text x="100" y="114" text-anchor="middle" class="seal__star">✺</text></svg>` : ""}
    </article>`)
    .join("");
  $("#extras").innerHTML = S.extras.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  // 章节转场面板
  $$(".chapter").forEach((ch) => {
    const d = ch.dataset;
    ch.innerHTML = `
      <div class="chapter__base"></div>
      <div class="chapter__panel">
        <div class="chapter__pattern"></div>
        <div class="chapter__content">
          <div class="chapter__n mono">Chapter — ${esc(d.n)}</div>
          <div class="chapter__title">${chars(d.title)}</div>
          <div class="chapter__cn">${esc(d.cn)}</div>
        </div>
      </div>`;
  });

  // 四个能力
  $("#strengths").innerHTML = S.pillars
    .map((p, i) => {
      const [first, ...rest] = p.en.split(" ");
      return `
      <div class="pillar pillar--${i}">
        <div class="pillar__card">
          <div class="pillar__left">
            <div class="pillar__idx"><span>(${pad(i + 1)}/${pad(S.pillars.length)})</span><span>I'm a —</span></div>
            <h3 class="pillar__en"><span class="row"><span>${esc(first)}</span></span><span class="row"><span class="serif">${esc(rest.join(" "))}</span></span></h3>
            <div class="pillar__cn">${esc(p.cn)}</div>
            <p class="pillar__claim">${esc(p.claim)}</p>
            <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          </div>
          <div class="pillar__right">
            ${p.proofs.map(([n, u, l]) => `<div class="proof"><div class="proof__num"><span ${/^[\d,.]+$/.test(n) ? `data-count="${n}"` : ""}>${esc(n)}</span><small>${esc(u)}</small></div><div class="proof__label">${esc(l)}</div></div>`).join("")}
          </div>
          <div class="pillar__shade"></div>
        </div>
      </div>`;
    })
    .join("");

  // 经历
  $("#journeyTrack").insertAdjacentHTML(
    "beforeend",
    S.journey
      .map((j) => `
      <div class="stop">
        <span class="stop__dot"></span>
        <div class="stop__body">
          <div class="stop__year">${esc(j.year)}</div>
          <div class="stop__role">${esc(j.role)}</div>
          <div class="stop__org">${esc(j.org)}</div>
          <p class="stop__line">${esc(j.line)}</p>
        </div>
      </div>`)
      .join("")
  );

  // 案例
  $("#cases").innerHTML = S.cases
    .map((c, i) => `
    <article class="case" data-i="${i}">
      <div class="case__text">
        <div class="case__no mono">Case ${pad(i + 1)} — ${esc(c.period)}</div>
        <div class="case__metric"><span data-scrub="${c.metric.value}" data-dec="${c.metric.decimals || 0}">0</span><small>${esc(c.metric.suffix)}</small></div>
        <div class="case__metric-label">${esc(c.metric.label)}</div>
        <h3 class="case__title">${esc(c.title)}</h3>
        <div class="case__en">${esc(c.en)}</div>
        <p class="case__tag">${esc(c.tagline)}</p>
        <button class="btn case__btn magnetic" data-open="${i}"><span>Read the case</span><i>→</i></button>
      </div>
      <div class="case__visual" data-cursor="Open" data-open="${i}">
        <span class="case__visual-label mono">${esc(c.role)}</span>
        <div class="case__img" style="background:${c.cover ? `url('${c.cover}') center/cover` : gradient(c.color)}"><span>${c.cover ? "" : esc(c.en)}</span></div>
      </div>
    </article>`)
    .join("");

  // 作品
  $("#worksGrid").innerHTML = S.works
    .map((w, i) => {
      let media;
      if (w.media && /\.(mp4|webm)$/i.test(w.media)) media = `<video src="${w.media}" muted loop playsinline autoplay></video>`;
      else if (w.media) media = `<img src="${w.media}" alt="${esc(w.title)}" loading="lazy" />`;
      else media = `<canvas data-seed="${i}"></canvas><span class="work__soon">Coming soon</span>`;
      return `<div class="work"><div class="work__card" data-cursor="${w.media ? "Open" : "Soon"}">${media}
        <div class="work__info"><div class="work__title">${esc(w.title)}</div><div class="work__type">${esc(w.type)} · ${esc(w.year)}</div></div></div></div>`;
    })
    .join("");

  const kit = S.toolkit.map((t) => `<span class="kit__item">${esc(t)}</span>`).join("");
  $("#kitRow").innerHTML = kit + kit;
  $("#honorList").innerHTML = S.honors.map((h) => `<li>${esc(h)}</li>`).join("");
  $("#eduList").innerHTML = S.education.map((e) => `<li>${esc(e.cn)} · ${esc(e.degreeCn)}<span>${esc(e.level)}</span></li>`).join("");

  const mail = $("#mail");
  mail.textContent = S.contact.email;
  mail.href = "mailto:" + S.contact.email;
  $("#wechatQr").src = S.contact.wechatQr;

  /* =====================================================
     2. 平滑滚动
     ===================================================== */
  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1.1, touchMultiplier: 1.4 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    window.__lenis = lenis;
  }
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = id === "#top" ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(target, { duration: 2 }) : scrollTo({ top: target ? target.offsetTop : 0, behavior: "smooth" });
    })
  );

  /* =====================================================
     3. 文字乱码解码
     ===================================================== */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
  function scramble(el, duration = 700) {
    const final = el.dataset.text || (el.dataset.text = el.textContent);
    const start = performance.now();
    cancelAnimationFrame(el._raf);
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * final.length);
      el.textContent = [...final].map((c, i) => (i < reveal || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
      if (p < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }
  $$(".scramble-hover").forEach((el) => el.addEventListener("pointerenter", () => scramble(el, 500)));

  /* =====================================================
     4. 光标 + 磁吸
     ===================================================== */
  const cursor = $("#cursor"), cursorLabel = $("#cursorLabel");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  if (!isTouch) {
    const cx = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });
    addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; cx(e.clientX); cy(e.clientY); });
    document.addEventListener("pointerover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button");
      cursor.classList.toggle("is-label", !!lab);
      cursor.classList.toggle("is-hover", !lab && !!link);
      if (lab) cursorLabel.textContent = lab.dataset.cursor;
    });
    $$(".magnetic").forEach((el) => {
      gsap.set(el, { x: 0, y: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }

  /* =====================================================
     5. 小部件
     ===================================================== */
  const clock = $("#clock");
  const tick = () => (clock.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: S.timezone, hour12: false }));
  tick(); setInterval(tick, 1000);

  const roles = $$("#heroRoles span");
  gsap.set(roles, { yPercent: 110 });
  let ri = 0;
  const cycleRole = () => {
    gsap.to(roles[ri], { yPercent: -110, duration: 0.8, ease: "expo.inOut" });
    ri = (ri + 1) % roles.length;
    gsap.fromTo(roles[ri], { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" });
  };

  const toast = $("#toast");
  mail.addEventListener("click", (e) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText(S.contact.email).then(() => {
      toast.classList.add("is-show");
      setTimeout(() => toast.classList.remove("is-show"), 1800);
    });
  });

  // 微信卡片：悬停（桌面）或点击（手机）翻出
  (function wechat() {
    const box = $("#wechat"), btn = $("#wechatBtn"), card = $("#wechatCard");
    gsap.set(card, { rotateX: -90, yPercent: 10, opacity: 0, transformOrigin: "50% 100%", transformPerspective: 800 });
    let open = false;
    const toggle = (v) => {
      if (v === open) return;
      open = v;
      btn.setAttribute("aria-expanded", v);
      box.classList.toggle("is-open", v);
      gsap.to(card, v ? { rotateX: 0, yPercent: 0, opacity: 1, duration: 0.8, ease: "back.out(1.6)" } : { rotateX: -90, yPercent: 10, opacity: 0, duration: 0.4, ease: "power3.in" });
    };
    if (!isTouch) {
      box.addEventListener("pointerenter", () => toggle(true));
      box.addEventListener("pointerleave", () => toggle(false));
    }
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(!open); });
    document.addEventListener("click", (e) => { if (open && !box.contains(e.target)) toggle(false); });
    addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
  })();

  /* =====================================================
     6. 预加载 + 入场
     ===================================================== */
  const loaderNum = $("#loaderNum"), counter = { v: 0 };
  gsap.timeline({ delay: 0.2 })
    .from(".loader__word > span", { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.12 })
    .to(counter, { v: 100, duration: 2, ease: "power2.inOut", onUpdate: () => (loaderNum.textContent = pad(Math.round(counter.v), 3)) }, 0)
    .to(".loader__word > span", { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.06 }, "-=0.2")
    .to(".loader__panel--front", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.2")
    .to(".loader__panel--back", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.95")
    .add(() => { document.body.classList.remove("is-loading"); scrollTo(0, 0); if (lenis) { lenis.scrollTo(0, { immediate: true, force: true }); lenis.start(); } $("#loader").style.display = "none"; })
    .to(window.HeroGL || {}, { intro: 1, duration: 2, ease: "power2.out" }, "-=1.1")
    .from(".hero__title .char", { yPercent: 115, rotate: 8, duration: 1.3, ease: "expo.out", stagger: 0.045 }, "-=1.5")
    .from([".hero__top", ".hero__cn", ".hero__lead"], { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.08 }, "-=0.9")
    .from("#cue", { y: 80, scale: 0.6, opacity: 0, duration: 1.2, ease: "back.out(1.8)" }, "-=0.8")
    .add(() => {
      // 3 秒内没滑动：每隔 3 秒跳一下提醒
      const nudge = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 3 })
        .to("#cue", { y: -14, duration: 0.25, ease: "power2.out" })
        .to("#cue", { y: 0, duration: 0.9, ease: "bounce.out" });
      const stop = () => { if (scrollY > 40) { nudge.kill(); gsap.to("#cue", { y: 0, duration: 0.3 }); removeEventListener("scroll", stop); } };
      addEventListener("scroll", stop, { passive: true });
    })
    .add(() => { gsap.to(roles[0], { yPercent: 0, duration: 0.8, ease: "expo.out" }); setInterval(cycleRole, 2600); }, "-=0.8");

  // 滚动提示：点击直达下一节
  gsap.set("#cueWrap", { xPercent: -50 });
  $("#cue").addEventListener("click", () => (lenis ? lenis.scrollTo("#about", { duration: 1.6 }) : $("#about").scrollIntoView({ behavior: "smooth" })));

  // Hero 字母跟随鼠标拉伸（只在鼠标移动时计算，避免每帧测量布局）
  if (!isTouch) {
    const hc = $$(".hero__title .char");
    const sy = hc.map((c) => gsap.quickTo(c, "scaleY", { duration: 0.6, ease: "power3.out" }));
    const sk = hc.map((c) => gsap.quickTo(c, "skewX", { duration: 0.6, ease: "power3.out" }));
    let pending = false;
    addEventListener("pointermove", () => {
      if (pending || scrollY > innerHeight * 0.8) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        hc.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const dx = mouse.x - (r.left + r.width / 2), dy = mouse.y - (r.top + r.height / 2);
          const f = Math.max(0, 1 - Math.hypot(dx, dy) / 380);
          sy[i](1 + f * 0.3); sk[i](-dx * 0.02 * f);
        });
      });
    });
  }

  /* =====================================================
     7. 滚动动画（按页面顺序创建）
     ===================================================== */
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });

  // 7.1 Hero：被下一屏盖住时缩成卡片
  gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true, pin: true, pinSpacing: false } })
    .to("#heroInner", { scale: 0.86, borderRadius: 28, yPercent: -6, ease: "none" }, 0)
    .to(".hero__title .line:nth-child(1)", { xPercent: -16, ease: "none" }, 0)
    .to(".hero__title .line:nth-child(2)", { xPercent: 16, ease: "none" }, 0)
    .to(window.HeroGL || {}, { scroll: 1, ease: "none" }, 0)
    .fromTo("#cueWrap", { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: 60, ease: "none", duration: 0.2, immediateRender: false }, 0);

  // 右侧章节导航：离开首屏后出现，高亮当前章节
  const dots = $("#dots"), dotLinks = $$("a", dots);
  ScrollTrigger.create({ trigger: ".manifesto", start: "top 60%", onToggle: (st) => dots.classList.toggle("is-on", st.isActive || st.progress > 0), end: "max" });
  dotLinks.forEach((a) => {
    const sec = $(a.getAttribute("href"));
    const startEl = sec.previousElementSibling && sec.previousElementSibling.classList.contains("chapter") ? sec.previousElementSibling : sec;
    ScrollTrigger.create({
      trigger: startEl, start: "top 50%", endTrigger: sec, end: "bottom 50%",
      onToggle: (st) => st.isActive && dotLinks.forEach((x) => x.classList.toggle("is-active", x === a)),
    });
  });

  // 7.2 宣言
  gsap.from("#manifestoEn .row > span", { yPercent: 110, rotate: 3, duration: 1.3, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: "#manifestoEn", start: "top 80%" } });
  gsap.from("#manifestoEn .hl", { scale: 0.4, opacity: 0, duration: 1.4, ease: "elastic.out(1, 0.5)", stagger: 0.12, delay: 0.4, scrollTrigger: { trigger: "#manifestoEn", start: "top 80%" } });
  gsap.to("#manifestoCn .w", { opacity: 1, ease: "none", stagger: 0.02, scrollTrigger: { trigger: "#manifestoCn", start: "top 80%", end: "bottom 50%", scrub: true } });
  // 学历卡片：遮罩展开 → 大字升起 → 排名倒数
  gsap.from(".edu__lead", { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".edu", start: "top 80%" } });
  $$(".edu-card").forEach((card, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%" } });
    tl.fromTo(card, { clipPath: "inset(100% 0% 0% 0% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.4, ease: "expo.inOut", delay: i * 0.15 })
      .from($$(".edu-card__short .char", card), { yPercent: 110, rotate: 10, duration: 1.2, ease: "expo.out", stagger: 0.07 }, "-=0.6")
      .from($$(".edu-card__top, .edu-card__names, .edu-card__deg, .badge", card), { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }, "-=0.9")
      .add(() => {
        $$("[data-to]", card).forEach((el) => {
          const o = { v: +el.dataset.from };
          gsap.to(o, { v: +el.dataset.to, duration: 2.2, ease: "expo.out", onUpdate: () => (el.textContent = Math.round(o.v)) });
        });
      }, "-=0.8");
    gsap.to($(".edu-card__short", card), { yPercent: -12, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
    if (isTouch) return;
    const glow = $(".edu-card__glow", card), inner = $(".edu-card__inner", card);
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power3" });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      glow.style.setProperty("--gx", px * 100 + "%");
      glow.style.setProperty("--gy", py * 100 + "%");
      ry((px - 0.5) * 8); rx(-(py - 0.5) * 8);
    });
    card.addEventListener("pointerenter", () => gsap.to(glow, { opacity: 1, duration: 0.4 }));
    card.addEventListener("pointerleave", () => { gsap.to(glow, { opacity: 0, duration: 0.6 }); rx(0); ry(0); });
  });
  gsap.from("#extras > div", { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "#extras", start: "top 95%" } });

  // 7.3 章节转场：纹样面板横扫 → 标题飞入 → 面板划走露出下一节
  function setupChapter(ch) {
    const panel = $(".chapter__panel", ch), content = $(".chapter__content", ch);
    const cs = $$(".chapter__title .char", ch);
    gsap.set($(".chapter__base", ch), { backgroundColor: ch.dataset.prev });
    gsap.timeline({ scrollTrigger: { trigger: ch, start: "top top", end: "+=120%", pin: true, scrub: 0.4, anticipatePin: 1 } })
      .fromTo(panel, { xPercent: 100, borderRadius: "50vh 0 0 50vh" }, { xPercent: 0, borderRadius: "0vh 0 0 0vh", ease: "power2.inOut", duration: 1 })
      .from(cs, { yPercent: 120, rotateX: -90, opacity: 0, ease: "back.out(2)", stagger: 0.04, duration: 0.6 }, 0.55)
      .from([$(".chapter__n", ch), $(".chapter__cn", ch)], { y: 30, opacity: 0, duration: 0.4 }, 0.9)
      .set($(".chapter__base", ch), { backgroundColor: ch.dataset.next }, 1.3)
      .to(cs, { scale: 1.6, yPercent: -20, opacity: 0, ease: "power2.in", stagger: { each: 0.02, from: "center" }, duration: 0.6 }, 1.6)
      .to(content, { xPercent: -30, ease: "power2.in", duration: 1 }, 1.6)
      .to(panel, { xPercent: -100, borderRadius: "0 50vh 50vh 0", ease: "power2.inOut", duration: 1 }, 1.7);  }
  const chapters = $$(".chapter");

  // 7.4 四个能力：层叠卡片
  function setupPillars() {
    const pillars = $$(".pillar");
    const last = pillars[pillars.length - 1];
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      pillars.forEach((p, i) => {
        if (i < pillars.length - 1) {
          ScrollTrigger.create({ trigger: p, start: "top top", endTrigger: last, end: "top top", pin: true, pinSpacing: false });
          gsap.timeline({ scrollTrigger: { trigger: pillars[i + 1], start: "top bottom", end: "top top", scrub: true } })
            .to($(".pillar__card", p), { scale: 0.9, yPercent: -3, ease: "none" }, 0)
            .to($(".pillar__shade", p), { opacity: 0.55, ease: "none" }, 0);
        }
      });
    });
    pillars.forEach((p) => {
      const card = $(".pillar__card", p);
      gsap.from($$(".row > span", card), { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: p, start: "top 60%" } });
      gsap.from($$(".pillar__cn, .pillar__claim, .tag, .pillar__idx", card), { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.04, scrollTrigger: { trigger: p, start: "top 55%" } });
      gsap.from($$(".proof", card), { x: 80, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: p, start: "top 55%" } });
      $$("[data-count]", card).forEach((el) => {
        const raw = el.dataset.count, end = parseFloat(raw.replace(/,/g, "")), dec = (raw.split(".")[1] || "").length, o = { v: 0 };
        ScrollTrigger.create({ trigger: p, start: "top 55%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: "expo.out", onUpdate: () => (el.textContent = o.v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })) }) });
      });
    });
  }

  // 7.5 经历：横向滚动 + 时间线绘制
  function setupJourney() {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const pin = $(".journey__pin"), track = $("#journeyTrack"), head = $(".journey__head");
      const dist = () => pin.scrollWidth - pin.clientWidth;
      const tween = gsap.to([head, track], {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: ".journey", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true },
      });
      gsap.to("#journeyLine", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".journey", start: "top top", end: () => "+=" + dist(), scrub: 0.5, invalidateOnRefresh: true } });
      $$(".stop").forEach((stop) => {
        ScrollTrigger.create({ trigger: stop, containerAnimation: tween, start: "left 60%", toggleClass: "is-active" });
        gsap.from($(".stop__body", stop), { opacity: 0, y: stop.matches(":nth-child(even)") ? 60 : -60, ease: "none", scrollTrigger: { trigger: stop, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true } });
      });
    });
    mm.add("(max-width: 900px)", () => {
      $$(".stop").forEach((stop) => {
        stop.classList.add("is-active");
        gsap.from(stop, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: stop, start: "top 90%" } });
      });
    });
  }

  // 7.6 案例：遮罩展开 + 数字随滚动增长
  function setupCases() {
    $$(".case").forEach((c) => {
      const visual = $(".case__visual", c);
      gsap.to(visual, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none", scrollTrigger: { trigger: c, start: "top 85%", end: "center center", scrub: true } });
      gsap.fromTo($(".case__img", c), { yPercent: -8, scale: 1.25 }, { yPercent: 8, scale: 1, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } });
      const num = $("[data-scrub]", c), end = +num.dataset.scrub, dec = +num.dataset.dec;
      ScrollTrigger.create({
        trigger: c, start: "top 75%", end: "center center", scrub: true,
        onUpdate: (st) => (num.textContent = (end * st.progress).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })),
        onLeave: () => (num.textContent = end.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })),
      });
      gsap.from($$(".case__no, .case__title, .case__en, .case__tag, .case__btn, .case__metric-label", c), { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: c, start: "top 55%" } });
    });
  }

  // 7.7 作品
  function setupWorks() {
    $$(".work__card canvas").forEach((cv) => {
      const seed = +cv.dataset.seed, w = (cv.width = 400), h = (cv.height = 500), ctx = cv.getContext("2d");
      const hues = [["#ff4d1f", "#ffb800"], ["#3a6bff", "#8fd3ff"], ["#d7261e", "#ff8a3d"], ["#ece8df", "#8c867b"], ["#7a3cff", "#ff4d9a"], ["#1fbf7a", "#d4ff3a"]][seed % 6];
      ctx.fillStyle = "#151311"; ctx.fillRect(0, 0, w, h);
      for (let k = 0; k < 26; k++) {
        const r = 40 + ((seed * 37 + k * 53) % 140), x = (seed * 91 + k * 71) % w, y = (seed * 57 + k * 113) % h;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, k % 2 ? hues[0] : hues[1]); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.35; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 0.12; ctx.strokeStyle = "#ece8df";
      for (let y = 0; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y + Math.sin(y * 0.05 + seed) * 20); ctx.stroke(); }
    });
    $$(".work").forEach((work) => {
      const card = $(".work__card", work);
      gsap.from(card, { yPercent: 30, rotateX: -30, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: work, start: "top 95%" } });
      gsap.to($("canvas, img, video", card), { yPercent: -8, scale: 1.15, ease: "none", scrollTrigger: { trigger: work, start: "top bottom", end: "bottom top", scrub: true } });
      if (isTouch) return;
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 18);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
      });
      card.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
    gsap.from(".kit__honors li, .kit__edu li", { x: 40, opacity: 0, duration: 1, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: ".kit__cols", start: "top 85%" } });
  }

  // 按页面顺序创建
  setupChapter(chapters[0]);
  setupPillars();
  setupChapter(chapters[1]);
  setupJourney();
  setupChapter(chapters[2]);
  setupCases();
  setupChapter(chapters[3]);
  setupWorks();

  // 7.8 联系区：幕布揭开 + 视差
  gsap.fromTo(".contact", { yPercent: -35 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".footer-wrap", start: "top bottom", end: "bottom bottom", scrub: true } });
  gsap.from(".contact__line > span", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".footer-wrap", start: "top 40%" } });

  // 7.9 标签进场时乱码解码
  $$(".scramble").forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 90%", onEnter: () => scramble(el, 900) }));

  // 7.10 随滚动速度：工具条加速倾斜、作品网格整体倾斜
  (function velocity() {
    const row = $("#kitRow"), grid = $("#worksGrid");
    let x = 0, vel = 0;
    const skewGrid = gsap.quickTo(grid, "skewY", { duration: 0.5, ease: "power3" });
    const skewRow = gsap.quickTo(row, "skewX", { duration: 0.4, ease: "power3" });
    gsap.ticker.add((_, dt) => {
      vel += ((lenis ? lenis.velocity : 0) - vel) * 0.1;
      const half = row.scrollWidth / 2;
      x -= 0.05 * dt + Math.abs(vel) * 0.3;
      if (x <= -half) x += half;
      gsap.set(row, { x });
      skewRow(gsap.utils.clamp(-14, 14, -vel * 0.6));
      skewGrid(gsap.utils.clamp(-4, 4, vel * 0.12));
    });
  })();

  /* =====================================================
     8. 案例详情弹层
     ===================================================== */
  const modal = $("#modal"), panel = $("#modalPanel");
  gsap.set(panel, { xPercent: 100 });
  function openModal(i) {
    const c = S.cases[i];
    panel.innerHTML = `
      <button class="modal__close" data-close data-cursor="Close" aria-label="关闭">✕</button>
      <div class="modal__cover" style="background:${c.cover ? `url('${c.cover}') center/cover` : gradient(c.color)}"><span>${esc(c.en)}</span></div>
      <h3>${esc(c.title)}</h3>
      <div class="modal__en">${esc(c.tagline)}</div>
      <dl class="modal__meta"><div><dt>Role</dt><dd>${esc(c.role)}</dd></div><div><dt>Period</dt><dd>${esc(c.period)}</dd></div></dl>
      <div class="modal__h">01 — Challenge</div><p class="modal__p">${esc(c.challenge)}</p>
      <div class="modal__h">02 — What I did</div><ul class="modal__pts">${c.action.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="modal__h">03 — Results</div><div class="modal__hl">${c.results.map((h) => `<span>${esc(h)}</span>`).join("")}</div>
      <div class="modal__slot mono">More visuals coming soon · 作品图 / 视频位</div>`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lenis && lenis.stop();
    panel.scrollTop = 0;
    gsap.to(".modal__bg", { opacity: 1, duration: 0.5 });
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: "expo.out" });
    gsap.from(panel.children, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.04, delay: 0.15 });
  }
  function closeModal() {
    gsap.to(".modal__bg", { opacity: 0, duration: 0.4 });
    gsap.to(panel, { xPercent: 100, duration: 0.6, ease: "expo.in", onComplete: () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); lenis && lenis.start(); } });
    cursor.classList.remove("is-label");
  }
  $$("[data-open]").forEach((el) => el.addEventListener("click", () => openModal(+el.dataset.open)));
  modal.addEventListener("click", (e) => e.target.closest("[data-close]") && closeModal());
  addEventListener("keydown", (e) => e.key === "Escape" && modal.classList.contains("is-open") && closeModal());

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
