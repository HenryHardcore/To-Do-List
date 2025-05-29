const today = new Date();
const formatted = today.toISOString().split('T')[0];
document.querySelector('.datum').value = formatted
let lista = { };


function dodajtask() {
  if (!(lista.hasOwnProperty(`${document.querySelector('.text').value}`)) && document.querySelector('.text').value !== "") {
    lista[document.querySelector('.text').value] = document.querySelector('.datum').value;
    updateHtml();
  }
  else if (document.querySelector('.text').value === "") {
    alert('Nemoj se saliti')
  }
  else {
    alert('postoji vec')
  }
  document.querySelector('.text').value = "";
}
function updateHtml() {
  document.querySelector('.display-grid').innerHTML = "";
  for (let i = 0; i < Object.keys(lista).length; i++) {
    document.querySelector('.display-grid').innerHTML += `
    <input class="checker" type="radio"  id="${Object.keys(lista)[i]}">
    <label class="custom-radio" for="${Object.keys(lista)[i]}"></label>
    <label class="zadatak"  for="${Object.keys(lista)[i]}">${Object.keys(lista)[i]}</label>
    <label class="vrijeme"  for="${Object.keys(lista)[i]}">${Object.values(lista)[i]}</label>
    <button onclick=" izbrisitask(this)" id="${Object.keys(lista)[i]}" >Delete</button>
    `
    document.querySelectorAll('.checker').forEach(function(radio) {
      radio.addEventListener('mousedown', function(e) {
        if (radio.checked) {
          radio.dataset.wasChecked = 'true';
        } else {
          delete radio.dataset.wasChecked;
        }
      });

      radio.addEventListener('click', function(e) {
        if (radio.dataset.wasChecked === 'true') {
          radio.checked = false;
          delete radio.dataset.wasChecked;
          
        }
      });
    });
  }
}
function izbrisitask(elem) {
  let id = elem.id;
  delete lista[id];
  updateHtml();
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    dodajtask();
  }
});
