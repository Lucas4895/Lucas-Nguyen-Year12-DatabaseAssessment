function fb_write(){
    // Check if the GLOBAL_user variable actually has data yet
    if (!GLOBAL_user) {
        return; // Stops the function from running
    }

    const displayName = GLOBAL_user.displayName;
    const email = GLOBAL_user.email;
    const uid = GLOBAL_user.uid;

    // Go directly to this specific user's folder and save their profile info
    firebase.database().ref("/users/" + uid).set({
        username: displayName,
        email: email
    });

    console.log("Data Saved")
}


/****************************************************************************/
//write functions
/***************************************************************************/
function fb_writeScore() {  //catCarrot's write function
    if (!GLOBAL_user) {
        console.log("No logged-in user found. Score not saved to database.");
        return; 
    }

    const uid = GLOBAL_user.uid;

    // Save the current score value directly under their UID inside a "scores" folder
    firebase.database().ref("/catCarrot/" + uid).set({
        score: score,
        username: GLOBAL_user.displayName
    });

    console.log("Score of " + score + " saved to Firebase for user " + uid);
}

function fb_writeScore2() { //GeoDash's write function
    if (!GLOBAL_user) {
        console.log("No logged-in user found. Score not saved to database.");
        return; 
    }

    const uid = GLOBAL_user.uid;

    // Save the current score value directly under their UID inside a "scores" folder
    firebase.database().ref("/geoDash/" + uid).set({
        score: score,
        username: GLOBAL_user.displayName
    });

    console.log("Score of " + score + " saved to Firebase for user " + uid);
}
/****************************************************************************/
//write functions end
/***************************************************************************/

function fb_readLeaderboard() {
    console.log("Fetching leaderboard...");
    
    firebase.database()
        .ref("/catCarrot")
        .orderByChild("score")
        .once("value", displayLeaderboard);
}

function displayLeaderboard(snapshot) {
    const listElement = document.getElementById("leaderboard-list");
    
    // Clear out any old scores inside the list so we don't accidentally duplicate them
    listElement.innerHTML = "";
    let scoreboardArray = [];

    snapshot.forEach(function(child) {
        const data = child.val();
        scoreboardArray.push({
            username: data.username,
            score: data.score
        });
    });

    scoreboardArray.reverse();

    // Now loop through sorted array and create HTML list items <li>
    scoreboardArray.forEach(function(player) {
        const listItem = document.createElement("li");
        listItem.textContent = player.username + " — " + player.score + " points";
        listElement.appendChild(listItem);
    });
}