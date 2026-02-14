const btn = document.getElementById("aboutbn"); // matches HTML
const section = document.getElementById("secondsec");
const animatedElements = document.querySelectorAll('.animate');


const Drop = document.getElementById("contactid");
const menu = document.getElementById("contactmenu");


const mailbtn = document.getElementById("emailid");
const phbtn = document.getElementById("phno");
const toast = document.getElementById("toast");

btn.addEventListener('click', () => {
  section.scrollIntoView({ behavior: 'smooth' });
});



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show'); // trigger animation
    }
  });
}, { threshold: 0.1 }); // trigger when 10% visible

animatedElements.forEach(el => observer.observe(el));



Drop.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("show");
});


mailbtn.addEventListener("click", function () {
  navigator.clipboard.writeText("yadhukishantr@gmail.com");
   toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);});


phbtn.addEventListener("click", function () {
  navigator.clipboard.writeText("+91 6238927849");
   toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);});