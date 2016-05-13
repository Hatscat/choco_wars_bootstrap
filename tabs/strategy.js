"use strict"

$(document).ready(function () {

    window.prod_val = 0;
    window.price_val = 0;
    window.promo_val = 0;
    window.dt1_val = 0;
    window.dt2_val = 0;
    window.dt3_val = 0;
    window.place_val = 0;
    window.current_fin_val = 0;
    window.total_cost = 0;
    window.next_fin_val = 0;

	$("#prodInput").slider({ id: "prodSlider", min: 0, max: 1000, value: prod_val, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 0, max: 100, value: price_val, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 0, max: 1000, value: promo_val, tooltip: 'always' })

	$("#prodSlider").on("slide", on_slide.bind(null, "prod_val"));
	$("#prodSlider").on("tap", on_pointer_down.bind(null, "prod_val"));
	$("#prodSlider").on("click", on_pointer_down.bind(null, "prod_val"));
	$("#priceSlider").on("slide", on_slide.bind(null, "price_val"));
	$("#priceSlider").on("tap", on_pointer_down.bind(null, "price_val"));
	$("#priceSlider").on("click", on_pointer_down.bind(null, "price_val"));
	$("#promoSlider").on("slide", on_slide.bind(null, "promo_val"));
	$("#promoSlider").on("tap", on_pointer_down.bind(null, "promo_val"));
	$("#promoSlider").on("click", on_pointer_down.bind(null, "promo_val"));

    addEventListener("resize", on_resize, false);
	$("#mapBt").on("click", on_map_button_click);
	$("#strategySubmitBt").on("click", on_submit);

    on_resize();
    update_values();
});

function on_resize () {
    var slider_w = innerWidth * 0.6;
	$("#prodSlider").css( { width: slider_w } );
	$("#priceSlider").css( { width: slider_w } );
	$("#promoSlider").css( { width: slider_w } );
}

function on_submit () {
    var is_round_end = false;
    location.href = is_round_end ? "./performance.html" : "./board.html";
}

function update_values () {
    place_val = dt1_val * 50 + dt2_val * 150 + dt3_val * 350; // todo
    total_cost = prod_val + promo_val + place_val;
    next_fin_val = current_fin_val - total_cost;
    $("#placeValDom").text(place_val);
    $("#finDetailsDom").text("" + current_fin_val + " - " + total_cost + " =");
    $("#nextFinValDom").text(next_fin_val);
}

function on_slide (var_name, evnt) {
    window[var_name] = +evnt.value;
    update_values();
}

function on_pointer_down (var_name, evnt) {
    console.log("val", evnt, evnt.target.parentElement.innerText);
    if (evnt.target.parentElement.innerText)
        window[var_name] = +evnt.target.parentElement.innerText;
    update_values();
}

function on_map_button_click () {
    init_map();
}

// ---- map ---- //

function init_map () {

    mapCanvas.width = 898 - 30;
    mapCanvas.height = window.innerHeight * 0.78;
    window.map_vx = get_map_vertex(mapCanvas.width, mapCanvas.height);

    mapCanvas.addEventListener("mouseup", on_map_click, false);
    mapCanvas.addEventListener("touchend", on_map_click, false);

    // districts

    Chart.defaults.global.defaultFontSize = 20;
    window.dt_people_tastes_colors = ["#e64", "#4e6", "#64e"];

    for (var i=1; i < 4; ++i) {

        var nm = "#dt"+i;
        var vn = "dt"+i+"_val";
        var team_names = ["AAA", "Millenium", "TMP", "RGBA", "Conspiracy"];

        $(nm+"Input").slider({ id: "dt"+i+"Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
        $(nm+"Slider").css( { width: innerWidth * 0.33 } );
        $(nm+"Slider").on("slide", on_slide.bind(null, vn));
        $(nm+"Slider").on("tap", on_pointer_down.bind(null, vn));
        $(nm+"Slider").on("click", on_pointer_down.bind(null, vn));

        new Chart($(nm+"PopCanvas"), {
            type: 'doughnut',
            data: new_chart_data(
                ["product quality", "price", "promotion"],
                dt_people_tastes_colors,
                [Math.random(), Math.random(), Math.random()])
        });
        new Chart($(nm+"StallsCanvas"), {
            type: 'pie',
            data: new_chart_data(
                team_names,
                getColors(team_names),
                [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()])
        });
    }

    draw_map();
}

function draw_map () {

    var w = mapCanvas.width;
    var h = mapCanvas.height;
    var ctx = mapCanvas.getContext("2d");
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;

    ctx.clearRect(0, 0, w, h);

    for (var d = 0; d < map_vx.length; ++d) {
        ctx.beginPath();
        ctx.moveTo(map_vx[d][0].x, map_vx[d][0].y);
        for (var i = 1; i < map_vx[d].length; ++i)
            ctx.lineTo(map_vx[d][i].x, map_vx[d][i].y);
        ctx.closePath();
        ctx.fillStyle = dt_people_tastes_colors[d];
        ctx.fill();
        ctx.stroke();
    }

    ctx.font = "italic bold 30px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (var d = 0; d < map_vx.length; ++d) {
        ctx.fillStyle = "#000";
        ctx.fillText(
                ["Wall Street", "Bronx", "Brooklyn"][d],
                [0.45, 0.38, 0.7][d] * w,
                [0.15, 0.66, 0.42][d] * h
        );
    }
}

function on_map_click (evnt) {

    var p = {
        x: evnt.pageX,
        y: evnt.pageY
    };

    if (evnt.touches && evnt.touches[0]) {
        p.x = evnt.touches[0].pageX;
        p.y = evnt.touches[0].pageY;
    }
    
    if (!p.x && !p.y)
        return;

    var canvas_coord = mapCanvas.getBoundingClientRect();
    p.x -= canvas_coord.left;
    p.y -= canvas_coord.top;

    //console.log(p.x, p.y, map_vx[0])

    // test collisions forme complexe
    for (var i = 0; i < map_vx.length; ++i) {
        if (is_point_inside_shape(p, map_vx[i])) {
            location.href = "#dt" + ([3,1,2][i]) + "BM";
            return;
        }
    }
}

function get_map_vertex (w, h) {

    var vx = [
        [
            5, 10,
            55, 0,
            70, 15,
            42, 32
        ],
        [
            5, 10,
            42, 32,
            60, 100,
            25, 85,
            22, 50,
            0, 28
        ],
        [
            42, 32,
            70, 15,
            100, 42,
            65, 80,
            60, 100
        ]
    ];
    
    var vertex = [];
    for (var i = 0; i < vx.length; ++i) {
        vertex[i] = [];
        for (var ii=0, j=0; ii < vx[i].length; ii+=2, ++j) {
            vertex[i][j] = {
                x: vx[i][ii] * 0.01 * w,
                y: vx[i][ii+1] * 0.01 * h
            };
        }
    }

    return vertex;
}

function new_chart_data (labels, colors, data) {

    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }],
    };
}

