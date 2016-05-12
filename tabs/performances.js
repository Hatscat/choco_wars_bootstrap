"use strict"

$(document).ready(function () {

    turnoverCanvas.width = profitsCanvas.width = innerWidth * 0.4; 
    turnoverCanvas.height = profitsCanvas.height = innerHeight * 0.7; 

    var team_names = ["AAA", "Millenium", "TMP", "RGBA", "Conspiracy"];
    var team_colors = getColors(team_names);

    var turnoverData = {
        labels: team_names,
        datasets: newDatasSet(team_colors, [3002, 540, 1400, 465, 427])
    };

    var profitsData = {
        labels: team_names,
        datasets: newDatasSet(team_colors, [465, 2654, 1950, 1654, 735])
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

});

function newDatasSet (colors, data) {

    return [{
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }];
}

function getColors (strings) {

    var colors = [];

    for (var i = 0; i < strings.length; ++i) {
        colors[i] = "#" + ((parseInt(strings[i], 36) ^ 0x888) & 0xeee).toString(16); 
    }
    return colors;
}

