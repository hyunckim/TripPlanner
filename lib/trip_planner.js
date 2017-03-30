import GA from './genetic_algorithm/sketch.js';

document.addEventListener("DOMContentLoaded", () => {

  let markers = [];
  let destinations = [];
  let nodes = [];
  const tours = {};
  let map;
  let directionsDisplay = null;
  let directionsService;

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
      nodes.push(e.latLng);
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    markers.push(marker);
  }

  function getDuration(callback) {
    let service = new google.maps.DistanceMatrixService();
    console.log(markers);
    service.getDistanceMatrix(
      {
        origins: nodes,
        destinations: nodes,
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

  let button = document.getElementsByClassName('start')[0];
  button.addEventListener('click', (e) => {
    e.preventDefault();
    getDuration(function() {

      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
      }

      let ga = new GA(destinations, tours, 50);
      ga.setup();
      ga.draw((route) => {
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        let waypts = [];
        // console.log("nodes = ");
        // console.log(nodes);
        // console.log(route);
        // let routeCoordinates = [];
        // for (let j = 0; j < route.genes.length; j++) {
        //   routeCoordinates[j] = nodes[route.genes[j]];
        // }
        for (let i = 0; i < nodes.length - 1; i++) {
          waypts.push({
            location: nodes[i],
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
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            clearMap();
            directionsDisplay.setDirections(response);
          } else{
            console.log(response);
            console.log(status);
            alert('Error: couldn\'t find a possible route from API');
          }
        });
      });
    });
  });

  function setMapOnAll(newMap) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(newMap);
    }
  }

  function clearMap() {
    setMapOnAll(null);
    markers = [];
    nodes = [];
  }

  document.getElementsByClassName('clear')[0].addEventListener('click', e => {
    e.preventDefault();
    clearMap();

  });

  initMap();
});
