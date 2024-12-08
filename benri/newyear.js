
function setText(elem, value) {
  document.getElementById(elem).innerText = value;
  return;
}

function setValue(elem, value) {
  document.getElementById(elem).value = value;
  return;
}

function setDisplay(elem, value) {
  document.getElementById(elem).style.display = value;
  return
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const queryParams = {};

  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
}

function newYearCountdown(newYearVal = 2025) {
  const now =new Date();

  if (now.getFullYear() < newYearVal) {
    const newYear = new Date(newYearVal, 0, 1, 0, 0, 0, 0);
    const countDown = newYear.getTime() - now.getTime();
    const countDate = Math.floor(countDown / 86400000);
    const countHour = Math.floor(countDown / 3600000) % 24;
    const countMin = Math.floor(countDown / 60000) % 60;
    const countSec = Math.floor((countDown / 1000) % 60);

    return {
      newyear: false,
      date: countDate,
      hour: countHour,
      min: countMin,
      sec: countSec
    }
  } else {
    const newYear = new Date(newYearVal, 0, 1, 0, 0, 0, 0);
    const countDown = now.getTime() - newYear.getTime();
    const countDate = Math.floor(countDown / 86400000);
    const countHour = Math.floor(countDown / 3600000) % 24;
    const countMin = Math.floor(countDown / 60000) % 60;
    const countSec = Math.floor((countDown / 1000) % 60);

    return {
      newyear: true,
      date: countDate,
      hour: countHour,
      min: countMin,
      sec: countSec
    }
  }
}
const queryParams = getQueryParams();

let newyear = 0;
if (queryParams.year) {
  newyear = parseInt(queryParams.year)
} else {
  newyear = new Date().getFullYear()+1;
}

if (full) {
  document.title = `${newyear}年まであと...`;
} else {
  setValue("year", newyear);
}

window.setInterval(() => {
  const yearData = newYearCountdown(newyear);

  if (yearData.newyear) {
    setDisplay("countdown_panel", "none");
    setDisplay("happynewyear_panel", "block");
    setText("cu_newyear", newyear.toString());
    setText("cu_days", yearData.date);
    setText("cu_hour", yearData.hour);
    setText("cu_min", yearData.min);
    setText("cu_sec", yearData.sec);
  } else {
    setDisplay("countdown_panel", "block");
    setDisplay("happynewyear_panel", "none");
    setText("cd_nextyear", newyear.toString());
    setText("cd_days", yearData.date);
    setText("cd_hour", yearData.hour);
    setText("cd_min", yearData.min);
    setText("cd_sec", yearData.sec);
  }
})