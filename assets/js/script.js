"use strict";

var header = document.querySelector("header");
var navLi = document.querySelectorAll("nav ul li");
var navA = document.querySelectorAll("nav a");
var navBtn = document.querySelector(".nav_btn");
var contentBackground = document.querySelector(".content_background");
var cbBackground = document.querySelectorAll(".cb_background");
var contentScroll = document.querySelector(".content_scroll");
var contentBox = document.querySelectorAll(".content_box");
var homeSec = document.querySelector("#home");
var aboutSec = document.querySelector("#about");
var workSec = document.querySelector("#work");
var contactSec = document.querySelector("#contact");
var maxSec = document.querySelectorAll("nav ul li").length;

var pageName = window.location.hash;
var count = void 0;
var prevNum = void 0;
var nextNum = void 0;

function init() {
  create();
  addEvent();
}

function create() {
  if (window.location.hash !== "") {
    window.location.href = "/";
  }
  navClassReset();
  boxClassReset();

  navLi[0].children[0].classList.add("on");
  document.querySelector("#home").classList.add("view");
  resizeEvent();
  getDb();
}

function addEvent() {
  window.addEventListener("resize", resizeEvent);
  document.querySelector(".go_about").addEventListener("click", movePage);
  navA.forEach(function (idx) {
    idx.addEventListener("click", movePage);
  });
  navBtn.addEventListener("click", navBtnFun);
}

function navClassReset() {
  navA.forEach(function (idx) {
    idx.classList.remove("on");
  });
}

function bgClassReset() {
  cbBackground.forEach(function (idx) {
    idx.classList.remove("view", "prev", "next");
    var moveLeft = 0;
    if (window.innerWidth > 1024) {
      moveLeft = window.innerWidth + window.innerWidth * 0.3 + "px";
    }
    idx.style.marginLeft = moveLeft;
  });
}

function boxClassReset() {
  contentBox.forEach(function (idx) {
    idx.classList.remove("view");
  });
}
function addWebScroll() {
  window.addEventListener("mousewheel", webScroll);
  window.addEventListener("DOMMouseScroll", webScroll);
}

function removeWebScroll() {
  window.removeEventListener("mousewheel", webScroll);
  window.removeEventListener("DOMMouseScroll", webScroll);
}

function resizeEvent() {
  var deviceIf = window.innerWidth > 1024;
  var bgNum = Number(document.querySelector("nav li a.on").dataset.val);
  var navRClass = deviceIf ? "open" : "play";
  var navAClass = deviceIf ? "play" : "open";
  var contentBgW = deviceIf ? window.innerWidth * 4 : window.innerWidth;

  navBtn.classList.remove(navRClass);
  navBtn.classList.add(navAClass);
  contentBackground.style.width = contentBgW + "px";
  bgClassReset();
  cbBackground.forEach(function (idx) {
    var bgWidth = "auto";
    if (deviceIf) {
      bgWidth = window.innerWidth * 0.7 + "px";
    }
    idx.style.width = bgWidth;
  });
  cbBackground[bgNum].classList.add("view");
  count = bgNum - 1;

  if (deviceIf) {
    var nextBgNum = bgNum + 1;
    if (nextBgNum > navLi.length - 1) {
      nextBgNum = 0;
    }
    cbBackground[nextBgNum].classList.add("next");
    cbBackground[nextBgNum].style.marginLeft = window.innerWidth * 0.7 + "px";
    moveBg();

    addWebScroll();
    contentScroll.removeEventListener("scroll", mobileScroll);
  } else {
    var moveHash = document.querySelector(
      document.querySelector("nav a.on").getAttribute("href")
    );
    contentScroll.scroll({ top: moveHash.offsetTop, behavior: "smooth" });

    removeWebScroll();
    contentScroll.addEventListener("scroll", mobileScroll);
  }
}

async function getDb() {
  var res = await fetch("assets/json/db.json");
  var resData = await res.json();
  renderList(resData);
}
function renderList(data) {
  var li = [];
  var imgUrl = "assets/img/portfolio/";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = data[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var item = _step.value;

      li.push("<li>");
      li.push(
        '<a href="' +
          item.url +
          '" target="' +
          item.linkTarget +
          '" title="' +
          item.linkTit +
          '">'
      );
      li.push(
        '<img src="' + imgUrl + item.imgSrc + '" alt="' + item.imgAlt + '" />'
      );
      li.push('<div class="portfolio_con">');
      li.push('<strong class="portfolio_tit">' + item.tit + "</strong>");
      li.push(
        '<p class="portfolio_txt">' +
          item.date +
          "<br />(" +
          item.lang +
          ") </p>"
      );
      li.push("</div>");
      li.push("</a>");
      li.push("</li>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.getElementById("workList").innerHTML = li.join("");
}

function movePage() {
  if (window.innerWidth > 1024) {
    if (this.classList.contains("go_about")) {
      count = 0;
    } else if (Number(this.dataset.val) < 0) {
      count = 2;
    } else {
      count = Number(this.dataset.val) - 1;
    }
    moveBg();
  } else {
    var moveNum = this.dataset.val;
    var onBtn = this;
    if (this.classList.contains("go_about")) {
      moveNum = 1;
      onBtn = document.querySelector("nav ul li:nth-child(2) a");
      contentScroll.scroll({ top: aboutSec.offsetTop, behavior: "smooth" });
    }
    bgClassReset();
    navClassReset();
    header.classList.remove("on");
    navBtn.classList.remove("on");
    onBtn.classList.add("on");
    document
      .querySelector(".cb_background[data-val='" + moveNum + "']")
      .classList.add("view");
  }
}

function moveBg() {
  count = count++ < maxSec - 1 ? count++ : 0;
  prevNum = count - 1 > -1 ? count - 1 : 3;
  nextNum = count + 1 < maxSec ? count + 1 : 0;

  boxClassReset();
  navClassReset();
  bgClassReset();
  document.querySelectorAll(".content_row").forEach(function (idx) {
    idx.scrollTop = 0;
  });
  navLi[count].children[0].classList.add("on");
  contentBox[count].classList.add("view");

  document.querySelector(
    ".cb_background[data-val='" + prevNum + "']"
  ).style.marginLeft = 0;
  document.querySelector(
    ".cb_background[data-val='" + count + "']"
  ).style.marginLeft = window.innerWidth * 0.7 + "px";
  document.querySelector(
    ".cb_background[data-val='" + nextNum + "']"
  ).style.marginLeft = window.innerWidth + window.innerWidth * 0.3 + "px";

  setTimeout(function () {
    document
      .querySelector(".cb_background[data-val='" + nextNum + "']")
      .classList.add("next");
    document
      .querySelector(".cb_background[data-val='" + count + "']")
      .classList.add("view");
    document
      .querySelector(".cb_background[data-val='" + prevNum + "']")
      .classList.add("prev");
    document.querySelector(".cb_background.prev").style.marginLeft =
      -window.innerWidth * 0.7 + "px";
    document.querySelector(".cb_background.view").style.marginLeft = 0;
    document.querySelector(".cb_background.next").style.marginLeft =
      window.innerWidth * 0.7 + "px";
  }, 10);
}

function navBtnFun() {
  if (navBtn.classList.contains("play")) {
    moveBg();
    window.location.hash = document
      .querySelector("nav li a.on")
      .getAttribute("href");
  } else {
    if (navBtn.classList.contains("on")) {
      navBtn.classList.remove("on");
      header.classList.remove("on");
      navBtn.classList.remove("on");
      contentScroll.style.marginTop = 0;
    } else {
      navBtn.classList.add("on");
      header.classList.add("on");
      navBtn.classList.add("on");
    }
  }
}

function webScroll(e) {
  e.preventDefault();
  var viewSec = document.querySelector(".content_box.view .content_row");

  if (
    e.deltaY > 0 &&
    Math.ceil(viewSec.scrollTop + viewSec.clientHeight) >=
      document.querySelector(".content_box.view .content_col").clientHeight
  ) {
    navBtnFun();
  }
}

function mobileScroll() {
  var contentScrollTop = contentScroll.scrollTop;
  var minusNum = 0;
  var homeH = homeSec.clientHeight - minusNum;
  var aboutH = homeH + aboutSec.clientHeight - minusNum;
  var workH = aboutH + workSec.clientHeight - minusNum;
  var navListChild = void 0;
  var navLo = void 0;
  if (contentScrollTop >= homeH && contentScrollTop < aboutH) {
    navListChild = 1;
    navLo = aboutSec;
  } else if (contentScrollTop >= aboutH && contentScrollTop < workH) {
    navListChild = 2;
    navLo = workSec;
  } else if (contentScrollTop >= workH) {
    navListChild = 3;
    navLo = workSec;
  } else {
    navListChild = 0;
    navLo = homeSec;
  }

  boxClassReset();
  navClassReset();
  bgClassReset();
  navLi[navListChild].children[0].classList.add("on");
  navLo.classList.add("view");
  document
    .querySelector(".cb_background[data-val='" + navListChild + "']")
    .classList.add("view");
}

init();
