let w = window.innerWidth;
let h = window.innerHeight;
let animated = false;
const select = function (el) {
  return document.getElementById(el);
};
const wrapper = select("main-wrapper");
const checkBox = select("toggle");
const images = [
  {
    id: "#planet-1",
    name: "planet-1"
  },
  {
    id: "#planet-2",
    name: "planet-2"
  },
  {
    id: "#moon-crescent",
    name: "moon-crescent"
  },
  {
    id: "#moon-full",
    name: "moon-full"
  },
  {
    id: "#constellation",
    name: "constellation"
  },
  {
    id: "#comet",
    name: "comet"
  },
  {
    id: "#galaxy",
    name: "galaxy"
  }
];
const svgs_stars = ["#star-1", "#star-2", "#star-3"];
checkBox.addEventListener("change", checkStatus);
window.addEventListener("resize", function () {
  w = window.innerWidth;
  h = window.innerHeight;
  init();
});

// building the pattern
function El(image, x, y, delay) {
  this.image = image;
  this.x = x;
  this.y = y;
  this.delay = delay;
}
El.prototype.attach = function () {
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  this.use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    this.image.id
  );
  this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  this.svg.setAttribute(
    "style",
    "top: " +
      this.y +
      "px; left: " +
      this.x +
      "px; animation-delay: " +
      this.delay +
      "s;"
  );
};
function Star(image, x, y) {
  this.image = image;
  this.x = x;
  this.y = y;
}
Star.prototype.attach = function () {
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  this.use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    this.image
  );
  this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  this.svg.setAttribute(
    "style",
    "top: " + this.y + "px; left: " + this.x + "px;"
  );
  this.svg.setAttribute("class", "star");
};
const spacing = 130;
let i, s;
function init() {
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
  i = 0;
  s = 0;
  for (let y = 0; y <= h; y += spacing) {
    if (y % (spacing * 2) === 0) {
      for (let x = 0; x <= w; x += spacing) {
        if (x % (spacing * 2) === 0) {
          draw(x, y + 10);
        } else {
          draw(x, y - 10);
        }
      }
    } else {
      for (let x = -(spacing / 2); x <= w; x += spacing) {
        if ((x + spacing / 2) % (2 * spacing) === 0) {
          draw(x, y + 10);
        } else {
          draw(x, y - 10);
        }
      }
    }
  }
  const newSpacing = spacing - 40;
  for (let y = newSpacing; y <= h; y += spacing) {
    for (let x = -(spacing / 2); x <= w; x += spacing) {
      if ((x + spacing / 2) % (2 * spacing) === 0) {
        drawStar(x, y + 10);
      } else {
        drawStar(x, y - 10);
      }
    }
  }
}
function draw(x, y) {
  const image = images[i];
  const delay = Math.floor(Math.random() * 2);
  const el = new El(image, x, y, delay);
  if (i === images.length - 1) {
    i = 0;
  } else {
    i++;
  }
  el.attach();
  el.svg.appendChild(el.use);
  wrapper.appendChild(el.svg);
}
function drawStar(x, y) {
  const image = stars[s];
  const star = new Star(image, x, y);
  if (s === stars.length - 1) {
    s = 0;
  } else {
    s++;
  }
  star.attach();
  star.svg.appendChild(star.use);
  wrapper.appendChild(star.svg);
}
init();

// animation functions
const moonFull = document.querySelector("symbol#moon-full");
const galaxy = document.querySelector("symbol#galaxy");
const planet1 = document.querySelector("symbol#planet-1");
const planet2 = document.querySelector("symbol#planet-2");
const moonCrescent = document.querySelector("symbol#moon-crescent");
const comet = document.querySelector("symbol#comet");
const constellationStars = document.querySelectorAll(
  "symbol#constellation polygon"
);
let cometLines = document.querySelectorAll("symbol#comet .trail");
const tlMoonFull = new TimelineMax({
  repeat: -1,
  paused: true
});
tlMoonFull.to(moonFull, 20, {
  rotation: 360,
  ease: Power0.easeNone,
  transformOrigin: "50% 50%"
});
const tlGalaxy = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
tlGalaxy.to(galaxy, 5, {
  rotationX: -45,
  ease: Power0.easeNone
});
const tlPlanet1 = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
tlPlanet1
  .to(planet1, 2, {
    rotation: 7,
    ease: Power0.easeNone
  })
  .to(planet1, 2, {
    rotation: -2,
    ease: Power0.easeNone
  });
const tlPlanet2 = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
tlPlanet2.to(planet2, 0.5, {
  x: 1,
  y: 1,
  ease: Power0.easeNone
});
const tlComet = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
const tlCometTrail = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
tlComet.to(comet, 0.15, {
  x: 1,
  y: 1,
  ease: Power0.easeNone
});
cometLines.forEach((el, i) => {
  const x2 = parseInt(el.getAttribute("x2")) - 10;
  const y2 = parseInt(el.getAttribute("y2")) - 10;
  let tl = new TimelineMax({
    repeat: -1,
    yoyo: true
  });
  tl.to(el, 1, {
    attr: {
      x2: x2,
      y2: y2
    },
    ease: Linear.easeNone
  });
  tlCometTrail.add(tl, i / 2);
});
const tlMoonCrescent = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
tlMoonCrescent
  .to(moonCrescent, 2, {
    rotation: 5,
    ease: Power0.easeNone
  })
  .to(moonCrescent, 2, {
    rotation: -5,
    ease: Power0.easeNone
  });
const tlConstellation = new TimelineMax({
  repeat: -1,
  paused: true
});
constellationStars.forEach((el, i) => {
  var tl = new TimelineMax({
    repeat: -1,
    yoyo: true
  });
  tl.to(el, 1, {
    opacity: 0.3,
    ease: Linear.easeNone
  });
  tlConstellation.add(tl, i);
});
function checkStatus() {
  if (checkBox.checked) {
    animated = true;
    startAnimation();
  } else {
    animated = false;
    stopAnimation();
  }
}
function startAnimation() {
  tlMoonFull?.play();
  tlMoonCrescent?.play();
  tlPlanet1?.play();
  tlPlanet2?.play();
  tlGalaxy?.play();
  tlComet?.play();
  tlCometTrail?.play();
  tlConstellation?.play();
  planet1DrawTl?.play();
  planet2DrawTl?.play();
  moonFullDrawTl?.play();
  moonCrescentDrawTl?.play();
  galaxyDrawTl?.play();
  constellationDrawTl?.play();
  cometDrawTl?.play();
}
function stopAnimation() {
  tlMoonFull?.pause();
  tlMoonCrescent?.pause();
  tlPlanet1?.pause();
  tlPlanet2?.pause();
  tlGalaxy?.pause();
  tlComet?.pause();
  tlCometTrail?.pause();
  tlConstellation?.pause();
  planet1DrawTl?.pause();
  planet2DrawTl?.pause();
  moonFullDrawTl?.pause();
  moonCrescentDrawTl?.pause();
  galaxyDrawTl?.pause();
  constellationDrawTl?.pause();
  cometDrawTl?.pause();
}

// images.map(el => {
//     const element = el.id + ' .drawPath';
//     const objectPaths = document.querySelectorAll(element);
//     const objectTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
//     const delay = Math.floor (Math.random() * 20) + 10;
//     const repeatDelay = Math.floor (Math.random() * 40) + 20;
//     // animating
//     objectPaths.forEach((path, i) => {
//       const tl = new TimelineMax({repeatDelay:repeatDelay, delay:delay, paused: false})
//       tl.to(path, 3, {drawSVG:"0%"});
//       objectTl.add(tl, i);
//     })
//   })

const planet1Draw = document.querySelectorAll("#planet-1 .drawPath");
const planet1DrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
planet1Draw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 40,
    delay: 10
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  planet1DrawTl.add(tl, i);
});
const planet2Draw = document.querySelectorAll("#planet-2 .drawPath");
const planet2DrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
planet2Draw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 25,
    delay: 45
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  planet2DrawTl.add(tl, i);
});
const cometDraw = document.querySelectorAll("#comet .drawPath");
const cometDrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
cometDraw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 10,
    delay: 25
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  cometDrawTl.add(tl, i);
});
const moonFullDraw = document.querySelectorAll("#moon-full .drawPath");
const moonFullDrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
moonFullDraw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 30,
    delay: 35
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  moonFullDrawTl.add(tl, i);
});
const galaxyDraw = document.querySelectorAll("#comet .drawPath");
const galaxyDrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
galaxyDraw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 35,
    delay: 55
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  galaxyDrawTl.add(tl, i);
});
const moonCrescentDraw = document.querySelectorAll("#moon-crescent .drawPath");
const moonCrescentDrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
moonCrescentDraw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 22,
    delay: 65
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  moonCrescentDrawTl.add(tl, i);
});
const constellationDraw = document.querySelectorAll("#constellation .drawPath");
const constellationDrawTl = new TimelineMax({
  repeat: -1,
  yoyo: true,
  paused: true
});
constellationDraw.forEach((path, i) => {
  const tl = new TimelineMax({
    repeatDelay: 28,
    delay: 28
  });
  tl.to(path, 3, {
    drawSVG: "0%"
  });
  constellationDrawTl.add(tl, i);
});
