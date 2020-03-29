const navig = document.getElementById('navig');
navig.addEventListener('click', (event) => {
    navig.querySelectorAll('li a').forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');
});
document.addEventListener ('scroll', onScroll);
function onScroll (event) {
    const currentPosition = window.scrollY;
    const header = document.querySelector('header')
    const sections = document.querySelectorAll('body > *');
    const navigations = document.querySelectorAll('#navig li a');

    sections.forEach((element) => {
        if (element.hasAttribute('id')) {
        if (element.offsetTop - header.clientHeight <= currentPosition && (element.offsetTop + element.clientHeight) > currentPosition) {
            navigations.forEach( (link) => {
              link.classList.remove('active');
              if (element.getAttribute('id') === link.getAttribute('href').substring(1)) {
                  link.classList.add('active');
              }   
            });
        }
    }
    })
}
let phones = document.querySelectorAll('.phones');
let currentSlide = 0; 
let isEnabled = true;  
function changeCurrentSlide (n) {
    currentSlide = ( n + phones.length ) % phones.length;    
}
function hideSlide(direction) {
    isEnabled = false; 
    phones[currentSlide].classList.add(direction);
    phones[currentSlide].addEventListener('animationend', function() { 
        this.classList.remove('activated', direction); 
    })
}
function showSlide(direction) {
    phones[currentSlide].classList.add('next', direction); 
    phones[currentSlide].addEventListener('animationend', function() { 
        this.classList.remove('next', direction); 
        this.classList.add('activated'); 
        isEnabled = true;  
    })

    if (currentSlide === 1) {
        document.querySelector("body > .slider").style.backgroundColor='#648BF0';
        document.querySelector("body > .slider").style.borderColor='#6f92ef';        
    } else {
            document.querySelector("body > .slider").style.backgroundColor='#f06c64';
            document.querySelector("body > .slider").style.borderColor='#ea676b';            
    }
}
function previousSlide (n) {
   hideSlide('to-right'); 
   changeCurrentSlide(n-1);   
   showSlide('from-left');  
}
function nextSlide (n) {
    hideSlide('to-left'); 
    changeCurrentSlide(n+1);   
    showSlide('from-right');  
 }

document.querySelector('.arrows .right').addEventListener('click', function() {
   if (isEnabled) {
       previousSlide(currentSlide);
   }
})

document.querySelector('.arrows .left').addEventListener('click', function() {
    if (isEnabled) {
        nextSlide(currentSlide);
    }
 })

 const HOMEBTNS = document.querySelectorAll('.home-btn');

 HOMEBTNS.forEach((btn) => btn.addEventListener('click', function (event) {
     let verticalPhoneDiv = document.querySelector('.vertical');
     let horizintalPhoneDiv = document.querySelector('.horizontal');
     let verticalBlackScreen = document.querySelector('.vertical .black-screen');
     let horizontalBlackScreen = document.querySelector('.horizontal .black-screen');

    if (verticalPhoneDiv.contains(btn)) verticalBlackScreen.hidden = !verticalBlackScreen.hidden;
    if (horizintalPhoneDiv.contains(btn)) horizontalBlackScreen.hidden = !horizontalBlackScreen.hidden;
 })) 



const FILTER = document.getElementById('portfolio-filter');

FILTER.addEventListener('click', (event) => {
    if (event.target.closest('button')){
        FILTER.querySelectorAll('li button').forEach(element => element.classList.remove('active'));
        event.target.classList.add('active');
    } else event.target.stopPropagation();

    document.querySelector('.pics').querySelectorAll('.icons').forEach(element => {        
         element.style.order = Math.floor(1 + Math.random() * 12);        
    });
});


const PICS = document.getElementById('portfolio-pics');

PICS.addEventListener('click', (event) => {
    PICS.querySelectorAll('.icons').forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');        
});

const FORM = document.getElementById('form-elem');
const FORMSUBJECT = document.querySelector('.input-subject');
const FORMDESC = document.querySelector('.input-desc');
const MODAL = document.querySelector('.modal-overlay');

FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    MODAL.hidden = false;

    if (!FORMSUBJECT.value) MODAL.querySelector('.modal p:nth-child(2)').insertAdjacentHTML('beforeend', '<span id = "theme-in-modal">No subject</span>');
    else {
        MODAL.querySelector('.modal p:nth-child(2)').insertAdjacentHTML('beforeend', `<span id = "theme-in-modal"><strong>Subject: </strong>${FORMSUBJECT.value}</span>`);
    }

    if (!FORMDESC.value) MODAL.querySelector('.modal p:nth-child(3)').insertAdjacentHTML('beforeend', '<span id = "desc-in-modal">No description</span>');
    else {
        MODAL.querySelector('.modal p:nth-child(3)').insertAdjacentHTML('beforeend', `<span id = "desc-in-modal"><strong>Description: </strong>${FORMDESC.value}</span>`);
    }
});

const OKBTN = document.getElementById('ok-btn');

OKBTN.addEventListener('click', function(event) {
    MODAL.hidden = true;
    MODAL.querySelector('#theme-in-modal').remove();
    MODAL.querySelector('#desc-in-modal').remove();
    FORM.reset();
})

const BURGER = document.querySelector('.burger-navig');
const navv = document.querySelector('.navv');
const OVERLAY = document.querySelector('.mobil-lay');
let countOfClicks = 0;


BURGER.addEventListener('click', (event) => {
    countOfClicks = (countOfClicks+1)%2;
    if (countOfClicks === 1) {
        BURGER.classList.add('active');
        OVERLAY.classList.add('active');
        navv.classList.add('mobile-active-navig');
        document.removeEventListener ('scroll', onScroll)

    } else {
        BURGER.classList.remove('active');
        navv.classList.remove('mobile-active-navig');
        OVERLAY.classList.remove('active');
        document.addEventListener ('scroll', onScroll);
    }
});

const MOBILEnavig = document.querySelector('#navig');

MOBILEnavig.addEventListener('click', (event) => {
    if (event.target.closest('ul li a')){
        countOfClicks = (countOfClicks+1)%2;
        navv.classList.remove('mobile-active-navig');
        BURGER.classList.remove('active');
        OVERLAY.classList.remove('active');
        document.addEventListener('scroll', onScroll);
    }  else { 
        event.target.stopPropagation();
    }
})
