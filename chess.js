const canvas = document.getElementById("board-canvas");
const ctx = canvas.getContext("2d");

let board = [
    ["wr","wn","wb","wk","wq","wb","wn","wr"],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    ["br","bn","bb","bk","bq","bb","bn","br"],
    
];

let cellNum = 8;
let cellSize = 600/cellNum;

let currentColor = "w";


function drawBoard() {
    for(let i = 0; i < cellNum; i++) {
        for(let j = 0; j < cellNum; j++){
            if(board[j][i]=="") ctx.fillStyle="red";
            else ctx.fillStyle="black";
            ctx.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
            ctx.font = "20px Georgia";
            ctx.fillStyle="white";
            ctx.fillText(board[j][i], i*cellSize+cellSize/2, j*cellSize+cellSize/2);
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
        move = {x: moves[i].x+rank, y: moves[i].y+file};
        if(isOnBoard(move) && isOccupied(move,color)) { //isOccupied might change
            possibleMoves.push(move);
            
        }
    }
    return possibleMoves;
}

//Rooks moves
function getRookMoves(rank,file,color) {
    let enemyColor = color == 'w' ? 'b' : 'w';
    let slopes = [
        {x:1,y:0},
        {x:-1,y:0},
        {x:0,y:1},
        {x:0,y:-1}
    ]
    let possibleMoves = [];
    for(let i = 0; i < slopes.length; i++) {
        let scale = 1;
        let move = {x:slopes[i].x+rank, y:slopes[i].y+file};
        console.log(move);
        while(isOnBoard(move)) {
            scale+=1;
            if(isOccupied(move,enemyColor)) break;
            if(isOccupied(move,color)) {
            possibleMoves.push(move);
            break;
            }
            move = {x:(scale*slopes[i].x)+rank, y:(slopes[i].y*scale)+file};
            
        }
    }
    
    return possibleMoves;

}

//Bishops moves
function getBishopMoves(rank,file,color) {
    let enemyColor = color == 'w' ? 'b' : 'w';
    let slopes = [
        {x:1,y:1},
        {x:-1,y:1},
        {x:1,y:-1},
        {x:-1,y:-1}
    ]
    let possibleMoves = [];
    for(let i = 0; i < slopes.length; i++) {
        let scale = 1;
        let move = {x:slopes[i].x+rank, y:slopes[i].y+file};
        console.log(move);
        while(isOnBoard(move)) {
            scale+=1;
            if(isOccupied(move,enemyColor)) break;
            if(isOccupied(move,color)) {
            possibleMoves.push(move);
            break;
            }
            move = {x:(scale*slopes[i].x)+rank, y:(slopes[i].y*scale)+file};
            
        }
    }
    
    return possibleMoves;

}

//Kings Moves
function getKingMoves(rank,file,color){
    let possibleMoves = [];
    for(let i = rank-1; i < rank+2; i++){
        for(let j = file-1; j<file+2; j++){
            if(j!=file||i!=rank){
                let move = {x:i, y:j};
                if(isOnBoard(move)) {
                if(isOccupied(move,color))possibleMoves.push(move);
                }
            }
        }
    }
    return possibleMoves;
}

//Pawns moves
function getPawnMoves(rank,file,color) {
    let possibleMoves = [];
    let dir = 1;
    if(color=="w") dir=-1;
    possibleMoves.push({x:rank,y:file+1*dir});
    possibleMoves.push({x:rank,y:file+2*dir});
    return possibleMoves;
}

//Queens Moves

//Takes a string like ne4 and converts it to a move
function getMoveFromString(s) {
    let rank,file;
    let move;
    if(s.length==2) {
        file=parseInt(s.charAt(1))-1;
        rank = 7-(s.charCodeAt(0)-97); //converts from a to 0, e to 4, etc...
        move = {x:rank,y:file,piece:"p"};
    }
    else if(s.length==3){
        file=parseInt(s.charAt(2))-1;
        rank = 7-(s.charCodeAt(1)-97); //converts from a to 0, e to 4, etc...
        piece = s.charAt(0);
        move = {x:rank,y:file,piece:piece};
    }


    return move;
} 

//Make a move given a coordinate and a piece symbol
function makeMove(move) {
    if(move.piece=="n") {
     possibleSquares = getKnightMoves(move.x,move.y,currentColor);
     console.log(possibleSquares);
    }
    else if(move.piece=="b") {
        possibleSquares = getBishopMoves(move.x,move.y,currentColor);
        console.log("Possible Squares:");
        console.log(possibleSquares);
    }
    else if(move.piece=="k") {
        possibleSquares = getKingMoves(move.x,move.y,currentColor);
        console.log("Possible Squares");
        console.log(possibleSquares);
    }
    else if(move.piece=="r") {
        possibleSquares = getRookMoves(move.x,move.y,currentColor);
        console.log(possibleSquares);
    }
    else if(move.piece=="p") {
        possibleSquares = getPawnMoves(move.x,move.y,currentColor);
        console.log(possibleSquares);
    }
    else if(move.piece=="q") {
        possibleSquares = getRookMoves(move.x,move.y,currentColor);
        possibleSquares = possibleSquares.concat(getBishopMoves(move.x,move.y,currentColor));
        console.log(possibleSquares);
    }
console.log("length" + possibleSquares.length);
    for(let i = 0; i < possibleSquares.length; i++){
        if(board[possibleSquares[i].y][possibleSquares[i].x].charAt(1)==move.piece) {
            console.log(possibleSquares[i]);
            board[possibleSquares[i].y][possibleSquares[i].x]="";
            board[move.y][move.x]=currentColor+move.piece;
            currentColor = currentColor == "w" ? "b" : "w";
            console.log(board);
            drawBoard();
        }
    }


    
}



//Click event listener
window.addEventListener("click", (e)=>{
    console.log(e.clientX);
});