/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores;
var roundScore;
var activePlayer;
var gamePlaying;
var diceDOM = document.querySelector('#dice-1');
var diceDOM2 = document.querySelector('#dice-2');

init();

var previousDice;

document.querySelector('.btn-roll').addEventListener("click", function(){
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var dice2 = Math.floor(Math.random() * 6) + 1;
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

       

        if(dice || dice2 === 1){
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        if(previousDice === 6 && dice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }

        if(dice !== 1 && dice2 !== 1){
            //Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
           
            nextPlayer();
        }

       previousDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener("click", function(){
    if(roundScore >= 1){
        if(gamePlaying){

            //Add current score to global score
            scores[activePlayer] += roundScore;

            //Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            document.querySelector('#current-' + activePlayer).textContent = 0;

            var finalScore = document.querySelector('.final-score').value;
            var winningScore;

            //Undefined, 0, null or "" are FALSE
            if(finalScore){
                winningScore = finalScore;
            }else {
                winningScore = 50;
            }

            if(scores[activePlayer] >= winningScore){
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
                diceDOM.style.display = 'none';
        
                gamePlaying = false;
            }else {
        
                nextPlayer();
            }
        }
    }else {

        alert("You can't hold 0 points!");
    }
})

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');  
}