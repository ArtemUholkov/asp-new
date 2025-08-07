
const video = document.querySelector('.main__phone-video');
const soundIcon = document.querySelector('.main__sound-icon');

if (video) {
    // Function to update sound icon
    function updateSoundIcon() {
        if (video.muted) {
            soundIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
        } else {
            soundIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6696 17.0039 12C17.0039 13.3304 16.4774 14.6024 15.54 15.54" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
        }
    }

    // Toggle mute/unmute on video click
    video.addEventListener('click', function () {
        video.muted = !video.muted;
        updateSoundIcon();
    });

    // Toggle mute/unmute on sound icon click
    if (soundIcon) {
        soundIcon.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent video click event
            video.muted = !video.muted;
            updateSoundIcon();
        });
    }

    // Initialize sound icon
    updateSoundIcon();
}


const burger = document.querySelector('#burger');
const popup = document.querySelector('#popup');
const popupSlide = document.querySelector('#popupSlide');
const sliderItem = document.querySelectorAll('.our_requirements_content_item');
const sliderPhoto = document.querySelector('.our_requirements_img');
const body = document.body;
const casualLogo = document.querySelector('.header__logo--white');
const colorLogo = document.querySelector('.header__logo--color');

burger.addEventListener('click', burgerHandler);
popup.addEventListener('click', (e) => {
    burgerHandler(e);
});

sliderItem.forEach((e) => {
    e.addEventListener('click', () => {
        setImage(e, sliderItem);
    });
});

function burgerHandler(e) {
    if (popup.classList.contains('open')) {
        popup.classList.add('close');
        body.classList.remove('noscroll');
        popupSlide.classList.add('slideout');
        casualLogo.classList.remove('header__logo--hide');
        colorLogo.classList.add('header__logo--hide');
        setTimeout(() => {
            casualLogo.classList.remove('header__logo--hide');
            colorLogo.classList.add('header__logo--hide');
        }, 270);
        setTimeout(() => {
            popup.classList.remove('close');
            popup.classList.remove('open');
            popupSlide.classList.remove('slideout');
            popupSlide.classList.remove('slidein');
        }, 270);
    } else {
        body.classList.add('noscroll');
        popup.classList.add('open');
        popupSlide.classList.add('slidein');
        setTimeout(() => {
            colorLogo.classList.remove('header__logo--hide');
            casualLogo.classList.add('header__logo--hide');
        }, 270);
    }
    burger.classList.toggle('active');
}

const faq = document.querySelectorAll('.faq__item');

faq.forEach((element) => {
    element.addEventListener('click', function (e) {
        const wrapper = element.querySelector('.faq__answer-wrapper');
        const questionWrapper = e.target.closest('.faq__question-wrapper');
        const icon = element.querySelector('.faq__plus-minus-icon');

        if (e.target.closest('.current')) {
            wrapper.style.height = `0`;
            questionWrapper.classList.remove('active');
            questionWrapper.classList.remove('current');
            icon.innerHTML = '+';
            return;
        }

        document.querySelectorAll('.faq__answer-wrapper').forEach((el) => {
            el.style.height = 0;
        });

        document.querySelectorAll('.faq__question-wrapper').forEach((el) => {
            el.classList.remove('active');
            el.classList.remove('current');
            document.querySelectorAll('faq__plus-minus-icon').innerHTML = "+";
        });

        document.querySelectorAll('.faq__plus-minus-icon').forEach((el) => {
            el.innerHTML = "+";
        });

        if (e.target.closest('.faq__question-wrapper') && !e.target.closest('.faq__question-wrapper').classList.contains('active')) {
            const answerHeight = element.querySelector('.answer').clientHeight;
            wrapper.style.height = `${answerHeight + 60}px`;
            icon.innerHTML = '&ndash;';
            questionWrapper.classList.add('active');
            questionWrapper.classList.add('current');
        }

    })
});

document.querySelector('#faq-click').click();

const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const processBg = document.querySelector('.process_bg');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                processBg.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    },
    {
        threshold: 0.2, // Trigger when 20% of the element is visible
    },
);

// Start observing the bottles section (where process_bg is located)
const bottlesSection = document.querySelector('.bottles');
if (bottlesSection) {
    observer.observe(bottlesSection);
}

// Initialize mobile steps swiper
const stepsMobileSwiper = new Swiper('.steps-mobile-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    pagination: {
        el: '.steps-mobile-pagination',
        clickable: true,
        // dynamicBullets: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});

const playBtns = document.querySelectorAll('.founder__play-btn');
const modal = document.getElementById('founder-video-modal');
const closeBtn = document.querySelector('.founder-video-modal-close');
const backdrop = document.querySelector('.founder-video-modal-backdrop');
const modalVideo = document.getElementById('founder-video');

function openModal() {
    modal.classList.add('show');
    modalVideo.currentTime = 0;
    modalVideo.play();
}

function closeModal() {
    modal.classList.remove('show');
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

playBtns.forEach((btn) => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

AOS.init()