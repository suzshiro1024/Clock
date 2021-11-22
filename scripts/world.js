const world = () => {
  "use strict";

  const date_disp = document.getElementById('dateId');
  const time_disp = document.getElementById('timeId');
  const set       = document.getElementById('Timezone');
  set.options[8].selected = true;
  let timezone;
  let difference;

  function getTime(){
    let time = new Date(Date.now() + difference); //時差考慮時刻を取得
	  let year = time.getUTCFullYear();             //年を取得
	  let month = time.getUTCMonth() + 1;           //月を取得
	  let date = time.getUTCDate();                 //日を取得
	  let day = time.getUTCDay();                   //曜日番号取得
	  //曜日の表示のための配列
    const weeks = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	  let weekday = weeks[day];                     //曜日を確定
	  let hour = time.getUTCHours();                //時を取得
	  let min = time.getUTCMinutes();               //分を取得
	  let sec = time.getUTCSeconds();               //秒を取得

	  //1桁の場合0を追加
	  //(ex)10-9-2021 => 10-09-2021
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let now_date = `${month}-${date}-${year}    ${weekday}`;    //mm-dd-yyyy (day)
    let now_time = `${hour}:${min}:${sec}`;                     //hh:mm:ss

    date_disp.textContent = now_date;
    time_disp.textContent = now_time;
  }

  window.onload = function(){
    timezone = parseFloat(set.value);
    console.log(timezone);
    difference = 3600000 * timezone;
    setInterval(getTime,500);
  };

  set.addEventListener('change',function(){
    timezone = parseFloat(set.value);
    console.log(timezone);
    difference = 3600000 * timezone;
    setInterval(getTime,500);
  });
}

world();