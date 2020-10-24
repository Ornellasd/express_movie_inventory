const test = require('./grab-thumb');

test.grabThumbnail('Shaun of the Dead').then((response) => console.log(response));