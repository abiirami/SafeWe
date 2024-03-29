var message;
var flagCheck = true;
let userLat;
let userLong;
var userLocation;

function myFunction() {
  message = prompt("Please write the emergency with a couple words", "car crash");
}

function myFunction2() {
  flagCheck = false;
  message = prompt("Please write your request for donation", "Requesting for medical supplies due to recent fire");
}
 let map;
  // define global array to store markers added
  let markersArray = []; 

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

  let marker;
  // define function to add marker at given lat & lng
  function addMarker(latLng) {
	console.log(flagCheck);
    if(flagCheck == false) {
	const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
     marker = new google.maps.Marker({
        map: map, 
        position: latLng,
        draggable: true,
	icon:image
    });
    }
    else {
	marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
    });
    }

    //store the marker object drawn on map in global array
    markersArray.push(marker);
    var infowindow = new google.maps.InfoWindow({
  content:message
});

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
});
var lat = marker.getPosition().lat();
var lng = marker.getPosition().lng();

//add circle
var circle = new google.maps.Circle({
map:map,
radius: 100
});
circle.bindTo('center', marker, 'position');

google.maps.event.addListener(map, 'click', function(event) {
    var click = event.latLng;
    var locs = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    var n = arePointsNear(user, locs, diameter);
    console.log(locs);
    var contentString = "<a href='https://www.medinecollision.com/blog-collision-repair-baton-rouge/5-ways-to-stay-safe-during-a-car-accident#:~:text=Avoid%20distractions%20like%20eating%20or,never%20drive%20drunk%20or%20inebriated.'>LINK</a>"
    if(n){
	if(message == "car crash") { 
	var infowindow = new google.maps.InfoWindow({
	content:message + " in your area. Please stay safe by following this link: " + contentString
	});
	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.open(map,marker);
	});
	console.log(message);
    	}
    }
	});


}

var user = {lat:38.6662, lng: -121.14461 }; //my house
var diameter = 5;
function initMap() {

infoWindow = new google.maps.InfoWindow;
// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            let userLat = position.coords.latitude;
            let userLong = position.coords.longitude;
	    userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   console.log(userLocation);
console.log("DFFE");
         infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
console.log(userLat);
console.log(userLocation);
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
map.addListener('click', function(e) {
    console.log(e);
    addMarker(e.latLng);
  });

  }

console.log(userLat);
function arePointsNear(checkPoint, centerPoint, km) { 
   var ky = 40000 / 360;
   var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
   var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
   var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
   return Math.sqrt(dx * dx + dy * dy) <= km;
}

function DisplayPosts() {
  fetch('/posts').then(response => response.json()).then((posts) => {
    const postListElement = document.getElementById('post');
    posts.forEach((postObject) => {
      postListElement.appendChild(createPostElement(postObject));
    })
  });
}

function createPostElement(post) {
  const postElement = document.createElement('li');
  postElement.className = 'post';
  // properties
  const textElement = document.createElement('span');
  textElement.innerText = post.text
  const locationElement = document.createElement('span');
  locationElement.innerText = post.location
  postElement.appendChild(locationElement);
  postElement.appendChild(textElement);
  return postElement;
}
function toggleSidebar() {
        document.getElementById("sidebar").classList.toggle('active');
}
