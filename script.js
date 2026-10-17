"use strict";

// تحديث السنة تلقائيًا في تذييل الصفحات
document.querySelectorAll("#year").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

// قائمة التنقل على الهواتف
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

// تصفية معرض الأعمال
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.toggle("active", item === button);
        });

        projectCards.forEach((card) => {
            const matches =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.hidden = !matches;
        });
    });
});

// اختيار الخدمة تلقائيًا إذا وصل الزائر من أحد أزرار الموقع
const serviceSelect = document.querySelector("#service");

if (serviceSelect) {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");

    const serviceMap = {
        web: "تصميم وتطوير موقع إلكتروني",
        design: "تصميم شعار أو هوية بصرية",
        writing: "كتابة محتوى أو نص أدبي"
    };

    if (serviceMap[requestedService]) {
        serviceSelect.value = serviceMap[requestedService];
    }
}

// تجهيز رسالة طلب الخدمة في واتساب
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.querySelector("#name").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const service = document.querySelector("#service").value;
        const budget = document.querySelector("#budget").value.trim();
        const details = document.querySelector("#details").value.trim();

        // رقم عبدالله بالصيغة الدولية دون علامة +
        const whatsappNumber = "967715781449";

        const message = [
            "السلام عليكم عبدالله الواقدي، لدي طلب خدمة جديد.",
            "",
            "الاسم: " + name,
            "رقم التواصل: " + phone,
            "الخدمة المطلوبة: " + service,
            "الميزانية: " + (budget || "لم تُحدد"),
            "",
            "تفاصيل المشروع:",
            details
        ].join("\n");

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        const status = document.querySelector("#formMessage");

        if (status) {
            status.textContent =
                "سيتم فتح واتساب برسالتك. راجع الطلب ثم اضغط إرسال.";
        }

        window.location.href = whatsappURL;
    });
}