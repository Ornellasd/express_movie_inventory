function createNewMovie(title, description, image) {
  const movie = {
    title: title,
    description: description,
    cost: 1,
    stock: 69,
    genre: 'Other',
    image: image
  };

  return movie;
}

let derp = createNewMovie('The Lion King', 'Animals and shit', 'deez_nutz.jpg');

console.log(derp);