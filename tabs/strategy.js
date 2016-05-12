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

