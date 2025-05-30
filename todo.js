let lista = {};
let saved = localStorage.getItem('lista');
if (saved) {
  lista = JSON.parse(saved);
  updateHtml();
}


const today = new Date();
const formatted = today.toISOString().split('T')[0];
document.querySelector('.datum').value = formatted



function dodajtask() {
  let zadatak = document.querySelector('.text').value.trim();
  let datum = document.querySelector('.datum').value;


  if (!(lista.hasOwnProperty(`${zadatak}`)) && zadatak!== "") {
    lista[zadatak] = { datum: datum, checked: false};
    localStorage.setItem('lista', JSON.stringify(lista));
    updateHtml();
  }
  else if (zadatak === "") {
    alert('Nemoj se saliti');
  }
  else {
    alert('postoji vec');
  }
  document.querySelector('.text').value = "";
}
function updateHtml() {
  document.querySelector('.display-grid').innerHTML = "";

  for (let task in lista) {
    let item = lista[task];
    let checkedAttribute = item.checked ? "checked" : "";

    document.querySelector('.display-grid').innerHTML += `
    <input class="checker" type="radio"  id="${task}" ${checkedAttribute}>
    <label class="custom-radio" for="${task}"></label>
    <label class="zadatak"  for="${task}">${task}</label>
    <label class="vrijeme"  for="${task}">${item.datum}</label>
    <button onclick=" izbrisitask(this)" id="${task}" >Delete</button>
    `
  }
  document.querySelectorAll('.checker').forEach(function(radio) {
      radio.dataset.wasChecked = 'false';

      radio.addEventListener('mousedown', function(e) {
        if (radio.checked) {
          radio.dataset.wasChecked = 'true';
        } else {
          delete radio.dataset.wasChecked;
        }
      });

      radio.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });

    
    document.querySelectorAll('label').forEach(function(label) {
      let forId = label.getAttribute('for');
      if (!forId) return;

      label.addEventListener('click', function() {
        let radio = document.getElementById(forId);
        if (radio) {
          if (radio.checked) {
            radio.checked = false; 
            lista[forId].checked = false;
            localStorage.setItem('lista', JSON.stringify(lista));
          } else {
            radio.checked = true;
            lista[forId].checked = true;
            localStorage.setItem('lista', JSON.stringify(lista));
          }
        }
      });
    });
}
function izbrisitask(elem) {
  let id = elem.id;
  delete lista[id];
  localStorage.setItem('lista', JSON.stringify(lista));
  updateHtml();
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    dodajtask();
  }
});
