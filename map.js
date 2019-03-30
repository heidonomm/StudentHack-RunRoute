
// Initialize and add the map
var pos;
var map;
function initMap() {

    var manchester = {lat: 53.4808, lng: 2.2426};
    map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: manchester});

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
        infoWindow.open(map);
        map.setCenter(pos);

        var nextLoc = nextLocation(pos.lat, pos.lng);
        // addMarker(nextLoc);
        // var marker = new google.maps.Marker();
        // marker.setPosition(new google.maps.LatLng());

        }, () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      console.log("can access currentLocation with HTML5");
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}


function nextLocation(lat, long) {

  let currentLocation = [ lat, long ];
  console.log("Previous coordinates " + currentLocation);
  
  let currentPoint = turf.point(currentLocation);

  let newLoc = turf.destination(currentPoint, 1, 45).geometry.coordinates;

  var coord = {lat:newLoc[0], lng: newLoc[1]};

  //let coord = google.maps.LatLng(parseFloat(coordinates[0]), parseFloat(coordinates[1]));

  let marker = new google.maps.Marker({
    position: coord,
    title: 'new Coordinates!',
    visible: true
  });
  marker.setMap(map);
}

// function addMarker(coordinates) {
//   var coord = {lat:coordinates[0], lng: coordinates[1]};
//   //let coord = google.maps.LatLng(parseFloat(coordinates[0]), parseFloat(coordinates[1]));

//   let marker = new google.maps.Marker({
//     position: coord,
//     title: 'new Coordinates!',
//     visible: true
//   });
//   marker.setMap(map);
// }
















function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}