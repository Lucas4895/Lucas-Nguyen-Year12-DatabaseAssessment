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

function fb_writeScore() {
    if (!GLOBAL_user) {
        console.log("No logged-in user found. Score not saved to database.");
        return; 
    }

    const uid = GLOBAL_user.uid;

    // Save the current score value directly under their UID inside a "scores" folder
    firebase.database().ref("/scores/" + uid).set({
        score: score,
        username: GLOBAL_user.displayName
    });

    console.log("Score of " + score + " saved to Firebase for user " + uid);
}