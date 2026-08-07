if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('hide'),700));
const header=document.querySelector('.header');const setHeader=()=>header.classList.toggle('scrolled',scrollY>24);setHeader();addEventListener('scroll',setHeader,{passive:true});
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>document.body.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('open')));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
const slides=[...document.querySelectorAll('.slide')];let i=0;setInterval(()=>{slides[i].classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active');document.getElementById('current').textContent=String(i+1).padStart(2,'0')},4800);
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);const t=`Merhaba, OSOTTO bayilik başvurusu yapmak istiyorum.\n\nAd Soyad: ${d.get('name')}\nFirma: ${d.get('company')||'-'}\nŞehir: ${d.get('city')}\nTelefon: ${d.get('phone')}\nE-posta: ${d.get('email')||'-'}`;open(`https://wa.me/905431945858?text=${encodeURIComponent(t)}`,'_blank')});
const modal=document.getElementById('modal');document.querySelectorAll('.card').forEach(c=>c.querySelector('button').addEventListener('click',()=>{const n=c.dataset.name;document.getElementById('modalTitle').textContent=n;document.getElementById('modalImg').src=c.querySelector('img').src;document.getElementById('modalLink').href=`https://wa.me/905431945858?text=${encodeURIComponent('Merhaba, OSOTTO '+n+' modeli hakkında bilgi almak istiyorum.')}`;modal.showModal()}));document.querySelector('.close').addEventListener('click',()=>modal.close());
