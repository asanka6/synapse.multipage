// Управление интерактивными элементами
class SynapseApp {
    constructor() {
        this.init();
    }

    init() {
        this.initVisualEffects();
        this.initFormHandling();
        this.initPosterNavigation();
        this.initMerchHandling();
        this.initGlitchEffects();
        this.initMouseTrail();
    }

    // Визуальные эффекты
    initVisualEffects() {
        // Анимация капсул
        const capsules = document.querySelectorAll('.capsule-sphere, .product-visual');
        capsules.forEach(capsule => {
            capsule.addEventListener('mouseenter', () => {
                capsule.style.transform = 'scale(1.1) rotate(10deg)';
            });

            capsule.addEventListener('mouseleave', () => {
                capsule.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Эффект параллакса
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.capsule-sphere, .red-planet');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });

        // Анимация появления элементов
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.price-card, .poster-item, .merch-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // Обработка форм
    initFormHandling() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    handleFormSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Анимация отправки
        submitBtn.textContent = '(отправляется...)';
        submitBtn.disabled = true;

        // Симуляция отправки
        setTimeout(() => {
            submitBtn.textContent = '(отправлено!)';
            submitBtn.style.background = '#28a745';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    // Навигация по постерам
    initPosterNavigation() {
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        const posterGrid = document.querySelector('.posters-grid');

        if (prevBtn && nextBtn && posterGrid) {
            let currentPage = 0;
            const postersPerPage = 3;
            const posters = posterGrid.querySelectorAll('.poster-item');
            const totalPages = Math.ceil(posters.length / postersPerPage);

            const updatePosterDisplay = () => {
                posters.forEach((poster, index) => {
                    const shouldShow = index >= currentPage * postersPerPage &&
                        index < (currentPage + 1) * postersPerPage;
                    poster.style.display = shouldShow ? 'block' : 'none';
                });

                prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
            };

            prevBtn.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    updatePosterDisplay();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    updatePosterDisplay();
                }
            });

            updatePosterDisplay();
        }
    }

    // Обработка мерча
    initMerchHandling() {
        const buyButtons = document.querySelectorAll('.buy-btn');

        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handlePurchase(button);
            });
        });
    }

    handlePurchase(button) {
        const originalText = button.textContent;
        const originalColor = button.style.background;

        button.textContent = '(добавлено)';
        button.style.background = '#28a745';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalColor;
            button.disabled = false;
        }, 2000);
    }

    // Глитч эффекты
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.logo, h1, .menu-title');

        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    element.style.textShadow = '2px 0 #ff00ff, -2px 0 #00ffff';
                    element.style.transform = 'translate(' + (Math.random() * 4 - 2) + 'px, ' + (Math.random() * 4 - 2) + 'px)';

                    setTimeout(() => {
                        element.style.textShadow = 'none';
                        element.style.transform = 'translate(0, 0)';
                    }, 150);
                }
            }, 100);
        });
    }

    // Эффект следа мыши
    initMouseTrail() {
        let mouseTrail = [];
        const maxTrailLength = 5;

        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }

            // Очистка старых элементов
            document.querySelectorAll('.mouse-trail').forEach(el => el.remove());

            // Создание новых элементов следа
            mouseTrail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'mouse-trail';
                trailElement.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${(index + 1) * 3}px;
                    height: ${(index + 1) * 3}px;
                    background: rgba(255, 68, 68, ${(index + 1) / maxTrailLength * 0.8});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.5s ease;
                `;

                document.body.appendChild(trailElement);

                setTimeout(() => {
                    trailElement.style.opacity = '0';
                    setTimeout(() => trailElement.remove(), 500);
                }, 100);
            });
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new SynapseApp();

    // Предзагрузка изображений для лучшей производительности
    const preloadImages = [
        // Добавьте пути к изображениям если есть
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Обработка ошибок навигации
window.addEventListener('error', () => {
    if (window.location.pathname !== '/404.html') {
        window.location.href = '404.html';
    }
});
