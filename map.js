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
      initMap();
      var center = [pos.lat, pos.lng];
      var radius = distance / (2 * Math.PI);
      console.log(radius);
      var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
      circle = turf.circle(center, radius, options);
      console.log(circle);

      center[0] *= Math.random;
      center[1] *= Math.random;
      waypointsArray = new Array();

      for (var index = 0; index < 10; index++) {
        let currentArray = [circle.geometry.coordinates[0][index][0], circle.geometry.coordinates[0][index][1]];
        waypointsArray.push(currentArray);
      }

      waypointsArray.pop();
      waypointsArray.splice(0, 1);
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
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    directionsDisplay.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(pos);

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
        infoWindow.open(map);
        map.setCenter(pos);

        }, () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
      console.log("can access currentLocation with HTML5");
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var icons = {
      location: {
        icon: '/css/posarrow.png'
      }
    };

    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: manchester,
    //   zoom: 12,
    //   styles: [
    //     {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //     {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //     {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //     {
    //       featureType: 'administrative.locality',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#d59563'}]
    //     },
    //     {
    //       featureType: 'poi',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#d59563'}]
    //     },
    //     {
    //       featureType: 'poi.park',
    //       elementType: 'geometry',
    //       stylers: [{color: '#263c3f'}]
    //     },
    //     {
    //       featureType: 'poi.park',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#6b9a76'}]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'geometry',
    //       stylers: [{color: '#38414e'}]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'geometry.stroke',
    //       stylers: [{color: '#212a37'}]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#9ca5b3'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry',
    //       stylers: [{color: '#746855'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry.stroke',
    //       stylers: [{color: '#1f2835'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#f3d19c'}]
    //     },
    //     {
    //       featureType: 'transit',
    //       elementType: 'geometry',
    //       stylers: [{color: '#2f3948'}]
    //     },
    //     {
    //       featureType: 'transit.station',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#d59563'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'geometry',
    //       stylers: [{color: '#17263c'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#515c6d'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'labels.text.stroke',
    //       stylers: [{color: '#17263c'}]
    //     }
    //   ]
    // });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, waypointsArray) {
  var waypts = [];

  for (var i = 0; i < waypointsArray.length; i++)
  {
    waypts.push({
      location: { lat: waypointsArray[i][0], lng: waypointsArray[i][1] }
    })
  }

  directionsService.route({
    origin: pos,
    destination: pos,
    travelMode: 'WALKING',
    waypoints: waypts,
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    avoidHighways: true

  }, (res, stat) => {
    if (stat == 'OK') {
      directionsDisplay.setDirections(res);
      console.log(res);
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


