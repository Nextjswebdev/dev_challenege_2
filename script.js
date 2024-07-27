// I used GSAP library for animations and ScrollTrigger for scrolling effects.

gsap.registerPlugin(ScrollTrigger);

// Scrolling + behave of upcoming sections
gsap.utils.toArray("section").forEach((section, i) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Parallax effect for header background
gsap.to(".header-bg", {
    y: () => -window.innerHeight * 0.5,
    ease: "none",
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Swicth back effect for header background
gsap.to(".header-bg", {
    rotation: 360,
    duration: 60,
    repeat: -1,
    ease: "none"
});

// Text animation for h2, p, li
gsap.utils.toArray("h2, p, li").forEach(elem => {
    gsap.from(elem, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
        }
    });
});

// Cricket ball related selectors
const ball = document.querySelector('.cricket-ball');
const popup = document.querySelector('.popup');
let isPopupVisible = false;

// Function to update popup position
function updatePopupPosition() {
    const ballRect = ball.getBoundingClientRect();
    popup.style.top = `${ballRect.top + ballRect.height / 2}px`;
    popup.style.left = `${ballRect.left + ballRect.width / 2}px`;
}


// Cricket ball animation
gsap.to(ball, {
    y: () => window.innerHeight,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
            gsap.to(ball, {
                rotation: self.progress * 720,
                duration: 0.1
            });
            if (isPopupVisible) {
                updatePopupPosition();
            }
        }
    }
});


// Popup animation for cricket ball
ball.addEventListener('click', () => {
    isPopupVisible = true;
    updatePopupPosition();

    gsap.to(popup, {
        display: 'block',
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
    });

    setTimeout(() => {
        gsap.to(popup, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                popup.style.display = 'none';
                isPopupVisible = false;
            }
        });
    }, 2000);
});