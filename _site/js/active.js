/*-----------------------firebase storage-----------------------*/
function queryDatabase(token) {
    firebase.database().ref().once('value').then(function(snapshot) {
        var postObject = snapshot.val();

        var lib = " ";
        for (key in postObject) {
            var l = 1;

            if (typeof postObject[key] == 'object') {
                continue;
            }

            lib += '<div class="box box' + l + ' wow fadeInUp clust">';
            lib += '<div class="reposDiv">';

            lib += '<a href="' + postObject[key] + '" download><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
            lib += '</div><figure class="newFigure"> <img src="' + postObject[key] + '" class="gifPic"></figure><strong></strong>';

            lib += '</div>';
            ++l;
        }

        $(".library").html(lib);
    })
}

var onceBool;


jQuery(document).ready(function() {
    onceBool = true;
    $('.login-form .new-animake').off('click').on('click', function() {
        $('.login-form').hide();
        $('.reg-form').show();
    });

    $('.reg-form .already-reg').off('click').on('click', function() {
        $('.reg-form').hide();
        $('.login-form').show();
    });

    $('.clustering .box, .tp').off('click').on('click', function(e) {
        if (!$(e.target).is('.fa')) {
            window.location.href = $(this).attr('data-page') + ".html";
        }
    });

    $('.openModal').off('click').on('click', function(e) {
        e.preventDefault();
        $('#js-modal').show();
    })


    /*--------------------------firebase storage--------------------*/
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var token = firebase.auth().currentUser.uid;
            queryDatabase(token);

            // closeLoginModal();

            $('#myModal').hide();
            $('.reg').hide();
            $('.login-form').hide();
            $('.reg-form').hide();


        }
    });

})