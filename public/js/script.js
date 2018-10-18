let turn,grid,possible_moves,timeOut;          // Variables

// Initialize the variables and set initial values

all_moves = [];

let init = () => {
    if(timeOut)
        clearTimeout(timeOut);
    turn = 0 ;
    grid = [  [-1,-1,-1],
              [-1,-1,-1],
              [-1,-1,-1]  ];
    possible_moves = ['00','01','02','10','11','12','20','21','22'];
    let img = document.getElementsByTagName('img');
    for(let i=0;i<img.length;i++){
        img[i].setAttribute('src','../images/white.jpg');
        img[i].setAttribute('onclick','clicked(this.id)');
    }
    document.getElementById('countdown').textContent = 10;
    document.getElementById('auto').setAttribute('onclick','auto()');
    document.getElementById('result').textContent = `Player ${turn+1}'s turn` ;
    all_moves = []
}

init();         // Run the init function

// Check if a row has same character
let checkRows = () => {
    let temp = [turn,turn,turn]
    for(let i=0;i<3;i++) {
        if(JSON.stringify(grid[i]) == JSON.stringify(temp))
            return true;
    }
    return false;
}

// Check if a Column has same character

let checkColumns = () => {
    let temp = [turn,turn,turn];
    for(let i=0;i<3;i++){
        let temp2 = [grid[0][i],grid[1][i],grid[2][i]];
        if(JSON.stringify(temp) == JSON.stringify(temp2))
            return true;
    }
    return false;
}

// Check if a Diagonal has same character
let checkDiagonal = () => {
    let temp = [turn,turn,turn];
    let d1 = [grid[0][0],grid[1][1],grid[2][2]];
    let d2 = [grid[2][0],grid[1][1],grid[0][2]];
    if(JSON.stringify(temp) == JSON.stringify(d1))
        return true;
    else if(JSON.stringify(temp) == JSON.stringify(d2))
        return true;
    
    return false;

}

// Check if a grid has any space to make a move or not
let isGridFull = () => {
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(grid[i][j] === -1)
                return false
        }
    }
    return true;
}

// Stops the game
let halt = () => {
    let img = document.getElementsByTagName('img');
    for(let i=0;i<img.length;i++){
        img[i].onclick = null;
    }
    document.getElementById('auto').onclick = null;
    console.log('Halted');
}

// Timer Implementation
let countdown = () => {
    seconds = document.getElementById('countdown').innerHTML;
    seconds = parseInt(seconds, 10);

    if (seconds == 1) {
        temp = document.getElementById('countdown');
        auto();
        return;
    }

    seconds--;
    temp = document.getElementById('countdown');
    temp.innerHTML = seconds;
    timeOut = setTimeout(countdown, 1000);
}

countdown();


let auto = () => {
    let move = Math.floor(Math.random() * ((possible_moves.length-1) - 0 + 1)) + 0;
    clicked(possible_moves[move]);
}

console.log(grid);

let send = (move)=>{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `/${JSON.stringify(move)}`, true); // true for asynchronous 
    xmlHttp.send();
}

// Call to action for every click on the grid
let clicked = _id => {
    let prev_grid = grid;
    let isValid = true;

    clearTimeout(timeOut);
    // check if the move is valid
    if(grid[_id[0]][_id[1]] === -1)
    {
        //if 'Yes' Then execute the move
        isValid = true;
        grid[_id[0]][_id[1]] = turn;
        let i = '../images/' + turn.toString() + '.jpg';
        document.getElementById(_id).setAttribute('src',i);
        possible_moves.splice(possible_moves.indexOf(_id),1);
        send({
            current_state: prev_grid,
            next_move: _id
        });
    }
    else {
        isValid = false;
        // else tell the user that the move is invalid
         alert('This cell cannot be selected');
    }
    // check if the player won
    if(checkRows() || checkColumns() || checkDiagonal() ) {
        // if 'yes' then display the winner and stop the game
        console.log(turn);
        document.getElementById('result').textContent = `Player ${turn+1} wins`;
        halt();
    }
    // check if the grid is full and no more moves are possibles
    else if(isGridFull()){
        // If yes then show that the game is draw and stop the game
        document.getElementById('result').textContent = 'Draw';
        halt()
    }
    // Switch/Toggle the player after every turn
    else if(isValid) {
        turn = (turn===0 ? 1:0);
        document.getElementById('result').textContent = `Player ${turn+1}'s Turn` ;
        document.getElementById('countdown').innerHTML = 10;
        countdown();
    }
    else{
        countdown();
    }
}