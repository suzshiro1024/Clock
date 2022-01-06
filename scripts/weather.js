const weather = () => {
  "use strict";
  const place = document.getElementById("place");
  const txt = document.getElementById("text");
  const icon = document.getElementById("icon");
  const img_element = document.createElement("img");

  //緯度と経度をここに格納しておく
  let lat;
  let lng;

  function ajaxRequest(lat, lng) {
    const url = API_url;
    const key = API_key;

    $.ajax({
      url: url,
      data: {
        appid: key,
        lat: lat,
        lon: lng,
        units: "metric",
        lang: "ja",
      },
    })
      .done(function (data) {
        img_element.src = `../img/${data.list[0].weather[0].main}_frame.svg`;
        img_element.alt = "現在地の天気";
        img_element.height = 200;

        icon.appendChild(img_element);
      })
      .fail(function () {
        console.log("ajax failed");
      });
  }

  function request(){
    if(place.value == "here"){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          //成功時に呼び出す
          function success(position) {
            let data = position.coords;

            lat = data.latitude;
            lng = data.longitude;

            ajaxRequest(lat, lng);
          }
        );
      }
    }else{
      lat = coordinate[`${place.value}`].lat;
      lng = coordinate[`${place.value}`].lng;

      ajaxRequest(lat, lng);
    }
  }

  window.onload = request;

  place.addEventListener("change",request);
};

weather();
