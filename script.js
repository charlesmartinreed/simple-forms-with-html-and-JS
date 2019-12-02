let gradientColors = window
  .getComputedStyle(document.querySelector("body"), ":before")
  .getPropertyValue("background-image");

let layerOpacity = window
  .getComputedStyle(document.querySelector("body"), ":before")
  .getPropertyValue("opacity");

const animatedForm = () => {
  let gradientColors = window
    .getComputedStyle(document.querySelector("body"), ":before")
    .getPropertyValue("background-image");
  console.log(gradientColors || "null");
  console.log(layerOpacity || "null");

  const arrows = document.querySelectorAll(".fa-arrow-down");

  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      //   check entered information, if data is clean, move to the next form element
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      //   user validation
      if (input.type === "text" && validateUser(input)) {
        //   move on to the next thing
        console.log("all clear");
      }
    });
  });
};

const validateUser = user => {
  if (user.value.length < 6) {
    //   ERROR
    console.log("not enough characters");
    colorFeedback("#ED213A", "#93291E");
  } else {
    colorFeedback("#1D976C", "#93F9B9");
    return true;
  }
};

const colorFeedback = (firstColor, secondColor) => {
  document.body.style.backgroundImage = `linear-gradient(165deg, ${firstColor}, ${secondColor})`;
};

animatedForm();
