const section1 = document.querySelector('.bookings');
const section2 = document.querySelector('.formsection');
const section3 = document.querySelector('.contact-page');
const list = document.querySelector('.list');
const add = document.querySelector('.new');
const contact = document.querySelector('.contact');

function fun1() {
    section1.style.display = 'flex';
    section2.style.display = 'none';
    section3.style.display = 'none';
  }
  
  function fun2() {
    section1.style.display = 'none';
    section2.style.display = 'block';
    section3.style.display = 'none';
  }
  
  function fun3() {
    section1.style.display = 'none';
    section2.style.display = 'none';
    section3.style.display = 'flex';
  }

  
list.addEventListener('click', fun1);
add.addEventListener('click', fun2);
contact.addEventListener('click', fun3);


