var uiConfig = {
    signInSuccessUrl: window.location.href,
    signInOptions: [
        // Указываем провайдеров для Firebase Аутентификации
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    // Здесь вы можете специфировать условия к использованию, которые будут показаны при виджете 
    tosUrl: '<your-tos-url>'
};
// Инициализирум FirebaseUI виджет   
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Для начала методы мы подождем пока html полностью загрузиться
ui.start('#firebaseui-auth-container', uiConfig);