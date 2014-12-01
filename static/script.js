		function initialize() {
			var mapOptions = {
			center: { lat: 42.100790, lng: -76.800564},
			zoom: 7
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}

		function getYo() {
			time = new Date().getTime();

			$.getJSON('/_getYos', {
		    }, function(data) {
		    	if(ajaxCounter == 0){
		    		prevList = data.result;
		    		deltaList = cutList(prevList, newList);
		    		ajaxCounter++;
		    	}else{
		    		newList = data.result;
		    		deltaList = cutList(prevList, newList);
		    		prevList = newList;
		    	}
		        drawYo(deltaList);
		    });
		}

		function drawYo(data){
			// console.log(data);
			$.each(data, function(index, yo) {
				// console.log(yo);
				setTimeout(function(){
					addMarker(yo);
				}, 600)
			});
		}

		function addMarker(data){
			// console.log(data)
			var myLatlng = new google.maps.LatLng(data.lat, data.lng);
			var marker = new google.maps.Marker({
				position: myLatlng,
				title: data.usr,
				animation: google.maps.Animation.DROP,
			});
			marker.setMap(map);
		}

		function cutList(original, present){
			if(present.length > original.length)
				delta = present.slice(original.length, present.length);
			else
				delta = original.slice(present.length, original.length);
			return delta;
		}


		var map;
		var myLatlng = new google.maps.LatLng( 41.316395, -72.922630);
		var marker = new google.maps.Marker({
			position: myLatlng,
			title: "ANAKIN",
			animation: google.maps.Animation.DROP,
			icon: icon
		});
		var newList = [];
		var prevList = [];
		var ajaxCounter = 0;
		var deltaList = [];
		var icon = 'Yo.png';

		google.maps.event.addDomListener(window, 'load', initialize);

		$(document).ready(function(){
			setTimeout(function(){
				// marker.setMap(map);
				// console.log('marker!')
				setInterval(function(){
					getYo();
					console.log("refresh")
				}, 2500)
			},3000);
			
		});