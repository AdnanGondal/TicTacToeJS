
//    Players: 

const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = ()=> marker;

    const makeMove = (marker)=>{
    
    return{getName,getMarker,makeMove}
    };
};


//   Control the Game Flow:

const gameBoard = (()=>{
    
    let _gomeBoard = [[0 ,0 ,0],
                    [0, 0 ,0],
                    [0,0,0]
                    //Make 0 for empty, X for player 1 and O for player 2
                ];

    let getBoard = ()=> _gomeBoard;
    
    let updateBoard = (x,y,z)=>{

    };
    

    return{
        getBoard: getBoard, updateBoard: updateBoard,
    };
})();


// DOM Update:
 const displayController = (()=> {
    
 })();