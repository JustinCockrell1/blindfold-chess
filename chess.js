const canvas = document.getElementById("board-canvas");
const ctx = canvas.getContext("2d");

let board = [
    ["br","bn","bb","bq","bk","bb","bn","br"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wr","wn","wb","wq","wk","wb","wn","wr"],
];

let cellNum = 8;
let cellSize = 600/cellNum;




function drawBoard() {
    for(let i = 0; i < cellNum; i++) {
        for(let j = 0; j < cellNum; j++){
            if(board[j][i]=="") ctx.fillStyle="red";
            else ctx.fillStyle="black";
            ctx.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
        }
    }
}

drawBoard();


//checks if a coordinate is on the 8x8 grid
function isOnBoard(point){
    return (point.x>=0&&point.x<cellNum&&point.y>=0&&point.y<cellNum);
}


//checks if a square is occupied by a piece of a certain color
function isOccupied(point,color) {
    return (board[point.y][point.x].charAt(0)==color)
}


//return all possible squares a knight can go to from an origin
function getKnightMoves(rank,file, color) {
    let moves = [
    {x:1,y:2},
    {x:1,y:-2},
    {x:2,y:1},
    {x:2,y:-1},
    {x:-1,y:2},
    {x:-1,y:-2},
    {x:-2,y:1},
    {x:-2,y:-1},
    ];
    let possibleMoves = [];
    for(let i = 0; i < moves.length; i++) {
        move = {x: moves[i].x+file, y: moves[i].y+rank};
        if(isOnBoard(move)) { //isOccupied might change
            possibleMoves.push(move);
            
        }
    }
    return possibleMoves;
}

//Rooks moves
function getRookMoves(rank,file,color) {
    let slopes = [
        {x:1,y:0},
        {x:-1,y:0},
        {x:0,y:1},
        {x:0,y:-1}
    ]
    let possibleMoves = [];
    for(let i = 0; i < slopes.length; i++) {
        let scale = 1;
        let move = {x:slopes[i].x+file, y:slopes[i].y+rank};
        while(isOnBoard(move)&&!isOccupied(move,"w")) {

            move = {x:(scale*slopes[i].x)+file, y:(slopes[i].y*scale)+rank};
        }
    }
    


}

//Bishops moves

//Kings Moves

//Pawns moves

//Queens Moves

//Takes a string like ne4 and converts it to a move
function getMoveFromString(s) {
    let rank,file;
    let move;
    if(s.length==2) {
        file=parseInt(s.charAt(1))-1;
        rank = s.charCodeAt(0)-97; //converts from a to 0, e to 4, etc...
        move = {x:rank,y:file,piece:"p"};
    }
    else if(s.length==3){
        file=parseInt(s.charAt(2))-1;
        rank = s.charCodeAt(1)-97; //converts from a to 0, e to 4, etc...
        piece = s.charAt(0);
        move = {x:rank,y:file,piece:piece};
    }


    return move;
} 

//Make a move given a coordinate and a piece symbol
function makeMove(move) {
    if(move.piece=="n") {
     possibleSquares = getKnightMoves(move.x,move.y,"w");
     console.log(possibleSquares);
    }
    else if(move.piece=="b") {

    }
    else if(move.piece=="k") {

    }
    else if(move.piece=="r") {

    }
    else if(move.piece=="p") {

    }
    else if(move.piece=="q") {

    }

    for(let i = 0; i < possibleSquares.length; i++){
        if(board[possibleSquares[i].x][possibleSquares[i].y].charAt(1)==move.piece) {
            console.log(possibleSquares[i]);
        }
    }

}



//Click event listener
window.addEventListener("click", (e)=>{
    console.log(e.clientX);
});