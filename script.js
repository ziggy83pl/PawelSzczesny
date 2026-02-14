// Zmienna globalna dla zdarzenia instalacji PWA - musi być na zewnątrz
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Zapobiegaj automatycznemu pojawieniu się mini-paska
    e.preventDefault();
    deferredPrompt = e;
    // Spróbuj pokazać przycisk od razu, jeśli element już istnieje
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'inline-block';
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Płynne przewijanie do kontaktu (Smooth Scroll)
    const callButton = document.querySelector('.btn-main');
    const contactSection = document.getElementById('contact');

    if (callButton && contactSection) {
        callButton.addEventListener('click', function(e) {
            // Sprawdź czy to komputer (szerokość ekranu > 768px)
            if (window.innerWidth > 768) {
                e.preventDefault(); // Zablokuj dzwonienie
                contactSection.scrollIntoView({ behavior: 'smooth' }); // Przewiń
            }
            // Na telefonach (ekran <= 768px) kod powyżej się nie wykona,
            // więc zadziała domyślny href="tel:..."
        });
    }

    // 2. Animacja pojawiania się elementów (Fade In)
    const observerOptions = {
        root: null, // obserwowany względem okna przeglądarki
        rootMargin: '0px',
        threshold: 0.1 // element musi być widoczny w 10% żeby odpalić animację
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // animuj tylko raz
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Obsługa formularza kontaktowego (AJAX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Automatyczne formatowanie numeru telefonu (XXX XXX XXX)
        const phoneInput = contactForm.querySelector('input[name="telefon"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let number = e.target.value.replace(/\D/g, '');
                if (number.length > 9) number = number.substring(0, 9);
                
                if (number.length > 6) {
                    e.target.value = number.substring(0, 3) + ' ' + number.substring(3, 6) + ' ' + number.substring(6);
                } else if (number.length > 3) {
                    e.target.value = number.substring(0, 3) + ' ' + number.substring(3);
                } else {
                    e.target.value = number;
                }
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const telefonInput = contactForm.querySelector('input[name="telefon"]');
            const telefonRaw = telefonInput.value.replace(/\D/g, ''); // Usuwa spacje i myślniki
            
            if (telefonRaw.length !== 9) {
                alert("Numer telefonu musi składać się dokładnie z 9 cyfr.");
                return;
            }

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Wysyłanie...';
            btn.disabled = true;

            fetch("https://formsubmit.co/ajax/pawelszczesny3@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    imie: contactForm.querySelector('input[name="imie"]').value,
                    telefon: contactForm.querySelector('input[name="telefon"]').value,
                    email: contactForm.querySelector('input[name="email"]').value,
                    wiadomosc: contactForm.querySelector('textarea[name="wiadomosc"]').value,
                    _subject: "Nowe zapytanie ze strony - Paweł Szczęsny",
                    _autoresponse: "Dziękujemy za wiadomość! Otrzymaliśmy Twoje zgłoszenie i skontaktujemy się z Tobą wkrótce."
                })
            })
            .then(response => {
                if (response.ok) {
                    const originalChildren = Array.from(contactForm.children);
                    originalChildren.forEach(child => child.style.display = 'none');

                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-success';
                    successDiv.innerHTML = `
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #2ecc71; margin-bottom: 20px;"></i>
                        <h3>Dziękujemy za wiadomość!</h3>
                        <p>Skontaktujemy się z Tobą w ciągu 24 godzin.</p>
                        <button type="button" id="new-message-btn" class="btn-main" style="margin-top: 20px;">Wyślij kolejną wiadomość</button>
                    `;
                    contactForm.appendChild(successDiv);

                    document.getElementById('new-message-btn').addEventListener('click', () => {
                        successDiv.remove();
                        originalChildren.forEach(child => child.style.display = '');
                        contactForm.reset();
                        btn.innerText = originalText;
                        btn.disabled = false;
                    });
                } else {
                    alert("Wystąpił problem z wysłaniem formularza. Spróbuj ponownie później.");
                    throw new Error('Błąd wysyłki');
                }
            }).catch(error => {
                alert("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.");
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // 4. Obsługa przycisku udostępniania (Web Share API)
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

    // 5. Rejestracja Service Worker (PWA / Offline)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker zarejestrowany:', reg))
            .catch(err => console.log('Błąd rejestracji Service Worker:', err));
    }

    // 6. Obsługa instalacji PWA (Przycisk "Zainstaluj Aplikację")
    const installBtn = document.getElementById('install-btn');

    // Jeśli zdarzenie wystąpiło przed załadowaniem DOM (np. bardzo szybkie łącze)
    if (deferredPrompt && installBtn) {
        installBtn.style.display = 'inline-block';
    }

    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            if (deferredPrompt) {
                // Pokaż monit instalacji
                deferredPrompt.prompt();
                // Poczekaj na decyzję użytkownika (opcjonalne logowanie)
                deferredPrompt.userChoice.then((choiceResult) => {
                    deferredPrompt = null;
                });
            }
        });
    }

    // 7. Inicjalizacja karuzeli zdjęć (Swiper.js)
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

    // 8. Obsługa modala (Lightbox) dla galerii
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-modal');
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    if (modal && swiperWrapper) {
        // Delegacja zdarzeń - obsługuje też slajdy sklonowane przez pętlę Swipera
        swiperWrapper.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                modal.style.display = "block";
                modalImg.src = e.target.src;
                // Pobierz podpis z sąsiedniego elementu (jeśli istnieje) lub atrybutu alt
                const caption = e.target.nextElementSibling;
                captionText.innerHTML = (caption && caption.classList.contains('slide-caption')) ? caption.innerHTML : e.target.alt;
            }
        });

        // Zamykanie modala
        if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }
});