https://pawelszczesnyostroleka.pages.dev/

---


# Paweł Szczęsny - Strona Wizytówka (PWA)

**Wersja:** 1.1.1

Profesjonalna strona wizytówka dla usług remontowo-ogrodowych i transportowych, zaprojektowana jako Progressive Web App (PWA). Strona jest w pełni responsywna, zoptymalizowana pod SEO i media społecznościowe.


## 🚀 Główne Funkcjonalności

### 1. Progressive Web App (PWA)
- **Instalacja**: Użytkownicy mogą zainstalować stronę jako aplikację na ekranie głównym telefonu (Android/iOS) lub komputera.
- **Tryb Offline**: Dzięki `Service Worker` (`sw.js`), strona zapisuje kluczowe pliki w pamięci podręcznej i działa nawet bez dostępu do internetu.
- **Manifest**: Plik `manifest.json` definiuje nazwę aplikacji, ikony oraz kolorystykę systemową.

### 2. Interaktywność i JavaScript (`script.js`)
- **Formularz Kontaktowy (AJAX)**: Wysyłanie wiadomości odbywa się bez przeładowania strony. Wykorzystano API `FormSubmit`.
- **Formatowanie Numeru**: Skrypt automatycznie formatuje numer telefonu podczas wpisywania (np. `515 622 400`).
- **Web Share API**: Przycisk "Poleć znajomemu" otwiera natywne menu udostępniania w systemie (SMS, Messenger, WhatsApp).
- **Animacje (Intersection Observer)**: Elementy strony pojawiają się płynnie (`fade-in`) w momencie przewijania do nich.
- **Dynamiczne Portfolio (`portfolio-logos.js`)**: Skrypt generujący sekcję "Współpracujemy z". Automatycznie wstrzykuje style CSS oraz listę logotypów partnerów, wykluczając logo aktualnej strony.

### 3. Wygląd i Style (`style.css`)
- **Zmienne CSS**: Kolorystyka oparta na zmiennych (`:root`) dla łatwej edycji motywu.
- **Paralaksa**: Efekt głębi w sekcji Hero (`background-attachment: fixed`).
- **Responsywność**: Układ dostosowuje się do urządzeń mobilnych (Flexbox/Grid).

### 4. SEO i Social Media
- **Open Graph**: Skonfigurowane meta tagi, aby linki wysyłane w wiadomościach miały ładny podgląd (tytuł, opis, zdjęcie).
- **Google Analytics**: Zintegrowany kod śledzący GA4.

### 5. Galeria Realizacji (Swiper.js)
- **Karuzela Zdjęć**: Przeglądanie realizacji za pomocą dotyku lub strzałek.
- **Lightbox**: Możliwość powiększania zdjęć na pełny ekran po kliknięciu.
- **Responsywność**: Zdjęcia skalują się zachowując proporcje (`contain`), wyglądając dobrze na każdym ekranie.

## 🛠️ Struktura Plików

*   `index.html` - Główny plik struktury strony.
*   `style.css` - Arkusze stylów.
*   `script.js` - Logika aplikacji.
*   `portfolio-logos.js` - Skrypt obsługujący sekcję partnerów.
*   `sw.js` - Service Worker (obsługa cache i offline).
*   `manifest.json` - Konfiguracja instalacji aplikacji.
*   `sitemap.xml` / `robots.txt` - Pliki dla robotów wyszukiwarek.
*   `logo/` - Folder z grafikami (logo, ikony PWA, favicon).

## 🖥️ Jak uruchomić projekt?

### Wymagania
Aby funkcje PWA (Service Worker) oraz moduły JavaScript działały poprawnie, strona **nie może** być otwierana bezpośrednio z pliku (protokół `file://`). Musi być serwowana przez serwer lokalny lub hosting (`http://` lub `https://`).

### Uruchomienie Lokalne (Development)
1.  Otwórz folder projektu w **VS Code**.
2.  Zainstaluj rozszerzenie **Live Server**.
3.  Kliknij prawym przyciskiem na `index.html` i wybierz **"Open with Live Server"**.

### Wdrożenie (Hosting)
Wgraj wszystkie pliki na dowolny serwer statyczny, np.:
-   GitHub Pages
-   Netlify / Vercel
-   Tradycyjny hosting FTP (home.pl, nazwa.pl itp.)

**Ważne:** PWA wymaga bezpiecznego połączenia **HTTPS** (na localhost działa wyjątek).

## 📝 Konfiguracja Formularza

Formularz korzysta z serwisu FormSubmit.co. Aby go aktywować:
1.  Upewnij się, że w `script.js` (sekcja fetch) podany jest poprawny adres email.
2.  Uruchom stronę i wyślij pierwszą testową wiadomość.
3.  Odbierz email od FormSubmit i kliknij przycisk potwierdzający aktywację ("Activate").

---

## 📜 Dziennik Zmian (Changelog)

### [1.1.1] - Poprawki techniczne i wydajność - 2026-04-26
- Naprawiono cache PWA, usuwając nieistniejące pliki z listy zasobów.
- Zoptymalizowano zdjęcia galerii i podpięto lżejsze pliki JPG.
- Poprawiono formularz kontaktowy, metadane SEO, dane strukturalne i dostępność modala.
- Poprawiono literówki oraz bezpieczeństwo linków otwieranych w nowej karcie.

### [1.1.0] - Galeria i SEO - 2026-04-26
- Dodano sekcję "Nasze Realizacje" z karuzelą (Swiper.js).
- Zaimplementowano Lightbox (powiększanie zdjęć na pełny ekran).
- Zaktualizowano domenę na `pawelszczesnyostroleka.pages.dev`.
- Dodano pliki `robots.txt`, `sitemap.xml` oraz tag `canonical` dla lepszego SEO.
- Poprawiono skalowanie zdjęć na dużych monitorach.

### [1.0.0] - Pierwsze wydanie - 2026-04-26
- Publikacja strony wizytówki.
- Integracja PWA, Formularza Kontaktowego i Portfolio.
- Wdrożenie globalnych skryptów (`portfolio-logos.js`, `magnifier.js`).

---
&copy; 2026 Paweł Szczęsny
