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


//fb_read
function fb_read(){
    console.log("Reading...")
    firebase.database().ref("/").once("value", displayResult)
}

function showScores(child) {

}

function displayResult(snapshot) {
    snapshot.forEach(showScores)
}