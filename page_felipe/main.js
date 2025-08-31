let typeEffectInterval; // Variable to hold the interval for the typing effect

document.addEventListener("DOMContentLoaded", () => {
    // The hero-title animation is now handled by animateTypingEffect.

    // Animación tipo persiana solo para imagen y párrafo de experiencia
    gsap.from(".hero-image img", {
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1.1,
        ease: "power4.out"
    });

    // Animación de entrada para las tarjetas sociales
    gsap.from(".hero-social-cards", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.4
    });

    // Animación de entrada para el footer
    gsap.from(".footer", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6
    });

    // Tema claro/oscuro
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        // After theme change, re-run typing animation to apply correct final color
        const currentLang = isSpanish ? 'es' : 'en';
        animateTypingEffect(translations[currentLang].heroTitle);
    });

    // Traducción español/inglés
    const langBtn = document.getElementById('lang-toggle');
    let isSpanish = true;

    const translations = {
        es: {
            documentTitle: "FelipeDev",
            logoText: "FelipeDev.",
            themeToggleTitle: "Cambiar tema",
            langToggleTitle: "Cambiar idioma",
            heroTitle: "Felipe Ponce de León Espinosa",
            heroDescription: "Profesional con más de 10 años de experiencia en la implementación de mejoras tecnológicas. Enfocado principalmente en la estrategia del negocio, la gestión de personas y recursos informáticos. Conocimientos en administración y desarrollo de plataformas modernas, así como en soluciones analíticas para la toma de decisiones gerenciales.",
            heroRoles: "Ingeniero en Informática | Head of Tech | Product Owner | Emprendedor Tech | Backend Developer Node.js - JavaScript - Python",
            youtubeTitle: "YouTube",
            youtubeDescription: "Videos sobre desarrollo web, tutoriales y recursos gratuitos.",
            githubTitle: "GitHub",
            githubDescription: "Repositorios, proyectos y código abierto de Felipe.",
            linkedinTitle: "LinkedIn",
            linkedinDescription: "Perfil profesional y experiencia de Felipe Ponce de León Espinosa.",
            visitLink: "Visitar",
            footerInfo: "Felipe Ponce de León Espinosa &middot; Profesional con más de 10 años de experiencia en tecnología y gestión de negocios."
        },
        en: {
            documentTitle: "FelipeDev",
            logoText: "FelipeDev.",
            themeToggleTitle: "Toggle theme",
            langToggleTitle: "Toggle language",
            heroTitle: "Felipe Ponce de León Espinosa",
            heroDescription: "Professional with over 10 years of experience in implementing technological improvements. Mainly focused on business strategy, people management, and IT resources. Knowledge in administration and development of modern platforms, as well as analytical solutions for managerial decision-making.",
            heroRoles: "Software Engineer | Head of Tech | Product Owner | Tech Entrepreneur | Backend Developer Node.js - JavaScript - Python",
            youtubeTitle: "YouTube",
            youtubeDescription: "Videos about web development, tutorials, and free resources.",
            githubTitle: "GitHub",
            githubDescription: "Felipe's repositories, projects, and open source code.",
            linkedinTitle: "LinkedIn",
            linkedinDescription: "Professional profile and experience of Felipe Ponce de León Espinosa.",
            visitLink: "Visit",
            footerInfo: "Felipe Ponce de León Espinosa &middot; Professional with over 10 years of experience in technology and business management."
        }
    };

    function applyTranslation(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key]; // Always use textContent for all data-i18n elements
            }
        });
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (translations[lang][key]) {
                element.title = translations[lang][key];
            }
        });
        // Update document title
        document.title = translations[lang].documentTitle;

        // After applying translation, re-run title animation
        setTimeout(() => {
            // Pass the translated heroTitle directly to the animation
            animateTypingEffect(translations[lang].heroTitle);
        }, 50); // Small delay to allow DOM to settle
    }

    // Initial translation application
    applyTranslation(isSpanish ? 'es' : 'en');

    langBtn.addEventListener('click', () => {
        isSpanish = !isSpanish;
        applyTranslation(isSpanish ? 'es' : 'en');
    });

    // Initial typing animation on load
    // Call animateTypingEffect with the initial Spanish heroTitle to ensure it's displayed and animated correctly
    animateTypingEffect(translations.es.heroTitle);
});

function animateTypingEffect(text) {
    if (typeEffectInterval) {
        clearInterval(typeEffectInterval);
    }

    const heroTitleElement = document.getElementById('hero-title');
    const codeLine = `<span class="tag">&lt;</span><span class="tag">h1</span><span class="tag">&gt;</span> <span class="text">${text}</span> <span class="tag">&lt;/</span><span class="tag">h1</span><span class="tag">&gt;</span>`;
    let i = 0;
    const speed = 30; // typing speed (adjusted from 60 to 30)

    heroTitleElement.innerHTML = ''; // Clear content to restart typing effect
    heroTitleElement.classList.remove('final');
    heroTitleElement.classList.add('typewriter');

    function typeEffect() {
        if (i < codeLine.length) {
            heroTitleElement.innerHTML = codeLine.substring(0, i + 1) + '<span class="dynamic-cursor"></span>';
            i++;
            typeEffectInterval = setTimeout(typeEffect, speed);
        } else {
            // After typing, keep the cursor for a short while, then transition to final state
            setTimeout(() => {
                heroTitleElement.innerHTML = text; // Set final text and remove cursor
                heroTitleElement.classList.remove('typewriter');
                heroTitleElement.classList.add('final');
                // heroTitleElement.textContent = text; // Ensure final text is plain and correct
            }, 1400); // Wait 1.4 seconds before transitioning to final state
        }
    }
    typeEffect();

    // The original GSAP animation that was here is now replaced by the typeEffect function.
    // However, the blinking effect and color change after typing is still desired for the final text.
    // I will adapt the final blinking and color transition using GSAP here, but after the custom typeEffect finishes.
    // This will happen within the typeEffect's 'else' block or after its completion.

    // The original GSAP text color animation logic for the end of typing
    // I'll adjust this to run after the custom typeEffect completes its typing and cursor blink
    // const textColor = document.body.classList.contains('light') ? "#232323" : "#fff"; // Removed unused variable

    // This part should only run when the typing animation is fully complete and settled to its final text
    // The blinking and color transition is handled within the typeEffect function for now.
    // If a GSAP specific color animation is needed after the custom typeEffect, it needs to be integrated carefully.
    // For now, the 'final' class in CSS will dictate the color, and the blinking is part of typeEffect.
}