playerList.once("value", function(snap) {

        var playerNumber = snap.numChildren();

        if (snap.child("2").exists() === false && snap.child("1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
        }

        if (snap.child("2").exists() === false && snap.child("1").exists() === true){
        database.ref("/players/2").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === false){
        database.ref("/players/1").set({
                Name: null,
                Wins: 0,
                Losses: 0
            });
        }

        if (snap.child("2").exists() === true && snap.child("1").exists() === true){
            $(".toomanyplayers").show();
            $(".namesubmission").hide();
        }

       
        
});


playerList.once("value", function(snap) {

        if(snap.val()){
        database.ref("/players/1").onDisconnect().remove();
        }

        if(snap.val()){
        database.ref("/players/2").onDisconnect().remove();
        }
});
