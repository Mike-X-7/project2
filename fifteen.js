id# 620076685

var array;
var  sum = 0, blank_space = 15, increment = 0, val;
var still_moving = false, div_moved = "no";

window.onload = function () {
    "use strict";
    
    var shufflebutton, all = document.getElementById('puzzlearea').getElementsByTagName('div');
    shufflebutton = document.getElementById('shufflebutton');
    shufflebutton.onclick = shuffle;
    array = all;
    
    var i = 0;
    while (i < all.length) {
        all[i].className = 'puzzlepiece';
        all[i].onclick = movePiece;
        all[i].onmouseover = canMove;
        all[i].onmouseout = reset;

        if (i >= 0 && i <= 3){
            all[i].style.backgroundPosition = -i*100+'px '+'0px';
            all[i].style.top=0+'px';
            all[i].style.left+=i*100+'px';
        }else if(i >= 4 && i <= 7){
            all[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
            all[i].style.top=100+'px';
            all[i].style.left+=(i-4)*100+'px';
        }else if(i>=8 && i<=11){
            all[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
            all[i].style.top=200+'px';
            all[i].style.left+=(i-8)*100+'px';
        }else{
            all[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';   
            all[i].style.top=300+'px';
            all[i].style.left+=(i-12)*100+'px';
        }i++;
    }
};

// returns the X values for the div.
function xCoordinates()
{
        if(blank_space>=0 && blank_space<=3){
            return blank_space*100+'px';
        }else if(blank_space>=4 && blank_space<=7){
                return (blank_space-4)*100+'px';
            }else if(blank_space>=8 && blank_space<=11){
                return (blank_space-8)*100+'px'; 
            }else{
                return (blank_space-12)*100+'px';   
            }
}

// returns the Y values for the div
function yCoordinates(){
    if(blank_space>=0 && blank_space<=3){
            return '0px';
        }else if(blank_space>=4 && blank_space<=7){
            return '100px';    
        }else if(blank_space>=8 && blank_space<=11){
            return '200px';     
        }else{
            return '300px';    
        }
}

//tells if a div can be moved
function canMove(){
    if(!still_moving){
        if(parseInt(this.style.left) === (parseInt(xCoordinates())+parseInt(this.offsetWidth)) && this.style.top===yCoordinates())
        {
            this.className = this.className + " movablepiece";
            div_moved= "yes_left";
        }
        else if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(xCoordinates()) && this.style.top===yCoordinates())
        {
        this.className = this.className + " movablepiece";
        div_moved="yes_right";
        }else if(parseInt(this.style.top) === (parseInt(yCoordinates())+parseInt(this.offsetHeight)) && this.style.left===xCoordinates()){
            this.className = this.className + " movablepiece";
            div_moved= "yes_up";
        }else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(yCoordinates()) && this.style.left===xCoordinates()){
            this.className = this.className + " movablepiece";
            div_moved= "yes_down";
        }else{
            div_moved= "no";
        }
    }
}


function movable(piece){
    if((parseInt(piece.style.left)+parseInt(piece.offsetWidth)) === parseInt(xCoordinates()) && piece.style.top===yCoordinates()){
        div_moved = "yes_right";
        return "yes_right";
    }else if(parseInt(piece.style.top) === (parseInt(yCoordinates())+parseInt(piece.offsetHeight)) && piece.style.left===xCoordinates()){
        div_moved = "yes_up";
        return "yes_up";
    }else if((parseInt(piece.style.top)+parseInt(piece.offsetHeight)) === parseInt(yCoordinates()) && piece.style.left===xCoordinates()){
        div_moved = "yes_down";
        return "yes_down";
    }else if(parseInt(piece.style.left) === (parseInt(xCoordinates())+parseInt(piece.offsetWidth)) && piece.style.top===yCoordinates()){
        div_moved = "yes_left";
        return "yes_left";
    }else{
        div_moved = "no";
        return "no";
    }
}

// changes the color, border and text of div.
function switchPieces(){
    var x = 0, i=0;
    while(i<array.length){
        if(array[i].textContent===val){
            x=i; 
        }i++;
    }
    
    if(sum!=100){
        if(div_moved==="yes_left" || div_moved==="yes_right"){
            array[x].style.left=parseInt(array[x].style.left)+increment+'px';
        }else{
            array[x].style.top=parseInt(array[x].style.top)+increment+'px';
        }
        setTimeout(switchPieces, "1 * 1000");
        still_moving=true;
        sum+=1;      
    }else{
        still_moving=false;
        sum=0;
        div_moved="no";
    }    
}

// calls the switchPieces method with the direction inwhich a div can be moved.
function movePiece(){
    if(!still_moving){
        if(div_moved === "yes_down"){
            increment=1;
            blank_space-=4;
            val=this.textContent;
            switchPieces();
        }else if(div_moved === "yes_up"){
            increment=-1;
            blank_space+=4;
            val=this.textContent;
            switchPieces();
        }else if (div_moved === "yes_right"){
            increment=1;
            blank_space-=1;
            val=this.textContent;
            switchPieces();
        }else if(div_moved === "yes_left"){
            increment=-1;
            blank_space+=1;
            val=this.textContent;
            switchPieces();
        }
    }  
}

function startShuffle(piece){
    
    switch(div_moved){
        case "yes_right":
        piece.style.left=parseInt(piece.style.left)+100+'px';
        blank_space-=1;
        break;
        case "yes_left":
        piece.style.left=parseInt(piece.style.left)-100+'px';
        blank_space+=1;
        break;
        case "yes_down":
        piece.style.top=parseInt(piece.style.top)+100+'px';
        blank_space-=4;
        break;
        case "yes_up":
        piece.style.top=parseInt(piece.style.top)-100+'px';
        blank_space+=4;
        break;

        default:
    }
}

function shuffle(){
    var num=100;
    for(var i =0; i<num; i++){
        var values = [];
        for(var x =0; x<array.length; x++){
            if(movable(array[x])!="no"){
                values.push(x);
            }
        }
        if(values.length!=0){
            var n = values[Math.floor((Math.random()*values.length)+0)];
            movable(array[n]);
            startShuffle(array[n]);
        }
    }
    div_moved="no";
}

function reset(){
    this.className = 'puzzlepiece';
}
shuffle();
