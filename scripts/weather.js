"use strict";

const weather = () => {
  const place = document.getElementById("place");

  //緯度と経度をここに格納しておく
  let lat;
  let lng;

  function ajaxRequest(lat,lng){
    const url = API_url;
    const key = API_key;

    $.ajax({
      url: url,
      data: {
        appid: key,
        lat: lat,
        lon: lng,
        units: 'metric',
        lang: 'ja'
      }
    }).done(function(data){
      console.log(data);
    }).fail(function(){
      console.log('ajax failed');
    });
  }

  if(place.value = "here"){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(

        //成功時に呼び出す
        function success(position){
          let data = position.coords;

          lat = data.latitude;
          lng = data.longitude;

          ajaxRequest(lat,lng);
        }
      )
    }
  }
}

weather();