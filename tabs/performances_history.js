"use strict"

$(document).ready(function () {
    get_teams_data();
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

function init(data) {

    var round_nb = data[0].results.length;
    var team_names = [];
    var turn_overs = [];
    var earnings = [];
    var domHtml = "";
    var w = Math.floor(innerWidth * 0.4);
    var h = Math.floor(innerHeight * 0.55);
    Chart.defaults.global.defaultFontSize = 24;

    for (var i = 0; i < round_nb; ++i) {

        domHtml +=  '<div class="row"><div class="col-md-12">' +
                    '<h2 class="text-center">Round n° '+(i+1)+'</h2>' +
                    '</div></div>' +
                    '<div class="row"><div class="col-md-6">' +
                    '<canvas id="t'+i+'" width="'+w+'" height="'+h+'"></canvas>' +
                    '</div><div class="col-md-6">' +
                    '<canvas id="p'+i+'" width="'+w+'" height="'+h+'"></canvas>' +
                    '</div></div><div class="row">' +
                    '<div class="col-md-6 text-center"><strong>Turnover</strong></div>' +
                    '<div class="col-md-6 text-center"><strong>Profits</strong></div></div><hr>';
    }

    $("#contentDom").html(domHtml);

    for(var i = 0; i < data.length; i++) {
        team_names.push(data[i].teamName);
        for(var j = 0 ; j< data[i].results.length; j++) {
            if(!turn_overs[j]) {
                turn_overs[j] = [];
            }
            turn_overs[j].push(data[i].results[j].turnOver);

            if(!earnings[j]) {
                earnings[j] = [];
            }
            earnings[j].push(data[i].results[j].earnings);
        }
    }

    var team_colors = getColors(team_names);
    for (var i = 0; i < round_nb; ++i) {

        var turnoverData = {
            labels: team_names,
            datasets: newDatasSet(team_colors, turn_overs[i])
        };
        var profitsData = {
            labels: team_names,
            datasets: newDatasSet(team_colors, earnings[i])
        };

        window.turnoverChart = new Chart($("#t" + i), {
            type: 'pie',
            data: turnoverData
        });
        window.profitsChart = new Chart($("#p" + i), {
            type: 'pie',
            data: profitsData
        });
    }
}

function newDatasSet (colors, data) {

    return [{
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }];
}

