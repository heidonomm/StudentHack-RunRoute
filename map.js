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
      // var diameter = distance / Math.PI;
      // var sideLength = diameter / Math.PI;
      var min = Math.ceil(-180);
      var max = Math.floor(180);
      // var initialAngle = Math.floor(Math.random() * (max - min + 1) + min);

      // let currentPoint = turf.point(center);
      // let pointOpposite = turf.destination(currentPoint, diameter, initialAngle).geometry.coordinates;
      // let pointRight = turf.destination(currentPoint, sideLength, initialAngle + 90).geometry.coordinates;
      // let pointLeft = turf.destination(currentPoint, sideLength, initialAngle - 90).geometry.coordinates;

      // var coord1 = {lat: pointOpposite[0], lng: pointOpposite[1]};
      // var coord2 = {lat: pointRight[0], lng: pointRight[1]};
      // var coord3 = {lat: pointLeft[0], lng: pointLeft[1]};
      // console.log(pointOpposite[0]);
      // console.log(pointRight[0]);
      // console.log(pointLeft[0]);


      // waypointsArray = [
      //   coord1,
      //   coord2,
      //   coord3
      // ];
      

      var radius = distance / (2 * Math.PI);
      console.log(radius);
      var randomAngle = Math.floor(Math.random() * (max - min + 1) + min);
      var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
      center = turf.destination(center, radius, randomAngle)
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

function newCircle(currentLocation, distance) {

  var diameter = distance / Math.PI;
  var sideLength = diameter / Math.PI;
  min = Math.ceil(-180);
  max = Math.floor(180);
  var initialAngle = Math.floor(Math.random() * (max - min + 1) + min);

  let currentPoint = turf.point(currentLocation);
  let pointOpposite = turf.destination(currentPoint, diameter, initialAngle).geometry.coordinates;
  let pointRight = turf.destination(currentPoint, sideLength, initialAngle + 90).geometry.coordinates;
  let pointLeft = turf.destination(currentPoint, sideLength, initialAngle - 90).geometry.coordinates;

  var coord1 = {lat: pointOpposite[0], lng: pointOpposite[1]};
  var coord2 = {lat: pointRight[0], lng: pointRight[1]};
  var coord3 = {lat: pointLeft[0], lng: pointLeft[1]};


}


