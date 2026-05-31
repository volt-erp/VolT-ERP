const state = {
  page: "dashboard",
  cart: new Map(),
  invoices: [
    { id: "INV-2041", customer: "عميل نقدي", total: 28500, method: "نقدي", status: "مدفوعة" },
    { id: "INV-2040", customer: "شركة النور", total: 11800, method: "آجل", status: "مديونية" },
    { id: "INV-2039", customer: "مركز الصفا", total: 4320, method: "فودافون كاش", status: "مدفوعة" }
  ],
  quotes: [
    { id: "Q-778", customer: "شركة الأمان", total: 64700, valid: "7 أيام" },
    { id: "Q-777", customer: "مكتب هندسي", total: 23600, valid: "3 أيام" }
  ],
  customers: [
    { name: "شركة النور", phone: "01098845589", debt: 11800, segment: "VIP" },
    { name: "مركز الصفا", phone: "01124587633", debt: 0, segment: "نشط" },
    { name: "أحمد للتوريدات", phone: "01288334110", debt: 3200, segment: "متابعة" }
  ],
  suppliers: [
    { name: "النخبة للتوريدات", balance: 18400, last: "فاتورة شراء SSD" },
    { name: "دلتا تك", balance: 0, last: "عرض سعر طابعات" }
  ],
  purchases: [
    { id: "PUR-391", supplier: "النخبة للتوريدات", total: 37200, status: "تم الاستلام" },
    { id: "PO-117", supplier: "دلتا تك", total: 12800, status: "أمر شراء" }
  ],
  warehouses: [
    { name: "المخزن الرئيسي", code: "MAIN", value: 184000, movements: 42 },
    { name: "واجهة العرض", code: "SHOW", value: 69500, movements: 18 },
    { name: "مخزن الصيانة", code: "SRV", value: 22800, movements: 11 }
  ],
  services: [
    { id: "SRV-91", device: "HP 250 G9", issue: "تغيير SSD وتنصيب ويندوز", status: "قيد العمل", total: 1450 },
    { id: "SRV-90", device: "Lenovo IdeaPad", issue: "تنظيف وتغيير معجون", status: "جاهز للتسليم", total: 650 }
  ],
  expenses: [
    { name: "إيجار", amount: 7500 },
    { name: "إنترنت وكهرباء", amount: 1850 },
    { name: "مرتبات", amount: 18200 }
  ],
  employees: [
    { name: "كاشير 1", role: "Cashier", salary: 5200, shift: "مفتوح" },
    { name: "فني صيانة", role: "Technician", salary: 6800, shift: "متابعة" },
    { name: "مدير الفرع", role: "Manager", salary: 9000, shift: "مراجعة" }
  ],
  activities: [
    { user: "admin", action: "إضافة فاتورة", detail: "INV-2041" },
    { user: "cashier", action: "طباعة باركود", detail: "SSD NVMe" },
    { user: "manager", action: "نسخ احتياطي", detail: "SQLite DB" }
  ]
};

const products = [
  { id: 1, code: "LT", name: "HP EliteBook 840 G8", category: "لابتوبات", price: 24500, cost: 21400, qty: 8, min: 2 },
  { id: 2, code: "SSD", name: "SSD NVMe 512GB", category: "هاردات", price: 1850, cost: 1450, qty: 34, min: 8 },
  { id: 3, code: "MS", name: "Logitech Wireless Mouse", category: "اكسسوارات", price: 650, cost: 420, qty: 53, min: 10 },
  { id: 4, code: "KB", name: "Mechanical Keyboard RGB", category: "اكسسوارات", price: 1350, cost: 980, qty: 17, min: 5 },
  { id: 5, code: "PR", name: "طابعة حرارية USB", category: "طباعة", price: 3200, cost: 2600, qty: 6, min: 2 },
  { id: 6, code: "SRV", name: "خدمة صيانة كمبيوتر", category: "خدمات", price: 450, cost: 80, qty: 99, min: 1 }
];

const fmt = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });

function money(value) {
  return `${fmt.format(Number(value) || 0)} ج.م`;
}

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function toast(text = "تم") {
  const el = qs(".copy-toast");
  if (!el) return;
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 1900);
}

function cartRows() {
  return [...state.cart.values()];
}

function totals() {
  const subtotal = cartRows().reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal > 25000 ? Math.round(subtotal * 0.05) : 0;
  const tax = Math.round((subtotal - discount) * 0.14);
  const total = subtotal - discount + tax;
  return { subtotal, discount, tax, total };
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;
  const current = state.cart.get(product.id) || { ...product, qty: 0 };
  current.qty += 1;
  state.cart.set(product.id, current);
  renderMiniPage("dashboard");
  toast("تمت إضافة المنتج للسلة");
}

function removeFromCart(id) {
  state.cart.delete(Number(id));
  renderMiniPage("dashboard");
}

function finishSale() {
  const rows = cartRows();
  if (!rows.length) {
    toast("أضف منتجات للسلة أولا");
    return;
  }
  const total = totals().total;
  const id = `INV-${2042 + state.invoices.length}`;
  state.invoices.unshift({ id, customer: "عميل نقدي", total, method: "نقدي", status: "مدفوعة" });
  rows.forEach((row) => {
    const product = products.find((p) => p.id === row.id);
    if (product) product.qty = Math.max(0, product.qty - row.qty);
  });
  state.cart.clear();
  renderMiniPage("invoices");
  toast("تم إنشاء فاتورة تجريبية");
}

function pageMeta(page) {
  const map = {
    dashboard: ["الرئيسية", "نظرة سريعة على النشاط"],
    pos: ["نقطة البيع", "بيع سريع بنفس طريقة البرنامج"],
    products: ["المنتجات", "مخزون وصور وباركود وحد أدنى"],
    warehouses: ["المخازن", "حركات مخزون وتحويلات وتسويات"],
    purchases: ["المشتريات", "موردين وأوامر شراء ومرتجعات"],
    invoices: ["الفواتير", "عرض وطباعة وإرسال واتساب"],
    quotes: ["عروض الأسعار", "عرض سعر يتحول لفاتورة"],
    customers: ["العملاء والديون", "أرصدة ومتابعات وحملات"],
    whatsapp: ["حملات واتساب", "اختيار أرقام العملاء وإرسال رسائل"],
    service: ["الصيانة", "أوامر صيانة وخدمات"],
    finance: ["الحسابات", "خزنة وبنك ومصروفات وقيود"],
    staff: ["الموظفون", "رواتب وورديات وصلاحيات"],
    reports: ["التقارير", "ربح ومبيعات ومخزون"],
    activity: ["سجل النشاط", "متابعة عمليات المستخدمين"],
    settings: ["الإعدادات", "شركة ونسخ احتياطي وربط داخلي"]
  };
  return map[page] || map.dashboard;
}

function renderMiniPage(page = state.page) {
  state.page = page;
  const content = qs("#miniContent");
  if (!content) return;
  const [title, subtitle] = pageMeta(page);
  qs("#miniTitle").textContent = title;
  qs("#miniSubtitle").textContent = subtitle;
  qsa(".mini-nav").forEach((btn) => btn.classList.toggle("active", btn.dataset.miniPage === page));

  const renderers = {
    dashboard: renderDashboard,
    pos: renderPOS,
    products: renderProducts,
    warehouses: renderWarehouses,
    purchases: renderPurchases,
    invoices: renderInvoices,
    quotes: renderQuotes,
    customers: renderCustomers,
    whatsapp: renderWhatsApp,
    service: renderService,
    finance: renderFinance,
    staff: renderStaff,
    reports: renderReports,
    activity: renderActivity,
    settings: renderSettings
  };
  content.innerHTML = (renderers[page] || renderDashboard)();
  if (window.lucide) window.lucide.createIcons();
}

function renderDashboard() {
  const salesTotal = state.invoices.reduce((sum, inv) => sum + inv.total, 0);
  const lowStock = products.filter((p) => p.qty <= p.min).length;
  return `
    <div class="mini-kpi-grid">
      ${kpi("مبيعات اليوم", money(salesTotal), "+18%")}
      ${kpi("فواتير", state.invoices.length, "نشطة")}
      ${kpi("منتجات", products.length, `${lowStock} ناقص`)}
      ${kpi("أوامر صيانة", state.services.length, "متابعة")}
    </div>
    <div class="mini-grid two">
      <section class="mini-dashboard-hero">
        <span class="mini-muted">VolT Lightning Workspace</span>
        <strong>كل الأقسام متصلة في شاشة واحدة</strong>
        <p class="mini-muted">بيع، مخزون، ديون، صيانة، واتساب، تقارير، وصلاحيات.</p>
        <button class="mini-action" type="button" data-mini-page-link="pos">${icon("monitor-dot")} افتح نقطة البيع</button>
      </section>
      <section class="mini-panel">
        <h3>آخر العمليات <span class="mini-status">Live</span></h3>
        <div class="mini-list">
          ${state.invoices.slice(0, 3).map((inv) => row(inv.id, inv.customer, money(inv.total), inv.status)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderDashboard() {
  const salesTotal = state.invoices.reduce((sum, inv) => sum + inv.total, 0);
  const lowStock = products.filter((p) => p.qty <= p.min).length;
  const modules = [
    ["pos", "monitor-dot", "نقطة البيع", "بيع سريع، خصومات، تعليق فاتورة، طباعة، واتساب."],
    ["products", "package-check", "المنتجات والمخزون", "صور، باركود، فئات، وحدات، حد أدنى وتنبيهات."],
    ["warehouses", "warehouse", "المخازن والتحويلات", "مخازن متعددة، جرد، تسويات وتحويلات داخلية."],
    ["purchases", "truck", "المشتريات والموردين", "فواتير شراء، أوامر شراء، مرتجعات ومقارنة موردين."],
    ["invoices", "receipt-text", "الفواتير والطباعة", "عرض، إرسال، طباعة، استرجاع وتعليق فواتير."],
    ["quotes", "file-badge", "عروض الأسعار", "إنشاء عروض وتحويلها إلى فواتير عند الاعتماد."],
    ["customers", "users-round", "العملاء والديون", "أرصدة، شرائح، متابعة، تحصيل وكوبونات."],
    ["whatsapp", "send", "واتساب والحملات", "اختيار أرقام العملاء المسجلة وإرسال رسائل موجهة."],
    ["service", "wrench", "الصيانة والخدمات", "أوامر صيانة، حالة الجهاز، تكلفة وتسليم."],
    ["finance", "wallet-cards", "الحسابات والخزائن", "خزنة، بنك، مصروفات، قيود ورواتب."],
    ["staff", "badge-dollar-sign", "الموظفون والصلاحيات", "رواتب، ورديات، أدوار وصلاحيات استخدام."],
    ["reports", "chart-no-axes-combined", "التقارير والتحليل", "مبيعات، أرباح، تكلفة، مخزون وديون."],
    ["activity", "scroll-text", "سجل النشاط", "متابعة عمليات المستخدمين وحركة النظام."],
    ["settings", "settings", "الإعدادات والنسخ الاحتياطي", "بيانات الشركة، الربط الداخلي، النسخ والاستيراد."]
  ];

  return `
    <div class="mini-kpi-grid">
      ${kpi("مبيعات اليوم", money(salesTotal), "+18%")}
      ${kpi("فواتير", state.invoices.length, "نشطة")}
      ${kpi("منتجات", products.length, `${lowStock} تنبيه`)}
      ${kpi("أوامر صيانة", state.services.length, "متابعة")}
    </div>

    <section class="demo-command-center">
      <div>
        <span class="mini-status warn">منظومة كاملة</span>
        <strong>نظام متكامل لإدارة نشاطك بالكامل</strong>
        <p>التجربة تعرض وحدات VolT ERP الأساسية في مسارات تفاعلية: البيع، المخزون، المشتريات، العملاء، الحسابات، الصيانة، واتساب، التقارير والإعدادات.</p>
      </div>
      <div class="demo-command-actions">
        <button class="mini-action" type="button" data-mini-page-link="pos">${icon("monitor-dot")} فتح نقطة البيع</button>
        <button class="mini-action" type="button" data-mini-page-link="reports">${icon("chart-no-axes-combined")} عرض التقارير</button>
      </div>
    </section>

    <div class="demo-feature-flow">
      ${modules.map(([page, iconName, title, desc]) => `
        <button class="demo-feature-card" type="button" data-mini-page-link="${page}">
          ${icon(iconName)}
          <span>
            <strong>${title}</strong>
            <small>${desc}</small>
          </span>
        </button>
      `).join("")}
    </div>

    <div class="mini-grid two">
      <section class="mini-panel">
        <h3>آخر العمليات <span class="mini-status">Live</span></h3>
        <div class="mini-list">
          ${state.invoices.slice(0, 3).map((inv) => row(inv.id, inv.customer, money(inv.total), inv.status)).join("")}
        </div>
      </section>
      <section class="mini-panel">
        <h3>أقسام جاهزة للتجربة</h3>
        <div class="mini-list">
          ${row("المبيعات", "POS وفواتير وطباعة", "جاهز", "نشط")}
          ${row("المخزون", "منتجات ومخازن وجرد", "جاهز", "نشط")}
          ${row("الإدارة", "حسابات وتقارير وصلاحيات", "جاهز", "نشط")}
        </div>
      </section>
    </div>
  `;
}

function kpi(label, value, foot) {
  return `<article class="mini-kpi"><span>${label}</span><strong>${value}</strong><small>${foot}</small></article>`;
}

function row(a, b, c, status = "نشط", variant = "") {
  return `<div class="mini-list-row"><strong>${a}</strong><span>${b}</span><span>${c}</span><em class="mini-status ${variant}">${status}</em></div>`;
}

function renderPOS() {
  const t = totals();
  const rows = cartRows();
  return `
    <div class="mini-pos-layout">
      <section class="mini-panel">
        <div class="mini-toolbar">
          <input class="mini-input" placeholder="بحث باسم المنتج أو الباركود" />
          <select class="mini-select"><option>كل الفئات</option><option>لابتوبات</option><option>اكسسوارات</option><option>طباعة</option></select>
        </div>
        <div class="mini-products">
          ${products.map((p) => `
            <button class="mini-product" type="button" data-add-cart="${p.id}">
              <span class="mini-product-img">${p.code}</span>
              <strong>${p.name}</strong>
              <small>${money(p.price)} | مخزون ${p.qty}</small>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="mini-panel mini-cart">
        <h3>سلة البيع <span class="mini-status">POS</span></h3>
        <div class="mini-cart-items">
          ${rows.length ? rows.map((item) => `
            <div class="mini-cart-row">
              <div><strong>${item.name}</strong><small>${item.qty} × ${money(item.price)}</small></div>
              <button class="mini-icon-btn" type="button" data-remove-cart="${item.id}">×</button>
            </div>
          `).join("") : `<div class="demo-cart-empty">اختار منتج من الشبكة</div>`}
        </div>
        <div class="mini-cart-total">
          <div><span>الإجمالي</span><strong>${money(t.subtotal)}</strong></div>
          <div><span>خصم تلقائي</span><strong>${money(t.discount)}</strong></div>
          <div><span>ضريبة 14%</span><strong>${money(t.tax)}</strong></div>
          <div class="grand"><span>النهائي</span><strong>${money(t.total)}</strong></div>
          <button class="btn primary" type="button" data-finish-sale>${icon("receipt-text")} إنهاء البيع</button>
        </div>
      </section>
    </div>
  `;
}

function renderPOS() {
  const t = totals();
  const rows = cartRows();
  const invoiceCode = `INV-${String(state.invoices.length + 1).padStart(4, "0")}`;
  return `
    <div class="pos-pro">
      <section class="pos-catalog">
        <div class="pos-catalog-head">
          <div>
            <span class="mini-status warn">كاشير مباشر</span>
            <h3>نقطة البيع</h3>
            <p>اختيار سريع، باركود، أسعار، مخزون، فاتورة وواتساب من نفس الشاشة.</p>
          </div>
          <button class="mini-action" type="button" data-fake-save>${icon("scan-barcode")} قراءة باركود</button>
        </div>

        <div class="pos-search-row">
          <label class="pos-search">
            ${icon("search")}
            <input class="mini-input" placeholder="بحث باسم المنتج أو الباركود" />
          </label>
          <select class="mini-select">
            <option>كل الفئات</option>
            <option>لابتوبات</option>
            <option>اكسسوارات</option>
            <option>طباعة وخدمات</option>
          </select>
        </div>

        <div class="pos-chips" aria-label="فئات سريعة">
          <button type="button">الكل</button>
          <button type="button">الأكثر بيعاً</button>
          <button type="button">لابتوبات</button>
          <button type="button">اكسسوارات</button>
          <button type="button">خدمات</button>
        </div>

        <div class="pos-products">
          ${products.map((p) => `
            <button class="pos-card" type="button" data-add-cart="${p.id}">
              <span class="pos-card-art">
                <span>${p.code}</span>
              </span>
              <span class="pos-card-body">
                <strong>${p.name}</strong>
                <small>${p.category} | مخزون ${p.qty}</small>
                <em>${money(p.price)}</em>
              </span>
            </button>
          `).join("")}
        </div>
      </section>

      <section class="pos-checkout">
        <div class="pos-checkout-head">
          <div>
            <span>فاتورة حالية</span>
            <strong>${invoiceCode}</strong>
          </div>
          <em>${new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</em>
        </div>

        <div class="pos-mini-fields">
          <label>العميل<select class="mini-select"><option>عميل نقدي</option><option>شركة النور</option><option>مركز جيمينج</option></select></label>
          <label>الدفع<select class="mini-select"><option>نقدي</option><option>فيزا</option><option>محفظة</option><option>آجل</option></select></label>
          <label>خصم<input class="mini-input" value="${Math.round(t.discount)}" inputmode="decimal" /></label>
          <label>واتساب<input class="mini-input" placeholder="رقم العميل" inputmode="tel" /></label>
        </div>

        <div class="pos-cart-list">
          ${rows.length ? rows.map((item) => `
            <div class="pos-cart-item">
              <div>
                <strong>${item.name}</strong>
                <small>${item.qty} x ${money(item.price)}</small>
              </div>
              <span>${money(item.qty * item.price)}</span>
              <button class="mini-icon-btn" type="button" data-remove-cart="${item.id}" aria-label="حذف المنتج">x</button>
            </div>
          `).join("") : `<div class="demo-cart-empty">اضغط على أي منتج لإضافته للفاتورة</div>`}
        </div>

        <div class="pos-summary">
          <div><span>الإجمالي الفرعي</span><strong>${money(t.subtotal)}</strong></div>
          <div><span>الخصم</span><strong>${money(t.discount)}</strong></div>
          <div><span>ضريبة 14%</span><strong>${money(t.tax)}</strong></div>
          <div class="grand"><span>الإجمالي النهائي</span><strong>${money(t.total)}</strong></div>
        </div>

        <div class="pos-action-grid">
          <button class="mini-action" type="button" data-fake-save>${icon("pause-circle")} تعليق</button>
          <button class="mini-action" type="button" data-fake-whatsapp>${icon("message-circle")} واتساب</button>
          <button class="mini-action" type="button" data-fake-save>${icon("printer")} طباعة</button>
          <button class="btn primary" type="button" data-finish-sale>${icon("badge-check")} إتمام البيع</button>
        </div>
      </section>

      <aside class="pos-receipt-preview" aria-label="معاينة الفاتورة">
        <strong>معاينة الفاتورة</strong>
        <span>VolT ERP</span>
        <div>${invoiceCode}</div>
        ${rows.slice(0, 3).map((item) => `<p><b>${item.name}</b><em>${money(item.qty * item.price)}</em></p>`).join("")}
        <footer><span>الصافي</span><b>${money(t.total)}</b></footer>
      </aside>
    </div>
  `;
}

function renderProducts() {
  return `
    <div class="mini-form">
      <input class="mini-input wide" placeholder="اسم المنتج" />
      <input class="mini-input" placeholder="السعر" />
      <input class="mini-input" placeholder="الكمية" />
      <button class="mini-action" type="button" data-fake-save>${icon("plus")} إضافة منتج</button>
    </div>
    <section class="mini-panel">
      <h3>قائمة المنتجات <span class="mini-status warn">تنبيه حد أدنى</span></h3>
      <div class="mini-list">
        ${products.map((p) => row(p.name, p.category, `${money(p.price)} | ${p.qty} قطعة`, p.qty <= p.min ? "ناقص" : "متاح", p.qty <= p.min ? "danger" : "")).join("")}
      </div>
    </section>
  `;
}

function renderWarehouses() {
  return `
    <div class="mini-kpi-grid">
      ${kpi("عدد المخازن", state.warehouses.length, "نشط")}
      ${kpi("قيمة المخزون", money(state.warehouses.reduce((sum, w) => sum + w.value, 0)), "تقريبي")}
      ${kpi("حركات اليوم", state.warehouses.reduce((sum, w) => sum + w.movements, 0), "دخول وخروج")}
      ${kpi("تحويلات", 6, "بين المخازن")}
    </div>
    <section class="mini-panel">
      <h3>المخازن والتحويلات <button class="mini-action" type="button" data-fake-save>${icon("repeat")} تحويل مخزون</button></h3>
      <div class="mini-list">
        ${state.warehouses.map((w) => row(`${w.name} - ${w.code}`, `${w.movements} حركة`, money(w.value), "نشط")).join("")}
      </div>
    </section>
  `;
}

function renderPurchases() {
  return `
    <div class="mini-grid two">
      <section class="mini-panel">
        <h3>المشتريات <button class="mini-action" type="button" data-fake-save>${icon("file-plus")} فاتورة شراء</button></h3>
        <div class="mini-list">
          ${state.purchases.map((p) => row(p.id, p.supplier, money(p.total), p.status, p.status.includes("أمر") ? "warn" : "")).join("")}
        </div>
      </section>
      <section class="mini-panel">
        <h3>الموردون</h3>
        <div class="mini-list">
          ${state.suppliers.map((s) => row(s.name, s.last, money(s.balance), s.balance ? "رصيد" : "صافي", s.balance ? "warn" : "")).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderInvoices() {
  return `
    <section class="mini-panel">
      <h3>فواتير البيع <button class="mini-action" type="button" data-mini-page-link="pos">${icon("plus")} فاتورة جديدة</button></h3>
      <div class="mini-list">
        ${state.invoices.map((inv) => row(inv.id, `${inv.customer} | ${inv.method}`, money(inv.total), inv.status, inv.status === "مديونية" ? "warn" : "")).join("")}
      </div>
    </section>
  `;
}

function renderQuotes() {
  return `
    <section class="mini-panel">
      <h3>عروض الأسعار <button class="mini-action" type="button" data-fake-save>${icon("file-plus")} عرض جديد</button></h3>
      <div class="mini-list">
        ${state.quotes.map((quote) => row(quote.id, quote.customer, money(quote.total), `صالح ${quote.valid}`)).join("")}
      </div>
    </section>
  `;
}

function renderCustomers() {
  return `
    <div class="mini-grid three">
      ${state.customers.map((c) => `
        <article class="mini-customer">
          <strong>${c.name}</strong>
          <span>${c.phone}</span>
          <span>الرصيد: ${money(c.debt)}</span>
          <em class="mini-status ${c.debt ? "warn" : ""}">${c.segment}</em>
          <button class="mini-action" type="button" data-fake-whatsapp>${icon("message-circle")} رسالة واتساب</button>
        </article>
      `).join("")}
    </div>
  `;
}

function renderWhatsApp() {
  const selected = state.customers.length;
  return `
    <div class="mini-grid two">
      <section class="mini-panel">
        <h3>حملة واتساب <span class="mini-status">جاهزة</span></h3>
        <div class="mini-form">
          <input class="mini-input wide" value="عرض صيانة ولابتوبات جديد من VolT" />
          <button class="mini-action" type="button" data-fake-whatsapp>${icon("send")} إرسال للارقام المحددة</button>
        </div>
        <div class="mini-list">
          ${state.customers.map((c) => row(c.name, c.phone, c.segment, "محدد")).join("")}
        </div>
      </section>
      <section class="mini-panel">
        <h3>ملخص الحملة</h3>
        ${kpi("الأرقام المختارة", selected, "من العملاء")}
        ${kpi("رسائل محفوظة", 24, "سجل واتساب")}
      </section>
    </div>
  `;
}

function renderService() {
  return `
    <div class="mini-form">
      <input class="mini-input wide" placeholder="موديل الجهاز / رقم الاستلام" />
      <input class="mini-input wide" placeholder="العطل" />
      <button class="mini-action" type="button" data-fake-save>${icon("wrench")} أمر صيانة</button>
    </div>
    <div class="mini-grid two">
      ${state.services.map((srv) => `
        <article class="mini-service-card">
          <strong>${srv.id} - ${srv.device}</strong>
          <span>${srv.issue}</span>
          <span>${money(srv.total)}</span>
          <em class="mini-status ${srv.status.includes("جاهز") ? "" : "warn"}">${srv.status}</em>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFinance() {
  const expenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const sales = state.invoices.reduce((sum, inv) => sum + inv.total, 0);
  return `
    <div class="mini-kpi-grid">
      ${kpi("الخزنة", money(42150), "نقدي")}
      ${kpi("البنك", money(78500), "تحويلات")}
      ${kpi("مصروفات", money(expenses), "الشهر")}
      ${kpi("صافي تقديري", money(sales - expenses), "بعد المصروف")}
    </div>
    <section class="mini-panel">
      <h3>المصروفات والقيود</h3>
      <div class="mini-list">
        ${state.expenses.map((e) => row(e.name, "مصروف تشغيلي", money(e.amount), "مسجل")).join("")}
      </div>
    </section>
  `;
}

function renderStaff() {
  return `
    <div class="mini-grid two">
      <section class="mini-panel">
        <h3>الموظفون والرواتب</h3>
        <div class="mini-list">
          ${state.employees.map((e) => row(e.name, e.role, money(e.salary), e.shift, e.shift === "مفتوح" ? "warn" : "")).join("")}
        </div>
      </section>
      <section class="mini-panel">
        <h3>الصلاحيات</h3>
        ${row("Admin", "كل الصفحات", "حذف وتعديل", "كامل")}
        ${row("Manager", "تقارير ومخزون", "مراجعة", "مدير")}
        ${row("Cashier", "POS وفواتير", "بدون حذف", "كاشير")}
      </section>
    </div>
  `;
}

function renderReports() {
  const top = products.slice().sort((a, b) => b.price - a.price).slice(0, 4);
  return `
    <div class="mini-kpi-grid">
      ${kpi("صافي الربح", money(18420), "+12%")}
      ${kpi("تكلفة البضاعة", money(52400), "اليوم")}
      ${kpi("ديون العملاء", money(15000), "متابعة")}
      ${kpi("نقص مخزون", products.filter((p) => p.qty <= p.min).length, "تنبيه")}
    </div>
    <section class="mini-panel">
      <h3>أعلى المنتجات قيمة</h3>
      <div class="mini-bars">
        ${top.map((p) => `<div class="mini-bar"><span><b>${p.name}</b><b>${money(p.price)}</b></span><i style="width:${Math.max(20, Math.min(100, p.price / 260))}%"></i></div>`).join("")}
      </div>
    </section>
  `;
}

function renderActivity() {
  return `
    <section class="mini-panel">
      <h3>سجل النشاط <span class="mini-status">Audit</span></h3>
      <div class="mini-list">
        ${state.activities.map((a) => row(a.user, a.action, a.detail, "تم")).join("")}
      </div>
    </section>
  `;
}

function renderSettings() {
  return `
    <div class="mini-settings">
      <section class="mini-panel">
        <h3>بيانات المنشأة</h3>
        <input class="mini-input" value="VOLT Computer Store" />
        <br /><br />
        <input class="mini-input" value="01098845589" />
      </section>
      <section class="mini-panel">
        <h3>التشغيل والأمان</h3>
        ${row("نسخ احتياطي", "SQLite DB", "تلقائي عند الإغلاق", "نشط")}
        ${row("ربط داخلي", "LAN Port 4788", "رئيسي / تابع", "جاهز")}
        ${row("الصلاحيات", "Admin / Manager / Cashier", "صفحات وحذف", "مفعل")}
      </section>
    </div>
  `;
}

function initReveal() {
  const items = qsa(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function initNav() {
  const toggle = qs(".nav-toggle");
  const drawer = qs(".mobile-drawer");
  if (!toggle || !drawer) return;
  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = drawer.classList.toggle("is-open");
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
  });
  qsa("a", drawer).forEach((link) => link.addEventListener("click", close));
}

async function copyFromSelector(selector) {
  const text = qs(selector)?.textContent?.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    toast("تم نسخ البيانات");
  } catch {
    toast(text);
  }
}

function initEvents() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-open-demo]")) openDemo();
    if (event.target.closest("[data-close-demo]")) closeDemo();

    const nav = event.target.closest("[data-mini-page]");
    if (nav) renderMiniPage(nav.dataset.miniPage);

    const pageLink = event.target.closest("[data-mini-page-link]");
    if (pageLink) renderMiniPage(pageLink.dataset.miniPageLink);

    const add = event.target.closest("[data-add-cart]");
    if (add) addToCart(add.dataset.addCart);

    const remove = event.target.closest("[data-remove-cart]");
    if (remove) removeFromCart(remove.dataset.removeCart);

    if (event.target.closest("[data-finish-sale]")) finishSale();
    if (event.target.closest("[data-fake-save]")) toast("تم الحفظ داخل التجربة");
    if (event.target.closest("[data-fake-whatsapp]")) toast("تم تجهيز رسالة واتساب");
    if (event.target.closest("[data-mini-action='whatsapp']")) toast("مركز واتساب جاهز");
    if (event.target.closest("[data-mini-action='backup']")) toast("تم إنشاء نسخة احتياطية تجريبية");

    const copy = event.target.closest("[data-copy]");
    if (copy) copyFromSelector(copy.dataset.copy);

    const scrollButton = event.target.closest("[data-scroll]");
    if (scrollButton) qs(scrollButton.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDemo();
  });
}

function openDemo() {
  const modal = qs(".demo-modal");
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderMiniPage("dashboard");
}

function closeDemo() {
  const modal = qs(".demo-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  initReveal();
  initNav();
  initEvents();
  state.cart.set(1, { ...products[0], qty: 1 });
  state.cart.set(3, { ...products[2], qty: 1 });
  renderMiniPage("dashboard");
  if (new URLSearchParams(window.location.search).get("demo") === "1") openDemo();
});
