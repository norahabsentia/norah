var textEmail = document.getElementById("inputEmail");
var textPass = document.getElementById("inputPassword");
var btnLogIn = document.getElementById("loginBtn");
var btnLogOut = document.getElementById("logOutBtn");
var signUpBtn = document.getElementById("signUpBtn");

var loginModalElement = $('#myModal')
loginModalElement.on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    var modal = $(this)
    console.log(modal)
})

function closeLoginModal() {
    loginModalElement.modal('hide');
}

btnLogIn.addEventListener('click', e => {
    var email = textEmail.value;
    var pass = textPass.value;

    var auth = firebase.auth();

    var promise = auth.signInWithEmailAndPassword(email, pass);

    promise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage + " Code: " + errorCode);
    });
});

btnLogOut.addEventListener('click', e => {
    alert();
    firebase.auth().signOut();
});

signUpBtn.addEventListener('click', e => {
    window.location.href = "home.html";
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (!firebaseUser) {
        window.location.href = "home.html";
        closeLoginModal();
    }
})