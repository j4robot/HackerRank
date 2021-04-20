const https = require('https');

async function getBody(year) {
    try {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=2`
        // Return new promise
        return new Promise(function (resolve, reject) {

            https.get(url, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                }).on('end', () => {
                    resolve(JSON.parse(data));
                });

            }).on("error", (err) => {
                reject("Error: " + err.message);
            });
        })

    } catch (err) {

    }
}


async function getTeams(year, k) {

    let data = await getBody(year);
    let teams = data.data.map((x) => { return { team1: x.team1, team2: x.team2 } }).map((x) => Object.values(x));
    let newTeam = [];
    teams.forEach(element => { newTeam.push(element[0], element[1]) });

    let object = {}, result = [];

    newTeam.forEach(function (item) {
        if (!object[item])
            object[item] = 0;
        object[item] += 1;
    })

    for (var prop in object) {
        console.log(object[prop])
        if (object[prop] == k) {
            result.push(prop);
        }
    }
    result.sort();
    return result;

}


console.log(getTeams(2011, 2))

