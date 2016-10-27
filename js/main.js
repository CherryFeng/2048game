// JavaScript Document
var board = new Array();
var score = 0;
var hasConflicted = new Array();//用来限制每个格子只叠加一次

//实现移动端的触控
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function() {
    prepareForMobile();
	newgame();
    
});

function prepareForMobile(){
    //当屏幕尺寸比较大时，或者在网页端时，还是使用绝对尺寸
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    //先减去，后加上，符合盒子模型，所以grid-container的宽和高都是gridContainerWidth
    $("#grid-container").css('width',gridContainerWidth - 2*cellSpace);
    $("#grid-container").css('height',gridContainerWidth - 2*cellSpace);
    $("#grid-container").css('padding',cellSpace);
    $("#grid-container").css('border-radius',0.02*gridContainerWidth);
    
    $(".grid-cell").css('width',cellSideLength);
    $(".grid-cell").css('height',cellSideLength);
    $(".grid-cell").css('border-radius',0.02*cellSideLength);
   
    
}


function newgame(){
	//初始化棋盘格
	init();
	//随机在两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for(var i = 0; i < 4; i ++){
		for(var j = 0; j < 4; j ++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i, j));
			gridCell.css("left",getPosLeft(i, j));
		}
	}
	
	for(var i = 0; i < 4; i ++){
		board[i] = new Array();
        hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j ++){
			board[i][j] = 0;
            hasConflicted[i][j] = false;
		}
	}
	score = 0;
    updateScore(score);
	updateBoardView();
    
    
}

function updateBoardView(){
    
	$(".number-cell").remove();
	for(var i = 0; i < 4; i ++){
		for(var j = 0; j < 4; j ++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');//这个引号部分要注意一下
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			
			if(board[i][j] == 0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i, j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i, j)+cellSideLength/2);
				
            
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i, j));
				theNumberCell.css('left',getPosLeft(i, j));
				theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );//改变背景色
				theNumberCell.css('color',getFontColor( board[i][j] ));
				theNumberCell.css('font-size',getFontSize( board[i][j])+'px');  
				theNumberCell.css('font-weight',getFontWeight( board[i][j]) );
            
				theNumberCell.text( datas[board[i][j]] );
				
			}
            
            hasConflicted[i][j] = false;//重置碰撞数组
		}
	}
    $(".number-cell").css('line-height',cellSideLength+'px');
	$(".number-cell").css('font-family','Microsoft YaHei');
	
	
}

function generateOneNumber(){
	if( noSpace(board) ){
		return false;
	}
	//随机一个位置
	var randx = parseInt( Math.floor( Math.random() * 4 ) );
	var randy = parseInt( Math.floor( Math.random() * 4 ) );
    
    var times = 0;
	while( times < 50 ){
		if( board[randx][randy] == 0){ 
			break;
		}
		//判断随机生成的位置是否可用，如果不可用就一直进行随机生成，直到找到可用的位置
		randx = parseInt( Math.floor( Math.random() * 4 ) );
		randy = parseInt( Math.floor( Math.random() * 4 ) );
        
        times++;
	}
	//当自动生成随机数的次数超过50次还没能找到空位置时，进行人工生成空位置
    if(times == 50){
        for(var i=0; i<4; i++)
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx = i;
                    randy = j;
                }
            }     
    }
    
    
    
    
	//随机一个数字
	/*var randNumber = Math.random() < 0.5 ? 2 : 4;*/
	var randNumber = 2; 
	
	//在随机位置显示随机数
	board[randx][randy] = 2;
	showNumberWithAnimation( randx, randy, randNumber );
	
	return true;
}

$(document).keydown( function( event ){
	/*但是写在这里会阻止所有按键的冒泡行为，所以具体情况具体选择放置位置
	event.preventDefault();//阻止滚动条的默认行为，也就是阻止默认行为
	*/
	
	switch( event.keyCode ){
		case 37: //left
			event.preventDefault();//阻止滚动条的默认行为，也就是阻止默认行为
			if( moveLeft() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
			break;
		case 38: // up
			event.preventDefault();//阻止滚动条的默认行为，也就是阻止默认行为
			if( moveUp() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
			break;
		case 39: //right
			event.preventDefault();//阻止滚动条的默认行为，也就是阻止默认行为
			if( moveRight() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
			break;
		case 40: // down
			event.preventDefault();//阻止滚动条的默认行为，也就是阻止默认行为
			if( moveDown() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
			break;
		default: //default
			break;
	}

});

//捕捉移动端用户触摸事件
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
    
});

//解决Android4.0版本上的没有正确使用preventDefault()而导致touchmove不响应的bug
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    
    var deltax = endx - startx;
    var deltay = endy - starty;
    
	//解决用户只是点击屏幕或其他碰到屏幕但并非滑动的操作的情况，设定一个值，比价deltax和deltay与该值的大小来判断用户操作是否为滑动
	if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth)
		return
		
    //在x轴移动
    if( Math.abs(deltax) >= Math.abs(deltay) ){
        if( deltax > 0 ){//向右移动
            if( moveRight() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
            
        }else{//向左移动
            if( moveLeft() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
            
        }
    }else{ //在y轴移动
        if( deltay >0 ){//向下移动，在屏幕坐标系中，y轴向下为正
            if( moveDown() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
        }else{//向上移动
            if( moveUp() ){
				setTimeout("generateOneNumber()",230);
				setTimeout("isGameover()",300);
			}
        }
    }
});


function isGameover(){
    if(noSpace( board )&& noMove( board )){
        gameover();
    }
    
}

function gameover(){
    alert('游戏结束啦，继续加油吧!<(￣︶￣)↗[GO!]');
}

//向左移动
function moveLeft(){
	if( !canMoveLeft( board ) ){
		return false;
	}
	
	for(var i = 0; i < 4; i ++){
		for(var j = 0; j < 4; j ++){
			if( board[i][j] != 0 )
				for(var k =0; k<j; k++){
					if( board[i][k] ==0 && noBlockHorizontal(i, k, j, board )){
						//move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;                
                        continue;
                        
					}else if( board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)&&!hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add数字相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
						
                        //增加分数
                        score += board[i][k];
                        updateScore(score);
                        
                        hasConflicted[i][k] = true;
						continue;
                        
					}
				}
			
		}
	}
    //刷新页面数据，延迟刷新
    setTimeout("updateBoardView()",200);
   
	return true;
	
}

//向右移动
function moveRight(){
	if( !canMoveRight( board ) ){
		return false;
	}
	
	for(var i = 0; i < 4; i ++){
        for(var j=2;j>=0;j--){
		//for(var j = 0; j <3; j ++){
			if( board[i][j] != 0 )
                for(var k=3;k>j;k--){
				//for(var k =j+1; k<4; k++){
					if( board[i][k] ==0 && noBlockHorizontal(i, j, k, board) ){
						//move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;                
                        continue;
					}else if( board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)&&!hasConflicted[i][k] ){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add数字相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //增加分数
                        score += board[i][k];
                        updateScore(score);
                        
                        hasConflicted[i][k] = true;
						continue;
                        
					}
				}
			
		}
	}
    //刷新页面数据，延迟刷新
    setTimeout("updateBoardView()",200);
   
	return true;
	
}

//向上移动
function moveUp(){
	if( !canMoveUp( board ) ){
		return false;
	}
	
	for(var j=0; j<4; j++){
        for(var i=1; i<4; i++){
            if(board[i][j]!=0){
                for(var k=0; k<i; k++){
                    if(board[k][j] == 0&&noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        
                    }else if( board[k][j] == board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //增加分数
                        score += board[k][j];
                        updateScore(score);
                        
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新页面数据，延迟刷新
    setTimeout("updateBoardView()",200);
   
	return true;
	
}

//向下移动
function moveDown(){
	if( !canMoveDown( board ) ){
		return false;
	}
	
	for(var j=0; j<4; j++){
        for(var i=2; i>=0; i--){
        //for(var i=0;i<3;i++){
            if(board[i][j]!=0){
                for(var k=3; k>i; k--){
                //for(var k=i+1;k<4;k++){
                    if(board[k][j] == 0&&noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[k][j] == board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //增加分数
                        score += board[k][j];
                        updateScore(score);
                        
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新页面数据，延迟刷新
    setTimeout("updateBoardView()",200);
   
	return true;
	
}