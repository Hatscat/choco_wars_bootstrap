"use strict"

$(document).ready(function () {
	get_game_data(init);
});

function init () {
	$("#prodInput").slider({ id: "prodSlider", min: 0, max: config.game_data.maximunAmounts.qualityBudget, value: 0, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 0, max: config.game_data.maximunAmounts.productPrice, value: 0, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 0, max: config.game_data.maximunAmounts.marketingBudget, value: 0, tooltip: 'always' })

	$("#prodInput").on("slide", on_prod_slide);
	$("#priceInput").on("slide", on_price_slide);
	$("#promoInput").on("slide", on_promo_slide);
    addEventListener("resize", on_resize, false);
    on_resize();
}

function on_resize () {
    var slider_w = innerWidth * 0.6;
	$("#prodSlider").css( { width: slider_w } );
	$("#priceSlider").css( { width: slider_w } );
	$("#promoSlider").css( { width: slider_w } );
}

function on_prod_slide (evnt) {
    //$("#prodValue").text(evnt.value);
}

function on_price_slide (evnt) {
    //$("#priceValue").text(evnt.value);
}

function on_promo_slide (evnt) {
    //$("#priceValue").text(evnt.value);
}

function submit_decision () {
	//place is tmp
	var decisions = { 
		"price": priceInput.value | 0,
		"qualityBudget": prodInput.value | 0,
		"marketingBudget": promoInput.value | 0,
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
	db_access("teamDecisions", "POST", "token=" + storage.data.token + "&decisions=" + decisions, submit_return)
}

function submit_return (res) {
	JSON.parse(res);

	if(res.statusCode != 200) {
		alert(res.message);
	}
	else {
		//TODO: Block the decisions until next round
	}
}

