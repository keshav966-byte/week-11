/* =========================================================
   HIASAN "RGB NIGHT DESK" (3) — dimuat setelah app.js, inline script, dan fx.js
   1. Suara thock/klik (WebAudio, tanpa file audio, MATI secara default)
   2. Animasi foto terbang ke keranjang
   3. Hitung mundur Black Friday & Harbolnas 12.12 (waktu nyata, WIB)
   4. Pita promo mengikuti tema musiman (warna aurora diatur season.js + style.css)
   ========================================================= */
(function () {
  "use strict";

  const store = window.TCKStore;
  const season = window.TCKSeason;
  if (!store || !season) return;

  const esc = store.escapeHtml;
  const DAY = 86400 * 1000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------
     1. SUARA
     --------------------------------------------------------- */
  const SOUND_KEY = "tck_sound_v1";

  const Sound = (function () {
    let ctx = null;
    let master = null;
    let noiseBuf = null;
    let on = false;
    const listeners = [];
    try { on = localStorage.getItem(SOUND_KEY) === "1"; } catch (_) {}

    function ensure() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        try { ctx = new AC(); } catch (_) { return false; }
        master = ctx.createGain();
        master.gain.value = 0.55;
        const comp = ctx.createDynamicsCompressor();
        master.connect(comp);
        comp.connect(ctx.destination);
        const len = Math.floor(ctx.sampleRate * 0.06);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === "suspended") ctx.resume();
      return true;
    }

    function noise(t, freq, q, gain, dur) {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = q;
      const g = ctx.createGain();
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + dur + 0.01);
    }

    // "thock": badan sinus yang turun cepat + klik plastik singkat
    function thock(force) {
      if (!on || !ensure()) return;
      force = force || 1;
      const t = ctx.currentTime + 0.001;
      const pitch = 1 + (Math.random() - 0.5) * 0.16;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(190 * pitch, t);
      o.frequency.exponentialRampToValueAtTime(75 * pitch, t + 0.09);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.9 * force, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.14);
      noise(t, 1800 * pitch, 0.9, 0.35 * force, 0.035);
    }

    // suara tombol dilepas: "tak" tipis
    function release() {
      if (!on || !ensure()) return;
      noise(ctx.currentTime + 0.001, 3200, 1.2, 0.12, 0.025);
    }

    // klik ringan untuk tombol antarmuka biasa
    function click() {
      if (!on || !ensure()) return;
      const t = ctx.currentTime + 0.001;
      noise(t, 2600, 1.1, 0.22, 0.03);
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(520, t);
      o.frequency.exponentialRampToValueAtTime(260, t + 0.04);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.06);
    }

    function set(value) {
      on = !!value;
      try { localStorage.setItem(SOUND_KEY, on ? "1" : "0"); } catch (_) {}
      listeners.forEach(function (fn) { fn(on); });
      if (on) { ensure(); thock(0.8); } // umpan balik langsung + membuka audio (butuh gestur pengguna)
    }

    return {
      isOn: function () { return on; },
      set: set,
      toggle: function () { set(!on); },
      thock: thock,
      release: release,
      click: click,
      onChange: function (fn) { listeners.push(fn); }
    };
  })();

  const SPEAKER_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true">' +
    '<path class="sp-body" d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/>' +
    '<path class="sp-wave" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>' +
    '<path class="sp-off" d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';

  function soundLabel(on) { return on ? "Suara: nyala" : "Suara: mati"; }

  function syncSoundUi(on) {
    document.querySelectorAll(".sound-toggle").forEach(function (b) {
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("is-on", on);
      const label = b.querySelector(".fab-label, .st-label");
      if (label) label.textContent = soundLabel(on);
      b.setAttribute("aria-label", soundLabel(on) + ". Tekan untuk " + (on ? "mematikan" : "menyalakan") + " suara klik tombol");
    });
  }

  function mountSoundFab() {
    const stack = document.querySelector(".fab-stack");
    if (!stack || document.getElementById("fab-sound")) return;
    const b = document.createElement("button");
    b.type = "button";
    b.id = "fab-sound";
    b.className = "fab fab-sound sound-toggle";
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = SPEAKER_ICON + '<span class="fab-label">' + soundLabel(false) + "</span>";
    stack.insertBefore(b, stack.firstChild);
  }

  Sound.onChange(syncSoundUi);

  document.addEventListener("click", function (e) {
    const t = e.target.closest ? e.target.closest(".sound-toggle") : null;
    if (t) Sound.toggle();
  });

  // klik ringan di tombol antarmuka biasa (papan keyboard punya suaranya sendiri)
  document.addEventListener("pointerdown", function (e) {
    if (!Sound.isOn() || e.button > 0) return;
    const t = e.target.closest ? e.target.closest("button, .btn, .chip, .fab, .nav-link, .qty-btn") : null;
    if (!t || t.disabled || t.classList.contains("sound-toggle")) return;
    Sound.click();
  }, true);

  /* ---------------------------------------------------------
     2. FOTO TERBANG KE KERANJANG
     --------------------------------------------------------- */
  let pending = null;

  function cartTarget() {
    const fab = document.getElementById("fab-cart");
    if (fab && !fab.hidden && fab.getBoundingClientRect().width > 0) return fab;
    const badge = document.getElementById("nav-cart-count");
    const link = badge ? badge.closest(".nav-link") : null;
    return link && link.getBoundingClientRect().width > 0 ? link : null;
  }

  function bump(el) {
    if (!el) return;
    el.classList.remove("fx-bump");
    void el.offsetWidth;
    el.classList.add("fx-bump");
    el.addEventListener("animationend", function () { el.classList.remove("fx-bump"); }, { once: true });
  }

  function fly(img) {
    if (reduceMotion.matches || !img || !img.getBoundingClientRect) return;
    const target = cartTarget();
    const from = img.getBoundingClientRect();
    if (!target || from.width < 8 || from.height < 8) return;
    const to = target.getBoundingClientRect();

    const ghost = document.createElement("div");
    ghost.className = "fx-fly";
    ghost.setAttribute("aria-hidden", "true");
    const pic = new Image();
    pic.alt = "";
    pic.src = img.currentSrc || img.src;
    ghost.appendChild(pic);
    ghost.style.left = from.left + "px";
    ghost.style.top = from.top + "px";
    ghost.style.width = from.width + "px";
    ghost.style.height = from.height + "px";

    // popover = lapisan teratas, sehingga tetap terlihat di atas dialog detail produk
    if (typeof ghost.showPopover === "function") ghost.setAttribute("popover", "manual");
    document.body.appendChild(ghost);
    if (typeof ghost.showPopover === "function") { try { ghost.showPopover(); } catch (_) {} }

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const lift = Math.min(140, Math.abs(dy) * 0.35 + 40);
    const anim = ghost.animate([
      { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)" },
      { transform: "translate(" + dx * 0.5 + "px, " + (dy * 0.5 - lift) + "px) scale(0.4) rotate(-8deg)", opacity: 1, offset: 0.45, easing: "cubic-bezier(0.6, 0, 0.9, 0.5)" },
      { transform: "translate(" + dx + "px, " + dy + "px) scale(0.06) rotate(10deg)", opacity: 0.6 }
    ], { duration: 760, fill: "forwards" });

    const done = function () {
      ghost.remove();
      bump(cartTarget() || target);
    };
    anim.onfinish = done;
    anim.oncancel = function () { ghost.remove(); };
  }

  function sourceImage(btn) {
    const box = btn.closest(".card, .spot-card, #qv-body");
    return box ? box.querySelector("img") : null;
  }

  // sebelum aksi halaman: catat jumlah keranjang
  document.addEventListener("click", function (e) {
    const add = e.target.closest ? e.target.closest(".btn-add-cart") : null;
    if (!add || add.disabled) { pending = null; return; }
    pending = { count: store.getCartCount(), img: sourceImage(add), at: performance.now() };
  }, true);

  // sesudah aksi halaman: animasikan hanya jika keranjang benar-benar bertambah
  document.addEventListener("click", function () {
    const p = pending;
    pending = null;
    if (!p || performance.now() - p.at > 400) return;
    if (store.getCartCount() > p.count) fly(p.img);
  });

  /* ---------------------------------------------------------
     3. HITUNG MUNDUR (waktu nyata, patokan WIB)
     --------------------------------------------------------- */
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function split(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  }

  function fmtWib(ms) {
    try {
      return new Date(ms).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false
      }) + " WIB";
    } catch (_) {
      return "";
    }
  }

  const container = document.querySelector(".intro .container");
  const clock = document.createElement("section");
  clock.className = "sale-clock";
  clock.id = "sale-clock";
  clock.setAttribute("aria-label", "Hitung mundur promo");
  clock.hidden = true;
  // di bawah Sorotan Diskon, supaya sorotan tetap yang pertama terlihat
  const infoStrip = container ? container.querySelector(".info-strip") : null;
  if (container) container.insertBefore(clock, infoStrip);

  let clockSig = "";
  let cards = [];

  function clockState() {
    const t = season.now();
    const list = season.events();
    return {
      t: t,
      active: list.filter(function (e) { return t >= e.start && t < e.end; }),
      next: list.filter(function (e) { return e.start > t && e.start - t <= 45 * DAY; })[0] || null
    };
  }

  function cardHtml(ev, live) {
    return (
      '<div class="sc-card' + (live ? " is-live" : "") + '" style="--sc:' + ev.rgb + '" data-ev="' + esc(ev.id) + '" data-live="' + (live ? 1 : 0) + '">' +
      '  <p class="sc-kicker"><span class="sc-dot" aria-hidden="true"></span>' + (live ? "Sedang berlangsung" : "Segera dimulai") + "</p>" +
      '  <h3 class="sc-name">' + esc(ev.name) + "</h3>" +
      '  <div class="sc-digits" role="timer" aria-label="' + (live ? "Sisa waktu " : "Menuju ") + esc(ev.name) + '">' +
      '    <span class="sc-unit" data-u="d"><b>00</b><small>hari</small></span>' +
      '    <span class="sc-unit" data-u="h"><b>00</b><small>jam</small></span>' +
      '    <span class="sc-unit" data-u="m"><b>00</b><small>mnt</small></span>' +
      '    <span class="sc-unit" data-u="s"><b>00</b><small>dtk</small></span>' +
      "  </div>" +
      '  <p class="sc-note">' + (live ? "Berakhir " + esc(fmtWib(ev.end - 1000)) : "Mulai " + esc(fmtWib(ev.start))) + "</p>" +
      "</div>"
    );
  }

  function renderClock() {
    const st = clockState();
    const list = [];
    st.active.forEach(function (e) { list.push({ ev: e, live: true }); });
    if (st.next) list.push({ ev: st.next, live: false });

    const sig = list.map(function (x) { return x.ev.id + (x.live ? "L" : "N"); }).join("|");
    if (sig !== clockSig) {
      clockSig = sig;
      clock.hidden = list.length === 0;
      clock.innerHTML = list.map(function (x) { return cardHtml(x.ev, x.live); }).join("");
      cards = Array.prototype.slice.call(clock.querySelectorAll(".sc-card")).map(function (el, i) {
        const b = {};
        el.querySelectorAll(".sc-unit").forEach(function (u) { b[u.getAttribute("data-u")] = u; });
        return { el: el, units: b, ev: list[i].ev, live: list[i].live, last: "" };
      });
    }
    cards.forEach(function (c) {
      const left = split((c.live ? c.ev.end : c.ev.start) - st.t);
      const key = left.d + ":" + left.h + ":" + left.m + ":" + left.s;
      if (key === c.last) return;
      c.last = key;
      c.units.d.querySelector("b").textContent = pad(left.d);
      c.units.h.querySelector("b").textContent = pad(left.h);
      c.units.m.querySelector("b").textContent = pad(left.m);
      c.units.s.querySelector("b").textContent = pad(left.s);
      c.units.d.hidden = c.live && left.d === 0; // promo yang tinggal hitungan jam tidak perlu "00 hari"
    });
  }

  let tickCount = 0;
  function loop() {
    if (!document.hidden) {
      renderClock();
      tickCount++;
      if (tickCount % 30 === 0) season.refresh(); // tema ikut berganti saat lewat tengah malam WIB
    }
    setTimeout(loop, 1000 - (season.now() % 1000) + 15); // selaras dengan pergantian detik
  }
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { renderClock(); season.refresh(); }
  });

  // koreksi bila jam perangkat meleset: bandingkan dengan header Date dari server
  function syncClock() {
    if (!/^https?:$/.test(location.protocol) || !window.fetch) return;
    const t0 = Date.now();
    fetch(location.href.split("#")[0], { method: "HEAD", cache: "no-store" }).then(function (r) {
      const h = r.headers.get("Date");
      if (!h) return;
      const t1 = Date.now();
      let srv = Date.parse(h);
      if (isNaN(srv)) return;
      srv += (parseInt(r.headers.get("Age"), 10) || 0) * 1000; // jawaban dari cache CDN
      const off = srv + 500 - (t0 + (t1 - t0) / 2); // header Date dibulatkan ke bawah per detik
      if (Math.abs(off) > 2000) {
        season.setOffset(off);
        renderClock();
      }
    }).catch(function () {});
  }

  /* ---------------------------------------------------------
     4. PITA PROMO MUSIMAN
     --------------------------------------------------------- */
  const ticker = document.getElementById("promo-ticker");
  const track = document.getElementById("promo-track");
  const PX_PER_SEC = 55;

  function maxDiscount() {
    return store.products.reduce(function (m, p) { return Math.max(m, p.discountPercent || 0); }, 0);
  }

  function tickerItems() {
    const id = season.id();
    const disc = maxDiscount();
    const t = season.now();
    const evs = season.events();
    function ev(name) { return evs.filter(function (e) { return e.id === name; })[0]; }
    function when(e) {
      if (!e) return "";
      if (t >= e.start && t < e.end) return "berakhir " + esc(fmtWib(e.end - 1000));
      if (t < e.start) return "mulai " + esc(fmtWib(e.start));
      return "";
    }
    const discText = disc > 0 ? "<b>Diskon hingga " + disc + "%</b> untuk keycap pilihan" : "";
    const facts = [
      "<b>Bayar via QRIS</b> scan kode saat checkout",
      "<b>Ongkir mulai Rp 18.000</b> JNE / J&amp;T",
      "<b>Ambil gratis</b> di workshop Bandung"
    ];

    let lead = [];
    if (id === "blackfriday") {
      lead = ["<b>BLACK FRIDAY</b> " + (disc ? "diskon hingga " + disc + "%" : "promo spesial")];
      const bf = ev("blackfriday");
      if (bf && when(bf)) lead.push("<b>Flash sale</b> " + when(bf));
      const hb = ev("harbolnas");
      if (hb && t < hb.start) lead.push("<b>Harbolnas 12.12</b> " + when(hb));
      return lead.concat(facts);
    }
    if (id === "harbolnas") {
      const hb = ev("harbolnas");
      lead = ["<b>HARBOLNAS 12.12</b> " + (disc ? "diskon hingga " + disc + "%" : "promo spesial")];
      if (hb && when(hb)) lead.push("<b>12.12</b> " + when(hb));
      return lead.concat(facts);
    }
    if (id === "natal") {
      return ["<b>Selamat Natal &amp; Tahun Baru</b> dari Toko Daniel Secret", "<b>Cari kado</b> untuk si keyboard geek"]
        .concat(discText ? [discText] : []).concat(facts);
    }
    if (id === "ramadan") {
      return ["<b>Ramadan Kareem</b> &mdash; selamat menjalankan ibadah puasa", "<b>Ngabuburit</b> sambil pilih keycap"]
        .concat(discText ? [discText] : []).concat(facts);
    }
    return (discText ? [discText] : []).concat(facts, ["<b>Stok terbatas</b> cek label LIMITED di kartu produk"]);
  }

  let writing = false;
  let moTicker = null;

  function renderTicker() {
    if (!track || !ticker) return;
    const items = tickerItems();
    const one = items.map(function (it) { return '<span class="promo-item">' + it + "</span>"; }).join("");

    writing = true;
    track.style.removeProperty("--ticker-dur");
    track.innerHTML = '<div class="promo-group">' + one + "</div>";
    const w = track.firstElementChild.offsetWidth || 1;
    // tiap grup harus lebih lebar dari layar, kalau tidak loop-nya berlubang
    const reps = Math.max(1, Math.ceil(ticker.clientWidth / w));
    let group = "";
    for (let i = 0; i < reps; i++) group += one;
    track.innerHTML = '<div class="promo-group">' + group + '</div><div class="promo-group" aria-hidden="true">' + group + "</div>";
    track.style.setProperty("--ticker-dur", Math.max(12, Math.round((w * reps) / PX_PER_SEC)) + "s");
    if (moTicker) moTicker.takeRecords(); // abaikan perubahan yang barusan kita tulis sendiri
    writing = false;
  }

  if (ticker && track) {
    // pita selalu berjalan, tidak bisa dijeda (sama seperti Sorotan Diskon)
    const pauseBtn = document.getElementById("promo-pause");
    if (pauseBtn) pauseBtn.remove();
    ticker.classList.remove("is-paused");

    // bila skrip lain menulis ulang pita ini, tema musiman tetap yang menang
    let rebuildTimer = null;
    moTicker = new MutationObserver(function () {
      if (writing) return;
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(renderTicker, 0);
    });
    moTicker.observe(track, { childList: true });

    let resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderTicker, 250);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderTicker);
  }

  document.addEventListener("tck:season", function () { renderTicker(); renderClock(); });

  /* ---------------------------------------------------------
     Mulai
     --------------------------------------------------------- */
  mountSoundFab();
  syncSoundUi(Sound.isOn());
  renderTicker();
  renderClock();
  loop();
  syncClock();
})();
