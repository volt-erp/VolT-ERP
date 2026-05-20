const pcDemoCode = document.querySelector("#pc-code")?.textContent.trim() || "";
const mobileDemoCode = document.querySelector("#mobile-code")?.textContent.trim() || "";
const whatsappUrl = "https://wa.me/201098845589?text=" + encodeURIComponent("السلام عليكم عايز تفاصيل VolT ERP");

const featureData = {
  overview: {
    kicker: "نظرة عامة",
    title: "VolT في لقطة واحدة",
    text: "نظام داخلي لإدارة البيع والمخزون والحسابات من الكمبيوتر والموبايل",
    image: "assets/pc/dashboard.png",
    points: ["واجهة مناسبة للكاشير والإدارة", "نسختان منفصلتان للكمبيوتر وأندرويد", "ربط داخلي اختياري بدون كلاود", "تجربة ديمو جاهزة للعميل"]
  },
  desktop: {
    kicker: "ويندوز",
    title: "نسخة الكمبيوتر",
    text: "النسخة الأساسية لإدارة المحل بالكامل من نقطة البيع حتى التقارير",
    image: "assets/pc/dashboard.png",
    points: ["كاشير ومبيعات ومشتريات", "مخزون وفئات وباركود", "صلاحيات وشيفتات ورواتب", "نسخ احتياطي وترخيص"]
  },
  mobile: {
    kicker: "أندرويد",
    title: "نسخة الموبايل",
    text: "تطبيق مستقل للبيع والمتابعة السريعة مع إمكانية الربط الداخلي عند الطلب",
    image: "assets/mobile/dashboard.png",
    points: ["واجهة موبايل متكيفة", "قراءة باركود بالكاميرا", "بيع وفواتير ومخزون", "ترخيص وتجربة 3 أيام"]
  },
  pos: {
    kicker: "نقطة البيع",
    title: "نقطة البيع",
    text: "شاشة كاشير سريعة وواضحة لتقليل وقت البيع وتسهيل التدريب",
    image: "assets/pc/pos.png",
    points: ["بحث بالاسم أو الباركود", "اختيار العميل وطريقة الدفع", "خصم وإجمالي فوري", "طباعة أو إرسال واتساب"],
    prints: ["إيصال كاشير", "فاتورة A4"]
  },
  whatsapp: {
    kicker: "واتساب",
    title: "فاتورة تصل للعميل",
    text: "الفاتورة تتجه للواتساب بشكل مرتب بدل الرسائل العشوائية",
    image: "assets/mobile/whatsapp-preview.png",
    visual: "whatsapp",
    points: ["بيع ومشتريات وعروض أسعار", "رقم العميل من الفاتورة", "معاينة قبل الإرسال", "مناسب للتعامل اليومي مع العملاء"],
    prints: ["فاتورة A4", "معاينة واتساب", "PDF داخل المحادثة"]
  },
  barcode: {
    kicker: "باركود",
    title: "طباعة باركود",
    text: "توليد باركود وقراءة ماسح وطباعة باركود للمنتجات",
    image: "assets/pc/products.png",
    visual: "barcode",
    points: ["توليد باركود داخل المنتج", "دعم الماسح التقليدي", "كاميرا في نسخة الموبايل", "طباعة باركود للمنتج"],
    prints: ["باركود لاصق"]
  },
  printing: {
    kicker: "الطباعة",
    title: "شكل طباعة جاهز",
    text: "مخرجات طباعة واضحة حسب نوع العملية — بما فيها الفاتورة الضريبية بالبيانات الرسمية للمنشأة",
    image: "assets/pc/sales.png",
    visual: "print",
    points: ["فاتورة A4 منظمة", "فاتورة ضريبية بالرقم الضريبي والسجل التجاري", "طباعة حرارية سريعة", "باركود لاصق للمنتجات", "تقرير قابل للطباعة"],
    prints: ["A4", "فاتورة ضريبية", "طباعة حرارية", "باركود لاصق", "تقرير A4"]
  },
  inventory: {
    kicker: "المخزون",
    title: "مخزون واضح",
    text: "كل منتج ظاهر بسعره وكميته وحده الأدنى بدون تعقيد",
    image: "assets/pc/products.png",
    points: ["فئات ووحدات وأسعار", "تنبيه نقص المخزون", "حالة المنتج والباركود", "تحديث تلقائي بعد البيع"]
  },
  units: {
    kicker: "وحدات البيع",
    title: "بيع حسب طبيعة المنتج",
    text: "المنتج مش لازم يتباع قطعة فقط، تقدر تحدد الوحدة المناسبة لنشاطك زي متر أو لتر أو كيلو أو كرتون",
    image: "assets/pc/products.png",
    visual: "units",
    points: ["بيع بالقطعة أو الطقم", "مناسب للمتر واللتر والكيلو", "كرتون أو علبة حسب نشاطك", "وحدة المنتج تظهر داخل بيانات المنتج والفاتورة"]
  },
  reports: {
    kicker: "التقارير",
    title: "تقارير قرار",
    text: "الأرقام المهمة تظهر في مكان واحد لتفهم البيع والربح والتكلفة",
    image: "assets/pc/reports.png",
    points: ["إجمالي المبيعات", "تكلفة البضاعة", "هامش الربح", "مصروفات ورواتب ومنتجات أكثر مبيعا"],
    prints: ["تقرير A4", "ملخص حسابات"]
  },
  people: {
    kicker: "الحسابات",
    title: "عملاء وموردين",
    text: "متابعة التعاملات والمدفوعات والديون بدون دفتر خارجي",
    image: "assets/pc/purchases.png",
    visual: "cards",
    points: ["بيانات العملاء والموردين", "ديون وآجل ومدفوعات", "مشتريات وموردين", "سجل واضح للعمليات"]
  },
  purchases: {
    kicker: "المشتريات",
    title: "المشتريات والموردين",
    text: "إدارة فواتير الشراء وربطها بالموردين وتكلفة المخزون",
    image: "assets/pc/purchases.png",
    points: ["فاتورة مشتريات كاملة", "ربط كل فاتورة بالمورد", "تحديث تكلفة وكميات المنتجات", "إرسال أو طباعة الفاتورة عند الحاجة"],
    prints: ["فاتورة مشتريات", "واتساب مورد"]
  },
  supplierCompare: {
    kicker: "الموردين",
    title: "مقارنة الموردين",
    text: "مقارنة تكلفة المنتج عند أكثر من مورد لتسهيل قرار الشراء",
    image: "assets/mobile/dashboard.png",
    visual: "cards",
    points: ["عرض الموردين المختلفين", "مقارنة تكلفة شراء المنتج", "توضيح المنتجات المشتركة", "قرار شراء أسرع وأوضح"]
  },
  returns: {
    kicker: "المرتجعات",
    title: "المرتجعات والهالك",
    text: "تسجيل المرتجعات والتالف بدون فقدان أثر العملية على المخزون",
    image: "assets/mobile/sales-actions.png",
    visual: "cards",
    points: ["مرتجع بيع", "هالك وتالف في العرض", "سبب العملية محفوظ", "تأثير واضح على المخزون"]
  },
  quotes: {
    kicker: "عروض الأسعار",
    title: "عروض الأسعار",
    text: "تجهيز عرض سعر للعميل قبل البيع مع طباعة أو واتساب",
    image: "assets/pc/quotes.png",
    points: ["عرض سعر منظم", "صلاحية العرض", "تحويل أسهل لعملية بيع", "إرسال واتساب أو طباعة"],
    prints: ["عرض سعر A4", "واتساب عميل"]
  },
  finance: {
    kicker: "المالية",
    title: "الإيرادات والمصروفات",
    text: "متابعة حركة الفلوس اليومية من مبيعات ومشتريات ومصروفات",
    image: "assets/pc/reports.png",
    points: ["إيرادات تلقائية من المبيعات", "مصروفات بفئات واضحة", "رواتب ضمن الحسابات", "ملخص ربح وخسارة"]
  },
  debts: {
    kicker: "الآجل",
    title: "الديون والآجل",
    text: "إدارة العملاء المدينين والمدفوعات الأخيرة بشكل واضح",
    image: "assets/mobile/dashboard.png",
    visual: "cards",
    points: ["إجمالي الدين لكل عميل", "سجل المدفوعات", "ربط الدين بالفواتير", "متابعة الرصيد المتبقي"]
  },
  staff: {
    kicker: "الفريق",
    title: "صلاحيات ورواتب",
    text: "تحكم في الموظفين والصفحات المسموحة وسجل النشاط",
    image: "assets/pc/license.png",
    visual: "cards",
    points: ["صلاحيات لكل مستخدم", "فتح شيفت حسب الصلاحية", "رواتب وبدلات وخصومات", "سجل نشاط للمتابعة"]
  },
  salaries: {
    kicker: "الرواتب",
    title: "رواتب الموظفين",
    text: "تسجيل صرف الرواتب مع البدلات والخصومات والصافي",
    image: "assets/mobile/license.png",
    visual: "cards",
    points: ["راتب أساسي", "بدلات وخصومات", "صافي الراتب", "إرسال واتساب أو طباعة"],
    prints: ["إيصال راتب", "واتساب موظف"]
  },
  shifts: {
    kicker: "الشيفتات",
    title: "إدارة الشيفتات",
    text: "فتح وقفل الشيفت مع متابعة الدرج والمفروض والفعلي",
    image: "assets/mobile/license.png",
    visual: "cards",
    points: ["فتح شيفت بصلاحية", "مبلغ أول الدرج", "مبيعات الشيفت", "فرق العجز أو الزيادة"]
  },
  permissions: {
    kicker: "الصلاحيات",
    title: "المستخدمين والصلاحيات",
    text: "كل موظف يرى الصفحات المسموحة له فقط مع تحكم في الحذف",
    image: "assets/mobile/license.png",
    visual: "cards",
    points: ["أدوار أدمن ومدير وموظف", "صلاحيات صفحات محددة", "صلاحية فتح الشيفت", "تسجيل نشاط المستخدمين"]
  },
  activity: {
    kicker: "سجل النشاط",
    title: "سجل النشاط",
    text: "متابعة آخر العمليات داخل النظام ومعرفة المستخدم والإجراء والتفاصيل",
    image: "assets/pc/license.png",
    visual: "cards",
    points: ["تسجيل دخول", "حفظ وتعديل وحذف", "تفعيل تراخيص", "تفاصيل العملية والمستخدم"]
  },
  license: {
    kicker: "الترخيص",
    title: "التراخيص والسيريالات",
    text: "تفعيل النسخ بالسيريال مع ديمو يبدأ من لحظة التفعيل",
    image: "assets/pc/license.png",
    points: ["ترخيص مدفوع", "ديمو ويندوز 7 أيام", "ديمو أندرويد 3 أيام", "كود جهاز للنسخ المقيدة"]
  },
  backup: {
    kicker: "النسخ الاحتياطي",
    title: "النسخ الاحتياطي والاستيراد",
    text: "حماية البيانات بإجراءات حفظ واستيراد وتصدير واضحة",
    image: "assets/pc/dashboard.png",
    visual: "cards",
    points: ["نسخة احتياطية الآن", "فتح مجلد النسخ", "استيراد قاعدة بيانات", "استيراد منتجات CSV"]
  },
  network: {
    kicker: "الشبكة",
    title: "ربط داخلي بدون كلاود",
    text: "الجهاز الرئيسي يمسك البيانات والتابع يقرأ منه داخل نفس الشبكة",
    image: "assets/pc/license.png",
    visual: "cards",
    points: ["مناسب للمحل أو الفرع", "لا يحتاج كلاود للتشغيل الداخلي", "تابع بسعر أقل عند البيع", "الموبايل يقدر يدخل ضمن نفس الشبكة"]
  },
  sales: {
    kicker: "الفواتير",
    title: "فواتير البيع",
    text: "قائمة فواتير منظمة مع إجراءات الطباعة والواتساب والمعاينة — وكل فاتورة تحمل بيانات المنشأة الرسمية",
    image: "assets/pc/sales.png",
    points: ["بحث في الفواتير", "عرض وطباعة وحذف حسب الصلاحية", "واتساب مباشر", "السجل التجاري والرقم الضريبي يظهران على الفاتورة"],
    prints: ["فاتورة A4", "فاتورة ضريبية", "إيصال كاشير", "واتساب عميل"]
  },
  taxInvoice: {
    kicker: "الفاتورة الضريبية",
    title: "فاتورة ضريبية معتمدة",
    text: "VolT يطبع فاتورة ضريبية كاملة تحتوي على الضريبة المضافة والبيانات الرسمية للمنشأة — مناسب للشركات والأنشطة التجارية الرسمية",
    image: "assets/pc/sales.png",
    visual: "print",
    points: [
      "عرض قيمة الضريبة المضافة (VAT) على الفاتورة",
      "الرقم الضريبي للمنشأة يظهر في رأس الفاتورة",
      "السجل التجاري يظهر بجانب بيانات النشاط",
      "الإجمالي قبل وبعد الضريبة بشكل واضح",
      "متوافقة مع متطلبات الفوترة الرسمية"
    ],
    prints: ["فاتورة ضريبية A4", "إيصال ضريبي حراري"]
  },
  businessInfo: {
    kicker: "بيانات المنشأة",
    title: "السجل التجاري والرقم الضريبي",
    text: "تقدر تضيف بيانات نشاطك التجاري مرة واحدة وتظهر تلقائياً على كل فواتيرك — سجل تجاري، رقم ضريبي، عنوان الفرع",
    image: "assets/pc/dashboard.png",
    visual: "cards",
    points: [
      "اسم المنشأة والشعار في رأس كل فاتورة",
      "الرقم الضريبي يظهر على الفاتورة الضريبية والعادية",
      "السجل التجاري لإثبات الهوية الرسمية",
      "عنوان النشاط والفرع",
      "إعداد مرة واحدة — يظهر على كل الفواتير والتقارير"
    ],
    prints: ["فاتورة A4", "فاتورة ضريبية", "واتساب عميل"]
  },
  updates: {
    kicker: "التطوير",
    title: "تحديثات وميزات حسب نشاطك",
    text: "VolT قابل للتطوير مع التشغيل الفعلي، ولو نشاطك محتاج ميزة مخصوصة نقدر نضيفها حسب الاتفاق",
    image: "assets/pc/dashboard.png",
    visual: "cards",
    points: ["تحديثات وتحسينات مستمرة", "إضافة ميزة تناسب نشاطك", "تطوير مبني على استخدام حقيقي", "تحسين تجربة البيع والإدارة مع الوقت"]
  }
};

const featureKeys = Object.keys(featureData);
let currentFeatureKey = "overview";

const botAnswers = [
  {
    keys: ["سعر", "شراء", "اشترك", "اشتراك", "كام", "ثمن"],
    answer: "تقدر تشتري اشتراك سنة أو ترخيص دائم، الكمبيوتر بسعر مستقل والموبايل بسعر مستقل والجهاز التابع بسعر أقل لأنه يعمل على بيانات الرئيسي داخل الشبكة، اضغط شراء أو ابعت واتساب وحدد النسخة المطلوبة"
  },
  {
    keys: ["ديمو", "تجربة", "كود", "سيريال", "ترخيص"],
    answer: `كود الكمبيوتر يعمل 7 أيام من لحظة التفعيل\n${pcDemoCode}\n\nكود أندرويد يعمل 3 أيام من لحظة التفعيل\n${mobileDemoCode}`
  },
  {
    keys: ["ربط", "شبكة", "رئيسي", "تابع", "كلاود", "محلي"],
    answer: "VolT يعمل داخلي بدون كلاود، جهاز رئيسي يحتفظ بقاعدة البيانات، الأجهزة التابعة أو الموبايل تقرأ من الرئيسي داخل نفس الشبكة"
  },
  {
    keys: ["باركود", "تيكت", "استيكر", "ماسح", "كاميرا"],
    answer: "البرنامج يدعم توليد باركود للمنتجات وقراءة الماسح، نسخة أندرويد تضيف قراءة بالكاميرا، ويمكن تجهيز طباعة باركود للمنتج"
  },
  {
    keys: ["واتساب", "فاتورة", "ارسال", "عميل"],
    answer: "يمكن إرسال الفاتورة للعميل على واتساب بشكل منظم، مناسب للبيع وعروض الأسعار والفواتير اليومية"
  },
  {
    keys: ["ضريبي", "ضريبة", "ضريبية", "vat", "القيمة المضافة"],
    answer: "VolT يدعم الفاتورة الضريبية الكاملة — يظهر عليها الرقم الضريبي للمنشأة وقيمة الضريبة المضافة والإجمالي قبل وبعد الضريبة، مناسب للشركات والأنشطة الرسمية"
  },
  {
    keys: ["سجل تجاري", "رقم ضريبي", "منشأة", "بيانات الشركة", "بيانات النشاط", "شعار", "عنوان"],
    answer: "تقدر تضيف بيانات نشاطك مرة واحدة من الإعدادات — اسم المنشأة، الشعار، الرقم الضريبي، السجل التجاري، والعنوان — وكلهم يظهروا تلقائياً على كل فواتيرك وتقاريرك"
  },
  {
    keys: ["ويندوز", "كمبيوتر", "اندرويد", "موبايل", "نسخة"],
    answer: "نسخة الكمبيوتر للإدارة الكاملة، نسخة أندرويد للبيع والمتابعة السريعة، كل نسخة منتج مستقل، الربط بينهم اختياري داخل الشبكة"
  },
  {
    keys: ["مخزون", "منتج", "منتجات", "كمية", "فئات"],
    answer: "المخزون يدعم المنتجات والفئات والوحدات والأسعار والحد الأدنى، أي بيع ينعكس على الكمية مباشرة"
  },
  {
    keys: ["وحدة", "وحدات", "قطعة", "متر", "لتر", "كيلو", "كرتون", "علبة", "طقم"],
    answer: "VolT يدعم وحدات بيع مختلفة حسب المنتج: قطعة أو متر أو لتر أو كيلو أو علبة أو كرتون أو طقم، عشان طريقة البيع تبقى مناسبة لطبيعة نشاطك"
  },
  {
    keys: ["مشتريات", "مورد", "موردين", "شراء"],
    answer: "المشتريات داخل VolT ERP مرتبطة بالموردين وتحدث الكميات والتكلفة، تقدر تراجع فواتير الشراء وتطبعها أو ترسلها واتساب"
  },
  {
    keys: ["مقارنة", "موردين", "أفضل مورد", "تكلفة شراء"],
    answer: "فيه مقارنة موردين لمعرفة تكلفة المنتج عند أكثر من مورد ومساعدة الإدارة في قرار الشراء"
  },
  {
    keys: ["مرتجع", "مرتجعات", "هالك", "تالف"],
    answer: "فيه إدارة للمرتجعات والهالك، تقدر تسجل مرتجع بيع أو تالف مع السبب ويتحدث أثره على المخزون"
  },
  {
    keys: ["عرض", "عروض", "اسعار", "أسعار", "quote"],
    answer: "عروض الأسعار موجودة، تقدر تعمل عرض سعر للعميل وتطبعه أو تبعته واتساب وتتابع حالته"
  },
  {
    keys: ["عميل", "عملاء", "دين", "ديون", "آجل", "اجل", "مدفوعات"],
    answer: "العملاء والديون والآجل موجودين، تقدر تتابع إجمالي الدين وسجل المدفوعات والفواتير المرتبطة بكل عميل"
  },
  {
    keys: ["تقارير", "ربح", "مصروفات", "مبيعات", "تكلفة"],
    answer: "التقارير تعرض المبيعات وتكلفة البضاعة وهامش الربح والمصروفات والرواتب وأكثر المنتجات مبيعا"
  },
  {
    keys: ["موظف", "صلاحيات", "شيفت", "رواتب", "كاشير"],
    answer: "إدارة الموظفين تشمل صلاحيات الصفحات وفتح الشيفت والرواتب والبدلات والخصومات وسجل النشاط"
  },
  {
    keys: ["نسخ", "احتياطي", "استيراد", "تصدير", "csv", "قاعدة"],
    answer: "الإعدادات تشمل نسخ احتياطي وفتح مجلد النسخ واستيراد قاعدة بيانات واستيراد منتجات CSV"
  },
  {
    keys: ["نشاط", "سجل", "لوج", "audit"],
    answer: "سجل النشاط يوضح آخر العمليات داخل النظام مثل تسجيل الدخول والحفظ والتعديل والتفعيل مع المستخدم والتفاصيل"
  },
  {
    keys: ["تحديث", "تطوير", "ميزة", "مخصوص", "إضافة", "اضافة"],
    answer: "فيه تحديثات وتحسينات مستمرة، ولو نشاطك محتاج ميزة خاصة أو تعديل في طريقة التشغيل، نقدر نضيفها حسب الاتفاق وطبيعة الشغل"
  },
  {
    keys: ["تركيب", "تثبيت", "تحميل", "apk", "exe"],
    answer: "من قسم التحميل تقدر تنزل نسخة ويندوز ونسخة أندرويد، ولو محتاج تركيب على الشبكة الداخلية تواصل واتساب"
  }
];

function bootIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function setTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    const icon = nextTheme === "dark" ? "sun" : "moon";
    const text = nextTheme === "dark" ? "فاتح" : "داكن";
    toggle.innerHTML = `<i data-lucide="${icon}"></i><span>${text}</span>`;
  }
  try {
    localStorage.setItem("volt-theme", nextTheme);
  } catch {}
  bootIcons();
}

function initTheme() {
  let storedTheme = "dark";
  try {
    storedTheme = localStorage.getItem("volt-theme") || "dark";
  } catch {}
  setTheme(storedTheme);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  showToast("تم النسخ");
}

function createBarcodePreview() {
  const wrap = document.createElement("div");
  wrap.className = "barcode-preview visual-extra";

  const head = document.createElement("div");
  head.className = "barcode-head";
  head.innerHTML = '<i data-lucide="printer-check"></i><strong>طباعة باركود لاصق</strong><span>جاهز للمنتج</span>';
  wrap.appendChild(head);

  [
    ["Lenovo IdeaPad", "622260000014"],
    ["HP 250 G9", "622260000015"],
    ["RAM DDR4 16GB", "622260000016"],
    ["SSD Kingston", "622260000017"]
  ].forEach(([name, code]) => {
    const label = document.createElement("div");
    label.className = "barcode-label";
    const title = document.createElement("strong");
    title.textContent = name;
    const bars = document.createElement("span");
    bars.className = "barcode-lines";
    const small = document.createElement("small");
    small.textContent = code;
    label.append(title, bars, small);
    wrap.appendChild(label);
  });

  return wrap;
}

function createUnitsPreview() {
  const wrap = document.createElement("div");
  wrap.className = "units-preview visual-extra";

  const head = document.createElement("div");
  head.className = "units-head";
  head.innerHTML = '<i data-lucide="ruler"></i><strong>وحدات بيع مرنة</strong><span>حسب طبيعة المنتج</span>';
  wrap.appendChild(head);

  const form = document.createElement("div");
  form.className = "units-form";
  form.innerHTML = `
    <label><span>اسم المنتج</span><b>كابل شحن سريع</b></label>
    <label><span>الفئة</span><b>إكسسوارات</b></label>
    <label><span>سعر البيع</span><b>250 ج.م</b></label>
    <label class="unit-select"><span>الوحدة</span><b>متر</b></label>
  `;
  wrap.appendChild(form);

  const units = document.createElement("div");
  units.className = "units-list";
  ["قطعة", "متر", "لتر", "كيلو", "علبة", "كرتون", "طقم"].forEach((unit, index) => {
    const chip = document.createElement("span");
    chip.textContent = unit;
    if (index === 1) chip.className = "is-active";
    units.appendChild(chip);
  });
  wrap.appendChild(units);

  return wrap;
}

function createPrintPreview() {
  const wrap = document.createElement("div");
  wrap.className = "print-suite visual-extra";

  const title = document.createElement("div");
  title.className = "print-suite-title";
  title.innerHTML = '<i data-lucide="printer"></i><strong>مخرجات الطباعة</strong><span>كل نوع له شكل مناسب</span>';
  wrap.appendChild(title);

  [
    { src: "assets/samples/print-quote-a4-page.png", title: "A4" },
    { src: "assets/samples/print-thermal-page.png", title: "طباعة حرارية" }
  ].forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "print-real-sample";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    const caption = document.createElement("figcaption");
    caption.textContent = item.title;
    figure.append(img, caption);
    wrap.appendChild(figure);
  });

  const types = [
    { cls: "sticker-print", title: "باركود لاصق", lines: ["اسم المنتج", "باركود واضح", "كود رقمي"] },
    { cls: "report-print", title: "تقرير A4", lines: ["مبيعات", "مصروفات", "صافي الربح"] }
  ];

  types.forEach((item) => {
    const card = document.createElement("article");
    card.className = `print-card ${item.cls}`;
    const heading = document.createElement("strong");
    heading.textContent = item.title;
    card.appendChild(heading);
    item.lines.forEach((line) => {
      const row = document.createElement("span");
      row.textContent = line;
      card.appendChild(row);
    });
    if (item.cls === "sticker-print") {
      const bars = document.createElement("b");
      bars.className = "barcode-lines";
      card.appendChild(bars);
    }
    wrap.appendChild(card);
  });

  return wrap;
}

function createWhatsappPreview() {
  const phone = document.createElement("div");
  phone.className = "wa-phone visual-extra";

  const top = document.createElement("div");
  top.className = "wa-top";
  top.innerHTML = "<span></span><strong>فواتير VolT</strong>";
  phone.appendChild(top);

  const chat = document.createElement("div");
  chat.className = "wa-chat";

  [
    {
      src: "assets/samples/print-quote-a4-page.png",
      file: "_POS-1779016638668.pdf",
      meta: "1 page · PDF · فاتورة بيع",
      time: "2:17 PM"
    },
    {
      src: "assets/samples/print-thermal-page.png",
      file: "_Gamal_1779016899202.pdf",
      meta: "1 page · PDF · إيصال راتب",
      time: "2:21 PM"
    }
  ].forEach((item) => {
    const bubble = document.createElement("div");
    bubble.className = "wa-bubble";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.file;
    const info = document.createElement("div");
    const file = document.createElement("strong");
    file.textContent = item.file;
    const meta = document.createElement("span");
    meta.textContent = item.meta;
    info.append(file, meta);
    const time = document.createElement("small");
    time.textContent = item.time;
    bubble.append(img, info, time);
    chat.appendChild(bubble);
  });

  phone.appendChild(chat);
  return phone;
}

function createCardsPreview(data) {
  const wrap = document.createElement("div");
  wrap.className = "feature-preview visual-extra";

  const head = document.createElement("div");
  head.className = "feature-preview-head";
  const kicker = document.createElement("span");
  kicker.textContent = data.kicker;
  const title = document.createElement("strong");
  title.textContent = data.title;
  head.append(kicker, title);
  wrap.appendChild(head);

  data.points.forEach((point, index) => {
    const card = document.createElement("div");
    card.className = "feature-preview-card";
    const number = document.createElement("small");
    number.textContent = String(index + 1).padStart(2, "0");
    const text = document.createElement("span");
    text.textContent = point;
    card.append(number, text);
    wrap.appendChild(card);
  });

  return wrap;
}

function createPrintStrip(items) {
  const strip = document.createElement("div");
  strip.className = "print-strip visual-extra";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    strip.appendChild(chip);
  });
  return strip;
}

function openFeature(key) {
  const resolvedKey = featureData[key] ? key : "overview";
  currentFeatureKey = resolvedKey;
  const data = featureData[resolvedKey];
  const modal = document.querySelector(".feature-modal");
  const visual = document.querySelector(".modal-visual");
  const image = document.querySelector("#modal-image");
  if (!modal || !visual || !image) return;
  document.querySelector("#modal-kicker").textContent = data.kicker;
  document.querySelector("#modal-title").textContent = data.title;
  document.querySelector("#modal-text").textContent = data.text;

  visual.querySelectorAll(".visual-extra").forEach((node) => node.remove());
  const visualType = data.visual || (data.image.includes("/mobile/") ? "mobile" : "desktop");
  visual.className = `modal-visual is-${visualType}`;

  if (visualType === "barcode") {
    image.hidden = true;
    visual.appendChild(createBarcodePreview());
  } else if (visualType === "cards") {
    image.hidden = true;
    visual.appendChild(createCardsPreview(data));
  } else if (visualType === "units") {
    image.hidden = true;
    visual.appendChild(createUnitsPreview());
  } else if (visualType === "print") {
    image.hidden = true;
    visual.appendChild(createPrintPreview());
  } else if (visualType === "whatsapp") {
    image.hidden = true;
    visual.appendChild(createWhatsappPreview());
  } else {
    image.hidden = false;
    image.src = data.image;
    image.alt = data.title;
  }

  if (data.prints && visualType !== "print") {
    visual.appendChild(createPrintStrip(data.prints));
  }

  const list = document.querySelector("#modal-points");
  list.innerHTML = "";
  data.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    list.appendChild(li);
  });
  const counter = document.querySelector("#modal-counter");
  if (counter) {
    const index = featureKeys.indexOf(resolvedKey);
    counter.textContent = `${index + 1} / ${featureKeys.length}`;
  }
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  bootIcons();
}

function navigateFeature(direction) {
  const currentIndex = Math.max(0, featureKeys.indexOf(currentFeatureKey));
  const step = direction === "next" ? 1 : -1;
  const nextIndex = (currentIndex + step + featureKeys.length) % featureKeys.length;
  openFeature(featureKeys[nextIndex]);
}

function closeFeature() {
  const modal = document.querySelector(".feature-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addAssistantMessage(text, type = "bot") {
  const messages = document.querySelector("#assistant-messages");
  if (!messages) return;
  const bubble = document.createElement("div");
  bubble.className = type === "user" ? "user-message" : "bot-message";
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function answerQuestion(question) {
  const normalized = question.toLowerCase();
  const found = botAnswers.find((item) => item.keys.some((key) => normalized.includes(key)));
  if (found) return found.answer;
  return "اسألني عن الشراء أو الاشتراك السنوي أو الترخيص الدائم أو الديمو أو الربط الداخلي، ولو عايز تحجز النسخة اضغط واتساب";
}

function toggleAssistant(open) {
  const panel = document.querySelector(".assistant-panel");
  const launcher = document.querySelector(".assistant-launcher");
  if (!panel || !launcher) return;
  const shouldOpen = typeof open === "boolean" ? open : !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", shouldOpen);
  panel.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
  launcher.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
}

function openDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const toggle = document.querySelector(".nav-toggle");
  if (!drawer) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  overlay && overlay.classList.add("is-open");
  toggle && toggle.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const toggle = document.querySelector(".nav-toggle");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  overlay && overlay.classList.remove("is-open");
  toggle && toggle.classList.remove("is-open");
  document.body.style.overflow = "";
}

function wireEvents() {
  // Drawer
  document.querySelector(".nav-toggle")?.addEventListener("click", openDrawer);
  document.querySelector(".drawer-close")?.addEventListener("click", closeDrawer);
  document.getElementById("drawer-overlay")?.addEventListener("click", closeDrawer);
  document.querySelectorAll(".drawer-link").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.copy);
      if (target) copyText(target.textContent.trim());
    });
  });

  document.querySelectorAll("[data-open-feature]").forEach((button) => {
    button.addEventListener("click", () => openFeature(button.dataset.openFeature));
  });

  document.querySelector(".modal-close")?.addEventListener("click", closeFeature);
  document.querySelector(".feature-modal")?.addEventListener("click", (event) => {
    if (event.target.classList.contains("feature-modal")) closeFeature();
  });

  document.querySelectorAll("[data-feature-nav]").forEach((button) => {
    button.addEventListener("click", () => navigateFeature(button.dataset.featureNav));
  });

  document.querySelectorAll(".modal-actions a[href^='#']").forEach((link) => {
    link.addEventListener("click", closeFeature);
  });

  document.querySelector(".assistant-launcher")?.addEventListener("click", () => toggleAssistant());
  document.querySelector(".assistant-close")?.addEventListener("click", () => toggleAssistant(false));

  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.question || "";
      addAssistantMessage(question, "user");
      window.setTimeout(() => addAssistantMessage(answerQuestion(question), "bot"), 160);
    });
  });

  document.querySelector(".assistant-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#assistant-input");
    const question = input.value.trim();
    if (!question) return;
    addAssistantMessage(question, "user");
    input.value = "";
    window.setTimeout(() => addAssistantMessage(answerQuestion(question), "bot"), 160);
  });

  document.querySelectorAll("a[href*='wa.me']").forEach((link) => {
    link.href = whatsappUrl;
  });

  window.addEventListener("keydown", (event) => {
    const modalOpen = document.querySelector(".feature-modal")?.classList.contains("is-open");
    if (modalOpen && event.key === "ArrowLeft") {
      navigateFeature("next");
      return;
    }
    if (modalOpen && event.key === "ArrowRight") {
      navigateFeature("prev");
      return;
    }
    if (event.key === "Escape") {
      closeFeature();
      toggleAssistant(false);
      closeDrawer();
    }
  });
}

initTheme();
wireEvents();
window.addEventListener("DOMContentLoaded", () => {
  bootIcons();

  // Reveal animation — fade in elements as they scroll into view
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback — just show everything
    revealEls.forEach((el) => el.classList.add("revealed"));
  }
});
