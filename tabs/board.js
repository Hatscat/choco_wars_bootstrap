"use strict"

$(document).ready(function () {
    init_events();
    get_game_data(get_team_stats);
});

function get_team_stats () {
    db_access("teamStats", "GET", "token=" + storage.data.token, stats_return);
}

function stats_return (res) {
    res = JSON.parse(res);

    if(res.statusCode != 200) {
        alert(res.message);
    }

    init(res.message.statistics);
}

function init (teamStats) {

    canvas.width = innerWidth * 0.8; 
    canvas.height = innerHeight * 0.7; 

    var yearLabels = ["Start"], prod = [0], prom = [0], price = [0], place = [0], fric = [game_data.initialFinances];
    for(var i = 0; i < teamStats.length; i++) {
        yearLabels.push("N-" + (teamStats.length - i));
        prod.push(teamStats[i].decisions.qualityBudget);
        prom.push(teamStats[i].decisions.marketingBudget);
        price.push(teamStats[i].decisions.price);
        fric.push(teamStats[i].decisions.earnings);

        var placeCost = 0;
        for(var j = 0; j < teamStats[i].decisions.place.length; j++) {
            placeCost += teamStats[i].decisions.place[j].stallQuantity * game_data.mapDistricts[teamStats[i].decisions.place[j].mapDistrictIndex].stallPrice;
        }
        place.push(placeCost);
    }

    storage.data.current_fin_val = fric[fric.length-1];
    storage.data.place_val = place[place.length-1];

    var data = {
        labels: yearLabels,
        datasets: [
            newDataSet("Production", "#00f", prod),
            newDataSet("Unit Price", "#f00", price),
            newDataSet("Promotion", "#0f0", prom),
            newDataSet("Place", "#f80", place),
            newDataSet("Finances", "#82f", fric)
        ]
    };

    Chart.defaults.global.defaultFontSize = 24;

    window.chart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: null
    });
}

function newDataSet (label, color, data) {

    var ds = {
        fill: false,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderColor: "#000",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
    };

    ds.label = label + "";
    ds.backgroundColor = ds.borderColor = ds.pointBorderColor = ds.pointHoverBackgroundColor = color;
    ds.data = data;//.slice();

    return ds;
}
