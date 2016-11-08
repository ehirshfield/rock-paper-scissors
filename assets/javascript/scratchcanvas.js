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
  


$(document).ready(function(){
     $(".greetings").hide();
     $(".yourturn").hide();
     $(".waitingmessage").hide();
     $(".toomanyplayers").hide();
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
            database.ref("/players/1").onDisconnect().remove();
        }

        if (snap.child("2").exists() === false && snap.child("1").exists() === true){
        database.ref("/players/2").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
            database.ref("/players/2").onDisconnect().remove();
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
            database.ref("/players/1").onDisconnect().remove();
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === true){
            $(".toomanyplayers").show();
            $(".namesubmission").hide();
        }

       
        
});




$(document).on("click", "#adduser", function(){
    

});

