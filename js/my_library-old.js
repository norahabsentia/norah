$(document).ready(function() {
    setTimeout(loadPage, 1500);
});

function loadPage() {
    if (firebase.auth().currentUser) {
        $.blockUI();
        var blocks = '';
        var k = 1;
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref("usernames").child(userId).child("mylibrary").once("value", function(ss) {
            var animations = ss.val();
            if (!animations) {
                alert("No items in library");
                $.unblockUI();
            } else {
                console.log(animations);
                animationsArray = Object.keys(animations).map(function(k) {
                    var anim = animations[k];

                    anim.firebaseKey = k;

                    var storageBucket = firebase.app().options.storageBucket;
                    var animMp4Name = "mp4Files/" + anim.name + ".mp4";
                    var mp4Url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animMp4Name)}?alt=media`;

                    var animFileName = "animFiles/" + anim.name + ".anim";
                    var animFileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animFileName)}?alt=media`;

                    anim.mp4Url = mp4Url;
                    anim.animUrl = animFileUrl;

                    return anim;
                }).sort(function (anim1, anim2) {
                    return (anim1['displayName']).localeCompare(anim2['displayName']);
                }).forEach(function (anim) {
                    blocks += '<div class="box box' + k + ' fadeInUp clust" data-wow-delay="0.3s" data-page="#">';
                    blocks += '<div style="z-index: 111;">';
                    blocks += '<div class="animation-name" style="text-align:center;margin-top:40px;display:block">' + anim.displayName + '</div>';
                    blocks += '<a class="download-anim" data-url="' + anim.animUrl + '" data-duration="' + anim.duration + '" data-name="' + anim.name + '.anim" style="float:none !important;text-align:center;display:block;margin-top:0px"><br/><i class="fa fa-download fa-2x" aria-hidden="true"></i></a></center>';
                    blocks += '<label class="fancy-checkbox">';
                    blocks += '<input type="checkbox" name="demo_' + anim.firebaseKey + '" onclick="if(this.checked){ document.getElementById(' + k + ').checked = true;} else {document.getElementById(' + k + ').checked = false;}"/>';
                    blocks += '<span></span>';
                    blocks += '</label>';
                    blocks += '</div>';
                    blocks += '<label class="fancy-checkbox">';
                    blocks += '<input type="checkbox" name="' + anim.firebaseKey + '" id="' + k + '"/>';
                    blocks += '<span></span>';
                    blocks += '</label>';
                    blocks += '<video autoplay loop muted>';
                    blocks += '<source src="' + anim.mp4Url + '" type="video/mp4" />';
                    blocks += '</video>';
                    blocks += '</div>';
                    k++;
                });

                $('.zodiacCont').html(blocks);
                $(".box").show();
                $(".zodiacCont").show();
                $(".temp_margin").hide();
                $.unblockUI();

                $('.download-anim').click(function () {
                    var animDownloadUrl = $(this).data("url");
                    var animName = $(this).data("name");
                    $.ajax({
                        url: animDownloadUrl,
                        success: download.bind(true, "text/plain", animName)
                    });
                })
            }
        })
    } else {
        $('#myModal').modal({
            backdrop: "static",
            keyboard: false,
            show: true
        });
        $(".zodiacCont").show();
        $(".temp_margin").hide();
    }
}

function deleteSelected() {
    $('.fancy-checkbox input').each(function() {
        var input = $(this);
        if (input.is(":checked")) {
            var userId = firebase.auth().currentUser.uid;
            var imageKey = input.prop("name");
            firebase.database().ref("usernames").child(userId).child("mylibrary").child(imageKey).remove();
            input.parent().parent().remove();
        }
    });
}