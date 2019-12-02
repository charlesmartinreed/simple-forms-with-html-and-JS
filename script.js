let gradientColors = window
  .getComputedStyle(document.querySelector("body"), ":before")
  .getPropertyValue("background-image");

let layerOpacity = window
  .getComputedStyle(document.querySelector("body"), ":before")
  .getPropertyValue("opacity");

let gradientColorsNeutral = document.body.dataset.gradientNeutral.split(",");

let gradientColorsDanger = document.body.dataset.gradientDanger.split(",");

let gradientColorsSuccess = document.body.dataset.gradientSuccess.split(",");

const animatedForm = () => {
  // let gradientColors = window
  //   .getComputedStyle(document.querySelector("body"), ":before")
  //   .getPropertyValue("background-image");

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
        moveToNextSlide(parent, nextForm);
      } else if (input.type === "email" && validateEmail(input)) {
        console.log("all clear");
        moveToNextSlide(parent, nextForm);
      }
    });
  });
};

const validateUser = user => {
  if (user.value.length < 6) {
    //   ERROR
    console.log("not enough characters");

    document.body.style.backgroundImage = `linear-gradient(165deg, ${gradientColorsDanger[0]}, ${gradientColorsDanger[1]}`;
  } else {
    document.body.style.backgroundImage = `linear-gradient(165deg, ${gradientColorsSuccess[0]}, ${gradientColorsSuccess[1]}`;

    return true;
  }
};

const validateEmail = email => {
  // courtesy of the one and only Tyler McGinnis
  let result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

  if (result) {
    console.log("valid email");
    document.body.style.backgroundImage = `linear-gradient(165deg, ${gradientColorsSuccess[0]}, ${gradientColorsSuccess[1]}`;

    return true;
  } else {
    console.log("invalid email");
    document.body.style.backgroundImage = `linear-gradient(165deg, ${gradientColorsDanger[0]}, ${gradientColorsDanger[1]}`;

    return false;
  }
};

const moveToNextSlide = (parent, nextForm) => {
  // setInterval(() => {
  //   document.body.style.backgroundImage = `linear-gradient(165deg, ${gradientColorsNeutral[0]}, ${gradientColorsNeutral[1]}`;
  // }, 1000);

  parent.classList.add("inactive");
  parent.classList.remove("active");

  nextForm.classList.add("active");
};

animatedForm();
