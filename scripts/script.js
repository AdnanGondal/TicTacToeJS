
//    Players: 
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
    
    const resetGame = ()=>{
        _isSet = false;
        _isFinished = false;
        //_playWithAi = false;
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

    const checkForEnd = (mark)=>{
        let fillCount = 0;

        for (let i=0;i<3;i++){
            if (mark== _gameBoard[i][0] && _gameBoard[i][0] == _gameBoard[i][1] && _gameBoard[i][2]== _gameBoard[i][1]){
                _isFinished = true;
            } else if(mark == _gameBoard[0][i] && _gameBoard[0][i] == _gameBoard[1][i] && _gameBoard[2][i]== _gameBoard[1][i]){
                _isFinished = true;
            }
        }
        if (mark == _gameBoard[0][0] && _gameBoard[0][0]==_gameBoard[1][1] && _gameBoard[2][2] == _gameBoard[1][1]) {
            _isFinished = true;
        } else if (mark == _gameBoard[0][2] && _gameBoard[0][2]==_gameBoard[1][1] && _gameBoard[2][0] == _gameBoard[1][1]){
            _isFinished = true;
        }

        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                if (_gameBoard[i][j] != 0){
                fillCount++;
                }
            }
        }
        
        if (mark=="X") _result = "p1win";
        if (mark=="O") _result = "p2win";

        if (fillCount == 9) {
            _isFinished = true;
            _result = "draw";
        }

    }

    const toggleAIPlay = ()=>{
        _playWithAi= !_playWithAi;
    }

    const getAIStatus = ()=>{
        return _playWithAi;
    }

    const aiPlay = ()=>{
        
    }

    return{
        getBoard, updateBoard, setPlayers,returnPlayer,changeTurns, isSet, checkForEnd,isFinished,getResult,toggleAIPlay,getAIStatus,resetGame
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
        if (gameBoard.getResult() == "draw") {
            userMessage.textContent = "It is a Tie!";
        } else {
            gameBoard.changeTurns();
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
                        gameBoard.changeTurns();
                        if (gameBoard.getAIStatus()) {
                            console.log("HERE goes the code to make the AI Play")
                            
                        
                        }
                        gameBoard.checkForEnd(entry.textContent);
                        if (gameBoard.isFinished()) {
                            displayResult();
                            return;
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
