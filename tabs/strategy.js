"use strict"

$(document).ready(function () {

    window.prod_val = 0;
    window.price_val = 0;
    window.promo_val = 0;
    window.place_val = 0;
    window.current_fin_val = 0;
    window.total_cost = 0;
    window.next_fin_val = 0;

	$("#prodInput").slider({ id: "prodSlider", min: 0, max: 1000, value: prod_val, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 0, max: 100, value: price_val, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 0, max: 1000, value: promo_val, tooltip: 'always' })

	$("#prodInput").on("slide", on_prod_slide);
	$("#priceInput").on("slide", on_price_slide);
	$("#promoInput").on("slide", on_promo_slide);
    addEventListener("resize", on_resize, false);

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
    total_cost = prod_val + promo_val + place_val;
    next_fin_val = current_fin_val - total_cost;
    $("#placeValDom").text(place_val);
    $("#finDetailsDom").text("" + current_fin_val + " - " + total_cost + " =");
    $("#nextFinValDom").text(next_fin_val);
}

function on_prod_slide (evnt) {
    prod_val = +evnt.value;
    update_values();
}

function on_price_slide (evnt) {
    price_val = +evnt.value;
    update_values();
}

function on_promo_slide (evnt) {
    promo_val = +evnt.value;
    update_values();
}

