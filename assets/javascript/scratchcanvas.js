var config = {
    apiKey: "AIzaSyCzMTmCouyGEJed9SC1SRTELqOhazetRx4",
    authDomain: "firstdatabase-eca5b.firebaseapp.com",
    databaseURL: "https://firstdatabase-eca5b.firebaseio.com",
    storageBucket: "firstdatabase-eca5b.appspot.com",
    messagingSenderId: "480856959305"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var playerConnection = database.ref("/playerConnection");
  var isConnected = database.ref(".info/connected");
  var playerList = database.ref("/players");
  var playerListOne = database.ref("/players/1");
  var playerListTwo = database.ref("/players/2");
  var playerListOneName = database.ref("/players/1/Name");
  var playerListTwoName = database.ref("/players/2/Name");
  var playerListOneWins = database.ref("/players/1/Wins");
  var playerListTwoWins = database.ref("/players/2/Wins");
  var playerListOneLosses = database.ref("/players/1/Losses");
  var playerListTwoLosses = database.ref("/players/2/Losses");
  var playerListOneChoice = database.ref("/players/1/Choice");
  var playerListTwoChoice = database.ref("/players/2/Choice");
  

var playerOneWinCount = 0;
var playerOneLossCount = 0;
var playerTwoWinCount = 0;
var playerTwoLossCount = 0;
var playerOneName = null;
var playerTwoName = null;

var playerOneTurn = false;
var playerTwoTurn = false;
var playerOneTurnPlayerTwoView = false;
var playerTwoTurnPlayerOneView = false;

var playerChoices = ["Rock", "Paper", "Scissors"];
var playerOneChoice = null;
var playerTwoChoice = null;

$(document).ready(function(){
     $(".greetings").hide();
     $(".yourturn").hide();
     $(".waitingmessage").hide();
     $(".toomanyplayers").hide();
     $(".playeronescore").hide();
     $(".playertwoscore").hide();
     $(".playeronechoicesrow").hide();
     $(".playertwochoicesrow").hide();
});

isConnected.on("value", function(snap) {

	if(snap.val()) {
		var playerConnect = playerConnection.push(true);
		playerConnect.onDisconnect().remove();
        
	}

    
});



playerList.on("value", function(snap) {

       
        if (snap.numChildren() === 2 && playerOneTurn === true){
        $(".playeronechoicesrow").show();
        playerTwoTurn = true;
    }
});

database.ref().once("value", function(snap) {

      if (snap.child("players/2").exists() === false && snap.child("players/1").exists() === false && snap.child("playerConnection").numChildren() === 1){
        database.ref("/players/1").set({
                Name: null,
                Wins: null,
                Losses: null
            });
            playerOneName = null;
            database.ref("/players/1").onDisconnect().remove();
            return;
        }

        if (snap.child("players/2").exists() === false && snap.child("players/1").exists() === false && snap.child("playerConnection").numChildren() === 2){
        database.ref("/players/2").set({
                Name: null,
                Wins: null,
                Losses: null
            });
            playerOneName = null;
            database.ref("/players/2").onDisconnect().remove();
            return;
        }

        
        if (snap.child("players/2").exists() === false && snap.child("players/1").exists() === true){
        database.ref("/players/2").set({
                Name: null,
                Wins: null,
                Losses: null
            });
            playerOneName = "Placeholder";
            playerTwoName = null;
            database.ref("/players/2").onDisconnect().remove();
            return;
        }
    
    if (snap.child("players/2").exists() === true && snap.child("players/1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: null,
                Losses: null
            });
            playerOneName = null;
            playerTwoName = "Placeholder";
            database.ref("/players/1").onDisconnect().remove();
            return;
        }


        if (snap.child("players/2").exists() === true && snap.child("players/1").exists() === true){
            $(".toomanyplayers").show();
            $(".namesubmission").hide();
            return;
        }

});

playerListOneName.on("value", function(snap) {
        if (snap.exists()){
            playerOneName = snap.val();
            $("#playeronename").html(playerOneName);
            $("#waitingforplayerone").hide(); 
        }

        if (snap.exists() === false){
            $("#playeronename").html("");
            $("#waitingforplayerone").show();
            playerOneTurn = false;
            $(".playeronechoicesrow").hide();
            console.log(playerOneTurn);
        }
        
        // if (playerOneTurn === true){
        // $(".playeronechoicesrow").show();
        
        //  }


});

playerListTwoName.on("value", function(snap) {
        if (snap.exists()){
            playerTwoName = snap.val();
            $("#playertwoname").html(playerTwoName);
            $("#waitingforplayertwo").hide(); 
           
        }
        if (snap.exists() === false) {
            $("#playertwoname").html("");
            $("#waitingforplayertwo").show();
            playerOneTurn = false;
            $(".playeronechoicesrow").hide();
            console.log(playerOneTurn);
    
        }
        // if (playerOneTurn === true){
        // $(".playeronechoicesrow").show();
        
        
        //  }

});

playerListOneWins.on("value", function(snap){
    if (snap.exists()){
        playerOneWinCount = snap.val();
        $("#playeronewincount").html(playerOneWinCount);
        $(".playeronescore").show();
    }
    else {
        $(".playeronescore").hide();
    }

});

playerListTwoWins.on("value", function(snap){
    if (snap.exists()){
        playerTwoWinCount = snap.val();
        $("#playertwowincount").html(playerTwoWinCount);
        $(".playertwoscore").show();
    }
    else {
        $(".playertwoscore").hide();
    }

});

playerListOneLosses.on("value", function(snap){
    if (snap.exists()){
        playerOneLossCount = snap.val();
        $("#playeronelosscount").html(playerOneLossCount);
        $(".playeronescore").show();
    }
    else {
        $(".playeronescore").hide();
    }

});

playerListTwoLosses.on("value", function(snap){
    if (snap.exists()){
        playerTwoLossCount = snap.val();
        $("#playertwolosscount").html(playerTwoLossCount);
        $(".playertwoscore").show();
    }
    else {
        $(".playertwoscore").hide();
    }

});





function startPlayerOne() {
    playerOneName = $("#playernameinput").val().trim();
    $("#playeronename").html(playerOneName);

    $("#playername").html(playerOneName);
    $("#playernumber").html(" 1");
    $(".greetings").show();

    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount
    });

    $("#playernameinput").val("");
    $(".namesubmission").hide();
    $("#waitingforplayerone").hide();

    $("#playeronewincount").html(playerOneWinCount);
    $("#playeronelosscount").html(playerOneLossCount);
    $(".playeronescore").show();

    // playerOneTurn = true;
}

function startPlayerTwo() {
    playerTwoName = $("#playernameinput").val().trim();
    $("#playertwoname").html(playerTwoName);

    $("#playername").html(playerTwoName);
    $("#playernumber").html(" 2");
    $(".greetings").show();

    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount
    });

    $("#playernameinput").val("");
    $(".namesubmission").hide();
    $("#waitingforplayertwo").hide();

    $("#playertwowincount").html(playerTwoWinCount);
    $("#playertwolosscount").html(playerTwoLossCount);
    $(".playertwoscore").show();

    
}

function startPlayerOneWithExisting() {
    playerOneName = $("#playernameinput").val().trim();
    $("#playeronename").html(playerOneName);

    $("#playername").html(playerOneName);
    $("#playernumber").html(" 1");
    $(".greetings").show();
    
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount
    });

    $("#playernameinput").val("");
    $(".namesubmission").hide();
    $("#waitingforplayerone").hide();

    $("#playeronewincount").html(playerOneWinCount);
    $("#playeronelosscount").html(playerOneLossCount);
    $(".playeronescore").show();

    // playerOneTurn = true;
}




$(document).on("click", "#adduser", function(){

    if (playerOneName === null && playerTwoName === null){
        startPlayerOne();
        playerOneTurn = true;
        return;
    }

    if (playerOneName != null && playerTwoName === null) {
        startPlayerTwo();
        
        return;
    }
    if (playerOneName === null && playerTwoName != null) {
        startPlayerOneWithExisting();
        playerOneTurn = true;
        return;
    }
});


function playerOneWin(){
    playerOneWinCount++;
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount,
        Choice: playerOneChoice
    });
    $("#middlemessage").html(playerOneName + " Wins!");
    $("#middlemessage").show();
    setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();},3000);
    
    $("#playeronechoice").show();
    $("#playertwochoice").show();
    setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();},3000);
    setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();},3000);
}

function playerTwoWin(){
    playerTwoWinCount++;
    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount,
        Choice: playerTwoChoice
    });
    $("#middlemessage").html(playerTwoName + " Wins!");
    $("#middlemessage").show();
    setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();},3000);

    $("#playeronechoice").show();
    $("#playertwochoice").show();
    setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();},3000);
    setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();},3000);
}

function playerOneLoss(){
    playerOneLossCount++;
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount,
        Choice: playerOneChoice
    });
}

function playerTwoLoss(){
    playerTwoLossCount++;
    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount,
        Choice: playerTwoChoice
    });
}

function tieGame() {
    $("#playeronechoice").show();
    $("#playertwochoice").show();
    setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();},3000);
    setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();},3000);
    $("#middlemessage").html("Tie Game!");
    setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();},3000);
}




$(document).on("click", "#playeronerock", function(){
    playerOneChoice = "Rock";
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount,
        Choice: playerOneChoice
    });
    $("#playeronechoice").html(playerOneChoice);
    $("#playeronechoice").show();
    $(".playeronechoicesrow").hide(); 
});

$(document).on("click", "#playeronepaper", function(){
    playerOneChoice = "Paper";
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount,
        Choice: playerOneChoice
    });
    $("#playeronechoice").html(playerOneChoice);
    $("#playeronechoice").show();
    $(".playeronechoicesrow").hide(); 
});

$(document).on("click", "#playeronescissors", function(){
    playerOneChoice = "Scissors"
    database.ref("/players/1").set({
        Name: playerOneName,
        Wins: playerOneWinCount,
        Losses: playerOneLossCount,
        Choice: playerOneChoice
    });
    $("#playeronechoice").html(playerOneChoice);
    $("#playeronechoice").show();
    $(".playeronechoicesrow").hide();
    
});

$(document).on("click", "#playertworock", function(){
    playerTwoChoice = "Rock";
    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount,
        Choice: playerTwoChoice
    });
    $("#playertwochoice").html(playerTwoChoice);
    $("#playertwochoice").show();
    $(".playertwochoicesrow").hide();
    
});

$(document).on("click", "#playertwopaper", function(){
    playerTwoChoice = "Paper";
    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount,
        Choice: playerTwoChoice
    });
    $("#playertwochoice").html(playerTwoChoice);
    $("#playertwochoice").show();
    $(".playertwochoicesrow").hide();
    
});

$(document).on("click", "#playertwoscissors", function(){
    playerTwoChoice = "Scissors"
    database.ref("/players/2").set({
        Name: playerTwoName,
        Wins: playerTwoWinCount,
        Losses: playerTwoLossCount,
        Choice: playerTwoChoice
    });
    $("#playertwochoice").html(playerTwoChoice);
    $("#playertwochoice").show();
    $(".playertwochoicesrow").hide();
    
});

function evaluateChoices() {
   
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


playerListOneChoice.on("value", function(snap){
    if (snap.exists() && playerTwoTurn === false){
        $(".playertwochoicesrow").show();
        playerOneChoice = snap;
    }

});

playerListTwoChoice.on("value", function(snap){
    if (snap.exists()){
        playerTwoChoice = snap;
        evaluateChoices();
    }
    });