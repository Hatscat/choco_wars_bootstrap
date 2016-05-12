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
    storage.data.dt1_val = storage.data.dt1_val || 0;
    storage.data.dt2_val = storage.data.dt2_val || 0;
    storage.data.dt3_val = storage.data.dt3_val || 0;
    storage.data.current_fin_val = storage.data.current_fin_val || game_data.initialFinances;

    window.total_cost = 0;
    window.next_fin_val = 0;

	$("#prodInput").slider({ id: "prodSlider", min: 1, max: game_data.maximunAmounts.qualityBudget, value: storage.data.prod_val, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 1, max: game_data.maximunAmounts.productPrice, value: storage.data.price_val, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 1, max: game_data.maximunAmounts.marketingBudget, value: storage.data.promo_val, tooltip: 'always' })


	$("#prodInput").on("slide", on_slide.bind(null, "prod_val"));
	$("#priceInput").on("slide", on_slide.bind(null, "price_val"));
	$("#promoInput").on("slide", on_slide.bind(null, "promo_val"));
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
    storage.data.place_val = storage.data.dt1_val * game_data.mapDistricts[0].stallPrice + storage.data.dt2_val * game_data.mapDistricts[1].stallPrice + storage.data.dt3_val * game_data.mapDistricts[2].stallPrice; // todo
    total_cost = storage.data.prod_val + storage.data.promo_val + storage.data.place_val;
    next_fin_val = storage.data.current_fin_val - total_cost;
    $("#placeValDom").text(storage.data.place_val);
    $("#finDetailsDom").text("" + storage.data.current_fin_val + " - " + total_cost + " =");
    $("#nextFinValDom").text(next_fin_val);
}

function on_slide (var_name, evnt) {
    storage.data[var_name] = +evnt.value;
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
    mapCanvas.height = window.innerHeight * 0.78;
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
    for(var i = 0; i < 3; i++) {
	    document.getElementById("dt" + (i+1) +"PriceDom").innerHTML = game_data.mapDistricts[i].stallPrice;
	    document.getElementById("dt" + (i+1) +"PopDom").innerHTML = game_data.mapDistricts[i].totalPopulation;
		$("#dt" + (i+1) +"Input").slider({ id: "#dt" + (i+1) + "Slider", min: 0, max: game_data.mapDistricts[i].maxStallNb, value: storage.data.prod_val, tooltip: 'always' })
		$("#dt1Slider").css( { width: slider_w } );
		$("#dt1Input").on("slide", on_slide.bind(null, "#dt" + (i+1) + "_val"));

		var pop_average = [0,0,0];
		for(var j = 0; j < game_data.mapDistricts[i].population.length; j++) {
			var pop_data = game_data.customers[game_data.mapDistricts[i].population[j].typeName];
			var total_coefs = pop_data.qualitySensitivity + pop_data.priceSensitivity + pop_data.marketingSensitivity
			pop_average[0] +=  pop_data.qualitySensitivity / total_coefs;
			pop_average[1] +=  pop_data.priceSensitivity / total_coefs;
			pop_average[2] +=  pop_data.marketingSensitivity / total_coefs;
		}
		pop_average[0] = pop_average[0] / game_data.mapDistricts[i].population.length * 100;
		pop_average[1] = pop_average[1] / game_data.mapDistricts[i].population.length * 100;
		pop_average[2] = pop_average[2] / game_data.mapDistricts[i].population.length * 100;

	    new Chart($("#dt" + (i+1) +"Canvas"), {
	        type: 'pie',
	        data: new_chart_data(dt_people_tastes_labels, dt_people_tastes_colors, pop_average)
	    });

    }
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
