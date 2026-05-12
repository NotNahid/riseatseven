
const images = [
  "https://raw.githubusercontent.com/NotNahid/riseatseven-clone/refs/heads/main/Image/Emirates-airpline-in-flight.avif",
  "https://raw.githubusercontent.com/NotNahid/riseatseven-clone/refs/heads/main/Image/Screenshot-2025-07-01-at-21.36.35.png",
  "https://raw.githubusercontent.com/NotNahid/riseatseven-clone/refs/heads/main/Image/unnamed-6.png",
  "https://raw.githubusercontent.com/NotNahid/riseatseven-clone/refs/heads/main/Image/RedBull-Instagram-Post-45.png",
  "https://raw.githubusercontent.com/NotNahid/riseatseven-clone/refs/heads/main/Image/spaseekers.png"
];

function setHeroImage() {
  const img = images[Math.floor(Math.random() * images.length)];

  document.getElementById("hero-bg").src = img;
  document.getElementById("hero-inline").src = img;
}

document.addEventListener("DOMContentLoaded", setHeroImage);


// --- JS BLOCK ---


    /* ================================
       SHARED BLUR IMAGE SWAP
       ================================ */
    function blurSwapImage(imgElement, newSrc) {
        if (!imgElement || !newSrc || imgElement.getAttribute('src') === newSrc) return;
        imgElement.classList.remove('blurry', 'sharpening');
        imgElement.src = newSrc;
        imgElement.classList.add('blurry');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                imgElement.classList.remove('blurry');
                imgElement.classList.add('sharpening');
            });
        });
        imgElement.addEventListener('transitionend', () => {
            imgElement.classList.remove('sharpening');
        }, { once: true });
    }

    function preloadImages(links) {
        links.forEach(link => {
            const src = link.getAttribute('data-image');
            if (src) { const img = new Image(); img.src = src; }
        });
    }

    /* ================================
       SLIDING NAV PILL
       ================================ */
    const navPill = document.querySelector('.nav-pill');
    const navListItems = document.querySelectorAll('#comp-header nav ul li:not(.nav-pill)');
    const navUl = document.querySelector('#comp-header nav ul');

    function movePill(item) {
        const itemRect = item.getBoundingClientRect();
        const ulRect = navUl.getBoundingClientRect();
        navPill.style.left = (itemRect.left - ulRect.left) + 'px';
        navPill.style.top = (itemRect.top - ulRect.top) + 'px';
        navPill.style.width = itemRect.width + 'px';
        navPill.style.height = itemRect.height + 'px';
        navPill.style.opacity = '1';
    }

    navListItems.forEach(item => {
        item.addEventListener('mouseenter', () => { movePill(item); });
    });

    navUl.addEventListener('mouseleave', () => {
        navPill.style.opacity = '0';
    });

    /* ================================
       MORPHING MEGA MENU
       ================================ */
    const overlay = document.querySelector('.page-overlay');
    const navItems = document.querySelectorAll('[data-menu]');
    const panels = document.querySelectorAll('.menu-panel');
    const wrapper = document.getElementById('menuWrapper');
    const header = document.getElementById('comp-header');
    let activePanel = null;
    let closeTimeout = null;

    const panelSizes = {};

    function measurePanels() {
        panels.forEach(panel => {
            const id = panel.id;
            panel.style.position = 'relative';
            panel.style.opacity = '1';
            panel.style.filter = 'none';
            panel.style.visibility = 'visible';
            panel.style.pointerEvents = 'none';

            const rect = panel.getBoundingClientRect();
            panelSizes[id] = { width: rect.width, height: rect.height };

            panel.style.position = '';
            panel.style.opacity = '';
            panel.style.filter = '';
            panel.style.visibility = '';
            panel.style.pointerEvents = '';
        });
    }

    function updateWrapperPosition() {
        const headerRect = header.getBoundingClientRect();
        wrapper.style.top = (headerRect.bottom + 15) + 'px';
    }

    function openPanel(panelId) {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        const size = panelSizes[panelId];
        if (!size) return;

        updateWrapperPosition();

        wrapper.style.width = size.width + 'px';
        wrapper.style.height = size.height + 'px';
        wrapper.classList.add('active');

        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');

        activePanel = panel;
        overlay.style.opacity = '1';
    }

    function closeAll() {
        wrapper.classList.remove('active');
        panels.forEach(p => p.classList.remove('active'));
        overlay.style.opacity = '0';
        activePanel = null;
    }

    window.addEventListener('load', measurePanels);
    window.addEventListener('resize', measurePanels);

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout);
            const menuId = item.getAttribute('data-menu');
            openPanel('panel-' + menuId);
        });
        item.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => { closeAll(); }, 200);
        });
    });

    wrapper.addEventListener('mouseenter', () => { clearTimeout(closeTimeout); });
    wrapper.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => { closeAll(); }, 200);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-menu]') && !e.target.closest('.menu-panel-wrapper')) {
            closeAll();
        }
    });

    /* ================================
       SERVICES — Image Swap
       ================================ */
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceImage = document.getElementById('serviceImage');
    preloadImages(serviceLinks);
    serviceLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            blurSwapImage(serviceImage, link.getAttribute('data-image'));
        });
    });

    /* ================================
       INDUSTRIES — Image Swap
       ================================ */
    const industriesLinks = document.querySelectorAll('.industries-link');
    const industriesImage = document.getElementById('industriesImage');
    preloadImages(industriesLinks);
    industriesLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            blurSwapImage(industriesImage, link.getAttribute('data-image'));
        });
    });

    /* ================================
       INTERNATIONAL — Image Swap + Search
       ================================ */
    const internationalLinks = document.querySelectorAll('.international-link');
    const internationalImage = document.getElementById('internationalImage');
    const searchText = document.getElementById('searchText');
    preloadImages(internationalLinks);
    internationalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const newSearch = link.getAttribute('data-search');
            if (newSearch) searchText.textContent = newSearch;
            blurSwapImage(internationalImage, link.getAttribute('data-image'));
        });
    });

    /* ================================
       ABOUT — Image Swap
       ================================ */
    const aboutLinks = document.querySelectorAll('.about-list a');
    const aboutImage = document.getElementById('aboutImage');
    preloadImages(aboutLinks);
    aboutLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            blurSwapImage(aboutImage, link.getAttribute('data-image'));
        });
    });

    /* ================================
       SCROLL HIDE/SHOW + GLASS PILL
       ================================ */
    let lastScrollY = 0;
    const scrollThreshold = 200;
    let wasAboveThreshold = true;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (activePanel) {
            updateWrapperPosition();
            return;
        }

        if (currentScroll <= scrollThreshold) {
            header.classList.remove('nav-scrolled');
            header.classList.remove('nav-hidden');
            header.classList.remove('no-transition');
            header.style.color = 'white';
            wasAboveThreshold = true;
            lastScrollY = currentScroll;
            return;
        }

        if (wasAboveThreshold) {
            header.classList.add('no-transition');
            header.classList.add('nav-scrolled');
            header.classList.add('nav-hidden');
            header.style.color = '#111';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    header.classList.remove('no-transition');
                });
            });
            wasAboveThreshold = false;
            lastScrollY = currentScroll;
            return;
        }

        header.classList.add('nav-scrolled');
        header.style.color = '#111';

        if (currentScroll > lastScrollY) {
            header.classList.add('nav-hidden');
            closeAll();
        } else {
            header.classList.remove('nav-hidden');
        }

        lastScrollY = currentScroll;
    });
    
    
    /* ================================
   BLOG — Image Swap
   ================================ */
const blogLinks = document.querySelectorAll('.blog-link');
const blogImage = document.getElementById('blogImage');
preloadImages(blogLinks);

blogLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        blurSwapImage(blogImage, link.getAttribute('data-image'));
    });
});


// --- JS BLOCK ---


    const track = document.getElementById("logoTrack");

    // --- INFINITE LOOP SETUP ---
    // Duplicate all children so there's always content on both sides
    const COPIES = 3;
    const originalChildren = Array.from(track.children);
    for (let i = 0; i < COPIES; i++) {
        originalChildren.forEach(child => {
            track.appendChild(child.cloneNode(true));
        });
    }

    // Measure one set's width after render
    let setWidth = 0;
    function measureSetWidth() {
        const gap = 60; // matches your CSS gap: 60px
        const count = originalChildren.length;
        let w = 0;
        Array.from(track.children).slice(0, count).forEach(el => {
            w += el.offsetWidth + gap;
        });
        setWidth = w;
    }

    // --- STATE ---
    let offset = 0;
    let speed = 0.6;        // auto-scroll px per frame (matches your 18s feel)
    let direction = -1;     // -1 = left (default), +1 = right
    let velocity = 0;       // momentum after drag
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let lastDragX = 0;

    // --- WRAP: teleport silently when drifting too far ---
    function wrap() {
        if (setWidth === 0) return;
        while (offset < -setWidth * COPIES) offset += setWidth;
        while (offset > setWidth)            offset -= setWidth;
    }

    // --- MAIN LOOP ---
    function tick() {
        if (!isDragging) {
            if (Math.abs(velocity) > 0.05) {
                offset += velocity;
                velocity *= 0.93; // friction / deceleration
            } else {
                velocity = 0;
                offset += speed * direction; // resume auto-scroll
            }
        }
        wrap();
        track.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(tick);
    }

    // --- DRAG HANDLERS ---
    function onDragStart(x) {
        isDragging = true;
        velocity = 0;
        dragStartX = x;
        dragStartOffset = offset;
        lastDragX = x;
    }

    function onDragMove(x) {
        if (!isDragging) return;
        velocity = x - lastDragX;          // live velocity
        offset = dragStartOffset + (x - dragStartX);
        lastDragX = x;
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        // Flick direction becomes the new auto-scroll direction
        if (velocity < 0) direction = -1;
        if (velocity > 0) direction = +1;
    }

    // Mouse
    track.addEventListener("mousedown", e => { onDragStart(e.clientX); e.preventDefault(); });
    window.addEventListener("mousemove", e => { onDragMove(e.clientX); });
    window.addEventListener("mouseup",   () => { onDragEnd(); });

    // Touch
    track.addEventListener("touchstart", e => { onDragStart(e.touches[0].clientX); }, { passive: true });
    track.addEventListener("touchmove",  e => { onDragMove(e.touches[0].clientX); },  { passive: true });
    track.addEventListener("touchend",   () => { onDragEnd(); });

    // --- INIT ---
    window.addEventListener("load", () => {
        measureSetWidth();
        offset = -setWidth; // start from middle copy
        tick();
    });


// --- JS BLOCK ---


(function() {
    const cards   = document.querySelectorAll('#fw-cards .work-card');
    const btns    = document.querySelectorAll('#fw-nav .work-item');
    const navList = document.getElementById('fw-nav');
    const cursor  = document.getElementById('comp-work-cursor');

    function setActive(id) {
        btns.forEach(b => b.classList.toggle('active', b.dataset.id === String(id)));
        const activeBtn = document.querySelector(`#fw-nav .work-item[data-id="${id}"]`);
        if (activeBtn && navList) {
            navList.scrollTo({ top: activeBtn.offsetTop - navList.offsetHeight / 2 + activeBtn.offsetHeight / 2, behavior: 'smooth' });
        }
    }

    function setHovered(id) {
        btns.forEach(b  => b.classList.toggle('hovered',     b.dataset.id   === String(id)));
        cards.forEach(c => c.classList.toggle('highlighted', c.dataset.card === String(id)));
    }

    function clearHovered() {
        btns.forEach(b  => b.classList.remove('hovered'));
        cards.forEach(c => c.classList.remove('highlighted'));
    }

    // lerp cursor
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
        cx += (mx - cx) * 0.1;
        cy += (my - cy) * 0.1;
        cursor.style.left = cx + 'px';
        cursor.style.top  = cy + 'px';
        requestAnimationFrame(loop);
    })();

    const cardsZone = document.getElementById('fw-cards');
    cardsZone.addEventListener('mouseenter', () => cursor.classList.add('visible'));
    cardsZone.addEventListener('mouseleave', () => cursor.classList.remove('visible'));

    // scroll observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && e.intersectionRatio >= 0.35) setActive(e.target.dataset.card);
        });
    }, { threshold: 0.35, rootMargin: '-5% 0px -45% 0px' });

    cards.forEach(card => {
        observer.observe(card);
        card.addEventListener('mouseenter', () => setHovered(card.dataset.card));
        card.addEventListener('mouseleave', clearHovered);
    });

    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => setHovered(btn.dataset.id));
        btn.addEventListener('mouseleave', clearHovered);
        btn.addEventListener('click', () => {
            document.querySelector(`#fw-cards .work-card[data-card="${btn.dataset.id}"]`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
})();


// --- JS BLOCK ---


    (function () {
        // ── Cursor ─────────────────────────────────────────────
        const htCursor  = document.getElementById('comp-huge-text-cursor');
        const htWrapper = document.getElementById('comp-huge-text');
        const htTrack   = document.getElementById('comp-huge-text-track');

        let htMouseX = 0, htMouseY = 0;
        let htCursorX = 0, htCursorY = 0;

        htWrapper.addEventListener('mousemove', (e) => {
            htMouseX = e.clientX;
            htMouseY = e.clientY;
        });

        htWrapper.addEventListener('mouseenter', () => htCursor.classList.add('active'));
        htWrapper.addEventListener('mouseleave', () => htCursor.classList.remove('active'));

        // ── Clone track items for seamless loop ────────────────
        const originalHTML = htTrack.innerHTML;
        htTrack.innerHTML  = originalHTML.repeat(4);

        // ── Animation state ────────────────────────────────────
        let htAutoX       = 0;
        const htAutoSpeed = 0.5;

        let htLastScrollY    = window.scrollY;
        let htScrollBoost    = 0.3;

        // ── Animation loop ─────────────────────────────────────
        function htAnimate() {
            // Scroll velocity boost
            const currentScrollY  = window.scrollY;
            const scrollVelocity  = currentScrollY - htLastScrollY;
            htLastScrollY         = currentScrollY;

          // Reduce scroll sensitivity
htScrollBoost += scrollVelocity * 0.05;

// Stronger damping so it dies faster
htScrollBoost *= 0.80;

// Optional clamp (prevents crazy spikes)
htScrollBoost = Math.max(-5, Math.min(5, htScrollBoost));

            // Move track
            htAutoX -= (htAutoSpeed + htScrollBoost);

            // Seamless loop reset (4 copies = divide by 4)
            const loopWidth = htTrack.scrollWidth / 4;

            if (htAutoX <= -loopWidth) htAutoX += loopWidth;
            if (htAutoX > 0)           htAutoX -= loopWidth;

            htTrack.style.transform = `translate3d(${htAutoX}px, 0, 0)`;

            // Smooth cursor lerp
            htCursorX += (htMouseX - htCursorX) * 0.12;
            htCursorY += (htMouseY - htCursorY) * 0.12;
            htCursor.style.left = htCursorX + 'px';
            htCursor.style.top  = htCursorY + 'px';

            requestAnimationFrame(htAnimate);
        }

        // Start after load so scrollWidth is accurate
        window.addEventListener('load', () => requestAnimationFrame(htAnimate));

    })(); // ← Wrapped in IIFE so variables don't pollute global scope


// --- JS BLOCK ---


(function () {
    const track = document.getElementById('comp-legacy-track');
    const cards = track.querySelectorAll('.card');
    const card1 = track.querySelector('.card-1');
    const card2 = track.querySelector('.card-2');
    const card3 = track.querySelector('.card-3');

    const lerp = (a, b, t) => (1 - t) * a + t * b;
    const mapRange = (val, min, max) => Math.max(0, Math.min(1, (val - min) / (max - min)));

    const config = {
        c1: { restRotate: -2, flyRotate: -18, flyX: -8 },
        c2: { restRotate: 5, flyRotate: 14, flyX: 6, stackRotate: 5 },
        c3: { restRotate: -4, flyRotate: -12, flyX: -4, stackBack: -4, stackMid: 3 },
    };

    let target = 0;
    let current = 0;
    const EASE = 0.06;

    function getProgress() {
        const rect = track.getBoundingClientRect();
        const p = -rect.top / (rect.height - window.innerHeight);
        return Math.max(0, Math.min(1, p));
    }

    function applyCards(progress) {
        // ONLY apply animation if screen is wider than 768px
        if (window.innerWidth <= 768) return;

        const s1 = mapRange(progress, 0.05, 0.30);
        const s2 = mapRange(progress, 0.35, 0.60);
        const s3 = Math.min(mapRange(progress, 0.65, 0.90), 0.5);

        const { c1, c2, c3 } = config;

        card1.style.transform = [
            `translateX(${lerp(0, c1.flyX, s1)}vw)`,
            `translateY(${lerp(0, -150, s1)}vh)`,
            `rotate(${lerp(c1.restRotate, c1.flyRotate, s1)}deg)`,
            `scale(${lerp(1, 1.05, s1)})`,
        ].join(' ');

        if (s2 > 0) {
            card2.style.transform = [`translateX(${lerp(0, c2.flyX, s2)}vw)`,`translateY(${lerp(0, -150, s2)}vh)`,`rotate(${lerp(0, c2.flyRotate, s2)}deg)`,`scale(${lerp(1, 1.05, s2)})`].join(' ');
        } else {
            card2.style.transform = [`translateY(${lerp(20, 0, s1)}px)`,`rotate(${lerp(c2.stackRotate, 0, s1)}deg)`,`scale(${lerp(0.96, 1, s1)})`].join(' ');
        }

        if (s3 > 0) {
            card3.style.transform = [`translateX(${lerp(0, c3.flyX * 0.5, s3)}vw)`,`translateY(${lerp(0, -50, s3)}vh)`,`rotate(${lerp(0, c3.flyRotate * 0.5, s3)}deg)`,`scale(${lerp(1, 1.02, s3)})`].join(' ');
        } else if (s2 > 0) {
            card3.style.transform = [`translateY(${lerp(20, 0, s2)}px)`,`rotate(${lerp(c3.stackMid, 0, s2)}deg)`,`scale(${lerp(0.96, 1, s2)})`].join(' ');
        } else {
            card3.style.transform = [`translateY(${lerp(40, 20, s1)}px)`,`rotate(${lerp(c3.stackBack, c3.stackMid, s1)}deg)`,`scale(${lerp(0.92, 0.96, s1)})`].join(' ');
        }
    }

    function tick() {
        if (window.innerWidth > 768) {
            target = getProgress();
            const diff = target - current;
            if (Math.abs(diff) > 0.0001) {
                current += diff * EASE;
            } else {
                current = target;
            }
            applyCards(current);
        }
        requestAnimationFrame(tick);
    }

    // Reset cards on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            cards.forEach(c => c.style.transform = '');
        }
    });

    requestAnimationFrame(tick);
})();


// --- JS BLOCK ---


(function () {
    const cursor = document.getElementById('comp-news-cursor');
    const zone = document.querySelector('#comp-news .grid');
    if (!cursor || !zone) return;

    // 📱 Skip cursor logic entirely on touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        cursor.style.display = 'none';
        return;
    }

    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function loop() {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        cursor.style.left = cx + 'px';
        cursor.style.top  = cy + 'px';
        requestAnimationFrame(loop);
    })();

    zone.addEventListener('mouseenter', () => cursor.classList.add('visible'));
    zone.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
})();


// --- JS BLOCK ---


(function () {
    function initScrollAnim() {
        gsap.registerPlugin(ScrollTrigger);

        const heading = document.getElementById('comp-scroll-heading');
        const section = document.getElementById('comp-scroll-section');

        // 📱 Detect mobile
        const isMobile = window.innerWidth < 768;

        const CONFIG = {
            text: "Ready to Rise at Seven?",

            earlyStart: 'top 45%',
            pinStart: 'top top',
            pinEnd: '+=100%',
            scrub: 1,
            earlyProgress: 0.28,

            // 📱 Horizontal: less travel on mobile
            startX: isMobile ? '60vw' : '90vw',

            lastWordWidthPercent: isMobile ? 0.20 : 0.15,

            // 📱 Vertical: shorter drop on mobile
            startY: isMobile ? '-30vh' : '-60vh',
            finalY: isMobile ? '-2vh' : '-6vh',

            // 📱 Less tilt on mobile (feels cleaner)
            startRotation: isMobile ? 8 : 15,

            slideEase: 'none',
            dropEase: 'power2.out'
        };

        heading.innerText = CONFIG.text;

        gsap.set(heading, {
            transformOrigin: "left bottom",
            visibility: "hidden"
        });

        function getEndX() {
            const totalWidth = heading.scrollWidth;
            const vw = window.innerWidth;
            const lastWordWidth = totalWidth * CONFIG.lastWordWidthPercent;
            const lastWordStart = totalWidth - lastWordWidth;
            return -(lastWordStart - (vw / 2 - lastWordWidth / 2));
        }

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
            heading,
            { x: CONFIG.startX },
            {
                x: getEndX,
                ease: CONFIG.slideEase,
                duration: 1
            },
            0
        );

        tl.fromTo(
            heading,
            { y: CONFIG.startY, rotation: CONFIG.startRotation },
            {
                y: CONFIG.finalY,
                rotation: 0,
                ease: CONFIG.dropEase,
                duration: 0.25
            },
            0
        );

        ScrollTrigger.create({
            trigger: section,
            start: CONFIG.earlyStart,
            end: CONFIG.pinStart,
            scrub: CONFIG.scrub,
            invalidateOnRefresh: true,
            onEnter: () => gsap.set(heading, { visibility: 'visible' }),
            onEnterBack: () => gsap.set(heading, { visibility: 'visible' }),
            onLeaveBack: () => gsap.set(heading, { visibility: 'hidden' }),
            onUpdate: self => {
                tl.progress(self.progress * CONFIG.earlyProgress);
            }
        });

        ScrollTrigger.create({
            trigger: section,
            start: CONFIG.pinStart,
            end: CONFIG.pinEnd,
            scrub: CONFIG.scrub,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => gsap.set(heading, { visibility: 'visible' }),
            onEnterBack: () => gsap.set(heading, { visibility: 'visible' }),
            onUpdate: self => {
                tl.progress(
                    CONFIG.earlyProgress +
                    self.progress * (1 - CONFIG.earlyProgress)
                );
            }
        });

        // 📱 Recalculate isMobile on resize too
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
        } else {
            window.addEventListener('load', () => ScrollTrigger.refresh());
        }
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initScrollAnim();
    } else {
        window.addEventListener('load', initScrollAnim);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
    }
});
window.onbeforeunload = () => { window.scrollTo(0, 0); };
