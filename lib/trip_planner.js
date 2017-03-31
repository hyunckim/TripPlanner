import GA from './genetic_algorithm/sketch.js';

document.addEventListener("DOMContentLoaded", () => {

  let markers = [];
  let destinations = [];
  let nodes = [];
  const tours = {};
  let map;
  let directionsDisplay = null;
  let directionsService;
  let labels = ['1','2','3','4','5','6','7','8','9','10'];
  let labelIndex = 0;

  //Google Map Set Up
  function initMap() {
    let sanFrancisco = { lat: 37.790909, lng: -122.417861 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: sanFrancisco,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    //Event Listener to place marks when user clicks on the map
    map.addListener('click', e => {
      if (nodes.length > 9) {
        alert("You can only have 10 marks!");
      }
      else {
        placeMarker(e.latLng, map);
        nodes.push(e.latLng);
      }
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      label: labels[labelIndex++ % labels.length],
      map: map
    });
    markers.push(marker);
  }

  function getDuration(callback) {
    let service = new google.maps.DistanceMatrixService();

    let travel = document.getElementsByClassName('travelMode')[0].value;
    let toll = Boolean(document.getElementsByClassName('toll')[0].value);
    let highway = Boolean(document.getElementsByClassName('highway')[0].value);

    service.getDistanceMatrix(
      {
        origins: nodes,
        destinations: nodes,
        travelMode: travel,
        avoidHighways: toll,
        avoidTolls: highway
      }, parseOutput);

    function parseOutput(response, status) {
      destinations = [];
      let error = false;
      if (status == 'OK') {
       for (let i = 0; i < response.rows.length; i++) {
         let results = response.rows[i].elements;
         let from = `${nodes[i].lat()},${nodes[i].lng()}`;
         destinations.push(from);
         tours[from] = {};
         for (let j = 0; j < results.length; j++) {
           if (i === j) { continue; }
           let to = `${nodes[j].lat()},${nodes[j].lng()}`;
           let element = results[j];
           if (element.status === "OK") {
             tours[from][to] = {};
             tours[from][to]["distance"] = element.distance.value;
             tours[from][to]["duration"] = element.duration.value;
           } else {
             alert("Invalid Location!");
             j = results.length;
             i = results.length;
             error = true;
           }
         }
       }
       destinations.push(destinations[0]);
       if (callback && !error) {
         callback(travel, toll, highway);
       }
      }
    }
  }

  initMap();

  let button = document.getElementsByClassName('start')[0];
  button.addEventListener('click', (e) => {
    e.preventDefault();
    getDuration((travel, toll, highway) => {

      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
      }
      let maxGen = parseInt(document.getElementsByClassName('generation')[0].value);
      let ga = new GA(destinations, tours, maxGen, map);
      ga.setup();
      ga.draw((route) => {
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        let waypts = [];

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
          travelMode: travel,
          avoidHighways: highway,
          avoidTolls: toll
        };
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            clearMap();
            directionsDisplay.setDirections(response);
            let duration = document.getElementsByClassName('duration')[0];
            let distance = document.getElementsByClassName('distance')[0];
            duration.innerHTML = `Duration: ${displayTime(route.duration)}`;
            distance.innerHTML = `Distance: ${convertToMiles(route.distance)} miles`;
          } else{
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
    labelIndex = 0;
  }

  function displayTime(seconds) {
    let minutes;
    let hours;
    let days;
    let string = `${seconds} seconds`;
    if (seconds > 59) {
      minutes= Math.floor(seconds / 60);
      seconds -= (minutes * 60);
      string = `${minutes} minutes ${seconds} seconds`;
    }
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes -= (hours * 60);
      string = `${hours} hours ${minutes} minutes`;
    }

    if (hours > 24) {
      days = Math.floor(hours / 24);
      hours -= (days * 24);
      string = `${days} days ${hours} hours ${minutes} minutes`;
    }
    return string;
  }

  function convertToMiles(distance) {
    return Math.round(distance*0.621371 / 1000).toFixed(2);
  }

  document.getElementsByClassName('clear')[0].addEventListener('click', e => {
    e.preventDefault();
    clearMap();
    directionsDisplay.setMap(null);
  });
});
