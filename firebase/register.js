var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPassword");
var regBtn = document.getElementById("regBtn");
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
regBtn.addEventListener('click', function(e) {
    var email = regEmail.value;
    var pass = regPassword.value;

    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(function val() {
        auth.sendEmailVerification();
    });
    promise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage /*+ " Code: " + errorCode*/ );
    });

    alert('done');
    setTimeout(Location.reload(true), 1000);

});

firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {

        // location.reload(true);
        closeLoginModal();
    } else {
        /*alert('Error');*/
    }
})