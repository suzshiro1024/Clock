const getTime = () => {
    let time = new Date();              // 現在日時情報を取得
    let year = time.getFullYear();      // 年を取得
    let month = time.getMonth() + 1;    // 月を取得
    let date = time.getDate();          // 日を取得
    let day = time.getDay();            // 曜日番号取得
    // 曜日の表示のための配列
    const weeks = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let weekday = weeks[day];           // 曜日を確定
    let hour = time.getHours();         // 時を取得
    let min = time.getMinutes();        // 分を取得
    let sec = time.getSeconds();        // 秒を取得

    // 1桁の場合0を追加
    // (ex)10-9-2021 => 10-09-2021
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let now_date = `${month}-${date}-${year}    ${weekday}`; // mm-dd-yyyy (day)
    let now_time = `${hour}:${min}:${sec}`;                 // hh:mm:ss

    document.querySelector(".date").innerText = now_date;
    document.querySelector(".time").innerText = now_time;
}

setInterval(getTime,500);