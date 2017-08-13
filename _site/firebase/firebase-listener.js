$('.sign-in').click(function() {
    $('#myModal').modal('show');
});
var _paq = _paq || [];


firebase.auth().onAuthStateChanged(function(user) {
    // DISPLAY USER MAIL INFO

    if (user /*&& user.emailVerified*/ ) {
        $('.user-mail').html(user.email);

        $('.sign-in').css('display', 'none');
        $('.log-Out').css('display', 'block');

        // Piwik

        _paq.push(['setUserId', user.email]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            if (window.location.href.indexOf("norah.ai") > -1) {
                console.log("You are at norah.ai");
                var u = "//piwik.norah.ai/";
            } else {
                var u = "http://35.185.180.253/";
            }


            _paq.push(['setTrackerUrl', u + 'piwik.php']);
            if (window.location.href.indexOf("norah.ai") > -1) {
                console.log("You are at norah.ai");
                _paq.push(['setSiteId', '1']);
            } else if (window.location.href.indexOf("norahabsentia") > -1) {
                _paq.push(['setSiteId', '1']);
            } else {
                _paq.push(['setSiteId', '2']);
            }

            var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = 'https://cdnjs.cloudflare.com/ajax/libs/piwik/3.0.4/piwik.js'
            s.parentNode.insertBefore(g, s);
        })();


    } else {
        if (user) {
            user.sendEmailVerification();
        }
        $('.regB').css('display', 'block');
        if (window.location.search.replace('?', '') == 'reg') {
            $('.follow_icon button').click();
        }

        // Piwik

        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            if (window.location.href.indexOf("norah.ai") > -1) {
                console.log("You are at norah.ai");
                var u = "//piwik.norah.ai/";
            } else {
                var u = "http://35.185.180.253/";
            }


            _paq.push(['setTrackerUrl', u + 'piwik.php']);
            if (window.location.href.indexOf("norah.ai") > -1) {
                console.log("You are at norah.ai");
                _paq.push(['setSiteId', '1']);
            } else if (window.location.href.indexOf("norahabsentia") > -1) {
                _paq.push(['setSiteId', '1']);
            } else {
                _paq.push(['setSiteId', '2']);
            }

            var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = 'https://cdnjs.cloudflare.com/ajax/libs/piwik/3.0.4/piwik.js'
            s.parentNode.insertBefore(g, s);
        })();
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