(function () {
  "use strict";

  const store = window.TCKStore;
  const root = document.getElementById("sim-root");
  const logEl = document.getElementById("sim-log");
  const params = new URLSearchParams(window.location.search);
  const focusOrderId = params.get("order") || "";

  function formatTime(iso) {
    if (!iso) return "-";
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function handleAction(orderId, newStatus) {
    const updated = store.updateOrderStatus(orderId, newStatus);
    if (!updated) return;

    logEl.textContent =
      "Terkirim realtime: " + orderId + " -> " + newStatus + " (" + formatTime(new Date().toISOString()) + ")";
    render();
  }

  function render() {
    const orders = store.getOrders();
    const pending = orders.filter(function (o) {
      return o.status === "PENDING";
    });
    const processed = orders.filter(function (o) {
      return o.status !== "PENDING";
    });

    if (focusOrderId) {
      pending.sort(function (a, b) {
        if (a.id === focusOrderId) return -1;
        if (b.id === focusOrderId) return 1;
        return 0;
      });
    }

    const pendingHtml =
      pending.length === 0
        ? '<div class="empty">Tidak ada pembayaran QRIS yang menunggu approval.</div>'
        : '<div class="list">' +
          pending.map(function (o) {
            const isFocus = focusOrderId && o.id === focusOrderId;
            return (
              '<div class="tx-card ' + (isFocus ? "highlight" : "") + '">' +
              "  <div>" +
              '    <div class="tx-id">' + store.escapeHtml(o.id) + (isFocus ? " &bull; TARGET" : "") + "</div>" +
              '    <div class="tx-meta">' + store.escapeHtml(o.customer.nama) + " &bull; " + store.escapeHtml(o.qrisRef) + " &bull; " + formatTime(o.createdAt) + "</div>" +
              '    <div class="tx-amount">' + store.formatRupiah(o.grandTotal) + "</div>" +
              "  </div>" +
              '  <div class="tx-actions">' +
              '    <button type="button" class="btn btn-approve" data-action="PAID" data-id="' + store.escapeHtml(o.id) + '">Approve</button>' +
              '    <button type="button" class="btn btn-reject" data-action="REJECTED" data-id="' + store.escapeHtml(o.id) + '">Reject</button>' +
              "  </div>" +
              "</div>"
            );
          }).join("") +
          "</div>";

    const processedHtml =
      processed.length === 0
        ? '<div class="empty">Belum ada transaksi yang diproses.</div>'
        : '<div class="list">' +
          processed.slice(0, 10).map(function (o) {
            const tag =
              o.status === "PAID"
                ? '<span class="tag tag-paid">PAID</span>'
                : '<span class="tag tag-rejected">REJECTED</span>';
            return (
              '<div class="tx-card">' +
              "  <div>" +
              '    <div class="tx-id">' + store.escapeHtml(o.id) + "</div>" +
              '    <div class="tx-meta">' + store.escapeHtml(o.customer.nama) + " &bull; " + store.formatRupiah(o.grandTotal) + "</div>" +
              "  </div>" +
              "  <div>" + tag + "</div>" +
              "</div>"
            );
          }).join("") +
          "</div>";

    root.innerHTML =
      '<div class="section-label">Menunggu Approval (' + pending.length + ")</div>" +
      pendingHtml +
      '<div class="section-label">Baru Diproses (' + processed.length + ")</div>" +
      processedHtml;
  }

  root.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    handleAction(id, action);
  });

  store.onRealtimeUpdate(function () {
    render();
  });

  setInterval(render, 1500);
  render();
})();
