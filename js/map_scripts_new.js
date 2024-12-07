$(function () {
  var customMapStyle = [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          color: "#878787",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f9f5ed",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#aee0f4",
        },
      ],
    },
  ];
  var map = new google.maps.Map($(".map-canvas")[0], {
    zoom: 7,
    center: new google.maps.LatLng(35.9078, 127.7669),
    styles: customMapStyle,
    disableDefaultUI: true,
  });

  var markers = [];

  function loadLocations(jsonPath, zoomLevel) {
    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        clearMarkers();
        data.forEach(function (location) {
          var markerIcon = {
            url: "../img/icon/ten.svg",
            anchor: new google.maps.Point(11, 0),
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: markerIcon,
            position: new google.maps.LatLng(location.lat, location.lng),
          });

          var infoWindowContent =
            '<div id="map_maker"><img src="' + location.img + '" alt=""></div>';
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
          });

          infoWindow.open(map, marker);

          marker.addListener("click", function () {
            infoWindow.open(map, marker);
          });

          markers.push(marker);
        });
        map.setZoom(zoomLevel);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function clearMarkers() {
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
  }
  $("#alarm_card").click(function () {
    loadLocations("../json/alarm_locations.json", 12);
  });
  $("#neighborhood_card").click(function () {
    loadLocations("../json/new_locations.json", 14);
  });

  loadLocations("../json/locations.json", 7);
});
