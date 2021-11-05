const stopwatch = () => {
    'use.strict';

    var stopwatch = document.getElementById('stopwatch');   //時計そのもの
    var start     = document.getElementById('start');       //STARTボタン
    var stop      = document.getElementById('stop');        //STOPボタン
    var reset     = document.getElementById('reset');       //RESETボタン

    var startTime;      //開始時間
    var lapsedTime = 0; //経過時間(ミリ秒)
    var stopwatchId;    //Id
    var mem = 0;        //ストップ後、リセットなしでは0秒に戻らないようにする
    var flag = false;   //計測中フラグ

    function transform(){
        var min = Math.floor(lapsedTime / 60000);           //60000で割ると分が得られる
        var sec = Math.floor(lapsedTime % 60000 / 1000);    //1000で割ると秒が得られる
        var msc = Math.floor(lapsedTime % 1000);            //1000で割った余りはミリ秒

        //9 => 09という形で調整する
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        msc = msc < 10 ? '00' + msc : msc < 100 ? '0' + msc : msc;

        stopwatch.textContent = `${min}:${sec}:${msc}`;
    }

    function count(){
        //setTimeoutの返り値を代入
        stopwatchId = setTimeout(function(){
            //経過時間 = 現在時刻 - 開始時刻 + 途中で止めた時刻(あれば)
            lapsedTime = Date.now() - startTime + mem;
            transform();

            //再帰
            count();
        //msが飛ばないように調整
        },10);
    }

    //STARTボタンイベント
    start.addEventListener('click',function(){
        if(flag == false){
        startTime = Date.now();                 //現在時刻を代入
        count();                                //計測開始
        flag = true;                            //フラグを立てる
        }
    });

    //STOPボタンイベント
    stop.addEventListener('click',function(){
        clearTimeout(stopwatchId);              //計測停止
        if(flag == true){
            mem += Date.now() - startTime;      //計測再開に備えて経過時間を記憶
            flag = false;                       //フラグをおろす
        }
    });

    //RESETボタンイベント
    reset.addEventListener('click',function(){
        lapsedTime = 0;                         //経過時間のリセット
        mem = 0;                                //メモリもリセット
        transform();
    });
}

stopwatch();