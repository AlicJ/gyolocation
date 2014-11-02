		function initialize() {
			var mapOptions = {
			center: { lat: 41.316395, lng: -72.922630},
			zoom: 12
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}

		function getYo() {
			time = new Date().getTime();

			$.getJSON('/_add_numbers', {
		        a: $('input[name="a"]').val(),
		        b: $('input[name="b"]').val()
		    }, function(data) {
		    	if(ajaxCounter == 0){
		    		prevList = data.result;
		    		ajaxCounter++;
		    	}else{
		    		var newList = data.result;
		    		deltaList = cutList(prevList, newList);
		    		prevList = newList;
		    	}
		    	console.log(prevList);
		    	console.log(deltaList);
		        drawYo(deltaList);
		    });
		}

		function drawYo(data){
			console.log(data);
			$.each(data, function(index, yo) {
				// console.log(yo);
				addMarker(yo);
			});
		}

		function addMarker(data){
			console.log(data)
			var myLatlng = new google.maps.LatLng(data.lat, data.lng);
			var marker = new google.maps.Marker({
				position: myLatlng,
				title: data.usr,
				animation: google.maps.Animation.DROP,
			});
			marker.setMap(map);
		}

		function cutList(original, present){
			// assume the new list is always bigger/the same than the new one
			newPresent = present.slice(original.length, present.length);
			return newPresent;
		}


		var map;
		var myLatlng = new google.maps.LatLng( 41.316395, -72.922630);
		var marker = new google.maps.Marker({
			position: myLatlng,
			title: "ANAKIN",
			animation: google.maps.Animation.DROP,
		});
		var prevList;
		var ajaxCounter = 0;
		var deltaList;

		google.maps.event.addDomListener(window, 'load', initialize);

		$(document).ready(function(){
			setTimeout(function(){
				marker.setMap(map);
				// console.log('marker!')
				setInterval(function(){
					getYo();
					console.log("refresh")
				}, 2500)
			},3000);
			
		});