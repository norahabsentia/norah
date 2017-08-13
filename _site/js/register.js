var regEmail = document.getElementById("regEmail");
var regPassword  = document.getElementById("regPassword");
var regBtn  = document.getElementById("regBtn");

regBtn.addEventListener('click', e => {
    var email = regEmail.value;
    var pass = regPassword.value;

    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage + " Code: " + errorCode);
    });
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        window.location = "home.html";
	} else {
		console.log("no logged in");
	}
})
