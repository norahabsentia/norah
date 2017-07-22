$('.sign-in').click(function() {
    $('#myModal').modal('show');
});

firebase.auth().onAuthStateChanged(function(user) {
    // DISPLAY USER MAIL INFO

    if (user && user.emailVerified) {
        $('.user-mail').html(user.email);
        $('.sign-in').css('display', 'none');
        $('.log-Out').css('display', 'block');

    } else {
        if (user) {
            user.sendEmailVerification();
        }
        $('.regB').css('display', 'block');
        if (window.location.search.replace('?', '') == 'reg') {
            $('.follow_icon button').click();
        }
    }

    $('.fa-plus-circle, .fa-download').off('click').on('click', function() {
        if (!user) {
            window.location = "registration_form.html?reg";
        }

    });

    // console.log(user.email);
    /*
      if (user && user.uid != currentUid) {  
        // Обноваляем UI когда новый пользователь логинится
        // В другом случае игнорируем если это обновление токена
        // Обновляем UID текущего пользователя 
       currentUid = uid;  
      } else {  
        // Операция выхода из приложения. Переустанавливает UID текущего пользователя
       currentUid = null;  
      }  */



    // End jQuery  <<<<<<<<<<<<<<<<<<<<<<<
});