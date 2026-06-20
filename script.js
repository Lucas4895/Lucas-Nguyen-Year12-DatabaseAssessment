function createDatabase() {
    firebase.database().ref("/").set(
        {
            users: {
            }
        }
    )
}

function fb_write(){
    //Check if the GLOBAL_user variable actually has data yet
    if (!GLOBAL_user) {
        alert("Please wait a moment or log in before submitting!");
        return; //Stops the funtion from running and crashing
    }

    const displayName = GLOBAL_user.displayName;
    const email = GLOBAL_user.email;
    const uid = GLOBAL_user.uid;

    firebase.database().ref("/users/" + uid).set(
        {
            game1: {
                users: {
                    username: displayName,
                    email: email
                }
            }
        }
    )
}