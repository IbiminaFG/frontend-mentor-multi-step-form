const stepOneForm = document.querySelector("#step-one form");
const stepOneInputs = document.querySelectorAll("#step-one input");

//The different inputs in step-one-form
const stepOneNameInput = document.querySelector("#step-one #name");
const stepOneEmailInput = document.querySelector("#step-one #email");
const stepOnePhoneInput = document.querySelector("#step-one #phone");

//The different section elements
const sectionOneElement = document.querySelector("#step-one");
const sectionTwoElement = document.querySelector("#step-two");
const sectionThreeElement = document.querySelector("#step-three");
const sectionFourElement = document.querySelector("#step-four");

//Aside step
const stepOneNumber = document.querySelector(".step1 .sn");
const stepTwoNumber = document.querySelector(".step2 .sn");
const stepThreeNumber = document.querySelector(".step3 .sn");
const stepFourNumber = document.querySelector(".step4 .sn");

const planCardOne = document.querySelector(".pc1");
const planCardTwo = document.querySelector(".pc2");
const planCardThree = document.querySelector(".pc3");
const planCards = document.querySelectorAll(".plan-card");

const planDetails = {
  plan: null,
  kind: null,
  price: null,
};

//plancards

planCards.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".active-plan").classList.remove("active-plan");
    plan.classList.add("active-plan");
    const planName = plan.querySelector("h4");
    const planPrice = plan.querySelector("p");
    planDetails.plan = planName.innerText;
    planDetails.price = planPrice.innerText;
    console.log(planDetails);
  });
});

stepOneForm.addEventListener("submit", (e) => {
  e.preventDefault();

  stepOneInputs.forEach((input) => {
    if (input.value == "") {
      input.parentElement.classList.add("un-hide");
    } else {
      input.parentElement.classList.remove("un-hide");
    }
  });

  if (
    stepOneNameInput.value &&
    stepOneEmailInput.value &&
    stepOnePhoneInput.value
  ) {
    sectionOneElement.style.display = "none";
    sectionTwoElement.style.display = "flex";
    stepOneNumber.classList.remove("active");
    stepTwoNumber.classList.add("active");
  }
});
