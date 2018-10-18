const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/:move',(req,res)=>{
    let move = JSON.parse(req.params.move);
    fs.appendFileSync('moves_list.txt',JSON.stringify(move.current_state) + '\n' );
    fs.appendFileSync('moves_list.txt',JSON.stringify(move.next_move) + '\n' );
    
    //console.log(moves[0].current_state);
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('App listening to port 3000');
});