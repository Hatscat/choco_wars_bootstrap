"use strict"

$(document).ready(function () {
    init_events();
    get_game_data(get_teams_data);

   	time_check();
});

function get_teams_data () {
    db_access("results", "POST", '', function (res) {
        res = JSON.parse(res);

        if(res.statusCode != 200) {
            alert(res.message);
            return;
        }

        console.log(res.message);
        init(res.message);
    });
}

function init (teamsData) {

    turnoverCanvas.width = profitsCanvas.width = innerWidth * 0.4; 
    turnoverCanvas.height = profitsCanvas.height = innerHeight * 0.7; 

    if(teamsData) {
        var team_names = [], turnovers = [], earnings = [];
        for(var i = 0; i < teamsData.length; i++) {
            team_names.push(teamsData[i].teamName);
            turnovers.push(teamsData[i].results[teamsData[i].results.length-1].turnOver);
            earnings.push(teamsData[i].results[teamsData[i].results.length-1].earnings);
        }
    }
    else {
        var team_names = ["ME"], turnovers = [1], earnings = [1];
    }

    var team_colors = getColors(team_names);

    var turnoverData = {
        labels: team_names,
        datasets: newDatasSet(team_colors, turnovers)
    };

    var profitsData = {
        labels: team_names,
        datasets: newDatasSet(team_colors, earnings)
    };

    Chart.defaults.global.defaultFontSize = 24;

    window.turnoverChart = new Chart(turnoverCanvas, {
        type: 'pie',
        data: turnoverData,
        options: null
    });

    window.profitsChart = new Chart(profitsCanvas, {
        type: 'pie',
        data: profitsData,
        options: null
    });
}

function newDatasSet (colors, data) {

    return [{
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }];
}

