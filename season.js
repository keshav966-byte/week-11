/* =========================================================
   MUSIM & JADWAL PROMO — dimuat di <head> (sinkron, kecil) supaya warna
   aurora sudah benar sebelum halaman tergambar, tanpa kedip.
   Semua tanggal dihitung dalam WIB (UTC+7), bukan zona waktu perangkat,
   jadi semua pengunjung melihat jadwal yang sama.
   ========================================================= */
(function () {
  "use strict";

  const WIB = 7 * 3600 * 1000;
  const DAY = 86400 * 1000;
  const THEMES = ["default", "blackfriday", "harbolnas", "natal", "ramadan"];

  // selisih jam server terhadap jam perangkat (ms); diisi extras.js bila jam perangkat meleset
  let offset = 0;
  let current = "default";

  function now() { return Date.now() + offset; }

  // waktu WIB -> timestamp UTC (Date.UTC menangani limpahan hari/bulan)
  function wib(y, m, d, h) { return Date.UTC(y, m, d, h || 0) - WIB; }

  function wibParts(ms) {
    const t = new Date(ms + WIB);
    return { y: t.getUTCFullYear(), m: t.getUTCMonth(), d: t.getUTCDate() };
  }

  function dayNum(y, m, d) { return Math.floor(Date.UTC(y, m, d) / DAY); }

  // Black Friday = sehari setelah Kamis keempat bulan November
  function blackFridayDay(y) {
    const dow = new Date(Date.UTC(y, 10, 1)).getUTCDay(); // 0 = Minggu
    const firstThursday = 1 + ((4 - dow + 7) % 7);
    return firstThursday + 21 + 1;
  }

  // =====================================================
  // JADWAL PROMO — dihitung otomatis tiap tahun.
  // Tambah / ubah event di sini. start & end memakai timestamp (end = batas akhir, tidak ikut).
  // =====================================================
  function buildEvents(y) {
    const bf = blackFridayDay(y);
    return [
      { id: "blackfriday", name: "Black Friday", start: wib(y, 10, bf), end: wib(y, 10, bf + 1), rgb: "255, 69, 96" },
      { id: "harbolnas", name: "Harbolnas 12.12", start: wib(y, 11, 12), end: wib(y, 11, 13), rgb: "255, 46, 136" }
    ];
  }

  function events() {
    const y = wibParts(now()).y;
    return buildEvents(y).concat(buildEvents(y + 1)).sort(function (a, b) { return a.start - b.start; });
  }

  // Bulan Hijriah (9 = Ramadan) berdasarkan kalender Umm al-Qura di Intl.
  // Bisa selisih ±1 hari dari penetapan resmi Indonesia; cukup untuk tema.
  function hijriMonth(ms) {
    try {
      const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { timeZone: "Asia/Jakarta", month: "numeric" }).formatToParts(new Date(ms));
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].type === "month") return parseInt(parts[i].value, 10) || 0;
      }
    } catch (_) {}
    return 0;
  }

  // Jendela tema per tanggal (WIB). Urutan = prioritas.
  function seasonAt(ms) {
    if (hijriMonth(ms) === 9) return "ramadan";
    const p = wibParts(ms);
    const n = dayNum(p.y, p.m, p.d);
    const bf = dayNum(p.y, 10, blackFridayDay(p.y));
    if (n >= bf - 3 && n <= bf + 3) return "blackfriday"; // pekan Black Friday s.d. Cyber Monday
    if (p.m === 11 && p.d <= 12) return "harbolnas";       // 1 - 12 Des
    if (p.m === 11 && p.d >= 13) return "natal";           // 13 - 31 Des
    return "default";
  }

  // pratinjau tema: tambahkan ?tema=natal (atau blackfriday, harbolnas, ramadan, default) di URL
  function forcedTheme() {
    try {
      const t = new URLSearchParams(location.search).get("tema");
      return THEMES.indexOf(t) !== -1 ? t : "";
    } catch (_) { return ""; }
  }

  function apply() {
    const next = forcedTheme() || seasonAt(now());
    const changed = next !== current;
    current = next;
    document.documentElement.setAttribute("data-season", current);
    return changed;
  }

  // dipanggil berkala; mengabarkan perubahan tema (mis. lewat tengah malam WIB)
  function refresh() {
    if (apply()) {
      document.dispatchEvent(new CustomEvent("tck:season", { detail: { id: current } }));
      return true;
    }
    return false;
  }

  function setOffset(ms) {
    offset = ms;
    refresh();
  }

  apply();

  window.TCKSeason = {
    id: function () { return current; },
    now: now,
    events: events,
    refresh: refresh,
    setOffset: setOffset,
    themes: THEMES
  };
})();
