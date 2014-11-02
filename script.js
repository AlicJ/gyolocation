function initialize() {
	var mapOptions = {
	center: { lat: 41.316395, lng: -72.922630},
	zoom: 12
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function getYo() {
	time = new Date().getTime();
	// $.ajax({
	// 	url: '/path/to/file',
	// 	type: 'GET',
	// 	dataType: 'JSOn',
	// 	data: {
	// 		auth: 'geyolocation',
	// 		timestamp: time 
	// 	},
	// })
	// .done(function() {
	// 	console.log("success");
	// })
	// .fail(function() {
	// 	console.log("error");
	// })
	// .always(function() {
	// 	console.log("complete");
	// });
	$.getJSON('main.py/getUsers', {
        
      }, function(data) {
        console.log(data);
      });
}







var map;
var myLatlng = new google.maps.LatLng( 41.316395, -72.922630);
var marker = new google.maps.Marker({
	position: myLatlng,
	title: "experiment!"
});

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
	setTimeout(function(){
		marker.setMap(map);
		console.log('marker!')
	},3000);
	
});
