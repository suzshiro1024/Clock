if( navigator.geolocation){
    navigator.geolocation.getCurrentPosition(

        // 成功した場合に呼び出す
        function success(position){
            var data = position.coords; // 取得したデータを投入

            var let = data.latitude;    // 緯度
            var lng = data.longitude;   // 経度

            let location = `let=${let} lon=${lng}`

            document.querySelector(".place").innerText = location;
        },

        // 失敗した場合に呼び出す
        function (error) {
            // error.code
            // 0:Unknown_Error
            // 1:Permission_Denied
            // 2:Position_Unavailable
            // 3:Timeout

            var info = [
                "Unknown Error / 原因不明エラー",
                "Permission Denied / 位置情報使用が許可されていません",
                "Position Unavailable / 取得失敗",
                "Timeout / タイムアウト"
            ];

            var errorNo = error.code;

            var message = "No:" + errorNo + " " + info[errorNo];

            document.querySelector(".place").innerText = message;
        },

        // オプション
        {
            "enableHighAccuracy": false,
            "timeout": 8000,
            "maximumAge": 2000
        }
    );
}else{
    var message = "端末がGeolocation APIに対応していません"

    document.querySelector(".place").innerText = message;
}