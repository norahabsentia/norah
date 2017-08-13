var textEmail = document.getElementById("inputEmail");
var textPass = document.getElementById("inputPassword");
var btnLogIn = document.getElementById("loginBtn");
var btnLogOut = document.getElementById("logOutBtn");
var signUpBtn = document.getElementById("signUpBtn");

btnLogIn.addEventListener('click', function(e) {
    var email = textEmail.value;
    var pass = textPass.value;

    var auth = firebase.auth();

    var promise = auth.signInWithEmailAndPassword(email, pass).then(function() {
        auth.sendEmailVerification();
        window.location.reload();
    });

    promise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + " Code: " + errorCode);
    });
});

btnLogOut.addEventListener('click', function(e) {
    firebase.auth().signOut();
    location.reload();
});

/*signUpBtn.addEventListener('click', e => {
    window.location = "register.html";
});*/

firebase.auth().onAuthStateChanged(function(firebaseUser) {

    if (firebaseUser) {

        /*window.location = "home.html";*/

    } else {
        /*btnLogOut.classList.add("hide");*/
        textEmail.classList.remove("hide");
        textPass.classList.remove("hide");
        btnLogIn.classList.remove("hide");
        // signUpBtn.classList.remove("hide");
    }
})