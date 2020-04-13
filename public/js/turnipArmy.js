document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        updateLoginStatus();
    });
    
    function updateLoginStatus() {
        watchUserProfile();

        var user = firebase.auth().currentUser;
    
        if (user) {
            var username = user.email;
          
            $('#login').hide();
            $('#login-email').text('Logged in as: ' + username);
            $('#login-status').show();
        } else {

            $('#login-status').hide();
            $('#login-email').text('Logged out');
            $('#login').show();
        }
    }
    
    $('#login').on('click', login);
    
    function login() {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            // Handle Errors here.
            console.log('Error authenticating user:', error);
        });
    }

    $('#logout').on('click', logout);
    
    function logout() {
        firebase.auth().signOut().catch(function(error) {
            console.log('Error signing user out:', error);
        });
    }

    function saveUserProfile(name, friendCode, switchName, playerName, islandName, fruit, flower, creatorId, timezone) {
        var user = firebase.auth().currentUser;

        // Make sure we're logged in
        if (!user) {
            return;
        }
        
        // Default to name from Google
        if (!name) {
            name = user.displayName;
        }
        
        firebase.database().ref('user-profiles/' + user.uid).set({
            name: name,
            friendCode: friendCode,
            switchName : switchName,
            playerName: playerName,
            islandName: islandName,
            fruit: fruit,
            flower: flower,
            creatorId: creatorId,
            timezone: timezone
          });
    }

    $('#profileForm').on('input', _.debounce(updateProfile, 500));

    function updateProfile() {
        var name = $('#profile_name').val();
        var friendCode = $('#profile_friendCode').val();
        var switchName = $('#profile_switchName').val();
        var playerName = $('#profile_playerName').val();
        var islandName = $('#profile_islandName').val();
        var fruit = $('#profile_fruit').val();
        var flower = $('#profile_flower').val();
        var creatorId = $('#profile_creatorId').val();
        var timezone = $('#profile_timezone').val();

        saveUserProfile(name, friendCode, switchName, playerName, islandName, fruit, flower, creatorId, timezone);
    }

    function setInputIfNotEqual(fieldId, value) {
        var current = $(fieldId).val();

        if (current !== value) {
            $(fieldId).val(value);
        }
    }

    var profileRef = undefined;

    function watchUserProfile() {
        if (profileRef) {
            profileRef.off();
        }

        var user = firebase.auth().currentUser;

        // Make sure we're logged in
        if (!user) {
            return;
        }

        profileRef = firebase.database().ref('user-profiles/' + user.uid);

        profileRef.on('value', function(data) {
            if (!data) {
                return;
            }

            var profile = data.val();
            if (!profile) {
                return;
            }

            // Default to name from Google
            if (!profile.name) {
                profile.name = user.displayName;
            }

            setInputIfNotEqual('#profile_name', profile.name);
            setInputIfNotEqual('#profile_friendCode', profile.friendCode);
            setInputIfNotEqual('#profile_switchName', profile.switchName);
            setInputIfNotEqual('#profile_playerName', profile.playerName);
            setInputIfNotEqual('#profile_islandName', profile.islandName);
            setInputIfNotEqual('#profile_fruit', profile.fruit);
            setInputIfNotEqual('#profile_flower', profile.flower);
            setInputIfNotEqual('#profile_creatorId', profile.creatorId);
            setInputIfNotEqual('#profile_timezone', profile.timezone);
        });
    }
});
