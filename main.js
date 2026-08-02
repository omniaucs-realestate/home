document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Animations (Fade Up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 2. Accordion Logic for Services (تم حل مشكلة عدم الإغلاق للنهاية)
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // إغلاق باقي القوائم
            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = '0px';
                    otherAcc.nextElementSibling.style.paddingBottom = '0px'; // تصفير المسافة
                    otherAcc.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // فتح/إغلاق القائمة الحالية
            this.classList.toggle('active');
            const body = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (body.style.maxHeight && body.style.maxHeight !== '0px') {
                body.style.maxHeight = '0px';
                body.style.paddingBottom = '0px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                body.style.paddingBottom = "20px";
                body.style.maxHeight = body.scrollHeight + 20 + "px"; // تعويض مساحة الـ padding
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 3. Chaos to Order Animation (تم تبطيء الحركة وجعلها أكثر انسيابية)
    const chaosSection = document.querySelector('.chaos-section');
    const floatingElements = document.querySelectorAll('.float-item');
    
    // توزيع عشوائي للأيقونات في البداية
    floatingElements.forEach(el => {
        const randomX = Math.floor(Math.random() * 60) - 30;
        const randomY = Math.floor(Math.random() * 60) - 30;
        el.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    const chaosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // زيادة وقت الانتظار قبل الاندماج إلى ثانيتين بدلاً من ثانية
                setTimeout(() => {
                    chaosSection.classList.add('chaos-active');
                    document.getElementById('chaos-headline').innerText = "كلها... في مكان واحد.";
                }, 2000); 
            }
        });
    }, { threshold: 0.6 });

    if (chaosSection) {
        chaosObserver.observe(chaosSection);
    }
});