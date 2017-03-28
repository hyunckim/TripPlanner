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

  initMap();

  let button = document.createElement('button');
  button.innerHTML = "GO";
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(button);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(destinations);
    
  });
});
