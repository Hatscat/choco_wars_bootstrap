"use strict"

$(document).ready(function () {

    var round_nb = 7;
    var team_names = ["AAA", "Millenium", "TMP", "RGBA", "Conspiracy"];
    var team_colors = getColors(team_names);
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

    for (var i = 0; i < round_nb; ++i) {

        var turnoverData = {
            labels: team_names,
            datasets: newDatasSet(team_colors, [3002, 540, 1400, 465, 427])
        };
        var profitsData = {
            labels: team_names,
            datasets: newDatasSet(team_colors, [465, 2654, 1950, 1654, 735])
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
});

function newDatasSet (colors, data) {

    return [{
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors
    }];
}

