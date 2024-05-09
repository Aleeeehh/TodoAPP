

//const title = document.querySelector('h1');
//prendi un elemento h1 dall'html; si può anche selezionare una classe;

//title.innerText = "TODO-LIST"; //POSSO MODIFICARE IL TESTO 

// INIZIALIZZAZIONI VARIABILI DEL DOCUMENTO 
const button = document.querySelector('button');
const input = document.querySelector('input');
const list = document.querySelector('.list');
//RICORDATI IL "." SE E' UNA CLASSE CHE HAI CREATO TE!!!!
const empyListMessage = document.querySelector('.empty-message');

const STORAGE_KEY = "key"; //chiave per il local storage

const storage = localStorage.getItem(STORAGE_KEY);
//tiro giù le attività dal local storage


let activities = []; //dichiaro lista

if (storage) //se storage esiste
{
    activities = JSON.parse(storage);
}

showContent();
clickToAddActivity();

//Clicco "+" per aggiungere un attività
function clickToAddActivity() {
    button.addEventListener("click", function () { //ogni volta che c'è un click, fai questo
        const newActivity = input.value.trim(); // prendi l'input 
        if (newActivity.length > 0) {
            activities.push(newActivity); //pusha la nuova attività nelle activities
            showContent(); //aggiungi a livello grafico l'attività, scrivendo l'html per essa
            input.value = " "; //svuota la barra di input
        }
    });
}

//aggiorna UI
function showContent() {
    //INIZIALIZZAZIONE: pulisco tutto
    list.innerText = " ";
    empyListMessage.innerText = " ";

    //Se ci sono attività, mostrale, altrimenti mostra messaggio 
    //di lista vuota

    if (activities.length > 0) {
        addActivity()
        makeCheckClickable()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
        //inserisco l'attività anche nel localStorage
    }
    else {
        addEmptyActivity();
    }
}


//funzione per cliccare i check
function makeCheckClickable() {
    //crea una lista con tutti i check
    const checks = document.querySelectorAll(".check");

    checks.forEach(function (check, index) { //per ogni check
        check.addEventListener("click", function () {
            activities.splice(index, 1); //elimina dalla lista l'oggeto numero index
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
            showContent();
        });

    });
}

//aggiungi attività
function addActivity() {
    activities.forEach(function (activity) { //ciclo for each
        list.innerHTML += `
        <li class="list-item">
        <div class="check">
            <img src="immagini/check.svg" alt="check icon">
        </div>

        <p class="text"> ${activity}</p>
    </li>`;
    }); //aggiungi dentro list, ogni elemento, il html. la function è una funzione
    //che viene eseguità all'interno del for each, per ogni elemento

}

//aggiungi l'attività vuota
function addEmptyActivity() {
    list.innerHTML += `
    <li class="list-item">
    <p class="text">Sembra che non ci siano attività! </p>
</li>`;
}