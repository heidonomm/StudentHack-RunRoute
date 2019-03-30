var circle;
var circlePoints;

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
    });
    $( "#myform" ).validate({
    rules: {
        field: {
            required: true,
            digits: true
        }
    },
    messages: {
        field: {
            required: "Please enter a distance.",
            digits: "You need to enter a digit."
        }
    }   
    });


var distanceField = document.getElementById("field");
distanceField.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
      validate(e);
  }
});


var waypointsArray;
function validate(e)
{
  var distance = e.target.value;

  if (isNaN(distance)) 
  {
      return false;
  } else {
      var center = [53.4746886, -2.2334728];
      var radius = distance / (2 * Math.PI);
      console.log(radius);
      var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
      circle = turf.circle(center, radius, options);
      console.log(circle);

      waypointsArray = new Array();

      for (var index = 0; index < 11; index++) {
        let currentArray = [circle.geometry.coordinates[0][index][0], circle.geometry.coordinates[0][index][1]];
        waypointsArray.push(currentArray);
      }

      for (var i = 0; i < waypointsArray.length; i++) {
        var coord = {lat:waypointsArray[i][0], lng: waypointsArray[i][1]};
        let marker = new google.maps.Marker({
          position: coord,
          title: 'new Coordinates!',
          visible: true
        });
        marker.setMap(map);
      }
      console.log(waypointsArray);
      calculateAndDisplayRoute(directionsService, directionsDisplay, waypointsArray);
  }
}



/*

MAP STARTS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE


*/



// Initialize and add the map
var pos;
var map;
var directionsService;
var directionsDisplay;

function initMap() {

    var manchester = {lat: 53.4808, lng: 2.2426};
    map = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: manchester});

    infoWindow = new google.maps.InfoWindow;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

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

        // nextLocation(pos.lat, pos.lng, 1, 45);
        // nextLocation(pos.lat, pos.lng, 1, 135);
        // nextLocation(pos.lat, pos.lng, 1, -135);
        // nextLocation(pos.lat, pos.lng, 1, -45);

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

function calculateAndDisplayRoute(directionsService, directionsDisplay, waypointsArray) {
  var waypts = [];

  for (var i = 0; i < waypointsArray.length; i++)
  {
    waypts.push({
      location: waypointsArray[0]
    })
  }

  directionsService.route({
    origin: pos,
    destination: pos,
    travelMode: 'WALKING',
    unitSystem: 'METRICS',
    waypoints: waypts

  }, (res, stat) => {
    if (stat == 'OK') {
      directionsDisplay.setDirections(res);
    } else {
      window.alert('Directions error ' + stat);
    }
  })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


