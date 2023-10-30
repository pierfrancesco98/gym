const returnTop = document.querySelector('.return-top');
window.addEventListener('scroll', () => {
   if(scrollY >= 180){
       returnTop.classList.add('act');
   }else{
       returnTop.classList.remove('act');
   }
});
    
const options = {
   method: 'GET',
   headers: {
       'X-RapidAPI-Key': '8ebee3abdamshb792b44d508585bp169de2jsn72ca263d37ad',
       'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
   }
};
let esercizi = [];
const items = document.querySelectorAll('.dropdown-item');
const containerEsercizi = document.querySelector('.container-esercizi');
const search = document.querySelector('#search');
const btnSearch = document.querySelector('#btnSearch');
const textEsercizi = document.querySelector('#textEsercizi');

fetchData();
function fetchData() {
 fetch('https://exercisedb.p.rapidapi.com/exercises', options)
   .then(response => response.json())
   .then(risposta => {
     risposta.forEach(eserciziList => {
       esercizi.push(eserciziList)
     });
   })
   .catch(error => {
     console.log('errore', error);
   });
}

function filterElements(array, bodyPart) {
 return array.filter(item => item.bodyPart === bodyPart);
}

function createCard(nome, immagine) {
 const card = document.createElement('div');
 card.classList.add('card');
 const nomeElement = document.createElement('h3');
 nomeElement.textContent = nome;
 const immagineElement = document.createElement('img');
 immagineElement.src = immagine;
 immagineElement.alt = nome;
 immagineElement.classList.add('img-fluid');
 const buttonElement = document.createElement('button');
 buttonElement.classList.add('btn-outline');
 buttonElement.textContent = 'add to tab';
 card.appendChild(nomeElement);
 card.appendChild(immagineElement);
 card.appendChild(buttonElement);
 return card;
}

items.forEach(item => {
item.addEventListener('click', (event) => {
 const parteDelCorpo = event.target.id;
 const elementiFiltrati = filterElements(esercizi, parteDelCorpo);
 const elementiDesiderati = elementiFiltrati.slice(0, 30);
 containerEsercizi.innerHTML = '';
   if(parteDelCorpo === 'chest'){
     textEsercizi.innerHTML = 'chest';
   }else if(parteDelCorpo === 'waist') {
     textEsercizi.innerHTML = 'waist';
   }else if (parteDelCorpo === 'upper legs') {
      textEsercizi.innerHTML = 'upper legs';
   } else if (parteDelCorpo === 'back') {
     textEsercizi.innerHTML = 'back';
   } else if (parteDelCorpo === 'shoulders') {
     textEsercizi.innerHTML = 'shoulders';
   } else if (parteDelCorpo === 'upper arms') {
     textEsercizi.innerHTML = 'upper arms';
   } else if (parteDelCorpo === 'cardio') {
     textEsercizi.innerHTML = 'cardio';
   } else {
     textEsercizi.style.display = 'none';
   }
 elementiDesiderati.forEach(element => {
   const nome = element.name;
   const immagine = element.gifUrl;
   console.log(nome);
   const card = createCard(nome, immagine);
   containerEsercizi.append(card);
   });
 });
});

btnSearch.addEventListener('click', () => {
 const valore = search.value.toLowerCase();
 switch (valore) {
   case 'petto':
   case 'pettorali':
   case 'chest':
   filterAndDisplayElements('chest');
   textEsercizi.innerHTML = 'chest';
   break;
   case 'gambe':
   case 'legs':
   filterAndDisplayElements('upper legs');
   textEsercizi.innerHTML = 'upper legs';
   break;
   case 'braccia':
   case 'arms':
   case 'bicipiti':
   case 'tricipiti':
   filterAndDisplayElements('upper arms');
   textEsercizi.innerHTML = 'upper arms';
   break;
   case 'spalle':
   case 'shoulders':
   filterAndDisplayElements('shoulders');
   textEsercizi.innerHTML = 'shoulders';
   break;
   case 'addome':
   case 'addominali':
   case 'waist':
   filterAndDisplayElements('waist');
   textEsercizi.innerHTML = 'waist';
   break;
   case 'cardio':
   filterAndDisplayElements('cardio'); 
   textEsercizi.innerHTML = 'cardio';
   break;
   case 'schiena':
   case 'back':
   filterAndDisplayElements('back');
   textEsercizi.innerHTML = 'back';
   break; 
   default:
   alert('Body part not available');
   textEsercizi.style.display = 'none';
   break;
 }
 window.location.href = '#esercizi';
});

function filterAndDisplayElements(bodyPart) {
 const elementiFiltrati = filterElements(esercizi, bodyPart);
 const elementiDesiderati = elementiFiltrati.slice(0, 30);
 containerEsercizi.innerHTML = '';
 elementiDesiderati.forEach(element => {
   const nome = element.name;
   const immagine = element.gifUrl;
   console.log(nome);
   const card = createCard(nome, immagine);
   containerEsercizi.append(card);
 });
}

const home = document.getElementById('home');
home.addEventListener('click', () => {
 window.location.reload();
});

const menu = document.querySelector('.menu');
       const menuBtn = document.querySelector('.menu-btn');

       menuBtn.addEventListener('click',() =>{
       menu.classList.toggle('menu-open');
       });