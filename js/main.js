
let severURL = "https://script.google.com/macros/s/AKfycbxh-5SNW37Dhjb0X8JbmotcFnVzcEI5EbT1Di1loqgxgHL7XYloxMv11nh0VfLFpZNb/exec";
let articleNum = 1;
let event_ary = ['input[type=text]', 'textarea']; //用陣列看緊告框框?
$(document).ready(function() {
	initBtnFunc();
	setProgress();
	showAni();
});
//用迴圈判斷 所有text警告的條件
for(let i=0;i<event_ary.length;i++){
	$(event_ary[i]).focusout(function(event) { //文字輸入框 空字串的時候出現警告
	if($(this).val() == ''){
	  setTip($(this));//判斷是否已經有警告東西在setTip
		}
	});
	$(event_ary[i]).keyup(function(event) { //有字串的時候警告取消
		if($(this).val() != ''){
	 		removeTip($(this)); //移除的東西在removeTip??
		}
	});
}
//???看移除Tip?
$('input[type=radio]').change(function(event) {
	removeTip($(this));
});

$('select').change(function(event) {
	removeTip($(this));
});
$('input[type=checkbox]').change(function(event) {
	removeTip($(this));
});


function initBtnFunc(){
	$('.btn-next').click(function(event) {
		checkField(); //確定
	});
	$('.btn-prev').click(function(event) {
		switchArticle('prev');
	});	
	$('.btn-send').click(function(event) {
		sendToServer();
	});
	$('.btn-prev').hide();
	$('.btn-send').hide();
}
function checkField(){
	switch(articleNum){
		case 2:
		//判斷是否已經有警告東西在setTip ,所有的input都要
		if($('input[name=petName]').val() == ''){
			setTip($('input[name=petName]'));
			return false; //如果有空欄位就停下不用檢查了
		}

		if($('input[type=radio]:checked').val() == undefined){
			setTip($('input[type=radio]'));
			return false; //如果有空欄位就停下不用檢查了
		}	

		// if($('input[name=userTitle]').val() == ''){
		// 	setTip($('input[name=userTitle]'));
		// 	return false; //如果有空欄位就停下不用檢查了
		// }
		if($('select').val() == null){
			setTip($('select'));
			return false;	
		}
		if($('input[name=message]').val() == ''){
			setTip($('input[name=message]'));
			return false; //如果有空欄位就停下不用檢查了
		}
		switchArticle('next');//可以就往下一頁
			break;
		case 3:

			if($('input[name=food1]:checked') .val() == undefined){
				setTip($('input[name=food1]'));
				return false; //如果有空欄位就停下不用檢查了
			}
			switchArticle('next');//可以就往下一頁
			break;
		case 5:
			if($('input[name=potion1]:checked').val() == undefined){
				setTip($('input[name=potion1]'));
				return false; //如果有空欄位就停下不用檢查了
			
			}
			switchArticle('next');//可以就往下一頁
		case 6:
			if($('input[name=gift1]:checked').val() == undefined){
				setTip($('input[name=gift1]'));
				return false; //如果有空欄位就停下不用檢查了
			
			}
			switchArticle('next');//可以就往下一頁
			break;
		case 7:
			if($('textarea[name=giftmessage]').val() == ''){
				setTip($('input[name=giftmessage]'));
				return false; //如果有空欄位就停下不用檢查了
			}
			switchArticle('next');//可以就往下一頁
			break;
		default:
			switchArticle('next');
	}

}
//重複太多了 用替代?? dom是要setTip數據的對象??
function setTip(dom){
	let template = $('#tipTemplate01');
	let node = $('#tipTemplate01').html();
		if(dom.closest('.main-group').find('.tip').length ==0){//判斷有沒有警告了
			dom.closest('.main-group').append(node);
			dom.closest('.main-group').addClass('bdr');

		}	

}
function removeTip(dom){
	dom.closest('.main-group').find('.tip').remove();
	dom.closest('.main-group').removeClass('bdr');

}

function switchArticle(situation){
 switch(situation){
 	case 'next':
 	if(articleNum < 8){
 		$('nav').hide();
 		// $('#article'+articleNum).hide();
 		gsap.to('#article'+articleNum , {
 			duration: 1,
 			x: $('.container').width()*-1,
 			onComplete: backToCenter,
 			onCompleteParams: [articleNum, situation]
 		});  //(做動態的物件，動態的時序時間，和那些動態)
 		$('.img'+articleNum).hide();
		$('.img'+articleNum).removeClass('newPosi'); //圖片隱藏?

		articleNum++;
		$('#article'+articleNum).show();
		gsap.to('#article'+articleNum , {
 			duration: 0,
 			x: $('.container').width()
 		});  //移到右邊一個container寬的位置
 		gsap.to('#article'+articleNum , {
 			duration: 1,
 			x:0
 		}); 
		setProgress();

		}
 		break;
 	case 'prev':
 	if (articleNum > 1) {
 		$('nav').hide();
		gsap.to('#article'+articleNum , {
 			duration: 1,
 			x: $('.container').width(),
 			onComplete: backToCenter,
 			onCompleteParams: [articleNum, situation]
 		});  //(做動態的物件，動態的時序時間，和那些動態)
 		$('.img'+articleNum).hide();
		$('.img'+articleNum).removeClass('newPosi'); //圖片隱藏?
		articleNum--;
		$('#article'+articleNum).show();
		gsap.to('#article'+articleNum , {
 			duration: 0,
 			x: $('.container').width()*-1
 		});  //移到左邊一個container寬的位置
 		gsap.to('#article'+articleNum, {
 			duration: 1,
 			x:0
 		}); 
 		setProgress(); //算移動一頁是多少
 	}
 		break;
 }
}

function backToCenter(oldNum, situation){
	$('#article'+oldNum).hide();
	gsap.to('#article'+oldNum , {
 			duration: 0,
 			x: 0
 		});
	$('nav').show();
	$('.img'+articleNum).show();
	setTimeout(function(){
		$('.img'+articleNum).addClass('newPosi');
	},100);
	showAni();
	//按鈕得消失跟出現 調整
	switch(situation){
		case 'next':
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			if(articleNum == 7){
 				$('.btn-next').hide();
 				$('.btn-send').show();
			}else if(articleNum == 8){
 				$('nav').hide();
			}
			break;
		case 'prev':
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			$('.btn-send').hide();
			if(articleNum == 1){
 				$('.btn-prev').hide();
			}
			break;
	}
}
function showAni(){
	$('.img'+articleNum).show();
	setTimeout(function(){
		$('.img'+articleNum).addClass('newPosi');
	},100);
}



function setProgress(){
	let w = Math.floor((articleNum/8)*100);
	$('.progress-bar').css('width' , w+'%');
}

function sendToServer(){
	let parameter = {};  //需要送出的資料
	parameter.petName = $('input[name=petName]').val();  //單條填寫，存name=petName的值? #petName
	parameter.future = $('input[name=future]:checked').val(); //單選的要加checked
	parameter.location = $('select[name=location]').val();//下拉選單用select
	parameter.interest = $('select[name=interest]').val();//下拉選單用select
	parameter.message = $('input[name=message]').val();

	//以下是多選用
	let food = new Array();
	$('input[name=food1]:checked').each(function(index, el) {
			food.push($(this).val());
		}
	);//多選題，所以會傳陣列
	parameter.food1 = JSON.stringify(food);//字串化後可以傳gas JSON.stringify(need1);

	let potion = new Array();
	$('input[name=potion1]:checked').each(function(index, el) {
		potion.push($(this).val());
	});
	parameter.potion = JSON.stringify(potion);//字串化後可以傳gas JSON.stringify(need2);
	parameter.gift1 = $('input[name=gift1]:checked').val(); //單選的要加checked
	parameter.giftmessage =  $('textarea[name=giftmessage]').val();
	parameter.method = "write1";//參數?
	console.log(parameter);

	$('.cover').css('display', 'grid');//loding畫面設dispaly為grid
	$.post(severURL, parameter, function(data){
		console.log(data);
		if(data.result = 'sus'){
			// alert('送出成功');
			switchArticle('next'); //送出成功就到感謝頁
			$('.cover').css('display','none'); //loding畫面關掉
		}else{
			$('.cover').css('display','none');
			alert('送出失敗，請檢查後再試試看');
		}
	}).fail(function(date){ //網址,參數,回傳時要用的function
		alert('送出失敗');
		console.log(data);
	});

}