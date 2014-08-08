$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});

//////////////////////////////////////////////////////////////////////////////
// detect the swipe
//////////////////////////////////////////////////////////////////////////////
$(document).on("pageshow", function() {

    $(document).on("click", ".card", function( event ) {
        // $(this).remove();
        // console.log($(this));
        console.log("click detected!!");
    });

    $(document).on("swipeleft", ".card", function( event ) {
        $(this).remove();
        // $(this).css("background-color", "white");
        console.log("swipeleft detected!!");
    });
    $(document).on("swiperight", ".card", function( event ) {
        // $(this).();
        $(this).css("background-color", "white");
        console.log("swiperight detected!!");
    });

    (function poll(){
    setTimeout(function(){
        var lastid = $("#card_list").data("lastid");
        if (!lastid) {lastid = 0;}
        var dbUrl = "http://researchbox.eu/ambient/data.php?id=0&lastid="+lastid;

        $.ajax({ url: dbUrl, success: function(data){
            console.log("Polling!");
            console.log(data);

            if (data != "[null]") {
                // Vibrate once for one second
                navigator.vibrate(100);

                var obj = jQuery.parseJSON(data);
                $.each( obj, function( key, val ) {
                    console.log(key, val);

                    if (val["id"] > lastid) {
                        $("#card_list").data("lastid", val["id"]);
                        var newcard = create_new_card(val)
                        $("#card_list").prepend(newcard);
                    }
                });
            }

        }, complete: poll, timeout: 10000});
    }, 10000);
    })();
});


//////////////////////////////////////////////////////////////////////////////
// add card from database on page1 before show
//////////////////////////////////////////////////////////////////////////////
$(document).on("pagebeforeshow", function() {
    $("#page1").off().on("pageshow", setupFrontPage);
});

function setupFrontPage(event) {
    addCards();
}
function addCards() {
    var lastid = $("#card_list").data("lastid");
    if (!lastid) {lastid = 0;}

    $.getJSON(
        "http://researchbox.eu/ambient/data.php?id=0&lastid="+lastid, 
        function(data) {

            $.each( data, function( key, val ) {
                console.log(key, val);

                if (val["id"] > lastid) {
                    $("#card_list").data("lastid", val["id"]);
                    var newcard = create_new_card(val)
                    $("#card_list").prepend(newcard);
                    $("#card_list").listview("refresh");
                }
            });
        }
    );
}
function create_new_card(val) {
    var newcard = $("#prototype3").clone();

    $(newcard).removeClass("template");

    $(newcard).attr("id", val["id"]);
    $(newcard).find("#thumbnail").addClass(val["action"]);
    $(newcard).find("#message").text(val["value"]);
    $(newcard).find("#timestamp").text(val["timestamp"]);

    if (val["action"] == "google-maps") {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $(newcard).find("#action").attr("href", "comgooglemaps://?q="+val["value"]);
        }
        else {
            $(newcard).find("#action").attr("href", "geo:0,0?q="+val["value"]);
        }
    }
    if (val["action"] == "google-search") {
        $(newcard).find("#action").attr("href", "http://www.google.com/search?q="+val["value"]);
        $(newcard).find("#action").attr("target", "_blank");
    }

    console.log(newcard);
    return newcard;
}

function create_new_card_2(val) {
    var newli = document.createElement("li");
    // $(newli).addClass("ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-first-child ui-btn-up-c");

    var newcard = $("#prototype1").clone();


    $(newcard).removeClass("template");
    $(newcard).addClass(val["action"]);

    $(newcard).attr("id", val["id"]);
    $(newcard).find("#logo").text(val["action"]);
    $(newcard).find("#message").text(val["value"]);

    $(newli).append(newcard)
    console.log(newli);
    return newli;
}