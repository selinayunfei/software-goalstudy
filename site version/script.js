

// coding different pages
function switchTab(tabId) {
    const sections = document.querySelectorAll('[class*="page"]');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

const Football = document.querySelector('#football-button');
const FormulaOne = document.querySelector('#formula1-button');
const FigSkating = document.querySelector('#figskating-button');

Football.addEventListener('click', () =>{
    switchTab('football');
});
FormulaOne.addEventListener('click', () => {
    switchTab('formula1');
});
FigSkating.addEventListener('click', () => {
    switchTab('figskating');
});

//const {getCode, getName} = require('country-list');

const apiKey = "ce6f5e66ea3dd490c999a5fc1bfcf848";


async function fetchLiveScores() {
  const headers = new Headers();
  headers.append("x-apisports-key", apiKey);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  try {

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&live=all",
      {
        method: "GET",
        headers
      }
    );

    const data = await response.json();

    if (!data.response || data.response.length === 0) {

        clearInterval(fetchInterval);
        clearInterval(timerVar);
    
        document.getElementById("halfno"). textContent = "MATCH OVER";
    }

    displayScores(data.response);

  } catch (error) {
    console.error("Error fetching live scores:", error);
  }
}

fetchLiveScores();
fetchInterval = setInterval(fetchLiveScores, 300000)

function displayScores(matches) {
    if (matches.length === 0) return;

    const match = matches[0];

    const homeTeam = match.teams.home.name;
    const awayTeam = match.teams.away.name;

    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;

    const homePenaltiesGoals = match.score.penalty.home;
    const awayPenaltiesGoals = match.score.penalty.away;

    const elapsedMinutes = match.fixture.status.elapsed;

    const status = match.fixture.status.short;
    extraTime = match.fixture.status.extra;

    if (status !== "P") {
        foloaddata(
            homeTeam, 
            awayTeam,
            homeGoals,
            awayGoals
        );
    } else {
        foloaddata(
            homeTeam,
            awayTeam,
            homePenaltiesGoals,
            awayPenaltiesGoals,
        );
    }

    startTimer(elapsedMinutes, status);
}

// for football
function foloaddata(countryone, countrytwo, score1, score2){
    document.getElementById("country-1").src = 
        `media/flags/${countryone}.jpg`;
    document.getElementById("country-2").src =
        `media/flags/${countrytwo}.jpg`;

    document.getElementById("c1-abbrev").textContent = 
        "ESP";
        //getCode(countryone);
    document.getElementById("c2-abbrev").textContent = 
        "AUS";
        //getCode(countrytwo);

    document.getElementById("country-1-score").textContent = 
            score1;
    document.getElementById("country-2-score").textContent = 
            score2;
};

// timer 

//let totalSeconds = 0;
let timerVar;
let minuterVar;

let elapsed = 0;
let elapsedSeconds = 0;

let halftimeDone = false;
let extraTime = null;

function startTimer(initialElapsed, status) {
    clearInterval(timerVar);

    elapsed = initialElapsed;

    if (extraTime !== null ) {
        elapsedSeconds = (elapsed + extraTime) * 60;
    } else {
        elapsedSeconds = elapsed * 60;
    }
    updateDisplay(status);

    if (status !== "HT" && status !== "P" && status !== "PEN"){
            timerVar = setInterval(() => {
        elapsedSeconds++;
        elapsed = Math.floor(elapsedSeconds/60);
        updateDisplay(status);
        }, 1000);
    }
}

function updateDisplay(status) {

    let hour = Math.floor(elapsed / 60);
    let minute = elapsed % 60;
    let seconds = elapsedSeconds % 60;


    let h = String(hour).padStart(2,'0');
    let m = String(minute).padStart(2,'0');
    let s = String(seconds).padStart(2,'0');

    //const displayedExtra = extraTime + (elapsed - 90);

    if (elapsed >= 90) {
        m = String(minute+extraTime).padStart(2, "0");
        document.getElementById("minuter").textContent =
            `90+${extraTime + (elapsed - 90)}`;
    } else if (elapsed === 45 && extraTime !== null ){
        document.getElementById("minuter").textContent = 
            `45+${extraTime + (elapsed-45)}`;
    } else {
        document.getElementById("minuter").innerHTML = `${elapsed}:${s}`;
    }

    document.getElementById("timer").innerHTML = `${h}:${m}:${s}`;

    if (status == "HT"){
        document.getElementById("halfno").textContent = "HALF TIME";
    } else if (status === "P" || status === "PEN"){
        document.getElementById("halfno").textContent = "PENALTY SHOOTOUT";
    } else if (elapsed < 45){
        document.getElementById("halfno").textContent = "FIRST HALF";
    } else {
        document.getElementById("halfno").textContent = "SECOND HALF";
    } 
};















/*
// for f1 TO BE UPDATED; mockup
const directory = [
{
    team: "Red Bull",
    file: "media/f1 teams/redbull.png",
    colour: "rgba(53, 113, 198)"

},
{
    team: "Ferrari",
    file: "media/f1 teams/ferrari.png",
    colour: "rgba(232, 1, 45)"
},
{
    team: "Mercedes",
    file: "media/f1 teams/mercedes.png",
    colour: "rgba(38, 239, 206)"
},
{
    team: "McLaren",
    file: "media/f1 teams/mclaren.png",
    colour: "rgba(255, 128, 1)"
}
]*/

/*
function f1loaddata(){
    document.getElementById("p1-team").src =
        directory[2].file;
    document.getElementById("team1-icon").style.backgroundColor = 
        directory[2].colour;

    document.getElementById("p2-team").src = 
        directory[0].file;
    document.getElementById("team2-icon").style.backgroundColor = 
        directory[0].colour;

    document.getElementById("p3-team").src =
        directory[2].file;
    document.getElementById("team3-icon").style.backgroundColor = 
        directory[2].colour;


    document.getElementById("p1-driver").textContent =
        "George Russell";
    document.getElementById("p2-driver").textContent = 
        "Max Verstappen";
    document.getElementById("p3-driver").textContent = 
        "Kimi Antonelli";

    document.getElementById("lap-no").textContent =
        "71";
    document.getElementById("time").textContent = 
        "1:26:37.979";
}
f1loaddata();*/