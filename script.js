function fb_write(){
    //Check if the GLOBAL_user variable actually has data yet
    if (!GLOBAL_user) {
        alert("Please wait a moment or log in before submitting!");
        return; //Stops the funtion from running and crashing
    }

    const displayName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const uid = GLOBAL_user.uid;

    firebase.database().ref("/" + uid).set(
        {
            game1: {
                users: {
                    username: displayName,
                    age: age,
                    email: email
                }
            }
        }
    )
}