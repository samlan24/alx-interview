#!/usr/bin/node
const request = require('request');

const filmId = process.argv[2];

let baseUrl = 'https://swapi-api.alx-tools.com/api/films/';

if (filmId) {
  baseUrl += `${filmId}`;
}

request(baseUrl, { json: true }, (err, res, filmData) => {
  if (err) {
    return console.log('Error fetching film data:', err);
  }

  const characterPromises = filmData.characters.map(url => {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, characterData) => {
        if (err) {
          reject(err);
        } else {
          resolve(characterData.name);
        }
      });
    });
  });

  Promise.all(characterPromises)
    .then(characterNames => {
      console.log('Character Names:');
      characterNames.forEach(name => console.log(name));
    })
    .catch(error => {
      console.log('Error fetching character data:', error);
    });
});
