import {get} from './ajaxHelper.js';

// data rounded to 7 decimal places
let formatGeoData = data => {
  let coordinates = data.results[0].geometry.location;
  return [coordinates.lat, coordinates.lng];
}

let getAutocomplete = (input) => {
  let endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyBcxddjCYsNoBYFD_52AGkJpFKw2lCjlOE`;
  return get(endpoint);
}

export const getCoordinates = (address) => {
  let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBcxddjCYsNoBYFD_52AGkJpFKw2lCjlOE`;
  return get(endpoint).then(data => formatGeoData(data));
}

// takes an input address (perfectly formatted or otherwise) and returns the
// closest matching coordinates of the address in the format of [latitude, longitude]
export const getCoordinatesFromInput = (input) => {
  return getAutocomplete(input).then(data => data.predictions[0].description)
                               .then(address => getCoordinates(address));
}
