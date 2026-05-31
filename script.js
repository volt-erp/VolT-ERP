// فتح نافذة التجربة
function openDemo() {
    document.getElementById('demo-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
}

// إغلاق نافذة التجربة
function closeDemo() {
    document.getElementById('demo-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // إعادة ضبط التجربة عند الإغلاق
    setTimeout(() => {
        document.getElementById('demo-login').style.display = 'flex';
        document.getElementById('demo-dashboard').classList.add('hidden');
    }, 400);
}

// الدخول من شاشة تسجيل الدخول الوهمية إلى واجهة النظام داخل التجربة
function enterDemoDashboard() {
    const loginBtn = document.querySelector('.login-box .btn');
    loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحقق...';
    
    setTimeout(() => {
        document.getElementById('demo-login').style.display = 'none';
        document.getElementById('demo-dashboard').classList.remove('hidden');
        loginBtn.innerHTML = 'دخول'; // إعادة الزر لحالته
    }, 800); // محاكاة وقت التحميل الواقعي
}

// التفاعل الوهمي مع القائمة الجانبية في التجربة
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        // إزالة التفعيل من الكل
        document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
        // تفعيل العنصر المضغوط
        this.classList.add('active');
        
        // يمكن هنا تغيير الصورة (demo-img) بناءً على القسم لتجربة أعمق مستقبلاً
        // مثال: document.querySelector('.demo-img').src = 'assets/pc/sales.png';
    });
});
