var GLOBAL_user;
var authenticationListener; //global variable to store the listener

fb_authenticate()

function fb_authenticate(){
    authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
    // authenticate with Google
}

function fb_handleLogin(_user){
    if (_user){
        GLOBAL_user = _user;
        console.log("User is logged in. ")
    } else {
        fb_popupLogin();
    }
}

function fb_popupLogin(){
var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        //Use result.user to be safe, or let the listener handle it
        GLOBAL_user = result.user; 
        console.log("User has logged in via popup.");
    }).catch((error) => {
        console.error("Popup login failed:", error);
    });
};

function fb_logout(){
    authenticationListener(); //this line turns off the listener
    firebase.auth().signOut();
    console.log("logged out")
};