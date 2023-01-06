const header = document.querySelector("header");
const navLi = document.querySelectorAll("nav ul li");
const navA = document.querySelectorAll("nav a");
const navAOn = document.querySelector("nav li a.on");
const navBtn = document.querySelector(".nav_btn");
const headerNav = document.querySelector("header, .nav_btn");
const contentBackground = document.querySelector(".content_background");
const cbBackground = document.querySelectorAll(".cb_background");
const contentScroll = document.querySelector(".content_scroll");
const contentBox = document.querySelectorAll(".content_box");
const homeSec = document.querySelector("#home");
const aboutSec = document.querySelector("#about");
const workSec = document.querySelector("#work");
const contactSec = document.querySelector("#contact");
const deviceIf = window.innerWidth > 1024;

let pageName = window.location.hash;
let pageHash;
let pageNum;
let count = 0;
let prevNum;
let nextNum;

function init() {
  create();
  addEvent();
}

function create() {
  changeHash();
  deviceSize();
  classReset();

  navLi[pageNum].children[0].classList.add("on");
  document.querySelector(pageHash).classList.add("view");
}

function addEvent() {
  document.querySelector(".go_about").addEventListener("click", movePage);
  navA.forEach((idx) => {
    idx.addEventListener("click", movePage);
  });
  navBtn.addEventListener("click", navBtnFun);
  contentScroll.addEventListener("scroll", mobileScroll);
  // $(window).on("mousewheel DOMMouseScroll", function (e) {
  //   let wheel = e.originalEvent.wheelDelta;
  //   scrollFun(wheel);
  // });
}

function deviceSize() {
  window.location.hash = navAOn.getAttribute("href");
  let bgNum = Number(navAOn.dataset.val);
  if (isNaN(bgNum)) {
    bgNum = 0;
    window.location.hash = "#home";
  }
  let navRClass = deviceIf ? "open" : "play";
  let navAClass = deviceIf ? "play" : "open";
  let contentBgW = deviceIf ? window.innerWidth * 4 : window.innerWidth;

  navBtn.classList.remove(navRClass);
  navBtn.classList.add(navAClass);
  contentBackground.style.width = contentBgW + "px";
  cbBackground.forEach((idx) => {
    idx.classList.remove("view", "prev", "next");
    idx.style.marginLeft = 0;
    if (deviceIf) {
      idx.style.minWidth = window.innerWidth * 0.7 + "px";
    }
  });
  cbBackground[bgNum].classList.add("view");
  count = bgNum;

  if (deviceIf) {
    let nextBgNum = bgNum + 1;
    if (nextBgNum > navLi.length - 1) {
      nextBgNum = 0;
    }
    cbBackground[nextBgNum].classList.add("next");
    cbBackground[nextBgNum].style.marginLeft = window.innerWidth * 0.7 + "px";
  } else {
    let contentScrollTop = contentScroll.scrollTop;
    let windowHash = document.querySelector(window.location.hash);
    if (
      contentScrollTop < windowHash.offsetTop ||
      contentScrollTop > windowHash.offsetTop + windowHash.outerHeight
    ) {
      contentScroll.scroll({ top: windowHash.offsetTop, behavior: "smooth" });
    }
  }
}

function changeHash() {
  pageHash = pageName;
  switch (pageName) {
    case "#about":
      pageNum = 1;
      break;
    case "#work":
      pageNum = 2;
      break;
    case "#contact":
      pageNum = 3;
      break;
    default:
      pageHash = "#home";
      pageNum = 0;
      break;
  }
}

function classReset() {
  navA.forEach((idx) => {
    idx.classList.remove("on");
  });
  contentBox.forEach((idx) => {
    idx.classList.remove("view", "scroll");
  });
}

function movePage() {
  if (deviceIf) {
    if (this.classList.contains("go_about")) {
      count = 0;
    } else if (Number(this.dataset.val) < 0) {
      count = 2;
    } else {
      count = Number(this.dataset.val) - 1;
    }
    nextPage();
  } else {
    let moveNum = this.dataset.val;
    let onBtn = this;
    if (this.classList.contains("go_about")) {
      moveNum = 1;
      onBtn = document.querySelector("nav ul li:nth-child(2) a");
      contentScroll.scroll({ top: aboutSec.offsetTop, behavior: "smooth" });
    }
    cbBackground.forEach((idx) => {
      idx.classList.remove("view");
    });
    navA.forEach((idx) => {
      idx.classList.remove("on");
    });
    headerNav.classList.remove("on");
    onBtn.classList.add("on");
    document
      .querySelector(`.cb_background[data-val='${moveNum}']`)
      .classList.add("view");
  }
}

function nextPage() {
  if (count < 3) {
    count++;
    prevNum = count - 1 > 0 ? count - 1 : 3;
    nextNum = count + 1;
  } else {
    count = 0;
    prevNum = 3;
    nextNum = 1;
  }
  // if (count < 2) {
  //   count++;
  //   prevNum = count - 1 > 0 ? count - 1 : 3;
  //   nextNum = count + 1;
  // } else if (count > 1 && count < 3) {
  //   count++;
  //   prevNum = count - 1 > 0 ? count - 1 : 3;
  //   nextNum = 0;
  // } else {
  //   count = 0;
  //   prevNum = 3;
  //   nextNum = 1;
  // }
  console.log(nextNum);
  classReset();
  document.querySelectorAll(".content_row").forEach((idx) => {
    idx.scrollTop = 0;
  });
  cbBackground.forEach((idx) => {
    idx.classList.remove("view", "prev", "next");
    idx.style.marginLeft = 0;
  });
  navLi[count].children[0].classList.add("on");
  contentBox[count].classList.add("view");
  document
    .querySelector(`.cb_background[data-val='${prevNum}']`)
    .classList.add("prev");

  document.querySelector(
    `.cb_background[data-val='${prevNum}']`
  ).style.marginLeft = 0;

  document.querySelector(
    `.cb_background[data-val='${prevNum}']`
  ).style.marginLeft = -window.innerWidth * 0.7 + "px";
  document
    .querySelector(`.cb_background[data-val='${count}']`)
    .classList.add("view");
  document.querySelector(
    `.cb_background[data-val='${count}']`
  ).style.marginLeft = window.innerWidth * 0.7 + "px";
  document.querySelector(
    `.cb_background[data-val='${count}']`
  ).style.marginLeft = 0;
  document
    .querySelector(`.cb_background[data-val='${nextNum}']`)
    .classList.add("next");
  document.querySelector(
    `.cb_background[data-val='${nextNum}']`
  ).style.marginLeft = window.innerWidth + window.innerWidth * 0.3 + "px";
  document.querySelector(
    `.cb_background[data-val='${nextNum}']`
  ).style.marginLeft = window.innerWidth * 0.7 + "px";
}

function navBtnFun() {
  if (this.classList.contains("play")) {
    nextPage();
    window.location.hash = navAOn.getAttribute("href");
  } else {
    if (this.classList.contains("on")) {
      this.classList.remove("on");
      headerNav.classList.remove("on");
      contentScroll.style.marginTop = 0;
    } else {
      this.classList.add("on");
      headerNav.classList.add("on");
    }
  }
}

function mobileScroll() {
  if (window.innerWidth < 1025) {
    let contentScrollTop = contentScroll.scrollTop;
    let minusNum = 100;
    let homeH = homeSec.clientHeight - minusNum;
    let aboutH = homeH + aboutSec.clientHeight - minusNum;
    let workH = aboutH + workSec.clientHeight - minusNum;
    let navListChild;
    let navLo;
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
    classReset();
    navLi[navListChild].children[0].classList.add("on");
    navLo.classList.add("view");
    cbBackground.forEach((idx) => {
      idx.classList.remove("view");
    });
    document
      .querySelector(`.cb_background[data-val='${navListChild}']`)
      .classList.add("view");
    window.location.hash.replace(
      window.location.hash,
      navAOn.getAttribute("href")
    );
  }
}

// function resizeDevice() {
//   if (deviceIf) {
//   } else {
//   }
// }

init();

/* resize */
window.addEventListener("resize", deviceSize);
