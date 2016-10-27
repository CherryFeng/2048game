// JavaScript Document

function showNumberWithAnimation( x, y, randNumber){
	
	var numberCell = $("#number-cell-" + x + "-" + y);
	
	numberCell.css("background-color", getNumberBackgroundColor( randNumber ) );
	numberCell.css("color",getFontColor(randNumber) );
	numberCell.text( datas[randNumber] );
	numberCell.css('font-size',getFontSize(randNumber)); 
	numberCell.css('font-weight',getFontWeight(randNumber));
	//动画部分
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop( x, y ),
		left:getPosLeft( x, y )
	},50);
} 

function showMoveAnimation( fromx, fromy, tox, toy ){
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}