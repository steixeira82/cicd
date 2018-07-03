var smartbgimage = "<h6 class='margin-top-10 semi-bold'>Background</h6><img src='/content/img/pattern/graphy-xs.png' data-htmlbg-url='/content/img/pattern/graphy.png' width='22' height='22' class='margin-right-5 bordered cursor-pointer'><img src='/content/img/pattern/tileable_wood_texture-xs.png' width='22' height='22' data-htmlbg-url='/content/img/pattern/tileable_wood_texture.png' class='margin-right-5 bordered cursor-pointer'><img src='/content/img/pattern/sneaker_mesh_fabric-xs.png' width='22' height='22' data-htmlbg-url='/content/img/pattern/sneaker_mesh_fabric.png' class='margin-right-5 bordered cursor-pointer'><img src='/content/img/pattern/nistri-xs.png' data-htmlbg-url='/content/img/pattern/nistri.png' width='22' height='22' class='margin-right-5 bordered cursor-pointer'><img src='/content/img/pattern/paper-xs.png' data-htmlbg-url='/content/img/pattern/paper.png' width='22' height='22' class='bordered cursor-pointer'>";
$("#smart-styles > a #skin-checked").remove();
$.ajax({ method: 'GET', url: '/administration/GetLayoutOptions' }).done(function (response) {
    $("#" + response.CurrentTheme).prepend("<i class='fa fa-check fa-fw' id='skin-checked'></i>");
    $('input[type="checkbox"]#smart-fixed-header').prop("checked", response.FixedHeader);
    $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", response.FixedNavigation);
    $('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", response.FixedRibbon);
});

var $localStorageUsers = $('#localStorageUsers');

$.ajax({ method: 'GET', url: '/administration/GetUsersWithLocalStorage' }).done(function (response) {
    var array = response;
    if (array != '') {
        for (i in array) {
            $localStorageUsers.append("<option>" + array[i] + "</option>");
        }

    }
});

$("#smart-bgimages").fadeOut(),
$("#demo-setting").click(function () {
    $(".demo").toggleClass("activate")
}),
$('input[type="checkbox"]#smart-fixed-header').click(function () {
    $(this).is(":checked") ? $.root_.addClass("fixed-header") : ($('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1),
    $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !1),
    $.root_.removeClass("fixed-header"),
    $.root_.removeClass("fixed-navigation"),
    $.root_.removeClass("fixed-ribbon"));
    $.ajax({ method: 'POST', url: '/administration/SetFixedHeader', data: { fixed: $(this).is(":checked") } });

}),
$('input[type="checkbox"]#smart-fixed-navigation').click(function () {
    $(this).is(":checked") ? ($('input[type="checkbox"]#smart-fixed-header').prop("checked", !0),
    $.root_.addClass("fixed-header"),
    $.root_.addClass("fixed-navigation"),
    $('input[type="checkbox"]#smart-fixed-container').prop("checked", !1),
    $.root_.removeClass("container")) : ($('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1),
    $.root_.removeClass("fixed-navigation"),
    $.root_.removeClass("fixed-ribbon"));
    $.ajax({ method: 'POST', url: '/administration/SetFixedNavigation', data: { fixed: $(this).is(":checked") } });
}),
$('input[type="checkbox"]#smart-fixed-ribbon').click(function () {
    $(this).is(":checked") ? ($('input[type="checkbox"]#smart-fixed-header').prop("checked", !0),
    $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !0),
    $('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !0),
    $.root_.addClass("fixed-header"),
    $.root_.addClass("fixed-navigation"),
    $.root_.addClass("fixed-ribbon"),
    $('input[type="checkbox"]#smart-fixed-container').prop("checked", !1),
    $.root_.removeClass("container")) : $.root_.removeClass("fixed-ribbon");
    $.ajax({ method: 'POST', url: '/administration/SetFixedRibbon', data: { fixed: $(this).is(":checked") } });
}),
//$('input[type="checkbox"]#smart-fixed-footer').click(function () {
//    $(this).is(":checked") ? $.root_.addClass("fixed-page-footer") : $.root_.removeClass("fixed-page-footer")
//}),
//$('input[type="checkbox"]#smart-rtl').click(function () {
//    $(this).is(":checked") ? $.root_.addClass("smart-rtl") : $.root_.removeClass("smart-rtl")
//}),
//$("#smart-topmenu").on("change", function (a) {
//    $(this).prop("checked") ? (localStorage.setItem("sm-setmenu", "top"),
//    location.reload()) : (localStorage.setItem("sm-setmenu", "left"),
//    location.reload())
//}),
//"top" == localStorage.getItem("sm-setmenu") ? $("#smart-topmenu").prop("checked", !0) : $("#smart-topmenu").prop("checked", !1),
//$('input[type="checkbox"]#colorblind-friendly').click(function () {
//    $(this).is(":checked") ? $.root_.addClass("colorblind-friendly") : $.root_.removeClass("colorblind-friendly")
//}),
//$('input[type="checkbox"]#smart-fixed-container').click(function () {
//    $(this).is(":checked") ? ($.root_.addClass("container"),
//    $('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1),
//    $.root_.removeClass("fixed-ribbon"),
//    $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !1),
//    $.root_.removeClass("fixed-navigation"),
//    smartbgimage ? ($("#smart-bgimages").append(smartbgimage).fadeIn(1e3),
//    $("#smart-bgimages img").bind("click", function () {
//        var a = $(this)
//          , b = $("html");
//        bgurl = a.data("htmlbg-url"),
//        b.css("background-image", "url(" + bgurl + ")")
//    }),
//    smartbgimage = null) : $("#smart-bgimages").fadeIn(1e3)) : ($.root_.removeClass("container"),
//    $("#smart-bgimages").fadeOut())
//}),
$("#reset-smart-widget").bind("click", function () {
    $.SmartMessageBox({
        "title": "<i class='fa fa-refresh' style='color:green'></i> Reset Local Storage",
        "content": "Would you like to RESET all your saved widgets and clear LocalStorage?",
        "buttons": "[No][Yes]"
    }, function (a) {
        "Yes" == a && localStorage && (localStorage.clear(),
        location.reload())
    });
}),
$("#save-smart-widget").bind("click", function () {
    $.SmartMessageBox({
        "title": "<i class='fa fa-refresh' style='color:green'></i> Save Local Storage",
        "content": "Would you like to Save your LocalStorage?",
        "buttons": "[No][Yes]"
    }, function (a) {
        if (a == "Yes") {
            $.ajax({ method: 'POST', url: '/administration/SaveLocalStorage', data: { localStorage: localStorage } });
        }
        
    });
}),
$("#restore-smart-widget").bind("click", function () {
        $.SmartMessageBox({
            "title": "<i class='fa fa-refresh' style='color:green'></i> Restore Local Storage",
            "content": "Would you like to RESET all your saved widgets and restore LocalStorage?",
            "buttons": "[No][Yes]"
        }, function (a) {
            if (a == "Yes") {
                $.ajax({ method: 'POST', url: '/administration/GetLocalStorage', data: { user: $localStorageUsers[0].value } }).done(function (response) {
                    localStorage.clear();
                    var keys = Object.keys(response.localStorage)
                    for (var i = 0; i < keys.length; i++) {
                        localStorage.setItem(keys[i], response.localStorage[keys[i]]);
                    }
                    location.reload();
                });
            }
        });
}),
$("#smart-styles > a").on("click", function () {
    var a = $(this)
      , b = $("#logo img");
    $.root_.removeClassPrefix("smart-style").addClass(a.attr("id")),
    $("html").removeClassPrefix("smart-style").addClass(a.attr("id")),
    b.attr("src", a.data("skinlogo")),
    $("#smart-styles > a #skin-checked").remove(),
    a.prepend("<i class='fa fa-check fa-fw' id='skin-checked'></i>")
    $.ajax({ method: 'POST', url: '/administration/SetTheme', data: { theme: a.attr("id") } });
});
