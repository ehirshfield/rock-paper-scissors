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
  var playerListOneName = database.ref("/players/1/Name");
  var playerListTwoName = database.ref("/players/2/Name");
  var playerListOneWins = database.ref("/players/1/Wins");
  var playerListTwoWins = database.ref("/players/2/Wins");
  var playerListOneLosses = database.ref("/players/1/Losses");
  var playerListTwoLosses = database.ref("/players/2/Losses");
  

var playerOneWinCount = 0;
var playerOneLossCount = 0;
var playerTwoWinCount = 0;
var playerTwoLossCount = 0;
var playerOneName = null;
var playerTwoName = null;

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



playerList.once("value", function(snap) {


        if (snap.child("2").exists() === false && snap.child("1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
            playerOneName = null;
            database.ref("/players/1").onDisconnect().remove();
            return;
        }

        if (snap.child("2").exists() === false && snap.child("1").exists() === true){
        database.ref("/players/2").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
            playerOneName = "Placeholder";
            playerTwoName = null;
            database.ref("/players/2").onDisconnect().remove();
            return;
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
            playerOneName = null;
            playerTwoName = "Placeholder";
            database.ref("/players/1").onDisconnect().remove();
            return;
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === true){
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

        else {
            $("#playeronename").html("");
            $("#waitingforplayerone").show(); 
        }
        

});

playerListTwoName.on("value", function(snap) {
        if (snap.exists()){
            playerTwoName = snap.val();
            $("#playertwoname").html(playerTwoName);
            $("#waitingforplayertwo").hide(); 
        }
        else {
            $("#playertwoname").html("");
            $("#waitingforplayertwo").show(); 
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
}

$(document).on("click", "#adduser", function(){
    if (playerOneName === null && playerTwoName === null){
        startPlayerOne();
        return;
    }

    if (playerOneName != null && playerTwoName === null) {
        startPlayerTwo();
        return;
    }
    if (playerOneName === null && playerTwoName != null) {
        startPlayerOneWithExisting();
        return;
    }
});
