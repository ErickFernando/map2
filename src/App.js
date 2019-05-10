import React, { Component } from 'react';
//import loadGoogleMapsAPI from 'load-google-maps-api'; // Única dependencia extra
import googleDistanceMatrix from 'google-distance-matrix';
// es muy importante añadirle height y width!!!
/*const MAP_STYLES = {
  height: '450px',
  width: '100%'
};

const OPTIONS = {
  center: {
    lat: 41.6282,
    lng: -0.885182
  },
  street: 'Calle Pontevedra, 23, 50007 Zaragoza, Spain,',
  zoom: 15
};

const API_CONFIG = {
  key: 'AIzaSyBbLdWaiwLMnVTLMsE6-4xXj_t13N3vumA',
  language: 'es'
};*/
var origins = ['Polígono Industrial Argualas, 38, 50012 Zaragoza'];
var destinations = ['Calle Moriones, 4, 50006 Zaragoza'];
/*var destinationIcon = 'https://chart.googleapis.com/chart?' +
'chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?' +
'chst=d_map_pin_letter&chld=O|FFFF00|000000';*/

export default class CustomMap extends Component {
  componentWillUnmount() {
   /* // limpiando despues el component ya no es usado
    // evita errores en la console
    const allScripts = document.getElementsByTagName('script');
    // recopilar todos los scripts,
    // filtrar los que contengan la key en 'src'
    // eliminarlo
    [].filter.call(
      allScripts,
      (scpt) => scpt.src.indexOf('AIzaSyBbLdWaiwLMnVTLMsE6-4xXj_t13N3vumA') >= 0
    )[0].remove();
    // resetear la variable de Google
    window.google = {};*/
  }

  componentDidMount() {
    // Promise para que al ser resulta puedas manipular
    // las opciones de Google Maps
    /*loadGoogleMapsAPI( API_CONFIG ).then( googleMaps => {
      new googleMaps.Map( this.refs.map, OPTIONS );
  
    }).catch( err => {
      console.warning( 'Something went wrong loading the map', err );
    });*/
    googleDistanceMatrix.key('AIzaSyBRpSIG850AkLVFgrhbHoqAUjdgs1nUzps');
    googleDistanceMatrix.units('imperial')
    //console.log(googleDistanceMatrix, "  asd")
    //console.log(googleDistanceMatrix , "    sdfsd")
    googleDistanceMatrix.matrix(origins, destinations,  (err, distances)=> {
      if (err) {
        return console.log(err);
      }
      if (!distances) {
        return console.log('no distances');
      }
      if (distances.status=== 'OK') {
        for (let i = 0; i < origins.length; i++) {
          for (let j = 0; j < destinations.length; j++) {
            let origin = distances.origin_addresses[i];
            let destination = distances.destination_addresses[j];
            if (distances.rows[0].elements[j].status === 'OK') {
              let distance = distances.rows[i].elements[j].distance.text;
              console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
            } else {
              console.log(destination + ' is not reachable by land from ' + origin);
            }
          }
        }
      }
      console.log(googleDistanceMatrix)
    });


  }

  render() {
    return (
      <div ref="map" ></div>
    )
  }
}

//https://www.npmjs.com/package/google-distance-matrix
/*
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

*/