let turn,grid,possible_moves;          // Variables

// Initialize the variables and set initial values
let init = () => {
    turn = Math.floor((Math.random() *10)%9)%2===0 ? 1:0 ;
    grid = [  [-1,-1,-1],
              [-1,-1,-1],
              [-1,-1,-1]  ];
    possible_moves = ['00','01','02','10','11','12','20','21','22'];
    let img = document.getElementsByTagName('img');
    for(let i=0;i<img.length;i++){
        img[i].setAttribute('src','../images/white.jpg');
        img[i].setAttribute('onclick','clicked(this.id)');
    }
    document.getElementById('auto').setAttribute('onclick','auto()');
    document.getElementById('result').textContent = turn ? 'Player 1\'s Turn' : 'Player 2\'s Turn' ;
}

init();         // Run the init function

// Check if a row has same character
let checkRows = () => {
    let temp = [turn,turn,turn];
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

let auto = () => {
    let move = Math.floor(Math.random() * ((possible_moves.length-1) - 0 + 1)) + 0;
    clicked(possible_moves[move]);
}

// Call to action for every click on the grid
let clicked = _id => {
    // check if the move is valid
    if(grid[_id[0]][_id[1]] === -1)
    {
        //if 'Yes' Then execute the move
        grid[_id[0]][_id[1]] = turn;
        let i = '../images/' + turn.toString() + '.jpg';
        document.getElementById(_id).setAttribute('src',i);
        possible_moves.splice(possible_moves.indexOf(_id),1);
    }
    else {
        // else tell the user that the move is invalid
         alert('This cell cannot be selected');
    }
    // check if the player won
    if(checkRows() || checkColumns() || checkDiagonal() ) {
        // if 'yes' then display the winner and stop the game
        let temp = turn + 1;
        document.getElementById('result').textContent = 'Player ' + temp.toString() + ' Wins';
        halt();
    }
    // check if the grid is full and no more moves are possibles
    else if(isGridFull()){
        // If yes then show that the game is draw and stop the game
        document.getElementById('result').textContent = 'Draw';
        halt()
    }
    // Switch/Toggle the player after every turn
    else {

        turn = (turn===0 ? 1:0);
        document.getElementById('result').textContent = turn ? 'Player 1\'s Turn' : 'Player 2\'s Turn' ;
    }
}
