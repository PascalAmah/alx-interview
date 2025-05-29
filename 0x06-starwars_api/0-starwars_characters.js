#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.alx-tools.com/api';

if (process.argv.length > 2) {
  const movieId = process.argv[2];
  request(`${API_URL}/films/${movieId}/`, (err, _, body) => {
    if (err) return console.error(err);

    let charactersURL;
    try {
      charactersURL = JSON.parse(body).characters;
    } catch (parseErr) {
      return console.error('Error parsing response:', parseErr);
    }

    const characterPromises = charactersURL.map(url =>
      new Promise((resolve, reject) => {
        request(url, (error, __, charBody) => {
          if (error) return reject(error);

          try {
            const name = JSON.parse(charBody).name;
            resolve(name);
          } catch (e) {
            reject('Error parsing character data');
          }
        });
      })
    );

    Promise.all(characterPromises)
      .then(names => console.log(names.join('\n')))
      .catch(err => console.error(err));
  });
} else {
  console.log('Usage: ./0-starwars_characters.js <movie_id>');
}
