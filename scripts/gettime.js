const getTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let day = time.getDay();
    const week = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let weeksday = week[day];
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let now_date = `${month}-${date}-${year} (${weeksday})`;
    let now_time = `${hour}:${min}:${sec}`;
    let place = `Japan Tokyo (GMT+9.00)`;

    document.querySelector(".date").innerText = now_date;
    document.querySelector(".time").innerText = now_time;
    document.querySelector(".place").innerText = place;
}

setInterval(getTime,1000);