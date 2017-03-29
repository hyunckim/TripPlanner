import GA from './genetic_algorithm/sketch.js';

document.addEventListener("DOMContentLoaded", () => {

  const destinations = [];

  //Google Map Set Up
  function initMap() {
    let unitedStates = { lat: 38.4773736, lng: -100.563729 };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: unitedStates
    });

    //Event Listener to place marks when user clicks on the map
    map.addListener('click', e => {
      placeMarker(e.latLng, map);
      console.log(e.latLng);
      destinations.push(e.latLng.toJSON());
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  function getDuration() {
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: destinations,
        destinations: destinations,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false
      }, callback);

    function callback(response, status) {
      console.log(response);
    }
  }

  let button = document.createElement('button');
  button.innerHTML = "START";
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(button);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    let ga = new GA(destinations);
    ga.setup();
    getDuration();
    console.log(ga);
  });

  initMap();
});
