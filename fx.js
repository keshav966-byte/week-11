/* fx.js — hiasan interaktif: judul keycap, pita promo, kursor keycap + riak, pesta lampu.
   Muat setelah app.js:  <script src="fx.js" defer></script> */
(function () {
  "use strict";
  var store = window.TCKStore;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");

  function toast(msg) { if (store && store.showToast) store.showToast(msg); }

  // ===== 1. Judul berhuruf keycap: tambahkan atribut data-keycaps pada judul =====
  document.querySelectorAll("[data-keycaps]").forEach(function (el) {
    var text = el.textContent.trim();
    if (!text || el.classList.contains("keycap-title")) return;
    el.setAttribute("aria-label", text);
    el.classList.add("keycap-title");
    el.textContent = "";
    text.split(/\s+/).forEach(function (word) {
      var w = document.createElement("span");
      w.className = "kc-word";
      w.setAttribute("aria-hidden", "true");
      word.split("").forEach(function (ch) {
        var k = document.createElement("span");
        k.className = "kc";
        k.textContent = ch;
        w.appendChild(k);
      });
      el.appendChild(w);
    });
  });

  // ===== 2. Pita promo berjalan (data diskon diambil dari katalog) =====
  var track = document.getElementById("promo-track");
  if (track) {
    var items = ["Ongkir mulai <b>Rp 18.000</b>", "Ambil gratis di <b>workshop Bandung</b>", "Bayar via <b>QRIS</b>"];
    var disc = store && store.products ? store.products.filter(function (p) { return p.discountPercent > 0; }) : [];
    if (disc.length) {
      var max = Math.max.apply(null, disc.map(function (p) { return p.discountPercent; }));
      items.unshift("Diskon sampai <b>" + max + "%</b> untuk " + disc.length + " keycap");
    }
    var group = '<div class="promo-group">' + items.map(function (t) { return '<span class="promo-item">' + t + "</span>"; }).join("") + "</div>";
    track.innerHTML = group + group.replace('class="promo-group"', 'class="promo-group" aria-hidden="true"');
    var bar = document.getElementById("promo-ticker");
    var pauseBtn = document.getElementById("promo-pause");
    if (bar && pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        var paused = bar.classList.toggle("is-paused");
        pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
        pauseBtn.setAttribute("aria-label", paused ? "Lanjutkan pita promo" : "Jeda pita promo");
        pauseBtn.innerHTML = paused ? "&#9654;" : "&#10074;&#10074;";
      });
    }
  }

  // ===== 3. Kursor keycap kecil + riak saat klik (mouse saja) =====
  if (fine.matches && !reduced.matches) {
    var cap = document.createElement("div");
    cap.className = "fx-cap";
    cap.setAttribute("aria-hidden", "true");
    cap.innerHTML = "<i></i>";
    document.body.appendChild(cap);

    var tx = 0, ty = 0, x = 0, y = 0, raf = 0, seen = false, ci = 0;
    var HOT = "a,button,input,select,summary,label,[data-open],[data-wish],.chip";
    var COLORS = ["#ff2e88", "#ffc53d", "#3dffa0", "#22e4ff", "#8b5cff"];

    var loop = function () {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cap.style.transform = "translate3d(" + (x + 14) + "px," + (y + 14) + "px,0)";
      raf = (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY;
      if (!seen) { x = tx; y = ty; seen = true; }
      cap.classList.add("on");
      cap.classList.toggle("is-hot", !!(e.target.closest && e.target.closest(HOT)));
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", function () { cap.classList.remove("on"); });
    document.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      cap.classList.add("is-down");
      var r = document.createElement("span");
      r.className = "fx-ripple";
      r.style.left = e.clientX + "px";
      r.style.top = e.clientY + "px";
      r.style.setProperty("--rc", COLORS[ci++ % COLORS.length]);
      r.addEventListener("animationend", function () { r.remove(); });
      document.body.appendChild(r);
    });
    var release = function () { cap.classList.remove("is-down"); };
    document.addEventListener("pointerup", release);
    window.addEventListener("blur", release);
  }

  // ===== 4. Pesta lampu: ketik "rgb" atau kode Konami =====
  var KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"].join(",");
  var buf = [];
  var glow = null;
  function startParty() {
    if (glow) return;
    if (reduced.matches) { toast("Pesta lampu dilewati karena kamu memilih mengurangi animasi."); return; }
    glow = document.createElement("div");
    glow.className = "fx-party-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    document.documentElement.classList.add("fx-party");
    toast("Pesta lampu! RGB menyala selama 6 detik.");
    setTimeout(function () {
      document.documentElement.classList.remove("fx-party");
      if (glow) { glow.remove(); glow = null; }
    }, 6000);
  }
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    buf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (buf.length > 10) buf.shift();
    if (buf.slice(-3).join("") === "rgb" || buf.join(",") === KONAMI) { buf = []; startParty(); }
  });
})();
