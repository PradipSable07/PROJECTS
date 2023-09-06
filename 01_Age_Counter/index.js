let isDOBOpen = false;
let dateOfBirth;
const settingIconElement = document.getElementById("settingIcon");
const settingContentElement = document.getElementById("settingContent");
const intialTextElement = document.getElementById("intialText");
const afterDOBbtnElement = document.getElementById("afterDOBbtn");
const btnDOBElement = document.getElementById("btn-dob");
const dobInputElement = document.getElementById("dobInput");

const yearEle = document.getElementById("year");
const monthEle = document.getElementById("month");
const dayEle = document.getElementById("day");
const hourEle = document.getElementById("hour");
const minutesEle = document.getElementById("minutes");
const secondEle = document.getElementById("second");

// to select or deselect icon
const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContentElement.classList.add("hide");
  } else {
    settingContentElement.classList.remove("hide");
  }
  isDOBOpen = !isDOBOpen;
  console.log("Toggle", isDOBOpen);
};
// to Update the Age count
const updateAge = () => {
  const currentDate = new Date();
  //   console.log({ currentDate }); to check
  const dateDiff = currentDate - dateOfBirth;
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12;
  const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(dateDiff / (1000 * 60)) % 60;
  const second = Math.floor(dateDiff / 1000) % 60;
  //   console.log(year,month,day,hour,minutes,second); to check

  yearEle.innerHTML = year;
  monthEle.innerHTML = month;
  dayEle.innerHTML = day;
  hourEle.innerHTML = hour;
  minutesEle.innerHTML = minutes;
  secondEle.innerHTML = second;
};

// After clicking the add on btn this function is work.
const setDOBHandler = () => {
  const dateString = dobInputElement.value;
  dateOfBirth = dateString ? new Date(dateString) : null;

  // console.log("date of birth", dateOfBirth);// to check the is working or not

  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const day = localStorage.getItem("hour");
  const hour = localStorage.getItem("year");
  const minutes = localStorage.getItem("minutes");
  const second = localStorage.getItem("second");

  if (year && month && day) {
    dateOfBirth = new Date(year, month, day, hour, minutes, second);
  }
  if (dateOfBirth) {
    localStorage.getItem("year", dateOfBirth.getFullYear());
    localStorage.getItem("month", dateOfBirth.getMonth());
    localStorage.getItem("day", dateOfBirth.getDay());
    localStorage.getItem("hour", dateOfBirth.getHours());
    localStorage.getItem("minutes", dateOfBirth.getMinutes());
    localStorage.getItem("second", dateOfBirth.getSeconds());
    intialTextElement.classList.add("hide");
    afterDOBbtnElement.classList.remove("hide");
    updateAge();
    setInterval(() => {
      updateAge();
    }, 1000);
  } else {
    afterDOBbtnElement.classList.add("hide");
    intialTextElement.classList.remove("hide");
  }
};

setDOBHandler();

settingIconElement.addEventListener("click", toggleDateOfBirthSelector);
btnDOBElement.addEventListener("click", setDOBHandler);
