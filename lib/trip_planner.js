import GA from './genetic_algorithm/sketch.js';

document.addEventListener("DOMContentLoaded", () => {

  const markers = [];
  let destinations = [];
  const tours = {};

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
      markers.push(e.latLng);
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  function getDuration(callback) {
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: markers,
        destinations: markers,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false
      }, parseOutput);

    function parseOutput(response, status) {
      if (status == 'OK') {
       let origins = response.originAddresses;
       let dest = response.destinationAddresses;
       for (let i = 0; i < origins.length; i++) {
         let results = response.rows[i].elements;
         let from = origins[i];
         destinations.push(from);
         tours[from] = {};
         for (let j = 0; j < results.length; j++) {
           if (i === j) { continue; }
           let to = dest[j];
           let element = results[j];
           tours[from][to] = {};
           tours[from][to]["distance"] = element.distance.value;
           tours[from][to]["duration"] = element.duration.value;
         }
       }
       destinations.push(destinations[0]);
       if (callback) {
         callback();
       }
      }
    }
  }

  let button = document.createElement('button');
  button.innerHTML = "START";
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(button);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    getDuration(function() {
      let ga = new GA(destinations, tours, 50);
      ga.setup();
      console.log(ga);
    });
  });

  initMap();
});
