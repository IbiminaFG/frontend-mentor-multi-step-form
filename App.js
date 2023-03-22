//Trying to fix code
const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const planCards = document.querySelectorAll(".plan-card");
const addOnElements = document.querySelectorAll(".add-on");
const total = document.querySelector(".total h3");
const totalTitle = document.querySelector(".total p");
const selectedPlanPrice = document.querySelector(".selected-plan-price");
const forms = document.querySelectorAll("form");
const stepOneFormInputs = document.querySelectorAll("#step-1 form input");
//End of trying to fix code

const stepOneForm = document.querySelector("#step-1 form");
const stepOneInputs = document.querySelectorAll("#step-1 input");

// const stepTwoForm = document.querySelector("#step-two form");
// const stepTwoNextButton = document.querySelector("#step-two .next-step");
// const stepTwoBackButton = document.querySelector("#step-two .back");

// const stepThreeForm = document.querySelector("#step-three form");
// const stepThreeNextButton = document.querySelector("#step-three .next-step");
// const stepThreeBackButton = document.querySelector("#step-three .back");

// const stepFourNextButton = document.querySelector("#step-four .next-step");
// const stepFourBackButton = document.querySelector("#step-four .back");

//The different inputs in step-one-form
const stepOneNameInput = document.querySelector("#step-1 #name");
const stepOneEmailInput = document.querySelector("#step-1 #email");
const stepOnePhoneInput = document.querySelector("#step-1 #phone");

//The different section elements
const sectionOneElement = document.querySelector("#step-1");
const sectionTwoElement = document.querySelector("#step-2");
const sectionThreeElement = document.querySelector("#step-3");
const sectionFourElement = document.querySelector("#step-4");
const thankElement = document.querySelector("#step-5");

//Aside step
const stepOneNumber = document.querySelector(".step1 .sn");
const stepTwoNumber = document.querySelector(".step2 .sn");
const stepThreeNumber = document.querySelector(".step3 .sn");
const stepFourNumber = document.querySelector(".step4 .sn");

//plancard elements

//slider element
const sliderElement = document.querySelector(".slider");

//add-on elements

const selectedPlanToShow = document.querySelector(".selected-plan");
const selectedAddOnToShow = document.querySelector(".selected-pick-add-ons");

//Summary page
const planPrice = document.querySelector(".plan-price");

//total

const planDetails = {
  plan: "Arcade",
  kind: false,
  price: "$9/mo",
};
let val = false;
let time;
let currentStep = 1;
let currentCircle = 0;

forms.forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});

//Steps next and back button

steps.forEach((step) => {
  const nextBtn = step.querySelector(".next-step");
  const prevBtn = step.querySelector(".back");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`#step-${currentStep}`).style.display = "none";
      currentStep--;
      document.querySelector(`#step-${currentStep}`).style.display = "flex";
      circleSteps[currentCircle]
        .querySelector(".sn")
        .classList.remove("active");
      currentCircle--;
      circleSteps[currentCircle].querySelector(".sn").classList.add("active");
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      document.querySelector(`#step-${currentStep}`).style.display = "none";
      if (currentStep < 5 && validateForm()) {
        circleSteps[currentCircle]
          .querySelector(".sn")
          .classList.remove("active");
        currentStep++;
        currentCircle++;
        // setTotal();
      }
      document.querySelector(`#step-${currentStep}`).style.display = "flex";
      circleSteps[currentCircle].querySelector(".sn").classList.add("active");
      summary(planDetails);
    });
  }
});

function summary(planDetails) {
  const planName = document.querySelector(".selected-plan-name");
  const planPrice = document.querySelector(".selected-plan-price");
  planPrice.innerHTML = `${planDetails.price.innerText}`;
  planName.innerHTML = `${planDetails.plan.innerText} (${
    planDetails.kind ? "yearly" : "monthly"
  })`;
}

function validateForm() {
  let valid = true;
  for (let i = 0; i < stepOneFormInputs.length; i++) {
    if (!stepOneFormInputs[i].value) {
      valid = false;
      stepOneFormInputs[i].classList.add("err");
      findLabel(stepOneFormInputs[i]).nextElementSibling.style.visibility =
        "visible";
    } else {
      valid = true;
      stepOneFormInputs[i].classList.remove("err");
      findLabel(stepOneFormInputs[i]).nextElementSibling.style.visibility =
        "hidden";
    }
  }
  return valid;
}
function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
}

//plancards

planCards.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".active-plan").classList.remove("active-plan");
    plan.classList.add("active-plan");
    const planName = plan.querySelector("h4");
    const planPrice = plan.querySelector("p");
    planDetails.plan = planName;
    planDetails.price = planPrice;
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
    const ID = addon.getAttribute("data-id");
    if (checkedValue.checked) {
      addon.classList.add("picked");
      checkedValue = false;
      showAddon(addon, true);
    } else {
      addon.classList.remove("picked");
      checkedValue = true;
      showAddon(ID, false);
    }
  });
});

function showAddon(ad, val) {
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);
  const serviceName = clone.querySelector(".shown-addon-name");
  const servicePrice = clone.querySelector(".shown-addon-price");
  const serviceID = clone.querySelector(".selected-addon");
  if (ad && val) {
    serviceName.innerText = ad.querySelector(".add-on-name").innerText;
    servicePrice.innerText = ad.querySelector(".add-on-price").innerText;
    serviceID.setAttribute("data-id", ad.dataset.id);
    document.querySelector(".selected-pick-add-ons").appendChild(clone);
  } else {
    const addons = document.querySelectorAll(".selected-addon");
    addons.forEach((addon) => {
      const attr = addon.getAttribute("data-id");
      if (attr == ad) {
        addon.remove();
      }
    });
  }
}

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

function showSelectedPlan() {
  selectedPlanToShow.innerHTML = `<div>
  <h4>${planDetails.plan}(${planDetails.kind})</h4>
  <a href="#">change</a>
</div>
<h4 class="plan-price">${planDetails.price}</h4>`;
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
