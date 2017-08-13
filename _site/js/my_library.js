 var blocks = '';
 $(document).ready(function() {
     setTimeout(loadPage, 1500);
     setTimeout(getVideos, 13000);
 });


 function loadPage() {
     if (firebase.auth().currentUser) {
         $.blockUI();
         var flag = false;
         var userId = firebase.auth().currentUser.uid;
         firebase.database().ref("usernames").child(userId).child("mylibrary").once("value", function(ss) {
             var animations = ss.val();
             var anim;
             var animationsArray;
             var l = 1;

             if (!animations) {
                 alert("No items in library");
                 $.unblockUI();
             } else {

                 animationsArray = Object.keys(animations).map(function(k) {
                     anim = animations[k];
                     anim.firebaseKey = k;
                     var firebaseKey = k;
                     var storageBucket = firebase.app().options.storageBucket;
                     var animMp4Name = "mp4Files/" + anim.name + ".mp4";
                     var displayName = anim.displayName;
                     var mp4Url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animMp4Name)}?alt=media`;
                     anim.mp4Url = mp4Url;
                     firebase.storage().ref("animFiles").child(anim.name + ".anim").getDownloadURL().then(function(animDownloadUrl) {
                         console.log("Shoulda been first " + animDownloadUrl);
                         anim.animUrl = animDownloadUrl;
                         // $(".download-anim").attr("href", animDownloadUrl);
                         blocks += '<div class="box box' + l + ' fadeInUp clust" data-wow-delay="0.3s" data-page="#">';
                         blocks += '<div style="z-index: 111;">';
                         blocks += '<div class="animation-name" style="text-align:center;margin-top:40px;display:block">' + displayName + '</div>';
                         blocks += '<a class="download-anim" data-name="' + anim.name + '.anim"  download href="' + animDownloadUrl + '" onclick=' + `"javascript:_paq.push(['trackEvent', 'Downloaded', '${anim.name}']);"` + '><i class="fa fa-download fa-2x" aria-hidden="true"></i></a></center>';
                         blocks += '<label class="fancy-checkbox">';
                         blocks += '<input type="checkbox" name="demo_' + k + '" onclick="if(this.checked){ document.getElementById(' + l + ').checked = true;} else {document.getElementById(' + l + ').checked = false;}"/>';
                         blocks += '<span></span>';
                         blocks += '</label>';
                         blocks += '</div>';
                         blocks += '<label class="fancy-checkbox">';
                         blocks += '<input type="checkbox" name="' + k + '" id="' + l + '"/>';
                         blocks += '<span></span>';
                         blocks += '</label>';
                         blocks += '<video autoplay loop muted>';
                         blocks += '<source src="' + mp4Url + '" type="video/mp4" />';
                         blocks += '</video>';
                         blocks += '</div>';
                         k++;
                     });
                     return anim;
                     // return anim;
                 }).sort(function(anim1, anim2) {
                     return (anim1['displayName']).localeCompare(anim2['displayName']);
                 });
                 // $('.download-anim').click(function() {
                 //     var animDownloadUrl = $(this).data("url");
                 //     var animName = $(this).data("name");
                 //     $.ajax({
                 //         url: animDownloadUrl,
                 //         success: download.bind(true, "text/plain", animName)
                 //     });
                 // })
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

 function getVideos() {
     $('.zodiacCont').html(blocks);
     $(".box").show();
     $(".zodiacCont").show();
     $(".temp_margin").hide();
     $.unblockUI();
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