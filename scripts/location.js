const getLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(

            //成功した場合に呼び出す
            function success(position){
                var data = position.coords; //取得したデータを投入

                var lat = data.latitude;    //緯度
                var lng = data.longitude;   //経度
                var place;                  //場所を格納

                // 国土地理院の逆ジオコーディングAPIを利用
                var url = "https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress"
                const params = {lon: lng, lat: lat};                    //パラメータにGeolocation APIで取得した緯度経度情報を入力
                const qs = new URLSearchParams(params);                 //URLの末尾につけられるように関数を通して変換

                //fetch APIを使ってresponceオブジェクトの形で逆ジオコーディングAPIの結果を取得
                fetch(`${url}?${qs}`).then(function(responce){
                    return responce.json();                             //json形式に変換

                //成功時に実行
                }).then(function(data){
                    var num = data.results.muniCd;                      //json形式のデータから必要な部分を抽出
                    var array_data = GSI.MUNI_ARRAY[num];                   //muni.jsの配列から地名情報を取得
                    var pref_array = array_data.split(',');             //","で区切る
                    var pref = pref_array[1];                           //県名
                    var muni = pref_array[3].replace('　',' ');         //市町村名(全角空白を半角空白へ置換する)
                    place = `${pref} ${muni}`;                          //実際に表示する形式
                    document.querySelector(".place").innerText = place; //時計に表示
                });
            },

            //失敗した場合に呼び出す
            function(error){
                //error.code
                //0:Unknown_Error
                //1:Permission_Denied
                //2:Position_Unavailable
                //3:Timeout

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

            //オプション
            {
                "enableHighAccuracy": false,
                "timeout": 8000,
                "maximumAge": 2000
            }
        );
    }else{
        var message = "端末がGeolocation APIに対応していません"

        document.querySelector(".place").innerText = message;
    };
}

getLocation();