// let gradientColors = window
//   .getComputedStyle(document.querySelector("body"), ":before")
//   .getPropertyValue("background-image");
// let layerOpacity = window
//   .getComputedStyle(document.querySelector("body"), ":before")
//   .getPropertyValue("opacity");

let gradientColorsNeutral = document.body.dataset.gradientNeutral.split(",");
let gradientColorsDanger = document.body.dataset.gradientDanger.split(",");
let gradientColorsSuccess = document.body.dataset.gradientSuccess.split(",");

const progressBars = document.querySelectorAll(".progress-bar");
let currentSlideCount = 0;

const errorDiv = document.querySelector(".error-display");

const animatedForm = () => {
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
      } else if (input.type === "password" && validatePassword(input)) {
        console.log("password OK");
        moveToNextSlide(parent, nextForm);
      } else {
        parent.classList.add("error");
        errorDiv.classList.toggle("visible");
      }

      // get rid of the animation so that it can be recycled
      parent.addEventListener("animationend", function() {
        this.classList.remove("error");
      });
    });
  });
};

const validateUser = user => {
  let result = user.value.length > 6;

  if (result === true) {
    updateUI(true);
  } else if (result === false) {
    //   ERROR
    updateUI(false, "Please enter a username with at least 6 characters");
  }

  return result;
};

const validateEmail = email => {
  // courtesy of the one and only Tyler McGinnis
  let result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

  if (result === true) {
    updateUI(true);
  } else if (result === false) {
    updateUI(false, "Please enter a valid email address");
  }

  return result;
};

const validatePassword = password => {
  // "Password must be between 6 and 20 characters, contain at least one number digit, one uppercase and one lowercase letter"
  let result = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password.value);

  if (result === true) {
    updateUI(true);
  } else if (result === false) {
    updateUI(
      false,
      "Password must be between 6 and 20 characters, contain at least one number digit, one uppercase and one lowercase letter"
    );
  }

  return result;
};

const updateUI = (state, errorMsg) => {
  if (state === true) {
    // update the progress bar as well!
    progressBars[currentSlideCount].classList.add("complete");

    console.log(`${progressBars[currentSlideCount].classList}`);

    document.body.style.backgroundImage = `linear-gradient(65deg, ${gradientColorsSuccess[0]}, ${gradientColorsSuccess[1]}`;
  } else if (state === false) {
    document.body.style.backgroundImage = `linear-gradient(65deg, ${gradientColorsDanger[0]}, ${gradientColorsDanger[1]}`;
    errorDiv.textContent = `${errorMsg}`;
  }
};

const moveToNextSlide = (parent, nextForm) => {
  errorDiv.classList.remove("visible");

  parent.classList.add("inactive");
  parent.classList.remove("active");

  nextForm.classList.add("active");

  currentSlideCount++;
};

animatedForm();
