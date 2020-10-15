const selectedGenre = document.querySelector('#selectedGenre');
const addNewGenreField = document.querySelector('#addNewGenre');

addNewGenreField.hidden = true

selectedGenre.addEventListener('change', () => {
  (selectedGenre.value == 'Other') ? addNewGenreField.hidden = false : addNewGenreField.hidden = true;
});
