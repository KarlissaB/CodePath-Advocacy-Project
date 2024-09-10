//Toggle button function
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);



//Sign now button function
let signNowButton = document.querySelector("#sign-now-button");
const addSignature = (person) => {
  
  //Adds the new values to the petition paragraph
  let newSignature = document.createElement("p");
  newSignature.textContent = "️🖊️ " + person.name + " from " + person.hometown + " supports this.";
  document.querySelector(".signatures").appendChild(newSignature);

  //Updates the count of how many petitions signed
  let countElement = document.getElementById("counter");
  let count = parseInt(countElement.textContent.split(" ")[1]);
  count++;
  countElement.textContent = "🖊️ " + count + " people have signed this petition and support this cause.";
}

// Your validateForm function with object refactoring
const validateForm = () => {
  let containsErrors = false;
  var petitionInputs = document.getElementById("sign-petition").elements;

  // Create a new object variable 'person' with the appropriate properties
  let person = {
    name: document.getElementById("name").value,
    hometown: document.getElementById("hometown").value,
    email: document.getElementById("email").value
  };

  //Loop through all inputs
  for(let i = 0; i < petitionInputs.length; i++){
    //Validate the value of each input
    if(petitionInputs[i].value.length < 2){
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else{
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!person.email.includes('.com') && !person.email.includes('.org')) {
    document.getElementById('email').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('email').classList.remove('error');
  }

  //Call addSignature() and clear fields if no errors
  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for(let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
    document.getElementById("email").value = "";
  }
}

signNowButton.addEventListener('click', validateForm);


let animation = {
  revealDistance: 150,
  intialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

window.addEventListener('scroll', function() {
  let revealableContainers = document.querySelectorAll(".revealable");

  for(i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add("active");
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove("active");
    }
  }
});

toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("modal-text-container");
  modalContent.textContent = "Thanks, " + person.name + "! Your intiative to help promote and support businesses within " + person.hometown + " is appreciated!";
  modal.style.display = "flex";

  intervalId = setInterval(() => {
    scaleImage();
  }, 500);
  
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 10000)
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");
let intervalId;

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  // Set the transform property
  modalImage.style.transform = `scale(${scaleFactor})`;
}