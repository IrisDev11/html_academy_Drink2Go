// МОБИЛЬНОЕ МЕНЮ
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// СОРТИРОВКА
const sortingList = document.querySelector('.sorting__list');
const sortingToggle = document.querySelector('.sorting__toogle');

sortingList.classList.remove('sorting__list--nojs');

sortingToggle.addEventListener('click', function() {
  if (sortingList.classList.contains('sorting__list--closed')) {
    sortingList.classList.remove('sorting__list--closed');
    sortingList.classList.add('sorting__list--opened');
    sortingToggle.classList.add('sorting__toggle--opened');
  } else {
    sortingList.classList.add('sorting__list--closed');
    sortingList.classList.remove('sorting__list--opened');
    sortingToggle.classList.remove('sorting__toggle--opened');
  }
});

// СЛАЙДЕР
const switchesSlides = () => {
  const slider = document.querySelector('.slider');
  let sliderButtons, sliderNavButtons, slides;

  const findCurrentButton = (element) => {
    return element.classList.contains('slider__controls-button--current');
  }

  const findCurrentSlide = (element) => {
    return element.classList.contains('slider__item--current');
  }

  const changeSlides = (indexCurrentSlide, indexNextSlide) => {
    slides[indexCurrentSlide].classList.remove('slider__item--current');
    slides[indexNextSlide].classList.add('slider__item--current');
  }

  const clickSliderControls = (evt) => {
    let element = evt.target;

    if (element.classList.contains('slider__controls-button')) {
      evt.preventDefault();

      let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));
      let indexNextButton = sliderButtons.indexOf(element);

      sliderButtons[indexCurrentButton].classList.remove('slider__controls-button--current');
      sliderButtons[indexNextButton].classList.add('slider__controls-button--current');

      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexNextButton;
      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }

  const clickSliderNav = (evt) => {
    let element = evt.target;

    if (element.classList.contains('slider__nav-button')) {
      evt.preventDefault();

      let indexButton = sliderNavButtons.indexOf(element);
      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexCurrentSlide;

      switch (indexNextSlide, indexButton) {
        case 0:
          indexButton === 0;
          indexNextSlide -= 1;
          if (indexNextSlide < 0) {
            indexNextSlide = slides.length - 1;
          }
          break;

        case 1:
          indexButton === 1;
          indexNextSlide += 1;
          if (indexNextSlide >= slides.length) {
            indexNextSlide = 0;
          }
          break;

        default:
          break;
      }

      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }

  if (slider) {
    const sliderControls = document.querySelector('.slider__controls');
    const sliderNav = document.querySelector('.slider__nav');

    sliderButtons = Array.from(sliderControls.querySelectorAll('.slider__controls-button'));
    sliderNavButtons = Array.from(sliderNav.querySelectorAll('.slider__nav-button'));
    slides = Array.from(slider.querySelectorAll('.slider__item'));
    console.log(slides);

    if (slides && sliderButtons && sliderNavButtons) {
      sliderControls.addEventListener('click', clickSliderControls);
      sliderNav.addEventListener('click', clickSliderNav);
    }
  }
}

switchesSlides();

// КАРТА
const mapCanvas = document.querySelector('#map-canvas');
const mapImage = document.querySelector('.map__image');

const makesStateActive = () => {
  mapImage.classList.remove('map__image--hidden');
};

const map = L.map(mapCanvas);

const renderMap = () => {
  map.on('load', () => {
    makesStateActive();
  })
    .setView({
      lat: 59.968458299943094,
      lng: 30.317555665969852,
    }, 100);

  L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: '../img/map-pin.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const marker = L.marker(
  {
    lat: 59.96839655026502,
    lng: 30.3176361322403,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

renderMap();
