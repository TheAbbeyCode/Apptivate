// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("apptivate", ["ionic","ngCordova"])

.config(function($stateProvider,$urlRouterProvider) { 
	$stateProvider
		.state("eventmenu",{
			url: "",
			abstract: true,
			templateUrl: "templates/menus.html"
		})
		.state("eventmenu.inicio",{
			url: "/inicio",
			views: {
				"menuContent": {
					templateUrl: "templates/inicio.html"
				}
			}
		})
		.state("eventmenu.misEventos", {
			url: "/mis-eventos",
			views: {
				"menuContent": {
					templateUrl: "templates/misEventos.html"
				}
			}
		})
		.state("eventmenu.descubre", {
			url: "/descubre",
			views: {
				"menuContent": {
					templateUrl: "templates/descubre.html"
				}
			}
		})
		.state("eventmenu.mapa", {
			url: "/mapa",
			views: {
				"menuContent": {
					templateUrl: "templates/mapa.html",
					controller: "MapaCtrl"
				}			
			}
		})
		.state("eventmenu.configuraciones", {
			url: "/configuraciones",
			views: {
				"menuContent": {
					templateUrl: "templates/configuraciones.html"
				}
			}
		})
		.state("eventmenu.sugerencias", {
			url: "/sugerencias",
			views: {
				"menuContent": {
					templateUrl: "templates/sugerencias.html"
				}
			}
		})
		.state("eventmenu.acercaDe", {
			url: "/acerca-de",
			views: {
				"menuContent": {
					templateUrl: "templates/acercaDe.html"
				}
			}
		})

	$urlRouterProvider.otherwise("/inicio");
})

.controller('MapaCtrl', function($scope, $state, $cordovaGeolocation) {
	var options = {enableHighAccuracy: true};
 
  var initialize = (function() {
    var myLatlng = new google.maps.LatLng(-12.093447, -77.033146);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    $scope.map = map;
  })();

  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function(){
 	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
 
  }, function(error){
    console.log("No se pudo localizar tu dispositivo...");
  }); 	
 }
  
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
