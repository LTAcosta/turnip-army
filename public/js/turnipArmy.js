document.addEventListener('DOMContentLoaded', function() {
    function database() {
        return firebase.database().ref();
    }
    
    firebase.auth().onAuthStateChanged(function(user) {
        updateLoginStatus();
    });
    
    function updateLoginStatus() {
        var user = firebase.auth().currentUser;
    
        if (user) {
            var userId = user.uid;
            var username = user.displayName;
          
            //chat.setUser(userId, username);
            $('#login-status').text('Logged in as: ' + username);
        } else {
            $('#login-status').text('Logged out.');
        }
    }
    
    $("#login").on("click", function () {
        login();    
    });
    
    function login() {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            // Handle Errors here.
            console.log("Error authenticating user:", error);
        });
    }
    
    function logout() {
        firebase.auth().signOut().catch(function(error) {
            console.log("Error signing user out:", error);
        });
    }
});
