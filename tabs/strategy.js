"use strict"

$(document).ready(function () {

	$("#prodInput").slider({ id: "prodSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 0, max: 100, value: 0, tooltip: 'always' })
	$("#promoInput").slider({ id: "promoSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })

	$("#prodInput").on("slide", on_prod_slide);
	$("#priceInput").on("slide", on_price_slide);
	$("#promoInput").on("slide", on_promo_slide);
    //addEventListener("resize", on_resize, false);
    on_resize();
});


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

