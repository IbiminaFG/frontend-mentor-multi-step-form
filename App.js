const stepOneForm = document.querySelector("#step-one form");
const stepOneInputs = document.querySelectorAll("#step-one input");

const stepTwoForm = document.querySelector("#step-two form");
const stepTwoNextButton = document.querySelector("#step-two .next-step");
const stepTwoBackButton = document.querySelector("#step-two .back");

const stepThreeForm = document.querySelector("#step-three form");
const stepThreeNextButton = document.querySelector("#step-three .next-step");
const stepThreeBackButton = document.querySelector("#step-three .back");

const stepFourNextButton = document.querySelector("#step-four .next-step");
const stepFourBackButton = document.querySelector("#step-four .back");

//The different inputs in step-one-form
const stepOneNameInput = document.querySelector("#step-one #name");
const stepOneEmailInput = document.querySelector("#step-one #email");
const stepOnePhoneInput = document.querySelector("#step-one #phone");

//The different section elements
const sectionOneElement = document.querySelector("#step-one");
const sectionTwoElement = document.querySelector("#step-two");
const sectionThreeElement = document.querySelector("#step-three");
const sectionFourElement = document.querySelector("#step-four");
const thankElement = document.querySelector("#thank-you");

//Aside step
const stepOneNumber = document.querySelector(".step1 .sn");
const stepTwoNumber = document.querySelector(".step2 .sn");
const stepThreeNumber = document.querySelector(".step3 .sn");
const stepFourNumber = document.querySelector(".step4 .sn");

//plancard elements
const planCards = document.querySelectorAll(".plan-card");

//slider element
const sliderElement = document.querySelector(".slider");

//add-on elements
const addOnElements = document.querySelectorAll(".add-on");

const selectedPlanToShow = document.querySelector(".selected-plan");
const selectedAddOnToShow = document.querySelector(".selected-pick-add-ons");

//Summary page
const planPrice = document.querySelector(".plan-price");

//total
const total = document.querySelector(".total h3");
const totalTitle = document.querySelector(".total p");

const planDetails = {
  plan: "Arcade",
  kind: "monthly",
  price: "$9/mo",
};
let val = false;
let t;

//plancards

planCards.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".active-plan").classList.remove("active-plan");
    plan.classList.add("active-plan");
    const planName = plan.querySelector("h4");
    const planPrice = plan.querySelector("p");
    planDetails.plan = planName.innerText;
    planDetails.price = planPrice.innerText;
  });
});

//slider

sliderElement.addEventListener("click", () => {
  val = !val;
  if (val) {
    document.querySelector(".monthly").classList.remove("active-slide");
    document.querySelector(".yearly").classList.add("active-slide");
    document.querySelector(".slide-box").classList.add("move-circle");
  } else {
    document.querySelector(".monthly").classList.add("active-slide");
    document.querySelector(".yearly").classList.remove("active-slide");
    document.querySelector(".slide-box").classList.remove("move-circle");
  }
  const planKind = document.querySelector(".active-slide");
  switchPrice(val);
  switchAddOns(val);
  planDetails.kind = planKind.innerText;
});

//add-on functionality

addOnElements.forEach((addon) => {
  addon.addEventListener("click", () => {
    let checkedValue = addon.querySelector("input");
    if (checkedValue.checked) {
      addon.classList.add("picked");
      checkedValue = false;
    } else {
      addon.classList.remove("picked");
      checkedValue = true;
    }
  });
});

function switchPrice(v) {
  const yearlyPrice = [90, 120, 150];
  const monthlyPrice = [9, 12, 15];
  const prices = document.querySelectorAll(".plan-priced");
  if (v) {
    prices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
    prices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
    prices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
    setTime(true);
  } else {
    prices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
    prices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
    prices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
    setTime(false);
  }
}

function switchAddOns(v) {
  const yearlyPrice = [10, 20, 20];
  const monthlyPrice = [1, 2, 2];
  const addOnPrices = document.querySelectorAll(".add-on-price");
  if (v) {
    addOnPrices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
    addOnPrices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
    addOnPrices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
    setTime(true);
  } else {
    addOnPrices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
    addOnPrices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
    addOnPrices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
    setTime(false);
  }
}

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

stepTwoForm.addEventListener("submit", (e) => e.preventDefault());
stepThreeForm.addEventListener("submit", (e) => e.preventDefault());

//Step two
stepTwoNextButton.addEventListener("click", () => {
  sectionTwoElement.style.display = "none";
  sectionThreeElement.style.display = "block";
  stepTwoNumber.classList.remove("active");
  stepThreeNumber.classList.add("active");
});

stepTwoBackButton.addEventListener("click", () => {
  sectionTwoElement.style.display = "none";
  sectionOneElement.style.display = "block";
  stepTwoNumber.classList.remove("active");
  stepOneNumber.classList.add("active");
});
console.log(stepTwoBackButton);
//Step three
stepThreeNextButton.addEventListener("click", () => {
  sectionThreeElement.style.display = "none";
  sectionFourElement.style.display = "flex";
  stepThreeNumber.classList.remove("active");
  stepFourNumber.classList.add("active");
  showSelectedPlan();
  showSelectedAddOns();
  setTotal();
});

stepThreeBackButton.addEventListener("click", () => {
  sectionThreeElement.style.display = "none";
  sectionTwoElement.style.display = "flex";
  stepThreeNumber.classList.remove("active");
  stepTwoNumber.classList.add("active");
});

//Step four
stepFourNextButton.addEventListener("click", () => {
  sectionFourElement.style.display = "none";
  thankElement.style.display = "flex";
});

stepFourBackButton.addEventListener("click", () => {
  sectionFourElement.style.display = "none";
  sectionThreeElement.style.display = "block";
  stepFourNumber.classList.remove("active");
  stepThreeNumber.classList.add("active");
});

function showSelectedPlan() {
  selectedPlanToShow.innerHTML = `<div>
  <h4>${planDetails.plan}(${planDetails.kind})</h4>
  <a href="#">change</a>
</div>
<h4 class="plan-price">${planDetails.price}</h4>`;
}

function showSelectedAddOns() {
  const pickedAddOns = document.querySelectorAll(".picked");
  pickedAddOns.forEach((addOn) => {
    const addOnName = addOn.querySelector(".add-on-name").innerText;
    const addOnPrice = addOn.querySelector(".add-on-price").innerText;
    selectedAddOnToShow.innerHTML += `
    <div>
      <p>${addOnName}</p>
      <p class="shown-add-on-price">${addOnPrice}</p>
    </div>`;
  });
}

function setTotal() {
  const str = planDetails.price;
  const res = str.replace(/\D/g, "");
  const addonPrices = document.querySelectorAll(
    ".selected-pick-add-ons .shown-add-on-price"
  );

  let val = 0;
  for (let i = 0; i < addonPrices.length; i++) {
    const str = addonPrices[i].innerHTML;
    const res = str.replace(/\D/g, "");

    val += Number(res);
  }
  total.innerHTML = `$${val + Number(res)}/${time ? "yr" : "mo"}`;
  totalTitle.innerHTML = `Total (${time ? "per year" : "per month"})`;
}

function setTime(t) {
  return (time = t);
}
