const selectedGenre = document.querySelector('#selectedGenre');
const addNewGenreDiv = document.querySelector('#addNewGenre');
const addNewGenreInput = document.querySelector('#otherGenre');

addNewGenreDiv.hidden = true

selectedGenre.addEventListener('change', () => {
  if(selectedGenre.value == 'Other') {
    addNewGenreDiv.hidden = false;
    addNewGenreInput.setAttribute('required', 'true');
    addNewGenreInput.focus();
  } else {
    addNewGenreDiv.hidden = true;
    addNewGenreInput.removeAttribute('required');
  }
});
