(function () {
  "use strict";

  const CART_KEY = "tck_cart_v1";
  const ORDERS_KEY = "tck_orders_v1";
  const CHANNEL_NAME = "toko_custom_keycaps_realtime_v1";

  const products = [
    { sku: "KC-001", img: "Keycaps/1.jpg", name: "Custom Keycap Edition #01", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 310000, price: "Rp 310.000", desc: "Keycap custom presisi dengan kompatibilitas stem MX standar." },
    { sku: "KC-002", img: "Keycaps/2.jpg", name: "Custom Keycap Edition #02", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 320000, price: "Rp 320.000", desc: "Desain eksklusif untuk tombol Esc atau baris fungsi keyboard." },
    { sku: "KC-003", img: "Keycaps/3.jpg", name: "Custom Keycap Edition #03", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 340000, price: "Rp 340.000", desc: "Cetakan resin berkualitas dengan finishing halus dan tahan lama." },
    { sku: "KC-004", img: "Keycaps/4.jpg", name: "Custom Keycap Edition #04", profile: "OEM • PBT", stock: "Tersedia", limited: false, priceNum: 315000, price: "Rp 315.000", desc: "Aksen visual unik untuk mempercantik layout keyboard mekanikal." },
    { sku: "KC-005", img: "Keycaps/5.jpg", name: "Custom Keycap Edition #05", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 350000, price: "Rp 350.000", desc: "Edisi handcrafted dengan detail warna berlapis yang tajam." },
    { sku: "KC-006", img: "Keycaps/6.jpg", name: "Custom Keycap Edition #06", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 325000, price: "Rp 325.000", desc: "Cocok dipadukan dengan keyboard custom ukuran 60% hingga Full-size." },
    { sku: "KC-007", img: "Keycaps/7.jpg", name: "Custom Keycap Edition #07", profile: "SA • ABS", stock: "Tersedia", limited: false, priceNum: 330000, price: "Rp 330.000", desc: "Material solid dengan penyebaran cahaya RGB yang merata." },
    { sku: "KC-008", img: "Keycaps/8.jpg", name: "Custom Keycap Edition #08", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 345000, price: "Rp 345.000", desc: "Finishing mengilap dan presisi tinggi pada dudukan switch MX." },
    { sku: "KC-009", img: "Keycaps/9.jpg", name: "Custom Keycap Edition #09", profile: "XDA • PBT", stock: "Tersedia", limited: false, priceNum: 310000, price: "Rp 310.000", desc: "Desain artistik ringkas untuk tombol aksen keyboard mekanikal." },
    { sku: "KC-010", img: "Keycaps/10.jpg", name: "Custom Keycap Edition #10", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 335000, price: "Rp 335.000", desc: "Tekstur permukaan nyaman untuk mengetik cepat sehari-hari." },
    { sku: "KC-011", img: "Keycaps/11.jpg", name: "Custom Keycap Edition #11", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 360000, price: "Rp 360.000", desc: "Koleksi pilihan dengan komposisi warna kontras yang elegan." },
    { sku: "KC-012", img: "Keycaps/12.jpg", name: "Custom Keycap Edition #12", profile: "OEM • PBT", stock: "Tersedia", limited: false, priceNum: 295000, price: "Rp 295.000", desc: "Nuansa warna modern untuk setup meja kerja maupun gaming." },
    { sku: "KC-013", img: "Keycaps/13.jpg", name: "Custom Keycap Edition #13", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 395000, price: "Rp 395.000", desc: "Detail mikro yang rapi terbungkus dalam resin bening." },
    { sku: "KC-014", img: "Keycaps/14.jpg", name: "Custom Keycap Edition #14", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 340000, price: "Rp 340.000", desc: "Ketebalan dinding 1.5mm dengan suara ketikan yang solid." },
    { sku: "KC-015", img: "Keycaps/15.jpg", name: "Custom Keycap Edition #15", profile: "SA • Resin", stock: "Stok Terbatas", limited: true, priceNum: 410000, price: "Rp 410.000", desc: "Profil tinggi klasik dengan karakter visual yang mencolok." },
    { sku: "KC-016", img: "Keycaps/16.jpg", name: "Custom Keycap Edition #16", profile: "OEM • Resin", stock: "Tersedia", limited: false, priceNum: 365000, price: "Rp 365.000", desc: "Desain tematik unik untuk melengkapi koleksi keyboard custom." },
    { sku: "KC-017", img: "Keycaps/17.jpg", name: "Custom Keycap Edition #17", profile: "Cherry • Resin", stock: "Tersedia", limited: false, priceNum: 350000, price: "Rp 350.000", desc: "Efek visual menarik saat terkena cahaya lampu LED keyboard." },
    { sku: "KC-018", img: "Keycaps/18.jpg", name: "Custom Keycap Edition #18", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 380000, price: "Rp 380.000", desc: "Dibuat secara teliti dengan lapisan pelindung anti-gores." },
    { sku: "KC-019", img: "Keycaps/19.jpg", name: "Custom Keycap Edition #19", profile: "SA • PBT", stock: "Tersedia", limited: false, priceNum: 355000, price: "Rp 355.000", desc: "Kombinasi warna seimbang dengan legenda huruf yang tegas." },
    { sku: "KC-020", img: "Keycaps/20.jpg", name: "Custom Keycap Edition #20", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 370000, price: "Rp 370.000", desc: "Desain berkarakter kuat untuk menjadi pusat perhatian keyboard." },
    { sku: "KC-021", img: "Keycaps/21.jpg", name: "Custom Keycap Edition #21", profile: "OEM • PBT", stock: "Tersedia", limited: false, priceNum: 330000, price: "Rp 330.000", desc: "Permukaan matte anti-minyak yang awet untuk penggunaan jangka panjang." },
    { sku: "KC-022", img: "Keycaps/22.jpg", name: "Custom Keycap Edition #22", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 390000, price: "Rp 390.000", desc: "Edisi kolektor dengan detail pahatan yang sangat presisi." },
    { sku: "KC-023", img: "Keycaps/23.jpg", name: "Custom Keycap Edition #23", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 295000, price: "Rp 295.000", desc: "Pilihan tepat untuk menyegarkan tampilan keyboard mekanikal Anda." },
    { sku: "KC-024", img: "Keycaps/24.jpg", name: "Custom Keycap Edition #24", profile: "OEM • Resin", stock: "Tersedia", limited: false, priceNum: 345000, price: "Rp 345.000", desc: "Tampilan hangat dan estetik yang cocok untuk berbagai tema desk setup." },
    { sku: "KC-025", img: "Keycaps/25.jpg", name: "Custom Keycap Edition #25", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 285000, price: "Rp 285.000", desc: "Inspirasi desain retro dengan sentuhan warna modern." },
    { sku: "KC-026", img: "Keycaps/26.jpg", name: "Custom Keycap Edition #26", profile: "Artisan • Resin", stock: "Tersedia", limited: false, priceNum: 310000, price: "Rp 310.000", desc: "Ornamen mini di dalam resin jernih dengan tingkat transparansi tinggi." },
    { sku: "KC-027", img: "Keycaps/27.jpg", name: "Custom Keycap Edition #27", profile: "Artisan • Resin", stock: "Stok Terbatas", limited: true, priceNum: 360000, price: "Rp 360.000", desc: "Memantulkan kilau cahaya dengan indah pada switch RGB." },
    { sku: "KC-028", img: "Keycaps/28.jpg", name: "Custom Keycap Edition #28", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 490000, price: "Rp 490.000", desc: "Kualitas cetak Dye-Sub yang tidak mudah pudar meski sering digunakan." },
    { sku: "KC-029", img: "Keycaps/29.jpg", name: "Custom Keycap Edition #29", profile: "Cherry • PBT", stock: "Tersedia", limited: false, priceNum: 510000, price: "Rp 510.000", desc: "Desain bersih dan ergonomis untuk kenyamanan mengetik maksimal." },
    { sku: "KC-030", img: "Keycaps/30.jpg", name: "Custom Keycap Edition #30", profile: "OEM • PBT", stock: "Tersedia", limited: false, priceNum: 475000, price: "Rp 475.000", desc: "Penutup seri katalog dengan perpaduan warna yang elegan dan serbaguna." }
  ];

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function broadcastEvent(type, payload) {
    if (channel) {
      try {
        channel.postMessage({ type: type, payload: payload, ts: Date.now() });
      } catch (_) {}
    }
  }

  function onRealtimeUpdate(callback) {
    window.addEventListener("storage", function (e) {
      if (e.key === ORDERS_KEY || e.key === CART_KEY) {
        callback({ source: "storage", key: e.key });
      }
    });
    if (channel) {
      channel.addEventListener("message", function (e) {
        callback({ source: "broadcast", data: e.data });
      });
    }
  }

  function formatRupiah(amount) {
    const num = Number(amount) || 0;
    return "Rp " + num.toLocaleString("id-ID");
  }

  function formatWaktu(isoString) {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Cart API
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    broadcastEvent("CART_UPDATED", { count: getCartCount() });
    updateNavBadge();
  }

  function getProductBySku(sku) {
    return products.find(function (item) {
      return item.sku === sku;
    });
  }

  function addToCart(sku, qty) {
    const product = getProductBySku(sku);
    if (!product) return null;
    const addQty = Math.max(1, parseInt(qty, 10) || 1);
    const cart = getCart();
    const existing = cart.find(function (c) {
      return c.sku === sku;
    });
    if (existing) {
      existing.qty = Math.min(99, existing.qty + addQty);
    } else {
      cart.push({
        sku: product.sku,
        name: product.name,
        img: product.img,
        profile: product.profile,
        priceNum: product.priceNum,
        qty: addQty
      });
    }
    saveCart(cart);
    return cart;
  }

  function updateCartQty(sku, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 1) {
      return removeFromCart(sku);
    }
    const cart = getCart();
    const item = cart.find(function (c) {
      return c.sku === sku;
    });
    if (item) {
      item.qty = Math.min(99, qty);
      saveCart(cart);
    }
    return cart;
  }

  function removeFromCart(sku) {
    const cart = getCart().filter(function (c) {
      return c.sku !== sku;
    });
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (parseInt(item.qty, 10) || 0);
    }, 0);
  }

  function getCartTotals(shippingCost) {
    const cart = getCart();
    const subtotal = cart.reduce(function (sum, item) {
      return sum + item.priceNum * item.qty;
    }, 0);
    const ongkir = cart.length > 0 ? (typeof shippingCost === "number" ? shippingCost : 18000) : 0;
    const grandTotal = subtotal + ongkir;
    return { subtotal: subtotal, ongkir: ongkir, grandTotal: grandTotal };
  }

  // Orders API
  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getOrderById(orderId) {
    return getOrders().find(function (o) {
      return o.id === orderId;
    });
  }

  function generateOrderId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return "INV-TCK-" + y + m + d + "-" + rand;
  }

  function createOrder(customer, shippingMethod) {
    const cart = getCart();
    if (cart.length === 0) return null;

    let ongkir = 18000;
    let shippingLabel = "Kurir Reguler (JNE / J&T)";
    if (shippingMethod === "express") {
      ongkir = 32000;
      shippingLabel = "Kurir Instan / Next Day";
    } else if (shippingMethod === "pickup") {
      ongkir = 0;
      shippingLabel = "Ambil di Workshop Bandung (Gratis)";
    }

    const totals = getCartTotals(ongkir);
    const orderId = generateOrderId();
    const nowIso = new Date().toISOString();

    const order = {
      id: orderId,
      createdAt: nowIso,
      paidAt: null,
      rejectedAt: null,
      status: "PENDING", // PENDING | PAID | REJECTED
      paymentMethod: "QRIS",
      qrisRef: "QRIS" + Date.now().toString().slice(-8),
      approvalRef: null,
      shippingMethod: shippingLabel,
      customer: {
        nama: customer.nama,
        telepon: customer.telepon,
        alamat: customer.alamat,
        kota: customer.kota,
        catatan: customer.catatan || ""
      },
      items: cart.map(function (c) {
        return {
          sku: c.sku,
          name: c.name,
          img: c.img,
          profile: c.profile,
          priceNum: c.priceNum,
          qty: c.qty,
          subtotal: c.priceNum * c.qty
        };
      }),
      subtotal: totals.subtotal,
      ongkir: totals.ongkir,
      grandTotal: totals.grandTotal
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCart();
    broadcastEvent("ORDER_CREATED", { orderId: order.id });
    return order;
  }

  function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(function (o) {
      return o.id === orderId;
    });
    if (!order) return null;

    order.status = newStatus;
    if (newStatus === "PAID") {
      order.paidAt = new Date().toISOString();
      order.approvalRef = "APR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    } else if (newStatus === "REJECTED") {
      order.rejectedAt = new Date().toISOString();
    }
    saveOrders(orders);
    broadcastEvent("ORDER_STATUS_CHANGED", { orderId: order.id, status: newStatus });
    return order;
  }

  function renderStatusBadge(status) {
    if (status === "PAID") {
      return '<span class="status-badge status-paid">&#10003; Paid / Lunas</span>';
    }
    if (status === "REJECTED") {
      return '<span class="status-badge status-rejected">&#10005; Ditolak</span>';
    }
    return '<span class="status-badge status-pending"><span class="pulse-dot"></span> Menunggu Bayar</span>';
  }

  // Deterministic Dummy QRIS SVG Generator (Pure JS, zero libraries)
  function generateDummyQrisSvg(seedText) {
    const size = 25;
    const cell = 8;
    const quiet = 16;
    const totalPx = size * cell + quiet * 2;

    let hash = 2166136261;
    const text = String(seedText || "TOKO-CUSTOM-KEYCAPS-QRIS");
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    function nextBit() {
      hash ^= hash << 13;
      hash ^= hash >>> 17;
      hash ^= hash << 5;
      return (hash >>> 0) % 2 === 1;
    }

    const grid = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });
    const reserved = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });

    function placeFinder(r0, c0) {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          reserved[rr][cc] = true;
          const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
          const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[rr][cc] = inOuter && (onBorder || inInner);
        }
      }
    }

    function placeAlignment(r0, c0) {
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          reserved[rr][cc] = true;
          grid[rr][cc] = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
        }
      }
    }

    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);
    placeAlignment(size - 7, size - 7);

    for (let i = 8; i < size - 8; i++) {
      reserved[6][i] = true;
      reserved[i][6] = true;
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    for (let r = 10; r <= 14; r++) {
      for (let c = 10; c <= 14; c++) {
        reserved[r][c] = true;
        grid[r][c] = false;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c]) {
          grid[r][c] = nextBit();
        }
      }
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          const x = quiet + c * cell;
          const y = quiet + r * cell;
          rects += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="#1c1c1e"/>';
        }
      }
    }

    const cx = totalPx / 2;
    const cy = totalPx / 2;

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalPx + '" height="' + totalPx + '" viewBox="0 0 ' + totalPx + " " + totalPx + '" role="img" aria-label="Kode QRIS">' +
      '<rect width="100%" height="100%" fill="#ffffff"/>' +
      rects +
      '<rect x="' + (cx - 24) + '" y="' + (cy - 13) + '" width="48" height="26" rx="4" fill="#ffffff" stroke="#1c1c1e" stroke-width="1.5"/>' +
      '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="800" fill="#1c1c1e">QRIS</text>' +
      "</svg>"
    );
  }

  // Shared Topbar & Footer
  function renderTopbar(activePage) {
    const holder = document.getElementById("site-topbar");
    if (!holder) return;

    const count = getCartCount();
    holder.innerHTML =
      "<header>" +
      '  <div class="container header-inner">' +
      '    <a href="index.html" class="brand">' +
      '      <div class="brand-icon">ESC</div>' +
      "      <div>" +
      '        <div class="brand-title">Toko Custom Keycaps</div>' +
      '        <div class="brand-sub">Koleksi Keycaps Mekanikal &amp; Artisan</div>' +
      "      </div>" +
      "    </a>" +
      '    <nav class="topbar-nav" aria-label="Navigasi Utama">' +
      '      <a href="index.html" class="nav-link ' + (activePage === "katalog" ? "active" : "") + '">Katalog</a>' +
      '      <a href="cart.html" class="nav-link ' + (activePage === "cart" ? "active" : "") + '">Keranjang <span class="cart-badge" id="nav-cart-count">' + count + "</span></a>" +
      '      <a href="history.html" class="nav-link ' + (activePage === "history" ? "active" : "") + '">Riwayat Transaksi</a>' +
      '      
      "    </nav>" +
      "  </div>" +
      "</header>";
  }

  function renderFooter() {
    const holder = document.getElementById("site-footer");
    if (!holder) return;
    const year = new Date().getFullYear();
    holder.innerHTML =
      "<footer>" +
      '  <div class="container footer-inner">' +
      "    <div>&copy; " + year + " Toko Custom Keycaps. Seluruh hak cipta dilindungi.</div>" +
      "    <div>Lokasi: Bandung, Indonesia &bull; Jam Operasional: 09.00 &ndash; 17.00 WIB</div>" +
      "  </div>" +
      "</footer>";
  }

  function updateNavBadge() {
    const badge = document.getElementById("nav-cart-count");
    if (badge) {
      badge.textContent = String(getCartCount());
    }
  }

  // Toast helper
  let toastTimer = null;
  function showToast(message) {
    let el = document.getElementById("tck-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "tck-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("show");
    }, 2400);
  }

  onRealtimeUpdate(function () {
    updateNavBadge();
  });

  window.TCKStore = {
    products: products,
    formatRupiah: formatRupiah,
    formatWaktu: formatWaktu,
    escapeHtml: escapeHtml,
    getCart: getCart,
    addToCart: addToCart,
    updateCartQty: updateCartQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotals: getCartTotals,
    getOrders: getOrders,
    getOrderById: getOrderById,
    createOrder: createOrder,
    updateOrderStatus: updateOrderStatus,
    renderStatusBadge: renderStatusBadge,
    generateDummyQrisSvg: generateDummyQrisSvg,
    renderTopbar: renderTopbar,
    renderFooter: renderFooter,
    updateNavBadge: updateNavBadge,
    showToast: showToast,
    onRealtimeUpdate: onRealtimeUpdate
  };
})();
