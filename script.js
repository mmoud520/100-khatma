// استرجاع التقدم من localStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const khatmaCount = localStorage.getItem("khatmaCount") || 0;
    const pageCount = localStorage.getItem("pageCount") || 0;

    document.getElementById("khatmaCount").value = khatmaCount;
    document.getElementById("pageCount").value = pageCount;

    showHijriDate();
    generateChart();
    requestNotificationPermission();
});

// حفظ التقدم
function saveProgress() {
    const khatmaCount = document.getElementById("khatmaCount").value;
    const pageCount = document.getElementById("pageCount").value;

    localStorage.setItem("khatmaCount", khatmaCount);
    localStorage.setItem("pageCount", pageCount);

    alert("✅ تم حفظ التقدم!");
    generateChart();
}

// إعادة ضبط التقدم
function resetProgress() {
    if (confirm("هل أنت متأكد أنك تريد إعادة الضبط؟")) {
        localStorage.removeItem("khatmaCount");
        localStorage.removeItem("pageCount");
        document.getElementById("khatmaCount").value = 0;
        document.getElementById("pageCount").value = 0;
        generateChart();
    }
}

// عرض التاريخ الهجري الحالي
function showHijriDate() {
    const hijriDate = moment().format('iYYYY/iM/iD');
    document.getElementById("hijriDate").innerText = hijriDate;
}

// رسم بياني بسيط لعدد الختمات لكل شهر
function generateChart() {
    const khatmaCount = parseInt(localStorage.getItem("khatmaCount") || 0);
    const currentMonth = moment().format("iMMMM");
    const currentYear = moment().format("iYYYY");

    const ctx = document.getElementById('progressChart').getContext('2d');

    if (window.chart) window.chart.destroy(); // لتحديث الرسم

    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [currentMonth + " " + currentYear],
            datasets: [{
                label: 'عدد الختمات هذا الشهر',
                data: [khatmaCount],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    });
}

// إشعار تنبيهي
function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

// إرسال إشعار (مستقبلاً يمكن تطويره للتذكير اليومي)
function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}