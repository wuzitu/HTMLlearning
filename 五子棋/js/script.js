var over = false;
//black first
var me = true;
var chess = document.getElementById('chessboard');
var context = chess.getContext("2d");
//win Array
var win = [];
//Ӯ��ͳ������
var myWin = [];
var comWin = [];
//��¼������Ϣ
var chessOn = [];
for(var i=0; i<15; i++){
	chessOn[i]=[];
	for(var j=0; j<15; j++){
		chessOn[i][j] = 0;
	}
}
for(var i=0; i<15; i++){
	win[i]=[];
	for(var j=0; j<15; j++){
		win[i][j] = [];
	}
}
var count = 0;
//���ǲ�̫���
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			win[i][j+k][count] = true;
		}
	count++;
	}
}
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			win[j+k][i][count] = true;
		}
	count++;
	}
}
for(var i=0; i<11; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			win[i+k][j+k][count] = true;
		}
	count++;
	}
}
for(var i=0; i<11; i++){
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			win[i+k][j-k][count] = true;
		}
	count++;
	}
}
console.log(count);

for(var i=0; i<count; i++){
	myWin[i] = 0;
	comWin[i] = 0;
}
context.strokeStyle = "#BFBFBF";

var back = new Image();
back.src = "img/background.jpg";
back.onload = function(){
	context.drawImage(back, 0, 0, 450, 450);
	//����ͼ����ɫ���

	var lineGradient = context.createLinearGradient (0, 0, 450, 450); 
	lineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); 
	lineGradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)'); 
	context.fillStyle = lineGradient; 
	context.fillRect(0, 0, 450, 450); 
	drawChessboard();
}

var drawChessboard = function(){
for(var i=0; i<15; i++)
	{
		context.moveTo(30*i+15,15);
		context.lineTo(30*i+15,435);
		context.moveTo(15,30*i+15);
		context.lineTo(435,30*i+15);
		context.stroke();
	}
}

var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,11,15+i*30+2,15+j*30-2,0);
	if(me){
	gradient.addColorStop(0,"#0a0a0a");
	gradient.addColorStop(1,"#636766");
	}
	else{
	gradient.addColorStop(0,"#A6BFE4");
	gradient.addColorStop(1,"#fff");	
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	if (over) {return;}
	if(!me){return;}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessOn[i][j] == 0){
		oneStep(i,j,me);
		chessOn[i][j] = 1;

		for(var k=0; k<count; k++){
			if(win[i][j][k]){
				myWin[k]++;
				comWin[k] = 6;
				if (myWin[k] == 5) {
					window.alert("youwin");
					over = true;
				}
			}	
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}
}

var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u=0, v=0;
	for(var i=0; i<15; i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j=0; j<15; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i=0; i<15; i++){
		for(j=0; j<15; j++){
			if (chessOn[i][j] == 0) {
				for(var k=0; k<count; k++){
					if(win[i][j][k]){
						if (myWin[k]==1) {
							myScore[i][j]+=200;
						}else if (myWin[k]==2) {
							myScore[i][j]+=400;
						}else if (myWin[k]==3) {
							myScore[i][j]+=2000;
						}else if (myWin[k]==4) {
							myScore[i][j]+=10000;
						}
						if (comWin[k]==1) {
							computerScore[i][j]+=220;
						}else if (comWin[k]==2) {
							computerScore[i][j]+=420;
						}else if (comWin[k]==3) {
							computerScore[i][j]+=2100;
						}else if (comWin[k]==4) {
							computerScore[i][j]+=20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u=i;
					v=j;
				}else if (myScore[i][j]==max) {
				 if (computerScore[i][j]>computerScore[u][v]) {
				 	u=i;
					v=j;
				 }
				}
				 if (computerScore[i][j] > max) {
					max = myScore[i][j];
					u=i;
					v=j;
				}else if (computerScore[i][j]==max) {
				 if (myScore[i][j]>myScore[u][v]) {
				 	u=i;
					v=j;
				 }
				}
			}
		}
	}
	oneStep(u,v,false);
	chessOn[u][v]=2;
	for(var k=0; k<count; k++){
		if(win[u][v][k]){
			comWin[k]++;
			myWin[k] = 6;
			if (comWin[k] == 5) {
				window.alert("comWin");
				over = true;
			}
		}
	}
	if(!over){
		me = !me;
	}
}



