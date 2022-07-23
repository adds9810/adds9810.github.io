var windoW = $(window).width();
var windoH = $(window).height();

var pageName = window.location.hash;
var pageHash;
var pageNum;

function init() {
  base();
  addEvent();
}

function base() {
  changeHash();
  deviceSize();
  navReset();
  $("nav ul li").eq(pageNum).children("a").addClass("on");
  $(pageHash).addClass("view");
}
function addEvent() {
  $("nav a, .go_about").on("click", movePage);
  $(".nav_btn").on("click", menuFun);
  $(".content_scroll").on("scroll", mobileScroll);
  $(window).on("mousewheel DOMMouseScroll", function (e) {
    var wheel = e.originalEvent.wheelDelta;
    scrollBarFun(wheel);
  });
}

/* 화면감지 */
function deviceSize() {
  $(".scroll_bar").remove();
  if (windoW > 1024) {
    $(".nav_btn").removeClass("open").addClass("play");
    $(".content_background").css({
      width: windoW * 4,
      "min-width": windoW * 0.7,
    });
    $(".cb_background")
      .removeClass("view")
      .removeClass("prev")
      .removeClass("next")
      .css({ "margin-left": 0, "min-width": windoW * 0.7 });
    $(".cb_background").eq(pageNum).addClass("view");
    $(".cb_background")
      .eq(pageNum + 1)
      .addClass("next")
      .css({ "margin-left": windoW * 0.7 });

    if ($(".cb_background.view").attr("data-val") == 3) {
      $(".cb_background:first-child")
        .addClass("next")
        .css({ "margin-left": windoW * 0.7 });
      count = 3;
    } else {
      $(".cb_background.view")
        .next()
        .addClass("next")
        .css({ "margin-left": windoW * 0.7 });
    }
    var variable = $(".content_box.view").children().children().height();
    var standard = $(window).outerHeight();
    var scrollbarMaxW = $(".content_overlay").width();
    if (standard < variable) {
      $(".content_box.view")
        .addClass("scroll")
        .prepend('<div class="scroll_bar"></div>');
      $(".content_box.view .content_col").css(
        "margin-top",
        parseInt($(".content_box.scroll .content_col").css("margin-top") + 1)
      );
      $(".content_box.view .scroll_bar").css({
        "max-width": scrollbarMaxW,
        width:
          ((standard -
            parseInt($(".content_box.scroll .content_col").css("margin-top")) -
            variable) /
            scrollbarMaxW) *
            100 +
          scrollbarMaxW,
      });
    } else {
      $(".content_box.view").removeClass("scroll");
      $(".content_box.view .content_col").css("margin-top", 0);
    }
  } else {
    $(".nav_btn").removeClass("play").addClass("open");
    $("nav a").removeClass("on");
    $("nav ul li")
      .eq($(".cb_background.view").attr("data-val"))
      .children("a")
      .addClass("on");
    $(".content_box").removeClass("scroll");
    $(".content_col").css({ "margin-top": 0 });
    $(".content_background").width(windoW);
    $(".cb_background")
      .removeClass("prev")
      .removeClass("next")
      .css({ "min-width": windoW, "margin-left": 0 });
    $(".cb_background:nth-child(1)").addClass("view");
  }
}

/* 해시태그 감지 */
function changeHash() {
  switch (pageName) {
    case "#about":
      pageHash = "#about";
      pageNum = 1;
      break;
    case "#work":
      pageHash = "#work";
      pageNum = 2;
      break;
    case "#contact":
      pageHash = "#contact";
      pageNum = 3;
      break;
    default:
      pageHash = "#home";
      pageNum = 0;
      break;
  }
}

/* nav 이벤트 리셋 */
function navReset() {
  $("nav a").removeClass("on");
  $(".content_box").removeClass("view");
}

/* nav click event */
function movePage() {
  if (windoW > 1024) {
    if ($(this).hasClass("go_about")) {
      count = 0;
    } else if (Number($(this).attr("data-val")) < 0) {
      count = 2;
    } else {
      count = Number($(this).attr("data-val")) - 1;
    }
    next_page();
  } else {
    navReset();
    $("header, .nav_btn").removeClass("on");
    if ($(this).hasClass("go_about")) {
      $("nav ul li").eq(1).children("a").addClass("on");
      $(".cb_background[data-val=1]").addClass("view");
      $(".content_scroll").animate(
        { scrollTop: $("#about").offset().top },
        500
      );
    } else {
      $(this).addClass("on");
      $(".cb_background[data-val=" + $(this).attr("data-val") + "]").addClass(
        "view"
      );
    }
  }
}

/* 메뉴옵션 */
function menuFun() {
  if ($(this).hasClass("play")) {
    next_page();
  } else if ($(this).hasClass("on")) {
    $(this).removeClass("on");
    $("header").removeClass("on");
    $(".content_scroll").css({ "margin-top": 0 });
  } else if ($(this).hasClass("open")) {
    $(this).addClass("on");
    $("header").addClass("on");
  }
}

/* mobile scroll Fun */
function mobileScroll() {
  if (windoW < 1025) {
    var contentScrollTop = $(".content_scroll").scrollTop();
    var minusNum = 100;
    var homeH = $("#home").height() - minusNum;
    var aboutH = homeH + $("#about").height() - minusNum;
    var workH = aboutH + $("#work").height() - minusNum;
    var navListChild;
    var navLo;
    if (contentScrollTop >= homeH && contentScrollTop < aboutH) {
      navListChild = 1;
      navLo = $("#about");
    } else if (contentScrollTop >= aboutH && contentScrollTop < workH) {
      navListChild = 2;
      navLo = $("#work");
    } else if (contentScrollTop >= workH) {
      navListChild = 3;
      navLo = $("#contact");
    } else {
      navListChild = 0;
      navLo = $("#home");
    }
    navReset();
    $("nav ul li").eq(navListChild).children("a").addClass("on");
    navLo.addClass("view");
    $(".cb_background").removeClass("view");
    $(".cb_background[data-val=" + navListChild + "]").addClass("view");
    window.location.hash.replace(
      window.location.hash,
      $("nav a.on").attr("href")
    );
  }
}

/* slide */
var count = 0;
var prev_num;
var next_num;
var scrollH = 1;

function next_page() {
  if (count < 2) {
    count++;
    prev_num = count - 1;
    next_num = count + 1;
  } else if (count > 1 && count < 3) {
    count++;
    prev_num = count - 1;
    next_num = 0;
  } else {
    count = 0;
    prev_num = 3;
    next_num = 1;
  }
  navReset();
  $("nav ul li").eq(count).children("a").addClass("on");
  $(".content_box").removeClass("scroll");
  $(".content_box").eq(count).addClass("view");
  $(".scroll_bar").remove();
  $(".content_col").css({ "margin-top": 0 });
  scrollH = 0;
  $(".cb_background")
    .removeClass("view")
    .removeClass("prev")
    .removeClass("next")
    .css({ "margin-left": 0 });
  $(".cb_background[data-val=" + prev_num + "]")
    .addClass("prev")
    .css({ "margin-left": 0 })
    .animate({ "margin-left": -windoW * 0.7 }, 500);
  $(".cb_background[data-val=" + count + "]")
    .addClass("view")
    .css({ "margin-left": windoW * 0.7 })
    .animate({ "margin-left": windoW * 0 }, 500);
  $(".cb_background[data-val=" + next_num + "]")
    .addClass("next")
    .css({ "margin-left": windoW + windoW * 0.3 })
    .animate({ "margin-left": windoW * 0.7 }, 500);
  var variable =
    $(".content_box").eq(count).children().children().height() + 40;
  var standard = $(window).outerHeight();
  var scrollbarMaxW = $(".content_overlay").width();
  if (standard < variable) {
    $(".content_box.view")
      .addClass("scroll")
      .prepend('<div class="scroll_bar"></div>');
    $(".content_box.view .scroll_bar").css({
      width: ((standard - variable) / scrollbarMaxW) * 100 + scrollbarMaxW,
    });
  }
}
/* slide */

/* scrollbar */
function scrollBarFun(wheel) {
  var variable =
    $(".content_box").eq(count).children().children().height() + 100;
  var standard = $(window).outerHeight();
  var scrollbarMaxW = $(".content_overlay").width();
  var scrollbarW =
    ((standard -
      parseInt($(".content_box.scroll .content_col").css("margin-top")) -
      variable) /
      scrollbarMaxW) *
      100 +
    scrollbarMaxW;
  if (wheel > 0) {
    scrollH--;
    if (scrollH <= 0) {
      scrollH = 0;
    }
    if (
      windoH * scrollH >
      $(".content_box.scroll .content_col").height() - windoH
    ) {
      $(".content_box.scroll .content_col").css({
        "margin-top":
          windoH - $(".content_box.scroll .content_col").outerHeight() - 20,
      });
    } else {
      $(".content_box.scroll .content_col").css({
        "margin-top": -scrollH * windoH,
      });
    }

    $(".content_box.view .scroll_bar").css({ width: scrollbarW });
  } else {
    scrollH++;
    if (
      windoH * scrollH >
      $(".content_box.scroll .content_col").height() - windoH
    ) {
      scrollH = Math.round(
        windoH / $(".content_box.scroll .content_col").width()
      );
      $(".content_box.scroll .content_col").css({
        "margin-top":
          windoH - $(".content_box.scroll .content_col").outerHeight() - 20,
      });
      $(".scroll_bar").css({ width: $(".content_overlay").width() });
    } else {
      $(".content_box.scroll .content_col").css({
        "margin-top": -windoH * scrollH,
      });
      $(".content_box.view .scroll_bar").css({ width: scrollbarW });
    }
  }
}
/* scroll */

$(function () {
  init();
});

$(window).on("resize", function () {
  init();
});
