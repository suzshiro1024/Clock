const timer = () => {
	'use strict';

	const timer = document.getElementById('timer');   //タイマーそのもの
	const start = document.getElementById('start');   //STARTボタン
	const stop  = document.getElementById('stop');    //STOPボタン
	const reset = document.getElementById('reset');   //RESETボタン
	const set   = document.getElementById('timeset'); //TIMER SETボタン

	let timerId;            //Id
	let remainingTime;      //残り時間
	let endTime;            //終了時間
	let flag = false;       //計測中フラグ
	let timeout = false;    //時間切れ確認

	function transform(){
		let hour= Math.floor(remainingTime / 3600000);                   //3600000で割ると時が得られる
		let min = Math.floor(remainingTime % 3600000 / 60000);           //60000で割ると分が得られる
		let sec = Math.floor(remainingTime % 3600000 % 60000 / 1000);    //1000で割ると秒が得られる

		//9 => 09という形で調整する
		hour= hour< 10 ? '0' + hour:hour;
		min = min < 10 ? '0' + min : min;
		sec = sec < 10 ? '0' + sec : sec;

		timer.textContent = `${hour}:${min}:${sec}`;
	}

	function count(){
		//setTimeoutの返り値を代入
		timerId = setTimeout(function(){
			//残り時間を計算
			remainingTime = endTime - Date.now();
			//整形
			transform();
			//再帰
			count();
			if(remainingTime <= 0){
				//強制停止する
				clearTimeout(timerId);
					//時間を0にして表示
					remainingTime = 0;
					transform();
				//時間切れになったら点滅して合図を出す
				timeout = true;
				timer.classList.add("timeout");
			}
		//msが飛ばないよう調整
		},5);
	}

	//STARTボタンイベント
	start.addEventListener('click',function(){
		if(flag == false && remainingTime != 0){
			endTime = Date.now() + remainingTime;   //終了予定時間
			count();                                //計測開始
			flag = true;                            //フラグを立てる
		}
	});

	//STOPボタンイベント
	stop.addEventListener('click',function(){
		clearTimeout(timerId);	//計測停止
		if(flag == true){
			flag = false;       	//フラグをおろす
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
			remainingTime = 0;	//経過時間のリセット
			transform();    		//整形
		}
	});

	//TIMER SETボタンイベント
	set.addEventListener('click',function(){
		if(flag == false){
			// ホップアップウィンドウに入力させる
			// TODO ここは仮設置。あまりにも性善説的な仕様なので改善を検討中
			let user = window.prompt("Please Set Time ( hour : min : sec )","00:00:00");
			// 分割
			let set  = user.split(':');
			// ミリ秒変換して代入
			remainingTime = Number(set[0])*3600000 + Number(set[1])*60000 + Number(set[2])*1000;
			transform();    // 整形
		}
	});
}

timer();