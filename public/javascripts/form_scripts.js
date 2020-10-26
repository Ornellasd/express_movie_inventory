// Other Genre variables
const selectedGenre = document.querySelector('#selectedGenre');
const addNewGenreDiv = document.querySelector('#addNewGenre');
const addNewGenreInput = document.querySelector('#otherGenre');

// API check variables
const checkbox = document.querySelector('#apiCheck');
const description = document.querySelector('#movieDescDiv');
const descriptionField = document.querySelector('#movieDesc');
const image = document.querySelector('#imageDiv');

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

checkbox.addEventListener('change', () => {
	if(checkbox.checked) {
		description.hidden = true;
		descriptionField.removeAttribute('required');
		image.hidden = true; 
	} else {
		description.hidden = false;
		descriptionField.setAttribute('required', 'true');
		image.hidden = false;
	}
});
