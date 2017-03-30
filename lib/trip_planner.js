import GA from './genetic_algorithm/sketch.js';

document.addEventListener("DOMContentLoaded", () => {

  const markers = [];
  let destinations = [];
  const tours = {};
  let map;

  //Google Map Set Up
  function initMap() {
    let bayArea = { lat: 37.475136, lng: -121.503748 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: bayArea
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
      let error = false;
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
           if (element.status === "OK") {
             tours[from][to] = {};
             tours[from][to]["distance"] = element.distance.value;
             tours[from][to]["duration"] = element.duration.value;
           } else {
             alert("Invalid Location!");
             j = results.length;
             i = origins.length;
             error = true;
           }
         }
       }
       destinations.push(destinations[0]);
       if (callback && !error) {
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
      ga.draw((route) => {

        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        let waypts = [];
        console.log(route);

        for (let i = 0; i < route.genes.length - 1; i++) {
          waypts.push({
            location: route.genes[i],
            stopover: true
          });
        }
        let request = {
          origin: route.genes[0],
          destination: route.genes[0],
          waypoints: waypts,
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false
        };
        console.log(request);
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      });
    });
  });

  initMap();
});
