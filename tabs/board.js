"use strict"

$(document).ready(function () {

    canvas.width = innerWidth * 0.8; 
    canvas.height = innerHeight * 0.7; 

    var data = {
        labels: ["N-7", "N-6", "N-5", "N-4", "N-3", "N-2", "N-1"],
        datasets: [
            newDataSet("Production", "#00f", [650, 590, 800, 810, 506, 550, 400]),
            newDataSet("Price", "#f00", [5, 12, 13, 12, 14, 15, 9]),
            newDataSet("Promotion", "#0f0", [4651, 3012, 1946, 2712, 5914, 3815, 6539]),
            newDataSet("Place", "#f80", [765, 1665, 635, 462, 676, 666, 1357]),
            newDataSet("Finances", "#82f", [52, 135, 433, 476, 546, 612, 257])
        ]
    };

    Chart.defaults.global.defaultFontSize = 24;

    window.chart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: null
    });


});

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
