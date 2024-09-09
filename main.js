import "./main.css";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";

const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

// const setPresentNavigationStatus = (navlink) => {
//   const presentlyActive = document.querySelectorAll(
//   document.getElementById(navlink).classList.add("active");
// }

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

// PRODUCTS

// when the product-pinner reaches the top of the screen, the child product container will
// rotate and scale, when the next product pinner after reaches, the former dissapears

// when the product-pinner reaches the 50% of the screen, the child product container's image is at 75% off
// the top of the container, goes to 0 when product pinner pins and back to 25%  off as it scalles away

// 1.make "finished prodcuts" disappear when first product gets to the top

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


















// const productPinnersList = gsap.utils.toArray(".product-pinner");
// productPinnersList.forEach((productPinner, i) => {
//   let nextProductPinner;
//   let previousProduct;
//   const product = productPinner.querySelector(".product");
//   const productBg = productPinner.querySelector(".prod--bg");
  
//   const tl = gsap.timeline();

//   gsap.to(product, {
//     scrollTrigger: {
//       trigger: productPinner,
//       pin: true,
//       pinSpacing: false,
//       scrub: 1,
//       onEnter: () => {
//         nextProductPinner = productPinnersList[i+1];
//         console.log("Next product pinner: ", nextProductPinner);
//         if (i > 0) {
//           previousProduct = productPinnersList[i-1].querySelector(".product");
//           console.log("Previous product: ", previousProduct);
//         }
//       }
//       // markers: true
//     },
//     scale: 1,
//   })

//   // gsap.to(product, {
//   //   scrollTrigger: {
//   //     trigger: productPinner,
//   //     pin: true,
//   //     pinSpacing: false,
//   //     scrub: 1,
//   //     markers: true
//   //   },
//   //   scale: 1,
//   // })

//   // gsap.fromTo(productBg, {
//   //   scale: 1.5,
//   //   y: "15vh"
//   // }, {
//   //   scrollTrigger: {
//   //     trigger: product,
//   //     start:  "top 80%",
//   //     scrub: 1,
//   //     markers: true
//   //   },
//   //   y: "0vh"
//   // })
// })