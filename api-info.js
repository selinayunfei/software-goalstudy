const apiKey = "YOUR-API-KEY";
async function fetchLiveScores() {
  const headers = new Headers();
  headers.append("x-apisports-key", apiKey);

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  try {
    const response = await fetch(
            "https://v3.football.api-sports.io/fixtures?live=all",
            {
                method: "GET",
                headers: {
                    "x-apisports-key": apiKey
                }
            }
        );
    const data = await response.json();
    
    // Process the live matches
    const liveMatches = data.response;
    displayScores(liveMatches);
  } catch (error) {
    console.error('Error fetching live scores:', error);
  }
}

function displayScores(matches) {
  matches.forEach(match => {
    const homeTeam = match.teams.home.name;
    const awayTeam = match.teams.away.name;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;

    const elapsedMinutes = match.fixture.status.elapsed;
    const extraTime = match.fixture.status.extra;

    const league_id = match["league"]["id"]
    if (extraTime !== null) {
      console.log(`[${elapsedMinutes}' + ${extraTime}] ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`);
    } else {
      console.log(`[${elapsedMinutes}'] ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`);
    }

    console.log(league_id)
  });
}

// Execute the function
fetchLiveScores();

// notes: half time ['45]; even past 90 minutes it still says 90']