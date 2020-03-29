function scroll(event) {
  let curPosition = window.scrollY;
  if (curPosition > 120) {
    document.querySelector('header').style.position= 'fixed';
  }else document.querySelector('header').style.position= 'relative';
  document.querySelectorAll('main > section').forEach((item) => {
      item.getAttribute('id');
      if (item.offsetTop <= curPosition && (item.offsetTop + item.offsetHeight)> curPosition) {
        document.querySelectorAll('nav a').forEach((a) =>{
          a.style.color='';
          if (item.getAttribute('id') === a.getAttribute('href').substr(1)) {
            a.style.color='#f06c64';
          }
        })
      }
  });

}
document.addEventListener('scroll', scroll);

const navbarItemActive  = (event) =>{
  document.querySelectorAll('.navigation').forEach(item => item.style.color='');
  event.preventDefault();
   let id = event.target.getAttribute('href').substr(1);
   document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}
document.querySelector('.navig').addEventListener('click' ,navbarItemActive);

const SLIDER_FRAME = document.querySelector('.frame-slider');
const SLIDER_SECTION = document.querySelector('.slider');

let sliders
initNewStructure();
const FIRST = 0, LAST = sliders.length-1;
let current = FIRST, next = FIRST + 1, prev = LAST;
NewStruct();

nextBtn.addEventListener('click', buttonHand);
prevBtn.addEventListener('click', buttonHand);
SLIDER_FRAME.addEventListener('click', handPhone);

function initNewStructure () {
  if (SLIDER_FRAME.children.length > 2) {
    sliders = [...SLIDER_FRAME.children];
  } else {
    sliders = [...SLIDER_FRAME.children];
    [...SLIDER_FRAME.children].forEach(item => {
      sliders.push(item.cloneNode(true));
    });
  }
}

function NewStruct () {
  sliders.forEach(slide => slide.remove());
  sliderPosition();
  useStyles();
  SLIDER_FRAME.append(sliders[prev], sliders[current], sliders[next]);
}

function sliderPosition () {
  sliders[prev].classList.add('slide_prev');
  sliders[current].classList.add('slide_current');
  sliders[next].classList.add('slide_next');
}

function useStyles () {
  SLIDER_SECTION.style.backgroundColor = sliders[current].dataset.bgColor;
  SLIDER_SECTION.style.borderColor = sliders[current].dataset.borderColor;
}

function buttonHand (e) {
  disableButton(e);
  cancelArrang();
  if(e.target === nextBtn) {
    sliders[prev].remove();
    prev == LAST ? prev = FIRST : prev++ ;
    current == LAST ? current = FIRST : current++ ;
    next == LAST ? next = FIRST : next++;
    SLIDER_FRAME.append(sliders[next]);

  } else {
    sliders[next].remove();
    prev == FIRST ? prev = LAST : prev-- ;
    current == FIRST ? current = LAST : current-- ;
    next == FIRST ? next = LAST : next--;
    SLIDER_FRAME.prepend(sliders[prev]);
  }
  sliderPosition();
  useStyles();
  switchMobile();
}

function disableButton (e) {
  e.target.disabled = true;
  e.target.classList.add('hidden', 'no-pointed');
  setTimeout(() => {
    e.target.disabled = false;
    e.target.classList.remove('hidden', 'no-pointed');
  }, 1000);
}

function cancelArrang () {
  sliders.forEach(slide => slide.classList.remove('slide_prev', 'slide_current', 'slide_next'));
}

function switchMobile () {
  [...sliders[current].children].forEach(mobile => mobile.children[1].classList.remove('hidden'));
}

function handPhone (e) {
  if(e.target.classList.contains('mobile-screen-on')) {
    e.target.classList.toggle('hidden');
  }
  if(e.target.classList.contains('mobile-phone')) {
    e.target.nextSibling.classList.toggle('hidden');
  }
}

const LOC_HASH = document.location.hash;
const LOGO = document.querySelector('.ico');
const HEADER_NAV = document.querySelector('.navig ul');
const NAV_ITEMS = [...HEADER_NAV.querySelectorAll('li')];

const TAGS_MENU = document.querySelector('.tag');
const TAGS = [...TAGS_MENU.querySelectorAll('.tag-item')];
const GALLERY = document.querySelector('.portfolio .portfolio-img-block');
const PICS = [...GALLERY.querySelectorAll('.portfolio-img')];

TAGS_MENU.addEventListener('click', (e) => {
  TAGS.forEach(tag => tag.classList.remove('tag-item-active'));
  e.target.classList.add('tag-item-active');
  PICS.forEach(pic => pic.style.order = Math.floor((Math.random()*PICS.length)).toString());
});

GALLERY.addEventListener('click', (e) => {
  PICS.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
});

const FORM = document.querySelector('.contact-form');
FORM.addEventListener('submit', submitFormHandler);

function submitFormHandler (e) {
  e.preventDefault();
  displayModal();
  fillModal();
  document.querySelector('.win-btn').addEventListener('click', removeModal);
}

function fillModal () {
  if (FORM.subject.value) document.querySelector('.win-subj').textContent = 'Subject: ' + FORM.subject.value;
  if (FORM.comments.value) document.querySelector('.win-comm').textContent = 'Description: ' + FORM.comments.value;
}

function displayModal () {
  document.body.append(template.content.cloneNode(true));
}

function removeModal (e) {
  e.target.closest('.wrap-2').remove();
  FORM.reset();
}
