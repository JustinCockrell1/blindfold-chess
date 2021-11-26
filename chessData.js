let chessData = [
{
    term:"",
    response:"ne4"
}
];

ranks = ['1','2','3','4','5','6','7','8'];
files = ['a','b','c','d','e','f','g','h'];
squares = [];
for(let i = 0; i < ranks.length; i++) 
    for(let j = 0; j < files.length; j++) 
        squares.push(files[j]+ranks[i]);

allPieces = [
    "knight","night","might",
    "bishop",
    "rook","look","route","Brooke",
    "pawn",
    "king",
    "queen"
    ,"pawn"
]

pieces = [
    {
        name:["knight","night","might"],
        symbol:"n"
    },
    {
        name:["bishop"],
        symbol:"b"
    },
    {
        name:["rook","look","route","brooke"],
        symbol:"r"
    },
    {
        name:["queen"],
        symbol:"q"
    },
    {
        name:["king"],
        symbol:"k"
    },
    {
        name:["pawn","pain"],
        symbol:"p"
    }
]