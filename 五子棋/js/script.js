//black first
var me = true;
var chess = document.getElementById('chessboard');
var context = chess.getContext("2d");
//记录落子信息
var chessOn = [];
for(var i=0; i<15; i++){
	chessOn[i]=[];
	for(var j=0; j<15; j++){
		chessOn[i][j] = 0;
	}
}
context.strokeStyle = "#BFBFBF";

var back = new Image();
back.src = "img/background.jpg";
back.onload = function(){
	context.drawImage(back, 0, 0, 450, 450);
	//背景图加颜色填充

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
	gradient.addColorStop(0,"#d1d1d1");
	gradient.addColorStop(1,"#fff");	
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessOn[i][j] == 0){
	oneStep(i,j,me);
		if (me) {
			chessOn[i][j] = 1;
		}
		else{
			chessOn[i][j] = 2;
		}
		me = !me;
	}
}