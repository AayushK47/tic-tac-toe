let turn,grid;          // Variables

// Initialize the variables and set initial values
let init = () => {
    turn = 1;
    grid = [  [-1,-1,-1],
              [-1,-1,-1],
              [-1,-1,-1]  ];
    let img = document.getElementsByTagName('img');
    for(let i=0;i<img.length;i++){
        img[i].setAttribute('src','../images/white.jpg');
        img[i].setAttribute('onclick','clicked(this.id)');
    }
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
    console.log('Halted');
}

// Call to action for every click on the grid
let clicked = _id => {
    let flag = false;
    if(grid[_id[0]][_id[1]] === -1)
    {
        grid[_id[0]][_id[1]] = turn;
        let i = '../images/' + turn.toString() + '.jpg';
        document.getElementById(_id).setAttribute('src',i);
        flag = !flag;
    }
    else {
         alert('This cell cannot be selected');
    }
    
    if(checkRows() || checkColumns() || checkDiagonal() ) {
        let temp = turn + 1;
        document.getElementById('result').textContent = 'Player ' + temp.toString() + ' Wins';
        halt();
    }

    if(isGridFull()){
        document.getElementById('result').textContent = 'Draw';
        halt()
    }

    if(flag)    
        turn = (turn===0 ? 1:0);
}