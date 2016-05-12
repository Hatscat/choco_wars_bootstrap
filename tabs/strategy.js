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

	$("#prodInput").on("slide", on_slide.bind(null, "prod_val"));
	$("#priceInput").on("slide", on_slide.bind(null, "price_val"));
	$("#promoInput").on("slide", on_slide.bind(null, "promo_val"));
    addEventListener("resize", on_resize, false);
	$("#mapBt").on("click", on_map_button_click);

    on_resize();
    update_values();
});

function on_resize () {
    var slider_w = innerWidth * 0.6;
	$("#prodSlider").css( { width: slider_w } );
	$("#priceSlider").css( { width: slider_w } );
	$("#promoSlider").css( { width: slider_w } );
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
    var dt_people_tastes_labels = ["product quality", "price", "promotion"];
    window.dt_people_tastes_colors = ["#e64", "#4e6", "#64e"];
    var slider_w = innerWidth * 0.33;

    // dt1
	$("#dt1Input").slider({ id: "dt1Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt1Slider").css( { width: slider_w } );
	$("#dt1Input").on("slide", on_slide.bind(null, "dt1_val"));
    new Chart(dt1Canvas, {
        type: 'doughnut',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [16, 48, 36])
    });

    // dt2
	$("#dt2Input").slider({ id: "dt2Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt2Slider").css( { width: slider_w } );
	$("#dt2Input").on("slide", on_slide.bind(null, "dt2_val"));
    new Chart(dt2Canvas, {
        type: 'doughnut',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [27, 29, 44])
    });

    // dt3
	$("#dt3Input").slider({ id: "dt3Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt3Slider").css( { width: slider_w } );
	$("#dt3Input").on("slide", on_slide.bind(null, "dt3_val"));
    new Chart(dt3Canvas, {
        type: 'doughnut',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [53, 9, 38])
    });

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
                ["Golden Tower", "Poor Souls", "Boosted Hive"][d],
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
