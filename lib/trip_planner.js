document.addEventListener("DOMContentLoaded", () => {

  function initMap() {
    let unitedStates = { lat: 38.4773736, lng: -100.563729 };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: unitedStates
    });

    map.addListener('click', e => {
      placeMarker(e.latLng, map);
    });
  }

  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  initMap();
});
