
//    Players Factory:
const Player = (name,marker,turn) => {
    
    const getName = () => name;
    //const setName = (name)=> this.name = name;
    
    const getMarker = ()=> marker;
    const getTurn = ()=>turn;

    const toggleTurn = ()=>{
        if (turn) turn=false;
        else if (!turn) turn = true;
    }

    
    return{getName,getMarker,toggleTurn,getTurn}
};


//   Control the Game Flow: Most of the logic will be applied here: 

const gameBoard = (()=>{
    
    let _gameBoard = [[0 ,0 ,0],
                     [0, 0 ,0],
                     [0,0,0]
                    //Make 0 for empty, X for player 1 and O for player 2
                    // Access: [row][col]
                    ];
                    
    let _Player1;
    let _Player2;
    let _isSet = false;
    let _isFinished = false;
    let _result;
    let _playWithAi = false;
    let _aiFirstMove = true;
    

    const resetGame = ()=>{
        _isSet = false;
        _isFinished = false;
        //_playWithAi = false;
        let _aiFirstMove = true;
        _gameBoard = [[0 ,0 ,0],
                     [0, 0 ,0],
                     [0,0,0]
                    ];
    }

    const setPlayers = (name1,name2)=>{
        _Player1 = Player(name1,'X',true);
        if (!_playWithAi) _Player2 = Player(name2,'O',false);
        else _Player2 = Player("Computer",'O',false);
        _isSet = true;
    }

    const isSet= () => _isSet;
    const isFinished = () => _isFinished;
    const getResult = () => _result;

    const returnPlayer = ()=>{
        if (_Player2.getTurn()) return _Player2;
        return _Player1;
    }
    
    const changeTurns = ()=>{
        _Player1.toggleTurn();
        _Player2.toggleTurn();
    }

    const toggleGameFinished = ()=>{
        _isFinished = !_isFinished;
    }

    const getBoard = ()=> _gameBoard;
    
    const updateBoard = (index,mark)=>{
        if (index==0) _gameBoard[0][0] = mark;
        if (index==1) _gameBoard[0][1] = mark;  
        if (index==2) _gameBoard[0][2] = mark;
        if (index==3) _gameBoard[1][0] = mark;
        if (index==4) _gameBoard[1][1] = mark;  
        if (index==5) _gameBoard[1][2] = mark;
        if (index==6) _gameBoard[2][0] = mark;
        if (index==7) _gameBoard[2][1] = mark;  
        if (index==8) _gameBoard[2][2] = mark;
    };

    const checkForEnd = (mark,board)=>{
        

        for (let i=0;i<3;i++){
            if (mark== board[i][0] && board[i][0] == board[i][1] && board[i][2]== board[i][1]){
                //_isFinished = true;
                return true;
            } else if(mark == board[0][i] && board[0][i] == board[1][i] && board[2][i]== board[1][i]){
                //_isFinished = true;
                return true;
            }
        }
        if (mark == board[0][0] && board[0][0]== board[1][1] && board[2][2] == board[1][1]) {
            //_isFinished = true;
            return true;
        } else if (mark == board[0][2] && board[0][2]==board[1][1] && board[2][0] == board[1][1]){
            //_isFinished = true;
            return true;
        }

        let fillCount = 0;
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                if (board[i][j] != 0){
                fillCount++;
                }
            }
        }
        
        //if (mark=="X") _result = "p1win";
        //if (mark=="O") _result = "p2win";

        if (fillCount == 9) {
            //_isFinished = true;
            _result = "draw";
            return "draw";
        }

        return false;

    }

    const toggleAIPlay = ()=>{
        _playWithAi= !_playWithAi;
    }

    const getAIStatus = ()=>{
        return _playWithAi;
    }

    const getAvaliableMoves = (board)=>{
        let avaliableMoves = [];
        
        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                if (board[i][j] == 0){
                    avaliableMoves.push([i,j])
                }
            }
        }

        return avaliableMoves;
    }

    const boardCreator = (board)=>{
        let newBoard = [[0 ,0 ,0],
                    [0, 0 ,0],
                    [0,0,0]
                ];

        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                if (board[i][j] != newBoard[i][j])  newBoard[i][j]=board[i][j];
            }
        }

        return newBoard;
    }
    const aiPlay = ()=>{
        

        let avaliableMoves = getAvaliableMoves(getBoard());
        let bestMove;
        /*
        if (_aiFirstMove){
            bestMove = avaliableMoves[Math.floor(Math.random() * avaliableMoves.length)];
            _aiFirstMove = false;
        } 
        else {
            */
            let bestScore = -100000;
            let newBoard = boardCreator(getBoard());

            avaliableMoves.forEach(move=>{
                let x = move[0];
                let y = move[1];
                newBoard[x][y] = "O";
                score = minimax(newBoard,0,"X");
                console.log(`x: ${x} y: ${y} score: ${score}`);
                //_gameBoard[x][y] = 0;
                if (score>=bestScore){
                    bestScore = score;
                    bestMove = move;
                    //console.log(bestMove);
                }
                newBoard[x][y] = 0;
            });
        //}
        
        

        let x=  bestMove[0];
        let y= bestMove[1];
        console.log(x + ' ' +y)

        _gameBoard[x][y] = "O";

        if (x==0 && y==0) return 0;
        if (x==0 && y==1) return 1;
        if (x==0 && y==2) return 2;
        if (x==1 && y==0) return 3;
        if (x==1 && y==1) return 4;
        if (x==1 && y==2) return 5;
        if (x==2 && y==0) return 6;
        if (x==2 && y==1) return 7;
        if (x==2 && y==2) return 8;
        
    }


    const minimax = (board,depth,player)=>{

        if (checkForEnd(player,board)=="draw") return 0;
        else if (checkForEnd("O",board)) {return (10-depth);}
        else if(checkForEnd("X",board)) return (-10+depth);
        
        depth++;
        let avaliableMoves = getAvaliableMoves(board);
        //console.log(avaliableMoves);
        //console.log(scores);

        if (player=="O"){
            let bestVal = -1000;
            avaliableMoves.forEach((move)=>{
                let x=move[0];
                let y=move[1];
                
                board[x][y] = "O";
                //console.log(board);
                let value = (minimax(board,depth,"X"));
                if (value>=bestVal){
                    bestVal = value;
                }
                board[x][y] = 0;
    
            });
            //console.log(scores);
            /*return scores.reduce(function(a, b) {
                return Math.max(a, b);
            })*/
           
            return bestVal;
        }
        else {
            
            let bestVal = 1000;
            avaliableMoves.forEach((move)=>{
                let x=move[0];
                let y=move[1];
                
                board[x][y] = "X";
                value = (minimax(board,depth,"O"));
                if (value<=bestVal){
                    bestVal = value;
                }
                board[x][y] = 0;
            });
            /*
            return scores.reduce(function(a, b) {
                return Math.min(a, b);
            })
            */
          
           return bestVal;
        }


    }

    return{
        getBoard, updateBoard, setPlayers,returnPlayer,changeTurns, isSet, checkForEnd,isFinished,getResult,
        toggleAIPlay,getAIStatus,resetGame,aiPlay,minimax,toggleGameFinished,
    };
})();


// DOM Update:
 const displayController = (()=> {
    

    let player1Name = document.querySelector("#player1-name");
    let player2Name = document.querySelector("#player2-name");
    let submitBut = document.querySelector('#name-submit-but')
    let userMessage = document.querySelector('#game-message')
    let _entries = document.querySelectorAll(".game-entry");
    let aiToggle = document.querySelector("#ai-toggle");
    let player2Div = document.querySelector("#player-2-field");
    let restartBut = document.querySelector("#restart-but");

    const displayResult = ()=>{
        gameBoard.toggleGameFinished();
        if (gameBoard.checkForEnd("O",gameBoard.getBoard())=="draw"){
            userMessage.textContent = "It is a Tie!";
        } else {
            //if (!gameBoard.getAIStatus()) gameBoard.changeTurns();
            userMessage.textContent = `${gameBoard.returnPlayer().getName()} is the winner!`;

        }
    }

    const resetAll = ()=>{
        gameBoard.resetGame();
        player1Name.value = "";
        player2Name.value = "";
        _entries.forEach(entry=>{
            entry.textContent = " ";
        })
        userMessage.textContent="";
        submitBut.disabled=false;

    }

    let render = ()=>{

        submitBut.addEventListener('click',()=>{
            if (!gameBoard.isSet()){
            gameBoard.setPlayers(player1Name.value,player2Name.value);
            userMessage.classList.remove("warning");
            userMessage.classList.add('message');
            userMessage.textContent = (`Welcome to the game! ${gameBoard.returnPlayer().getName()} will go first. `)
            submitBut.disabled = true;
            }
        });
        
        //Update the board on click:
        _entries.forEach((entry,i)=>{
            entry.addEventListener('click',()=>{
                
                if (gameBoard.isSet() && !gameBoard.isFinished()){
                    let _player = gameBoard.returnPlayer();
                    if (entry.textContent == " " ) {
                        entry.textContent = _player.getMarker();
                        gameBoard.updateBoard(i,entry.textContent)
                        if (gameBoard.checkForEnd(entry.textContent,gameBoard.getBoard())) {
                            displayResult();
                            return;
                        } 
                        gameBoard.changeTurns();

                        if (gameBoard.getAIStatus()) {
                            console.log("HERE goes the code to make the AI Play")
                            let pos = gameBoard.aiPlay();
                            _entries[pos].textContent = "O";
                            
                            //gameBoard.checkForEnd("O",gameBoard.getBoard());
                            if (gameBoard.checkForEnd("O",gameBoard.getBoard())) {
                                displayResult();
                                return;
                            } 
                            gameBoard.changeTurns();
                        }
                        
                        

                        userMessage.classList.remove("warning");
                        userMessage.classList.add('message');
                        userMessage.textContent = `It is now ${gameBoard.returnPlayer().getName()}'s turn.`
                    }
            
                } else if (!gameBoard.isSet()){
                    userMessage.classList.add("warning");
                    userMessage.textContent = ("Please sumbit player names!")
                } 
            });

        });

        aiToggle.addEventListener('click',()=>{
            //console.log(aiToggle.checked);
            resetAll();
            if (player2Div.style.display === "none") {
                player2Div.style.display = "block";
              } else {
                player2Div.style.display = "none";
              }
            gameBoard.toggleAIPlay();
            console.log(gameBoard.getAIStatus());
            
            if (gameBoard.getAIStatus()==true){
                userMessage.classList.remove("warning");
                userMessage.classList.add('message');
                userMessage.textContent = ("Enter your name to play against the AI!")
            } else if(gameBoard.getAIStatus()==false) {
                userMessage.classList.remove("message");
                userMessage.textContent = "";
            }
            
        });

        restartBut.addEventListener('click',()=>{
            location.reload();
        });
    }

    return {
        render
    }


 })();


displayController.render();
