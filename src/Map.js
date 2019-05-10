  function initMap() {
      var bounds = new google.maps.LatLngBounds;
      var markersArray = [];

      //var origin1 = { lat: 41.6495178, lng: -0.8977273 };
      var origin2 = 'Polígono Industrial Argualas, 38, 50012 Zaragoza';

      var destinationA = 'Calle Pontevedra, 23, 50007 Zaragoza';
      var destinationC = "Calle León XIII, 27, 50008 Zaragoza";
      var destinationD = 'Calle la Vía,11,50009,Zaragoza';
      var destinationE = "Calle Sta. Teresa de Jesús, 23,50006,Zaragoza";
      var destinationF = 'Calle Moriones, 4, 50006 Zaragoza';
      

      var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
      var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.6495178, lng: -0.8977273 },
        zoom: 10
      });
      var geocoder = new google.maps.Geocoder;

      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [ origin2],
        destinations: [destinationA,destinationC,destinationD,destinationE,destinationF],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var outputDiv = document.getElementById('output');
          outputDiv.innerHTML = '';
          deleteMarkers(markersArray);

          var showGeocodedAddressOnMap = function (asDestination) {
            var icon = asDestination ? destinationIcon : originIcon;
            return function (results, status) {
              if (status === 'OK') {
                map.fitBounds(bounds.extend(results[0].geometry.location));
                markersArray.push(new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: icon
                }));
              } else {
                alert('Geocode was not successful due to: ' + status);
              }
            };
          };

          for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            geocoder.geocode({ 'address': originList[i] },
              showGeocodedAddressOnMap(false));
            for (var j = 0; j < results.length; j++) {
              geocoder.geocode({ 'address': destinationList[j] },
                showGeocodedAddressOnMap(true));
              outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                ': ' + results[j].distance.text + ' in ' +
                results[j].duration.text + '<br>';
            }
          }
        }
      });
    }

    function deleteMarkers(markersArray) {
      for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
      }
      markersArray = [];
    }
