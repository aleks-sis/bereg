'use strict';
const rate = { cosmetic:4500, capital:9000, room:5500 };
let selectedKind = 'cosmetic';
const area = document.querySelector('#area');
const number = document.querySelector('#area-number');
const money = value => new Intl.NumberFormat('ru-RU').format(value);
function updateEstimate(){
 const size = Math.max(5,Math.min(150,Number(area.value)||45));
 const low=size*rate[selectedKind];
 document.querySelector('#estimate-price').textContent=`${money(low)} – ${money(Math.round(low*1.2))} ₽`;
 document.querySelector('#estimate-description').textContent=`${size} м² × от ${money(rate[selectedKind])} ₽/м² · без материалов`;
 document.querySelectorAll('.kind').forEach(button=>{ const on=button.dataset.kind===selectedKind;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on)); });
 document.querySelector('#request-type').selectedIndex={cosmetic:0,capital:1,room:2}[selectedKind];
}
area.addEventListener('input',()=>{number.value=area.value;updateEstimate();});
number.addEventListener('input',()=>{if(number.value!==''&&number.validity.valid){area.value=number.value;updateEstimate();}});
number.addEventListener('change',()=>{const val=Math.max(5,Math.min(150,Number(number.value)||45));number.value=val;area.value=val;updateEstimate();});
document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>{selectedKind=button.dataset.kind;updateEstimate();if(button.classList.contains('service-choice'))document.querySelector('#estimate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter;});}));
const dialog=document.querySelector('#request-dialog');
document.querySelector('#request-form').addEventListener('submit',event=>{event.preventDefault();const message=document.querySelector('#request-message').value.trim();if(!message){document.querySelector('#request-message').setCustomValidity('Опишите задачу несколькими словами.');document.querySelector('#request-message').reportValidity();return;}document.querySelector('#request-preview').textContent=`${document.querySelector('#request-type').value}\n\n${message}`;document.querySelector('#copy-status').textContent='';dialog.showModal();});
document.querySelector('#request-message').addEventListener('input',event=>event.target.setCustomValidity(''));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#copy-request').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#request-preview').textContent);document.querySelector('#copy-status').textContent='Текст скопирован.';}catch{document.querySelector('#copy-status').textContent='Выделите и скопируйте текст заявки вручную.';}});
updateEstimate();

const menuButton=document.querySelector('.mobile-menu-button');
const mobileNav=document.querySelector('.mobile-nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileNav.hidden=!open;menuButton.textContent=open?'×':'☰';});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');menuButton.textContent='☰';}));
const gallery=document.querySelector('#gallery-dialog');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#gallery-image').src=button.dataset.image;document.querySelector('#gallery-image').alt=button.dataset.caption+' — иллюстративный интерьер';document.querySelector('#gallery-caption').textContent=button.dataset.caption;gallery.showModal();}));
document.querySelector('.gallery-close').addEventListener('click',()=>gallery.close());
gallery.addEventListener('click',event=>{if(event.target===gallery){const r=gallery.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)gallery.close();}});
