var pageName = window.location.hash;
var pageNash;
var pageNum;

var count = 0;
var prevNum;
var nextNum;
var scrollHeight = 1;

var scrollWidth = $(".scroll_bar").width();

function init() {
  create();
  addEvent();
}

function create() {
  resetHash();
  changeHash();
  deviceSize();
  navReset();
  $("nav ul li").eq(pageNum).children("a").addClass("on").click();
  $(pageNash).addClass("view");
}

function addEvent() {
  $("nav a, .go_about").on("click", movePage);
  $(".nav_btn").on("click", navBtnFun);
  $(window).on("mousewheel DOMMouseScroll", function (e) {
    var wheel = e.originalEvent.wheelDelta;
    scrollFun(wheel);
  });
  $(".content_scroll").on("scroll", mobileScroll);
}
function resetHash() {
  if (location.hash != "") {
    location.href = "/";
  }
}
/* 화면감지 */
function deviceSize() {
  if ($(window).width() > 1024) {
    $(".nav_btn").removeClass("open").addClass("play");
    $(".content_background").width($(window).width() * 4);
    $(".cb_background")
      .removeClass("view")
      .removeClass("prev")
      .removeClass("next")
      .css({ "margin-left": 0, "min-width": $(window).width() * 0.7 });
    $(".cb_background").eq(pageNum).addClass("view");
    $(".cb_background")
      .eq(pageNum + 1)
      .addClass("next")
      .css({ "margin-left": $(window).width() * 0.7 });
  } else {
    $(".nav_btn").removeClass("play").addClass("open");
    $(".content_background").width($(window).width());
    $(".cb_background:nth-child(1)").addClass("view");
  }
}

/* setting */
function changeHash() {
  switch (pageName) {
    case "#about":
      pageNash = "#about";
      pageNum = 1;
      break;
    case "#work":
      pageNash = "#work";
      pageNum = 2;
      break;
    case "#contact":
      pageNash = "#contact";
      pageNum = 3;
      break;
    default:
      pageNash = "#home";
      pageNum = 0;
      break;
  }
}

/* nav 이벤트 리셋 */
function navReset() {
  $("nav a").removeClass("on");
  $(".content_box").removeClass("view");
}

/* nav btn event */
function movePage() {
  if ($(window).width() > 1024) {
    if ($(this).hasClass("go_about")) {
      count = 0;
    } else if (Number($(this).attr("data-val")) < 0) {
      count = 2;
    } else {
      count = Number($(this).attr("data-val")) - 1;
    }
    next_page();
  } else {
    if ($(this).hasClass("go_about")) {
      $("nav a").removeClass("on");
      $("nav ul li:nth-child(2) a").addClass("on");
      $("header, .nav_btn").removeClass("on");
      $(".cb_background").removeClass("view");
      $(".cb_background[data-val=1]").addClass("view");
      $(".content_scroll").animate(
        { scrollTop: $("#about").offset().top },
        500
      );
    } else {
      $("nav a").removeClass("on");
      $(this).addClass("on");
      $("header, .nav_btn").removeClass("on");
      $(".cb_background").removeClass("view");
      $(".cb_background[data-val=" + $(this).attr("data-val") + "]").addClass(
        "view"
      );
    }
  }
}
function next_page() {
  if (count < 2) {
    count++;
    prevNum = count - 1;
    nextNum = count + 1;
  } else if (count > 1 && count < 3) {
    count++;
    prevNum = count - 1;
    nextNum = 0;
  } else {
    count = 0;
    prevNum = 3;
    nextNum = 1;
  }
  $("nav a").removeClass("on");
  $("nav ul li").eq(count).children("a").addClass("on");
  $(".content_box").removeClass("view").removeClass("scroll");
  $(".content_box").eq(count).addClass("view");
  $(".scroll_bar").remove();
  $(".content_col").css({ "margin-top": 0 });
  scrollHeight = 0;
  $(".cb_background")
    .removeClass("view")
    .removeClass("prev")
    .removeClass("next")
    .css({ "margin-left": 0 });
  $(".cb_background[data-val=" + prevNum + "]")
    .addClass("prev")
    .css({ "margin-left": 0 })
    .animate({ "margin-left": -$(window).width() * 0.7 }, 500);
  $(".cb_background[data-val=" + count + "]")
    .addClass("view")
    .css({ "margin-left": $(window).width() * 0.7 })
    .animate({ "margin-left": $(window).width() * 0 }, 500);
  $(".cb_background[data-val=" + nextNum + "]")
    .addClass("next")
    .css({ "margin-left": $(window).width() + $(window).width() * 0.3 })
    .animate({ "margin-left": $(window).width() * 0.7 }, 500);
  var variable =
    $(".content_box").eq(count).children().children().height() + 40;
  var standard = $(window).outerHeight();
  var scrollbarMax = $(".content_overlay").width();
  if (standard < variable) {
    $(".content_box.view")
      .addClass("scroll")
      .prepend('<div class="scroll_bar"></div>');
    $(".content_box.view .scroll_bar").css({
      width: ((standard - variable) / scrollbarMax) * 100 + scrollbarMax,
    });
  }
}
function navBtnFun() {
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

/* mobile scroll */
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

/* scroll */
function scrollFun(wheel) {
  var variable =
    $(".content_box").eq(count).children().children().height() + 40;
  var standard = $(window).outerHeight();
  var scrollbarMax = $(".content_overlay").width();
  var scrollWidth =
    ((standard -
      parseInt($(".content_box.scroll .content_col").css("margin-top")) -
      variable) /
      scrollbarMax) *
      100 +
    scrollbarMax;
  if (wheel > 0) {
    scrollHeight--;
    if (scrollHeight <= 0) {
      scrollHeight = 0;
    } else {
      $(".content_box.view .scroll_bar").css({
        width: scrollWidth,
      });
    }
    if (
      $(window).height() * scrollHeight >
      $(".content_box.scroll .content_col").height() - $(window).height()
    ) {
      $(".content_box.scroll .content_col").css({
        "margin-top":
          $(window).height() -
          $(".content_box.scroll .content_col").outerHeight() -
          20,
      });
    } else {
      $(".content_box.scroll .content_col").css({
        "margin-top": -scrollHeight * $(window).height(),
      });
    }

    $(".content_box.view .scroll_bar").css({
      width:
        ((standard -
          parseInt($(".content_box.scroll .content_col").css("margin-top")) -
          variable) /
          scrollbarMax) *
          100 +
        scrollbarMax,
    });
  } else {
    scrollHeight++;
    if (
      $(window).height() * scrollHeight >
      $(".content_box.scroll .content_col").height() - $(window).height()
    ) {
      scrollHeight = Math.round(
        $(window).height() / $(".content_box.scroll .content_col").width()
      );
      $(".content_box.scroll .content_col").css({
        "margin-top":
          $(window).height() -
          $(".content_box.scroll .content_col").outerHeight() -
          20,
      });
      $(".scroll_bar").css({ width: $(".content_overlay").width() });
    } else {
      $(".content_box.scroll .content_col").css({
        "margin-top": -$(window).height() * scrollHeight,
      });
      $(".content_box.view .scroll_bar").css({
        width: scrollWidth,
      });
    }
  }
}

function resizeDevice() {
  $(".scroll_bar").remove();
  if ($(window).width() > 1024) {
    $(".content_background").width($(window).width() * 4);
    $(".cb_background").css({ "min-width": $(window).width() * 0.7 });
    if ($(".cb_background.view").attr("data-val") == 3) {
      $(".cb_background:first-child")
        .addClass("next")
        .css({ "margin-left": $(window).width() * 0.7 });
      count = 3;
    } else {
      $(".cb_background.view")
        .next()
        .addClass("next")
        .css({ "margin-left": $(window).width() * 0.7 });
    }
    var variable = $(".content_box.view").children().children().height();
    var standard = $(window).outerHeight();
    var scrollbarMax = $(".content_overlay").width();
    if (standard < variable) {
      $(".content_box.view")
        .addClass("scroll")
        .prepend('<div class="scroll_bar"></div>');
      $(".content_box.view .content_col").css(
        "margin-top",
        parseInt($(".content_box.scroll .content_col").css("margin-top") + 1)
      );
      $(".content_box.view .scroll_bar").css({
        "max-width": scrollbarMax,
        width: scrollWidth,
      });
    } else {
      $(".content_box.view").removeClass("scroll");
      $(".content_box.view .content_col").css("margin-top", 0);
    }
  } else {
    $(".content_box").removeClass("scroll");
    $("nav a").removeClass("on");
    $("nav ul li")
      .eq($(".cb_background.view").attr("data-val"))
      .children("a")
      .addClass("on");
    $(".content_col").css({ "margin-top": 0 });
    $(".content_background").width($(window).width());
    $(".cb_background")
      .removeClass("prev")
      .removeClass("next")
      .css({ "min-width": $(window).width(), "margin-left": 0 });
  }
}

$(function () {
  init();
});

/* resize */
$(window).on("resize", function () {
  deviceSize();
  resizeDevice();
});
