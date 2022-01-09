import anime from "animejs";

export const fadeIn = (targets) => {
  anime({
    targets: targets,
    duration: 400,
    opacity: [0, 1],
    translateY: [30, 0],
    easing: "easeOutQuad",
  });
};

export const shake = (targets) => {
  anime({
    targets: targets,
    translateX: ["-.25rem", ".25rem"],
    duration: 50,
    direction: "alternate",
    loop: 5,
    easing: "easeInOutSine",
  });
};
