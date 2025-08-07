const burger = document.querySelector('#burger');
const popup = document.querySelector('#popup');
const popupSlide = document.querySelector('#popupSlide');
const sliderItem = document.querySelectorAll('.our_requirements_content_item');
const sliderPhoto = document.querySelector('.our_requirements_img');
const body = document.body;
const casualLogo = document.querySelector('.logo-white');
const colorLogo = document.querySelector('.logo-color');

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
    casualLogo.classList.remove('logo-hide');
    colorLogo.classList.add('logo-hide');
    setTimeout(() => {
      casualLogo.classList.remove('logo-hide');
      colorLogo.classList.add('logo-hide');
      // colorLogo.classList.remove('logo-hide');
      // casualLogo.classList.add('logo-hide');
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
      //   casualLogo.classList.remove('logo-hide');
      // colorLogo.classList.add('logo-hide');
      colorLogo.classList.remove('logo-hide');
      casualLogo.classList.add('logo-hide');
    }, 270);
  }
  burger.classList.toggle('active');
}
let activeFaqId = null;

function toggleAnswer(faqId) {
  const currentFaq = document.getElementById(faqId);
  const currentAnswerWrapper = currentFaq.querySelector('.answer-wrapper');
  const currentQuestionWrapper = currentFaq.querySelector('.question-wrapper');
  const currentSeparator = currentFaq.querySelector('.separator');
  const currentIcon = currentFaq.querySelector('.plus-minus-icon'); // Select the plus/minus icon

  if (activeFaqId && activeFaqId !== faqId) {
    // Collapse previously active FAQ
    const previousFaq = document.getElementById(activeFaqId);
    const previousAnswerWrapper = previousFaq.querySelector('.answer-wrapper');
    const previousQuestionWrapper = previousFaq.querySelector('.question-wrapper');
    const previousSeparator = previousFaq.querySelector('.separator');
    const previousIcon = previousFaq.querySelector('.plus-minus-icon'); // Select the plus/minus icon of previous FAQ

    previousAnswerWrapper.style.maxHeight = null;
    previousAnswerWrapper.style.opacity = 0;
    previousSeparator.style.opacity = 0;
    previousQuestionWrapper.classList.remove('active');
    previousIcon.textContent = '+'; // Change to plus when closed
  }

  if (activeFaqId === faqId) {
    // Collapse current if it's the same one clicked
    currentAnswerWrapper.style.maxHeight = null;
    currentAnswerWrapper.style.opacity = 0;
    currentSeparator.style.opacity = 0;
    currentQuestionWrapper.classList.remove('active');
    currentIcon.textContent = '+'; // Change to plus when collapsed
    activeFaqId = null; // Reset activeFaqId
  } else {
    // Expand current FAQ
    currentAnswerWrapper.style.maxHeight = currentAnswerWrapper.scrollHeight + 'px';
    currentAnswerWrapper.style.opacity = 1;
    currentSeparator.style.opacity = 1;
    currentQuestionWrapper.classList.add('active');
    currentIcon.innerHTML = '&ndash;'; // Change to minus when expanded
    activeFaqId = faqId; // Set the new active FAQ
  }
}

// Optionally, trigger the first FAQ to open on page load
document.querySelector('#faq-click').click();
