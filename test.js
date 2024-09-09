import "./main.css";
import Lenis from "@studio-freight/lenis";
import WebFont from "webfontloader";
import { gsap, ScrollTrigger, Power1 } from "gsap/all";

const lenis = new Lenis();

const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time)=>{
//   lenis.raf(time * 1000)
// })

// gsap.ticker.lagSmoothing(0)

WebFont.load({
  custom: {
    families: ["Aeonik"],
  },
});

// const mm = gsap.matchMedia()
gsap.registerPlugin(ScrollTrigger);

// CONSOLE WATERMARK

console.log(
  '%c' + "Made by DAYOA11 - https://dayoa11.com",
  'background: black; color: white; padding: 5px 10px; border-radius: 2px;'
);

const preloader = document.getElementById("preloader");

const createDivs = () => {
  const widthGreaterThanHeight = window.innerWidth > window.innerHeight;
  const numberOfDivs = widthGreaterThanHeight ? 100 : 50;

  preloader.innerHTML = ""; // Clear existing divs
  for (let i = 0; i < numberOfDivs; i++) {
    const frame = document.createElement("div");
    frame.classList.add("frame");
    frame.classList.add("flex-c");

    const span = document.createElement("span");
    span.classList.add("loading");

    if (i % 2 === 1) {
      span.textContent = "LOADING";
      span.classList.add("blink");
    } else {
      span.textContent = "VIITA";
    }

    frame.appendChild(span);
    preloader.appendChild(frame);
  }
};

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const debouncedCreateDivs = debounce(createDivs, 300);

createDivs();
window.addEventListener("resize", debouncedCreateDivs);

window.addEventListener("load", () => {
  gsap.to(".frame", {
    autoAlpha: 0,
    stagger: {
      each: 0.02,
      from: "random",
    },
    duration: 0.1,
  });

  setTimeout(() => {
    preloader.style.display = "none";
    preloader.style.zIndex = -1;
  }, 2000);
});

// SCROLLING

const scrollableSections = [
  "hero",
  "products",
  "about",
  "bugatti-carbone",
  "viita-swarovski",
  "vitalmonitor-nano",
  "viita-race-hrv",
  "viita-titan-hrv",
  "viita-active-hrv",
  "viita-hybrid-hrv",
  "vitalmonitor",
  "vitalmonitor-og",
];
// const scrollableSections = ["hero", "products", "about"];
const navLinks = ["home", "products", "about"];
const navigationLinks = document.querySelectorAll(".nav-link");
const listLinks = document.querySelectorAll(".list-box.box > .list-item");

navigationLinks.forEach((anchor) => {
  const targetId = anchor.getAttribute("href").substring(1);
  const linkText = anchor.textContent.trim().toLowerCase();

  if (scrollableSections.includes(targetId) && navLinks.includes(linkText)) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(`#${targetId}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

listLinks.forEach((anchor) => {
  const productListText = anchor.getAttribute("data-scroll-to");

  // Check if the nav link and section are in the defined arrays
  if (scrollableSections.includes(productListText)) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(`#${productListText}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

// MARQUEE ANIMATION

const listItems = gsap.utils.toArray(".list-item");
const tracks = gsap.utils.toArray(".track");

listItems.forEach((item, i) => {
  const tl = gsap.timeline({ paused: true });

  tl.to(tracks[i], {
    x: `${-100.6 / 3}%`,
    duration: (tracks[i].offsetWidth / 1000) * 5,
    ease: "linear",
    repeat: -1,
  });

  item.addEventListener("mouseenter", () => tl.play());
  item.addEventListener("mouseleave", () => tl.pause());
});

// HEADQUATER IMAGES AIMATION

const slides = gsap.utils.toArray(".slide");
gsap.to(slides, { opacity: 1, duration: 5, stagger: 5, repeat: -1 });

// PRODUCT HOVER PREVIEW ANIMATION

const productList = document.querySelectorAll(".list-box.box > .list-item");
const previewAnimations = {};

const animateIn = (box, color) => {
  const slideColorBox = document.querySelector(".slide-color");

  if (previewAnimations[box.id]) previewAnimations[box.id].kill();
  previewAnimations[box.id] = gsap
    .timeline()
    .to(box, { duration: 0.5, top: "15%", ease: "power1.inOut" });

  slideColorBox.style.background = color;
};

const animateOut = (box) => {
  const slideColorBox = document.querySelector(".slide-color");

  if (previewAnimations[box.id]) previewAnimations[box.id].kill();
  previewAnimations[box.id] = gsap
    .timeline()
    .to(box, { duration: 0.5, top: "120%", ease: "power1.out" })
    .set(box, { top: "-100%" });

  slideColorBox.style.background = "transparent";
};

productList.forEach((product) => {
  const boxId = product.getAttribute("data-watch-preview");
  const boxColor = product.getAttribute("data-watch-color");
  const box = document.getElementById(boxId);

  product.addEventListener("mouseenter", () => animateIn(box, boxColor));
  product.addEventListener("mouseleave", () => animateOut(box));
});

// COUNTER, FINISHED && PROJECTS ANIMATION

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".counter-box",
    start: "top 70%",
    end: "bottom top",
    toggleActions: "restart none none none",
  },
});

tl.from(".finished", {
  autoAlpha: 0,
  stagger: 0.1,
});

tl.from(
  ".projects",
  {
    autoAlpha: 0,
    stagger: 0.1,
  },
  0
);

const counter = document.querySelector(".counter > h2.title");

tl.to(
  counter,
  {
    textContent: 10,
    snap: {
      textContent: 1,
    },
    ease: "linear",
    duration: 1,
  },
  0
);

// PRODUCT BACKGROUND SCROLL EFFECT

const productContainers = gsap.utils.toArray(".prod")
const productBgs = gsap.utils.toArray(".prod--bg")

const ftspTL = gsap.timeline();

productContainers.forEach((cont, i) => {

  ftspTL.to(cont, {
    ease: "none",
    // scrollTrigger: {
    //   trigger: cont,
    //   start: "top 30vh",
    //   scrub: true,
    // },
  })

  ftspTL.to(productBgs[i], {
    backgroundPosition: `center ${-innerHeight/4.7}px`,
    ease: "none",
    // scrollTrigger: {
    //   trigger: cont,
    //   scrub: true,
    // },
  })
  
})

// FRAMES ANIMATION
const framer = document.getElementById("framer");

const createFrames = () => {
  const widthGreaterThanHeight = window.innerWidth > window.innerHeight;
  const numberOfFrames = widthGreaterThanHeight ? 200 : 100;

  for (let i = 0; i < numberOfFrames; i++) {
    const frame = document.createElement("div");
    frame.classList.add("frame-in-framer");
    frame.classList.add("flex-c");

    framer.appendChild(frame);
  }
};

const debounce2 = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const debouncedCreateFrames = debounce2(createFrames, 300);

createFrames();
window.addEventListener("resize", debouncedCreateFrames);

ftspTL.from(".frame-in-framer", {
  scrollTrigger: {
    trigger: "#framer",
    start: "top top",
    pin: true,
    scrub: 1
  },
  autoAlpha: 0,
  stagger: {
    each: 0.02,
    from: "random",
  },
  duration: 0.3
})


// GRID ICON CAROUSEL

const gridSVGHolders = document.querySelectorAll(".grid-svg-item > .holder");
const gridSVGHoldersArray = [...gridSVGHolders];

const sortedGridHolders = gridSVGHoldersArray.reduce((acc, curr, index) => {
  if (index % 4 === 0) {
    acc.push([]);
  }
  acc[acc.length - 1].push(curr);
  return acc;
}, []);

let currentGridHolderItem = 0;

const animateGrid = () => {
  sortedGridHolders.forEach(row => {
    row.forEach(element => {
      element.classList.remove('show');
    });
  });

  sortedGridHolders.forEach(row => {
    if (row[currentGridHolderItem]) {
      row[currentGridHolderItem].classList.add('show');
    }
  });

  currentGridHolderItem = (currentGridHolderItem + 1) % 4;
}

setInterval(animateGrid, 300);

