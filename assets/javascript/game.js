//Connect Firebase
  var config = {
    apiKey: "AIzaSyCzMTmCouyGEJed9SC1SRTELqOhazetRx4",
    authDomain: "firstdatabase-eca5b.firebaseapp.com",
    databaseURL: "https://firstdatabase-eca5b.firebaseio.com",
    storageBucket: "firstdatabase-eca5b.appspot.com",
    messagingSenderId: "480856959305"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

//Useful variables

  var waitingForPlayer = "Waiting for Player";
  var playerOneWinCount = 0;
  var playerOneLossCount = 0;
  var playerTwoWinCount = 0;
  var playerTwoLossCount = 0;
  var newPlayerName = "";
  var newPlayerWins = 0;
  var newPlayerLosses = 0;
  var playerOneTaken = false;
  var playerTwoTaken = false;

  var playerOneName = null;
  var playerTwoName = null;

  var playerChoices = ["Rock", "Paper", "Scissors"];
    var playerOneChoice = "none";
    var playerTwoChoice = "none";

//Onload Page (hide options and wait for user name) and look for connected playerlist
$(document).ready(function(){
     $(".greetings").hide();
     $(".yourturn").hide();
     $(".waitingmessage").hide();
});


var connectedUsers = database.ref("/playerlist");
var isConnected = database.ref(".info/connected");

//Add user to playerlist list
isConnected.on("value", function(snap) {

	if(snap.val()) {
		var playerOneConnect = connectedUsers.child("/1");
		playerOneConnect.onDisconnect().remove();
       
	}

    if (snap.val()){
        var playerTwoConnect = connectedUsers.child("/2");
        
        // playerTwoConnect.set({
        //         Name: newPlayerName,
        //         wins: newPlayerWins,
        //         losses: newPlayerLosses
        // });
		playerTwoConnect.onDisconnect().remove();
    }
    
});


//on load or connection change, check to see if playerlist are already there
connectedUsers.on("value", function(snap) {
   

    // if (snap.child("/1").exists() && snap.child("/2").exists()){
    //     //Initial Game state

    // }

    // // if (snap.child("/1").exists() && snap.child("/2").exists()) {
    // if (snap.numchildren() === 2) {
    //     console.log("works");
    //     $("#playeronename").html(snap.child("/1").val().Name);
    //     $("#playeronewincount").html(snap.child("/1").val().playerOneWinCount);
    //     $("#playeronelosscount").html(snap.child("/1").val().playerOneLossCount);
    //     $(".playeronechoicesrow").hide();
    // }
       
    // if (snap.numChildren() === 2) {
        
    // }
    
    // if (snap.numChildren() > 2) {
        
    // }
});

//Add Name
$(document).on("click", "#adduser", function(){
    // If no player 1 exists then
        if (playerOneName === null && playerTwoName === null){
        //First player connects
            //Store player 1 name
            playerOneName = $("#playernameinput").val().trim();
            
            playerOneWinCount = newPlayerWins;
            playerOneLossCount = newPlayerLosses;

            //Take name and put it into HTML
            $("#playername").html(playerOneName);
            $("#playeronename").html(playerOneName);
            $("#playertwoname").html(waitingForPlayer);
            $(".greetings").show();

            //Assign player the number 1
            $("#playernumber").html(" 1");

            $("#playernameinput").val("");
            $(".namesubmission").hide();

            //Add player to database
            database.ref("/playerlist/1").push({
                Name: playerOneName,
                wins: playerOneWinCount,
                losses: playerOneLossCount
            });

            $(".yourturn").show();
            console.log(playerOneName);
        }
    // //If player one exists then
        if (playerOneName != null && playerTwoName === null) {
        //Player two connects
            playerTwoName = $("#playernameinput").val().trim();
            
            playerTwoWinCount = newPlayerWins;
            playerTwoLossCount = newPlayerLosses;

            //Take name and put it into HTML
            $("#playername").html(playerTwoName);
            $("#playerTwoname").html(playerTwoName);
            

            //Assign player the number 1
            $("#playernumber").html(" 2");

            $("#playernameinput").val("");
            $(".namesubmission").hide();

            //Add player to database
            database.ref("/playerlist/2").set({
                Name: playerTwoName,
                wins: playerTwoWinCount,
                losses: playerTwoLossCount
            });

        }
    //If 2 exist then allow viewer to watch but not player

    return false;
});

// database.ref("/playerlist/1/Choice").on("value", function(snap){
    
//     $(".waitingmessage").show();
    

// }); 


//First player selected wait for Player 2


//Both playerlist in game, now load the game options and win loss and wait for player 2 to choose
$(document).on("click", "#playeronerock", function(){
    $(".playeronechoicesrow").hide();
    playerOneChoice = playerChoices[0];
    database.ref("/playerlist/1").set({
                Choice: playerOneChoice
            });
    //Wait for player 2 choice
});

$(document).on("click", "#playeronepaper", function(){
    $(".playeronechoicesrow").hide();
    playerOneChoice = playerChoices[1];
    database.ref("/playerlist/1").set({
                Choice: playerOneChoice
            });
    //Wait for player 2 choice
});


$(document).on("click", "#playeronescissors", function(){
    $(".playeronechoicesrow").hide();
    playerOneChoice = playerChoices[2];
    database.ref("/playerlist/1").set({
                Choice: playerOneChoice
            });
    //Wait for player 2 choice
});


//Player 2 then chooses
$(document).on("click", "#playertworock", function(){
    $(".playertwochoicesrow").hide();
    playertwoChoice = playerChoices[0];
    database.ref("/playerlist/2").set({
                Choice: playerTwoChoice
            });
    runGame();
});

$(document).on("click", "#playertwopaper", function(){
    $(".playertwochoicesrow").hide();
    playertwoChoice = playerChoices[1];
    database.ref("/playerlist/2").set({
                Choice: playerTwoChoice
            });
    runGame();
});

$(document).on("click", "#playertwoscissors", function(){
    $(".playertwochoicesrow").hide();
    playertwoChoice = playerChoices[2];
    database.ref("/playerlist/2").set({
                Choice: playerTwoChoice
            });
    runGame();
});

//Evaluate the decisions

//Continue game
function nextRound() {
    
}

//Game stops when two playerlist are not connected, look for connection, if not then stop game (player1,player2,no playerlist)


//Chatbox

//Game Logic


function runGame(){    
    
    if (playerOneChoice === "Rock" && playerTwoChoice === "Rock") {
        tieGame();
    }

    else if (playerOneChoice === "Rock" && playerTwoChoice === "Paper") {
        playerOneLoss();
        playerTwoWin();
    }

    else if (playerOneChoice === "Rock" && playerTwoChoice === "Scissors") {
        playerOneWin();
        playerTwoLoss();
    }

    else if (playerOneChoice === "Paper" && playerTwoChoice === "Rock") {
        playerOneWin();
        playerTwoLoss();
    }

    else if (playerOneChoice === "Paper" && playerTwoChoice === "Paper") {
        tieGame();
        
    }

    else if (playerOneChoice === "Paper" && playerTwoChoice === "Scissors") {
        playerOneLoss();
        playerTwoWin();
    }

     else if (playerOneChoice === "Scissors" && playerTwoChoice === "Rock") {
        playerOneLoss();
        playerTwoWin();
    }

    else if (playerOneChoice === "Scissors" && playerTwoChoice === "Paper") {
        playerOneWin();
        playerTwoLoss();
    }

    else if (playerOneChoice === "Scissors" && playerTwoChoice === "Scissors") {
        tieGame();
    }
}

function tieGame() {
    nextRound();
}

function playerOneWin() {
    playerOneWinCount++;
    database.ref("/playerlist/1").set({
                wins: playerOneWinCount,
            });
    
}

function playerOneLoss() {
    playerOneLossCount++;
    database.ref("/playerlist/1").set({
                losses: playerOneLossCount,
            });
    
}

function playerTwoWin() {
    playerTwoWinCount++;
    database.ref("/playerlist/2").set({
                wins: playerTwoWinCount,
            });
    nextRound();
}

function playerTwoLoss() {
    playerTwoLossCount++;
    database.ref("/playerlist/2").set({
                losses: playerTwoLossCount,
            });
    nextRound();
}

