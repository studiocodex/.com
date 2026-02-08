// ========================================
// MENÚ HAMBURGUESA RESPONSIVE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle menú al hacer click en hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un link
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// ========================================
// SCROLL SUAVE Y ANIMACIONES
// ========================================
// Agregar clase cuando los elementos entran en la vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las secciones
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ========================================
// HEADER TRANSPARENTE AL SCROLL
// ========================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Cambiar opacidad del header al hacer scroll
    if (currentScroll > 100) {
        header.style.background = 'rgba(26, 58, 82, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a3a52 0%, #2c5f7f 100%)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ANIMACIÓN DE TARJETAS AL HACER SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
});

// ========================================
// BOTÓN SCROLL TO TOP (OPCIONAL)
// ========================================
// Crear botón de scroll to top
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('id', 'scrollToTop');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4fd1c5;
    color: #1a3a52;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(79, 209, 197, 0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

// Mostrar/ocultar botón al hacer scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll suave al hacer click
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect en el botón
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(79, 209, 197, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(79, 209, 197, 0.3)';
});

// ========================================
// EFECTO PARALLAX EN HERO (OPCIONAL)
// ========================================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CONTADOR ANIMADO PARA PRECIOS (OPCIONAL)
// ========================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('es-PY') + ' Gs';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Activar animación de precios cuando entran en vista
document.addEventListener('DOMContentLoaded', function() {
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceText = entry.target.textContent;
                const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ''));
                animateValue(entry.target, 0, priceNumber, 1000);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const prices = document.querySelectorAll('.service-price');
    prices.forEach(price => priceObserver.observe(price));
});

// ========================================
// PRELOADER (OPCIONAL)
// ========================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ========================================
// PREVENIR CLICK DERECHO EN IMÁGENES (OPCIONAL)
// ========================================
// Descomentar si quieres proteger las imágenes
/*
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});
*/

// ========================================
// ANALYTICS DE CLICK EN PROYECTOS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectName = this.querySelector('h3').textContent;
            console.log(`Click en proyecto: ${projectName}`);
            // Aquí puedes agregar Google Analytics o Facebook Pixel
            // gtag('event', 'click', { 'event_category': 'Portfolio', 'event_label': projectName });
        });
    });
});

// ========================================
// WHATSAPP FLOTANTE (OPCIONAL)
// ========================================
// Agregar botón de WhatsApp flotante
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/595971576219';
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25D366;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    text-decoration: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    transition: all 0.3s ease;
`;

document.body.appendChild(whatsappBtn);

whatsappBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
});

whatsappBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
});

// ========================================
// INSTAGRAM FLOTANTE (OPCIONAL)
// ========================================
// Agregar botón de Instagram flotante
const instagramBtn = document.createElement('a');
instagramBtn.href = 'https://instagram.com/estudiocodex_';
instagramBtn.target = '_blank';
instagramBtn.innerHTML = '<i class="fab fa-instagram"></i>';
instagramBtn.setAttribute('aria-label', 'Seguir en Instagram');
instagramBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    text-decoration: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
    transition: all 0.3s ease;
`;

document.body.appendChild(instagramBtn);

instagramBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(225, 48, 108, 0.6)';
});

instagramBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(225, 48, 108, 0.4)';
});

// ========================================
// CONSOLA DE BIENVENIDA
// ========================================
console.log('%c¡Hola! 👋', 'font-size: 20px; color: #4fd1c5; font-weight: bold;');
console.log('%cEstudio CODEX - Soluciones Web', 'font-size: 14px; color: #1a3a52;');
console.log('%c¿Necesitas una página web? Contáctanos: 0971 576 219', 'font-size: 12px; color: #666;');
