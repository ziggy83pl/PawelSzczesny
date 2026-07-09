// Zmienna globalna dla zdarzenia instalacji PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'inline-block';
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Animacja pojawiania się elementów (Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));



    // 3. Obsługa przycisku udostępniania (Web Share API)
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const shareData = {
                title: document.title,
                text: 'Polecam usługi Pawła Szczęsnego - solidnie i terminowo!',
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(shareData).catch(console.error);
            } else {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => alert('Link do strony został skopiowany do schowka!'))
                    .catch(() => alert('Nie udało się skopiować linku.'));
            }
        });
    }

    // 4. Rejestracja Service Worker (PWA / Offline)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker zarejestrowany:', reg))
            .catch(err => console.log('Błąd rejestracji Service Worker:', err));
    }

    // 5. Obsługa instalacji PWA (Przycisk "Zainstaluj Aplikację")
    const installBtn = document.getElementById('install-btn');
    if (deferredPrompt && installBtn) {
        installBtn.style.display = 'inline-block';
    }

    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    deferredPrompt = null;
                });
            }
        });
    }

    // 6. Inicjalizacja karuzeli zdjęć (Swiper.js)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 7. Obsługa modala (Lightbox) dla galerii
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-modal');
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    if (modal && swiperWrapper) {
        swiperWrapper.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                modal.style.display = "block";
                modalImg.src = e.target.src;
                modalImg.alt = e.target.alt;
                const caption = e.target.nextElementSibling;
                captionText.textContent = (caption && caption.classList.contains('slide-caption')) ? caption.textContent : e.target.alt;
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    }

    // 8. Dynamiczny nagłówek i menu mobilne
    const navToggle = document.getElementById('nav-toggle-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');
    const navBar = document.querySelector('.main-nav');

    if (navToggle && navLinksMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksMenu.classList.toggle('active');
        });

        const links = navLinksMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksMenu.classList.remove('active');
            });
        });
    }

    if (navBar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
});
