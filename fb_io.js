var GLOBAL_user;
var authenticationListener; //global variable to store the listener
const LOGINBTN = document.querySelector(".login");
const LOGOUTBTN = document.querySelector(".logout");
const GEODASH = document.querySelector(".GeoDash");
const CATCARROT = document.querySelector(".CatCarrot");
if (LOGOUTBTN) LOGOUTBTN.style.display = "none";
if (GEODASH) GEODASH.style.display = "none";
if (CATCARROT) CATCARROT.style.display = "none";

function fb_authenticate(){
    authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

function fb_handleLogin(_user){
    if (_user) {
        GLOBAL_user = _user;
        console.log("User is logged in:", _user.displayName);
        if (LOGINBTN) LOGINBTN.style.display = "none";
        if (LOGOUTBTN) LOGOUTBTN.style.display = "block";
        if (GEODASH) GEODASH.style.display = "block";
        if (CATCARROT) CATCARROT.style.display = "block";
        fb_write()
    } else {
        GLOBAL_user = null;
        console.log("No user session active.");
        if (loginBtn) loginBtn.style.display = "block";   // Show login again
        if (logoutBtn) logoutBtn.style.display = "none"; 
        if (geoDashBtn) geoDashBtn.style.display = "none"; 
        if (CATCARROT) CATCARROT.style.display = "none"; 
        alert("Please Log in to play our games.")
    }
}

// authenticate with Google
function fb_popupLogin(){ 
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log("User has logged in via popup.");
    }).catch((error) => {
        console.error("Popup login failed:", error);
    });
}

function fb_logout(){
    firebase.auth().signOut();
    console.log("logged out");
}

// Start everything up on page load
fb_authenticate();