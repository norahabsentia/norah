/**
 * Updated: 17/07/2017
 * Updated By: Mayur
 * Changes: Improved performance, perfect pagination, urls with page numbers.
 */

// DO NOT DELETE
function animationsUpdated() {
    firebase.database().ref("animations").once("value", function(ss) {
        var allAnimations = ss.val();
        var updates = {};
        var storageBucket = firebase.app().options.storageBucket;
        Object.keys(allAnimations).forEach(function(animKey) {
            var animMp4Name = "mp4Files/" + allAnimations[animKey]['name'] + ".mp4";
            var mp4Url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animMp4Name)}?alt=media`;
            updates['animations/' + animKey + "/mp4Url"] = mp4Url;

            var animFileName = "animFiles/" + allAnimations[animKey]['name'] + ".anim";
            var animFileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animFileName)}?alt=media`;
            updates['animations/' + animKey + "/animUrl"] = animFileUrl;
        });
        firebase.database().ref().update(updates);
        console.log("completed");
    });
}


//IMPORTANT: WHENEVER YOU ADD A NEW VIDEO, RUN THIS IN THE BROWSER CONSOLE:
// animationsUpdated();

var resultsPerPage = 12;
var pages = 0;
tags = [];
var hrefTextPrefix = "#page=";
var paginationInitialized = false;

var initialPage = 1;
if (window.location.hash != "") {
    initialPage = window.location.hash.substr(hrefTextPrefix.length)
}

var animationsArray = []
$.blockUI();
firebase.database().ref("animations").once("value", function(ss) {
    var allAnimations = ss.val();
    animationsArray = Object.keys(allAnimations).map(function(k) {
        var anim = allAnimations[k];

        anim.firebaseKey = k;

        var storageBucket = firebase.app().options.storageBucket;
        var animMp4Name = "mp4Files/" + anim.name + ".mp4";
        var mp4Url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animMp4Name)}?alt=media`;

        var animFileName = "animFiles/" + anim.name + ".anim";
        var animFileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animFileName)}?alt=media`;
        anim.mp4Url = mp4Url;
        anim.animUrl = animFileUrl;

        return anim;
    }).sort(function(anim1, anim2) {
        return (anim1['displayName']).localeCompare(anim2['displayName']);
    });

    getVideos(initialPage);
});

function matchTags() {
    var arrayLength = tags.length;
    var anim_final = [];
    if (arrayLength > 0 && !$.isEmptyObject(animationsArray)) {
        animationsArray.forEach(function(anim) {

            var count = 0;
            for (var t in anim['tags']) {
                for (var i = 0; i < arrayLength; i++) {
                    if (t == tags[i]) {
                        count++;
                    }
                }
            }
            if (count == arrayLength) {
                anim_final.push(anim);
            }
        });
    } else {
        return animationsArray;
        console.log("Returning original");
    }
    return anim_final;
}

function getVideos(page) {
    $.blockUI();
    var offset = (page - 1) * resultsPerPage;
    var blocks = '';
    var anim_final = matchTags();

    anim_final = SearchModule.searchKeywords(anim_final);

    console.log(SearchModule);
    showSearchCount(anim_final.length);
    //console.log(anim_final);
    //anim_final=SearchModule.searchKeywords(anim_final);

    updatePagination(anim_final);
    var data = anim_final.slice(offset, (page * resultsPerPage));

    if (!data.length) {
        // Add toast code to blocks variable
        $('.zodiacCont').html(blocks);
        $.unblockUI();
        console.log("No data");
    } else {
        var blocks = "";
        var k = 1;
        data.forEach(function(anim) {
            blocks += '<div class="box box' + (k++) + ' fadeInUp clust" style="min-height:10px;background:#412A58;">';
            blocks += '<div style="z-index: 111;">';
            blocks += '<a class="newwwww" href="javascript:;" data-duration="' + anim.duration + '" data-name="' + anim.name + '" data-displayName="' + anim.displayName + '" onclick=' + `"javascript:_paq.push(['trackEvent', 'Added to Library', '${anim.name}']);"` + '><i class="fa fa-plus-circle fa-2x" aria-hidden="true" ></i></a>';
            blocks += '<a onclick=' + `"javascript:_paq.push(['trackEvent', 'Downloaded', '${anim.name}']);"` + '" data-name="' + anim.name + '.anim" download href="' + animDownloadUrl + '"><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
            blocks += '<div class="animation-name">' + anim.displayName + '</div>';
            blocks += '</div>';
            blocks += '<video autoplay loop  muted>';
            blocks += '<source src="' + anim.mp4Url + '" type="video/mp4" />';
            blocks += '</video>';
            blocks += '</div>';
        })

        $('.zodiacCont video').each(function() {
            if ($(this) instanceof HTMLVideoElement) {
                this.pause(); // can't hurt
                delete this; // @sparkey reports that this did the trick (even though it makes no sense!)
                $(this).remove(); // this is probably what actually does the trick
            }
        });

        $('.zodiacCont').html(blocks);

        $('.newwwww').click(function() {
            if (firebase.auth().currentUser) {
                var animName = $(this).data("name");
                var duration = $(this).data("duration");
                var displayName = $(this).data("displayname");
                var userId = firebase.auth().currentUser.uid;
                console.log("UID" + userId);
                firebase.database().ref("usernames").child(userId).child("mylibrary").once("value", function(snap) {
                    var libraryItems = snap.val();
                    var exists = false;
                    console.log(libraryItems);
                    libraryItems && Object.keys(libraryItems).forEach(function(itemKey) {
                        exists = exists || (libraryItems[itemKey]['name'] == animName);
                    });
                    if (!exists) {
                        var newObjRef = firebase.database().ref("usernames").child(userId).child("mylibrary/").push();

                        var storageBucket = firebase.app().options.storageBucket;
                        var animMp4Name = "mp4Files/" + animName + ".mp4";
                        var mp4Url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animMp4Name)}?alt=media`;

                        var animFileName = "animFiles/" + animName + ".anim";
                        var animFileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(animFileName)}?alt=media`;

                        newObjRef.set({
                            displayName: displayName,
                            name: animName,
                            duration: duration
                        });
                        toastr.info('Added to your library')
                    } else {
                        toastr.error('Already in your library')
                    }
                })
            } else {
                $('#myModal').modal('show');
            }
        })

        $('.download-anim').click(function() {
            var animDownloadUrl = $(this).data("url");
            var animName = $(this).data("name");
            $.ajax({
                url: animDownloadUrl,
                success: download.bind(true, "text/plain", animName)
            });
        })

        $.unblockUI();

    }
}

function updatePagination(items) {
    var prevLength = 0;
    if (!paginationInitialized) {
        paginationInitialized = true;
        jQuery('.repo-pages').pagination({
            items: items.length,
            itemsOnPage: resultsPerPage,
            onPageClick: function(pageNumber) {
                getVideos(pageNumber)
            },
            currentPage: initialPage,
            hrefTextPrefix: hrefTextPrefix
        });
    } else if (prevLength != items.length) {
        prevLength = items.length;
        jQuery('.repo-pages').pagination('updateItems', items.length);
    }
}

function showSearchCount(count) {
    console.log("Keyword " + SearchModule.isEmpty() + " count " + count);
    if (!SearchModule.isEmpty()) {
        toastr.info(count + ' results for "' + SearchModule.getKeyWord() + '"')
            /* 
               $(".searchMessage div")[0].innerHTML="<strong>"+count+"</strong> results for \""+SearchModule.getKeyWord()+"\"";
                $(".searchMessage")[0].style.display="block";
            */

    } else {
        // $(".searchMessage")[0].style.display = "none";
    }

}


var SearchModule = function() {
    var keyword = ""
    return {
        search: function(Keyword) {
            getVideos(1);
        },
        KeywordChanged: function(text) {
            keyword = text.toLowerCase();
        },
        isEmpty: function() {

            if (keyword.length > 0)
                return false;
            else
                return true;
        },
        getKeyWord: function() {

            return keyword;
        },
        searchKeywords: function(anims) {
            if (keyword.length > 0) {
                var filteredAnims = [];
                anims.filter((anim) => {
                    var k = keyword.split(" ");
                    for (i = 0; i < k.length; i++) {
                        var s = ""
                        if (anim.displayName.toLowerCase().indexOf(k[i]) >= 0) {
                            console.log("Key: " + k + " name " + anim.displayName);
                            filteredAnims.push(anim);
                            return anim;

                        }
                    }

                    return false;

                });
                return filteredAnims;
            } else {
                return anims;
            }
        }


    };

}();



jQuery(document).ready(function() {
    firebase.database().ref("/tags/").once('value').then(function(snapshot) {

        var fireObject = snapshot.val();
        var t = 0;

        for (var key in fireObject) {
            var sabUl = "<ul class='nav nav-pills nav-stacked subMenuS'>";
            for (var b in fireObject[key]) {
                sabUl += "<li  class='subManuLi' data-name='" + fireObject[key][b] + "' role='presentation'><a onclick=" + `"javascript:_paq.push(['trackEvent', 'Tag clicked', '${fireObject[key][b]}']);"` + ">" + fireObject[key][b] + "</a></li>";
            }
            sabUl += "</ul>";
            var active = (t == 0) ? " class='active'" : '';
            $(".menuS").append('<li role="presentation"' + active + '><a href="javascript:;">' + key + '</a>' + sabUl + '</li>');
            ++t;
        }

        $(".subManuLi").off('click').on('click', function() {
            var subLi = '';
            if (!$(this).hasClass("activeTag")) {
                $(this).addClass("active activeTag");
                var name = $(this).attr('data-name');
                subLi += '<div class="pull-left closeDiv ' + $(this).text() + '" style="margin-top:15px;">';
                subLi += '<p class="filterP">' + $(this).html();
                subLi += '<a id="' + $(this).text() + '" class="closeBtn" data-name="' + name + '" style="font-size:14px;cursor:pointer">&nbsp;&nbsp;&nbsp;X</button>' + '</a>';
                subLi += '</div>';
                $(".tagName").append(subLi);
                console.log($(this).text());
                tags.push($(this).text());
                selected = true;
                $(".repo-pages").pagination('selectPage', 1);

            }
            $(".closeBtn").off('click').on('click', function() {
                removeItem = $(this).attr('id');
                console.log("removeItem");
                $('.' + removeItem).hide();
                console.log(removeItem);
                tags = jQuery.grep(tags, function(value) {
                    return value != removeItem;
                });

                var name = $(this).attr('data-name');
                $(this).parent().remove();
                $('.subMenuS li[data-name="' + name + '"]').removeClass('active activeTag');
                $(".repo-pages").pagination('selectPage', 1);
            });

        });
    });
    /*----------------------CloseButton---------------------*/




});