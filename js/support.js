// JavaScript Document

//为解决其他设备的屏幕适应问题
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;



function getPosTop(i, j){
	return cellSpace + i*(cellSideLength+cellSpace);
}

function getPosLeft( i , j ){
    return cellSpace + j*(cellSideLength+cellSpace);
}

function getNumberBackgroundColor( number ){
	switch( number ){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	
	return "black";
}


function getFontSize( number ){
	switch( number ){
		case 2:
		case 2048:
		case 4096:
			return 0.4*cellSideLength;break;
		case 4:
        case 8:
		case 64:
		case 1024:
			return 0.3*cellSideLength;break;
		
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 8192:
			return 0.2*cellSideLength;break;
		
	}
	
	return 0.4*cellSideLength;
}

function getFontWeight( number ){
	switch( number ){
		case 2:	
		case 16:
        case 32:
        case 128:
        case 256:
        case 512:
		case 2048:
		case 4096:
        case 8192:
			return 'normal';break;
		case 4:
        case 8:
		case 64:
		case 1024:
			return 'bold';break;
	}
	
	return 'normal';
}
function getFontColor( number ){
	switch( number ){
		case 2:return "#776e65";break;
		case 4:return "#f2b179";break;
        case 8:return "#fff";break;
        case 16:return "#fff";break;
        case 32:return "#fff";break;
        case 64:return "#fff";break;
        case 128:return "#fff";break;
        case 256:return "#776e65";break;
        case 512:return "#fff";break;
        case 1024:return "#fff";break;
        case 2048:return "#fff";break;
        case 4096:return "#fff";break;
        case 8192:return "#000";break;
	}
	
	return '#776e65';
	
}

function noSpace(board){
	for(var i = 0; i<4; i ++){
		for(var j= 0; j<4; j ++){
			if( board[i][j] ==0 ){
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft( board ){
	for( var i=0; i < 4; i++){
		for( var j=1; j <4; j++){
			if( board[i][j] != 0){
				if( board[i][j-1] ==0|| board[i][j-1] == board[i][j] )
					return true;
			}
		}
	}
	return false;
}

function canMoveRight( board ){
    for( var i=0; i < 4; i++){
		for( var j=2; j >= 0; j--){
			if( board[i][j] != 0){
				if( board[i][j+1] ==0|| board[i][j+1] == board[i][j] ) 
                
					return true;
			}
		}
	}
	return false;
}

function canMoveUp( board ){
    for( var j=0; j < 4; j++){
		for( var i=1; i < 4; i++){
			if( board[i][j] != 0){
				if( board[i-1][j] ==0|| board[i-1][j] == board[i][j] ) 
					return true;
			}
		}
	}
	return false;
}

function canMoveDown( board ){
    for( var j=0; j < 4; j++){
		for( var i=2; i >= 0; i--){
			if( board[i][j] != 0){
				if( board[i+1][j] ==0|| board[i+1][j] == board[i][j] ) 
                 
					return true;
			}
		}
	}
	return false;
}


function noBlockHorizontal( row, col1, col2, board ) {
    for(var i = col1+1; i < col2 ; i ++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;

}

function noBlockVertical( col, row1, row2, board ){
    for(var i = row1+1; i < row2 ; i ++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}


function noMove( board ){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
        return false;
    }
    return true;
}


function updateScore(score){
    $("#score").text(score);
}




















