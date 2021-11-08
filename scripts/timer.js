const timer = () => {
    'use strict';

    const timer = document.getElementById('timer');   //タイマーそのもの
    const start = document.getElementById('start');   //STARTボタン
    const stop  = document.getElementById('stop');    //STOPボタン
    const reset = document.getElementById('reset');   //RESETボタン
    const set   = document.getElementById('timeset'); //TIMER SETボタン

    let time = 0;           //設定時間
    let timerId;            //Id
    let startTime;          //開始時間
    let mem = 0;            //ストップ後、リセットなしでは0秒に戻らないようにするメモリ
    let flag = false;       //計測中フラグ
    let timeout = false;    //時間切れ確認

    function transform(){
        let hour= Math.floor(time / 3600000);                   //3600000で割ると時が得られる
        let min = Math.floor(time % 3600000 / 60000);           //60000で割ると分が得られる
        let sec = Math.floor(time % 3600000 % 60000 / 1000);    //1000で割ると秒が得られる

        //9 => 09という形で調整する
        hour= hour< 10 ? '0' + hour:hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        timer.textContent = `${hour}:${min}:${sec}`;
    }

    function count(){
        //setTimeoutの返り値を代入
        timerId = setTimeout(function(){
            //時間を10ミリ秒減らす
            time -= 10;
            //整形
            transform();
            //再帰
            count();
            if(time == 0){
                //強制停止する
                clearTimeout(timerId);
                //時間切れになったら点滅して合図を出す
                timeout = true;
                timer.classList.add("timeout");
            }
        //msが飛ばないよう調整
        },5);
    }

    //STARTボタンイベント
    start.addEventListener('click',function(){
        if(flag == false && time != 0){
            startTime = Date.now();
            count();        //計測開始
            flag = true;    //フラグを立てる
        }
    });

    //STOPボタンイベント
    stop.addEventListener('click',function(){
        clearTimeout(timerId);  //計測停止
        if(flag == true){
            mem += time;        //計測再開に備えて時間を記憶
            flag = false;       //フラグをおろす
        }
        if(timeout == true){
            //STOPを押すことで時間切れ表示のための点滅を解除
            timer.classList.remove('timeout');
            timeout = false;
        }
    });

    //RESETボタンイベント
    reset.addEventListener('click',function(){
        if(flag == false){
            time = 0;       //経過時間のリセット
            mem = 0;        //メモリもリセット
            transform();    //整形
        }
    });

    //TIMER SETボタンイベント
    set.addEventListener('click',function(){
        if(flag == false){
            // ホップアップウィンドウに入力させる
            // TODO ここは仮設置。あまりにも性善説的な仕様なので改善を検討中
            var user = window.prompt("Please Set Time ( hour : min : sec )","00:00:00");
            // 分割
            var set  = user.split(':');
            // ミリ秒変換して代入
            time = Number(set[0])*3600000 + Number(set[1])*60000 + Number(set[2])*1000;
            transform();    // 整形
        }
    });
}

timer();