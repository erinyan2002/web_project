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

  // 既存のマーカーを格納する配列
  var markers = [];

  // 位置データを読み込み、地図にマーカーを配置する
  function loadLocations(jsonPath, zoomLevel) {
    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        clearMarkers(); // 既存のマーカーをクリア
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

          // すぐにInfoWindowを開く
          infoWindow.open(map, marker);

          marker.addListener("click", function () {
            infoWindow.open(map, marker);
          });

          markers.push(marker); // マーカーを配列に追加
        });
        map.setZoom(zoomLevel); // 地図のズームレベルを設定
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  // 既存のマーカーを全てクリアする
  function clearMarkers() {
    markers.forEach(function (marker) {
      marker.setMap(null); // マーカーを地図から削除
    });
    markers = []; // マーカー配列をリセット
  }
  $("#alarm_card").click(function () {
    loadLocations("../json/alarm_locations.json", 12); // 新しいJSONファイルとズームレベル
  });
  // 近隣カードのクリックイベントリスナー
  $("#neighborhood_card").click(function () {
    loadLocations("../json/new_locations.json", 14); // 新しいJSONファイルとズームレベル
  });

  // 初期ロード時にデフォルトのJSONデータを読み込む
  loadLocations("../json/locations.json", 7);
});
