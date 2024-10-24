import "./main.css";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";
import SplitType from 'split-type'

const lenis = new Lenis({
  duration: 0.5,
  easing: (t) => t,
});

const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

ScrollTrigger.defaults({
  fastScrollEnd: 3000
})

//-------------------------------------------------------------------------------------------------
// const setPresentNavigationStatus = (navlink) => {
//   const presentlyActive = document.querySelectorAll(
//   document.getElementById(navlink).classList.add("active")
//   );
// }
//-------------------------------------------------------------------------------------------------

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const loadViita = () => {
  console.log(
    "%c" + "Made by DAYOA - https://dayoa11.com",
    "background: black; color: white; padding: 5px 10px; border-radius: 2px;"
  );

  const preloader = document.getElementById("preloader");

  const createDivs = () => {
    const widthGreaterThanHeight = window.innerWidth > window.innerHeight;
    const numberOfDivs = widthGreaterThanHeight ? 100 : 50;

    preloader.innerHTML = "";
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

  const debouncedCreateDivs = debounce(createDivs, 300);

  createDivs();
  window.addEventListener("resize", debouncedCreateDivs);

  window.addEventListener("load", () => {
    setTimeout(() => {
      gsap.to(".frame", {
        autoAlpha: 0,
        stagger: {
          each: 0.02,
          from: "random",
        },
        duration: 0.1,
      });
    }, 2000);

    setTimeout(() => {
      preloader.style.display = "none";
      preloader.style.zIndex = -1;
    }, 4100);
  });
};

loadViita();

const manageNavigation = () => {
  const scrollableSections = [
    "hero",
    "products",
    "about",
    "bugatti-carbone",
    "bugatti-ceramique",
    "viita-swarovski",
    "vitalmonitor-nano",
    "viita-race-hrv",
    "viita-titan-hrv",
    "viita-active-hrv",
    "viita-hybrid-hrv",
    "vitalmonitor",
    "vitalmonitor-og",
  ];
  
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

    if (scrollableSections.includes(productListText)) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        lenis.scrollTo(`#${productListText}`, {
          duration: 1.5,
          immediate: false,
          offset: 0,
          easing: (t) => 1 - Math.pow(1 - t, 3)
        });
      });
    }
  });
};

manageNavigation();

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

const slides = gsap.utils.toArray(".slide");
gsap.to(slides, { opacity: 1, duration: 5, stagger: 5, repeat: -1 });

const hoverProductOnMarqueeHover = () => {
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
};

hoverProductOnMarqueeHover();

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

// --------------------------------- PRODUCTS

gsap.fromTo("#counter-box", {
  visibility: "visible"
}, {
  scrollTrigger: {
    trigger: "#products",
    start: "top top",
    toggleActions: "play pause none reverse"
  },
  visibility: "hidden",
  duration: 0.02
})

const productPinnersList = gsap.utils.toArray(".product-pinner");

const animateProductOnScroll = (currentProduct, nextProduct) => {
  gsap.fromTo(currentProduct, {
    scale: 1,
    rotate: 0
  }, {
    scrollTrigger: {
      trigger: nextProduct,
      start: "top 60%",
      end: "top top",
      toggleActions: "play complete play reverse",
      scrub: true
    },
    scale: 0.8,
    rotate: 5
  });
}

const animateBackgroundOnScroll = (productBg, nextProduct) => {
  if (productBg !== null) {
    gsap.fromTo(productBg, {
      y: "0%"
    }, {
      scrollTrigger: {
        trigger: nextProduct,
        start: "top 90%",
        end: "top top",
        toggleActions: "play complete play reverse",
        scrub: true
      },
      y: "-15%"
    });
  }
}

productPinnersList.forEach((productPinner, index) => {
  const product = productPinner.querySelector(".product");
  const productImage = productPinner.querySelector(".prod--main > img");
  const productBg = productPinner.querySelector(".prod--bg");
  const reducers = productPinner.querySelectorAll(".reduce-on-pin");

  const nextProductPinner = productPinnersList[index + 1];
  const nextProduct = nextProductPinner ? nextProductPinner.querySelector(".product") : null;

  mm.add("(min-aspect-ratio: 1/1)", () => {
    if (index !== productPinnersList.length - 1) {
      animateProductOnScroll(product, nextProduct);
    }
  })

  if (index !== productPinnersList.length - 1) {
    animateBackgroundOnScroll(productBg, nextProduct);
  }

  gsap.to(product, {
    scrollTrigger: {
      trigger: productPinner,
      start: "top top",
      end: "bottom top",
      toggleActions: "none complete reverse reset",
      pin: true,
      anticipatePin: 1,
      pinSpacing: false
    },
    opacity: 0,
    duration: 0.02
  });

  ScrollTrigger.refresh();

  if (index === 2 || index === 8 && reducers.length > 0) {
    gsap.fromTo(reducers, {
      opacity: 1
    }, {
      scrollTrigger: {
        trigger: product,
        start: "top 5%",
        end: "bottom top",
        toggleActions: "play pause play reverse"
      },
      opacity: 0.2,
      duration: 0.3
    })
  }

  if (productImage !== null) {
    gsap.fromTo(productImage, {
      y: "60vw"
    }, {
      scrollTrigger: {
        trigger: productPinner,
        start: "top bottom",
        end: "top 10%",
        toggleActions: "play pause none reverse",
        scrub: true
      },
      y: "0vw"
    });
  }

  if (productBg !== null) {
    gsap.fromTo(productBg, {
      y: "-70%"
    }, {
      scrollTrigger: {
        trigger: productPinner,
        start: "top bottom",
        end: "top top",
        toggleActions: "play pause none reverse",
        scrub: true
      },
      y: "0%"
    });
  }
});

// INTER FRAMES

const createInterFrames = () => {
  const widthGreaterThanHeight = window.innerWidth > window.innerHeight;
  const numberOfDivs = widthGreaterThanHeight ? 200 : 100;

  const interFramesHolder = document.getElementById("framer");

  for (let d = 0; d < numberOfDivs; d++) {
    const div = document.createElement("div");
    div.classList.add("inter-divs");

    interFramesHolder.appendChild(div);
  }
}

const debouncedCreateInterFrames = debounce(createInterFrames, 300);
createInterFrames();
window.addEventListener("resize", debouncedCreateInterFrames);

gsap.fromTo(".inter-divs", {
  visibility: "hidden"
}, {
  scrollTrigger: {
    trigger: "#v-og-trigger",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  visibility: "visible",
  stagger: {
    each: 0.02,
    from: "random",
  },
  ease: "none",
  duration: 0.1
})

// -------------------------- ABOUT

const partShowcase = document.querySelectorAll(".part-showcase");

partShowcase.forEach(showcase => {
  const healthIcons = showcase.querySelectorAll(".icon-health");
  const softwareIcons = showcase.querySelectorAll(".icon-software");
  const hardwareIcons = showcase.querySelectorAll(".icon-hardware");
  const showcaseTexts = showcase.querySelectorAll(".showcase-word");
  
  const animationInts = {
    200: [0, 0, 0, 1],
    600: [1, 0, 0, 0],
    800: [0, 1, 0, 0],
    1000: [0, 0, 1, 0],
    1200: [0, 0, 0, 1]
  }

  const displayShowcase = () => {
    for (const int of Object.keys(animationInts)) {
      setTimeout(() => {
        healthIcons.forEach(healthIcon => healthIcon.style.opacity = animationInts[int][0]);
        softwareIcons.forEach(softwareIcon => softwareIcon.style.opacity = animationInts[int][1]);
        hardwareIcons.forEach(hardwareIcon => hardwareIcon.style.opacity = animationInts[int][2]);
        showcaseTexts.forEach(showcaseText => showcaseText.style.opacity = animationInts[int][3]);
      }, Number(int))
    }
  }

  displayShowcase();
  setInterval(displayShowcase, 1700);
})

// -------------------------

gsap.fromTo("#about-icon-showcase", {
  opacity: 0
}, {
  scrollTrigger: {
    trigger: "#about",
    start: "top 5%",
    end: "+=500",
    scrub: true
  },
  opacity: 1
})

gsap.to("#about-icon-showcase > .part-showcase:not(:nth-child(5))", {
  scrollTrigger: {
    trigger: "#about",
    start: "top -=50%",
    end: "+=50%",
    scrub: true
  },
  opacity: 0
})

const centerShowcase = document.querySelector("#about-icon-showcase > .part-showcase:nth-child(5)");
const scalingLogoCon = document.querySelector("#scaling-logo");
const aboutImg = document.querySelector("#about-img");
const aboutContent = document.querySelector("#about-content");

ScrollTrigger.create({
  trigger: "#about",
  start: "top -=40%",
  onEnter: () => {
    centerShowcase.style.opacity = 0;
    scalingLogoCon.style.opacity = 1;
    // aboutContent.classList.add("difference");
  },
  onLeaveBack: () => {
    centerShowcase.style.opacity = 1;
    scalingLogoCon.style.opacity = 0;
    // aboutContent.classList.remove("difference");
  }
});

gsap.to("#scaling-logo > svg", {
  scrollTrigger: {
    trigger: "#about",
    start: "top -=80%",
    end: "bottom+=100% bottom",
    endTrigger: "h1.intro-text",
    scrub: true
  },
  x: "50vw",
  width: "5600vw",
  height: "5600vw"
})

gsap.to("#rectOpac", {
  scrollTrigger: {
    // trigger: "#about",
    trigger: "h1.intro-text",
    start: "top bottom+=220%",
    end: "+=120%",
    // end: "bottom bottom",
    // endTrigger: "h1.intro-text",
    onEnter: () => aboutImg.style.opacity = 1,
    onLeaveBack: () => aboutImg.style.opacity = 0,
    scrub: true,
    markers: true
  },
  opacity: 0
})

gsap.fromTo(aboutImg, {
  y: "10vh",
  scale: 1.2
}, {
  scrollTrigger: {
    trigger: "h1.intro-text",
    start: "top bottom+=200%",
    end: "bottom+=150% bottom",
    endTrigger: "h1.intro-text",
    scrub: true
  },
  y: "0vh",
  scale: 1
})

const bugattis = document.querySelectorAll(".bugatti-text-lifter");

bugattis.forEach((bugatti) => {
  const lifter = new SplitType(bugatti, {
    types: "chars",
  });

  gsap.to(lifter.chars, {
    scrollTrigger: {
      trigger: aboutContent,
      start: "top top",
      toggleActions: "restart none none none",
      markers: true
    },
    y: "-100%",
    stagger: 0.2,
  });
});

gsap.to(aboutContent, {
  scrollTrigger: {
    trigger: aboutContent,
    pin: true,
    scrub: true,
    end: () => `+=${aboutContent.offsetWidth}`,
  },
  xPercent: -100,
  ease: "none",
});













ScrollTrigger.refresh();