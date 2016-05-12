"use strict"

$(document).ready(function () {
	init_events();
	get_game_data(init);
});


function init () {
    storage.data.prod_val = storage.data.prod_val || 0;
    storage.data.price_val = storage.data.price_val || 0;
    storage.data.promo_val = storage.data.promo_val || 0;
    storage.data.place_val = storage.data.place_val || 0;
    storage.data.current_fin_val = storage.data.current_fin_val || game_data.initialFinances;
    window.total_cost = 0;
    window.next_fin_val = 0;

	$("#prodInput").slider({ id: "prodSlider", min: 1, max: game_data.maximunAmounts.qualityBudget, value: storage.data.prod_val, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 1, max: game_data.maximunAmounts.productPrice, value: storage.data.price_val, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 1, max: game_data.maximunAmounts.marketingBudget, value: storage.data.promo_val, tooltip: 'always' })


	$("#prodInput").on("slide", on_prod_slide);
	$("#priceInput").on("slide", on_price_slide);
	$("#promoInput").on("slide", on_promo_slide);
    addEventListener("resize", on_resize, false);
	$("#mapBt").on("click", on_map_button_click);

    on_resize();
    update_values();
}

function on_resize () {
    var slider_w = innerWidth * 0.6;
	$("#prodSlider").css( { width: slider_w } );
	$("#priceSlider").css( { width: slider_w } );
	$("#promoSlider").css( { width: slider_w } );
}

function update_values () {
    total_cost = storage.data.prod_val + storage.data.promo_val + storage.data.place_val;
    next_fin_val = storage.data.current_fin_val - total_cost;
    $("#placeValDom").text(storage.data.place_val);
    $("#finDetailsDom").text("" + storage.data.current_fin_val + " - " + total_cost + " =");
    $("#nextFinValDom").text(next_fin_val);
}

function on_prod_slide (evnt) {
    storage.data.prod_val = +evnt.value;
    update_values();
}

function on_price_slide (evnt) {
    storage.data.price_val = +evnt.value;
    update_values();
}

function on_promo_slide (evnt) {
    storage.data.promo_val = +evnt.value;
    update_values();
}

function submit_decision () {
	//place is tmp
	var decisions = { 
		"price": storage.data.price_val,
		"qualityBudget": storage.data.prod_val,
		"marketingBudget": storage.data.promo_val,
		"place" : [
			{
				"mapDistrictIndex": 0,
				"stallQuantity": 2
			},
			{
				"mapDistrictIndex": 1,
				"stallQuantity": 2
			}
		]
	}
	db_access("teamDecisions", "POST", "token=" + storage.data.token + "&decisions=" + JSON.stringify(decisions), submit_return)
}

function submit_return (res) {
	res = JSON.parse(res);

	if(res.statusCode != 200) {
		alert(res.message);
	}
	else {
		//TODO: Block the decisions until next round
	}
}


function on_map_button_click () {
    init_map();
}

// ---- map ---- //

function init_map () {

    mapCanvas.width = 898 - 30;
    mapCanvas.height = window.innerHeight * 0.77;
    window.mapCtx = mapCanvas.getContext("2d");

    mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

    $("mapCanvas").on("mouseup", on_map_click);
    $("mapCanvas").on("touchend", on_map_click);

    // districts

    Chart.defaults.global.defaultFontSize = 20;
    var dt_people_tastes_labels = ["product quality", "price", "promotion"];
    var dt_people_tastes_colors = ["#e64", "#4e6", "#64e"];
    var slider_w = innerWidth * 0.33;

    // dt1
	$("#dt1Input").slider({ id: "dt1Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt1Slider").css( { width: slider_w } );
    new Chart(dt1Canvas, {
        type: 'pie',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [16, 48, 36])
    });

    // dt2
	$("#dt2Input").slider({ id: "dt2Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt2Slider").css( { width: slider_w } );
    new Chart(dt2Canvas, {
        type: 'pie',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [27, 29, 44])
    });

    // dt3
	$("#dt3Input").slider({ id: "dt3Slider", min: 0, max: 10, value: prod_val, tooltip: 'always' })
	$("#dt3Slider").css( { width: slider_w } );
    new Chart(dt3Canvas, {
        type: 'pie',
        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, [53, 9, 38])
    });
}

function on_map_click (evnt) {

    console.log(evnt.pageX, evnt.pageY);
    // test collisions forme complexe
    // location.href = "#" + dt_name;
}


function get_map_vertex () {
    return [
        [
            
        ],

    ];
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
