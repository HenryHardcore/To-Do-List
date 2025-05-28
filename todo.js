function dodajtask() {
  const zadatak = document.querySelector('.text').value
  const vrijeme = document.querySelector('.datum').value
  document.querySelector('.display-grid').innerHTML = `
  <input class="checker" type="radio"  id="${zadatak}">
  <label class="zadatak"  for="${zadatak}">${zadatak}</label>
  <label class="vrijeme"  for="${zadatak}">${vrijeme}</label>
  <button >Delete</button>
  `
}