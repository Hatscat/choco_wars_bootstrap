"use strict"

$(document).ready(function () {

	$("#prodInput").slider({ id: "prodSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })
	$("#priceInput").slider({ id: "priceSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })

	$("#prodInput").on("slide", on_prod_slide);
	$("#priceInput").on("slide", on_price_slide);
    addEventListener("resize", on_resize, false);
    on_resize();
});


function on_resize () {
	$("#prodSlider").css( { width: innerWidth * 0.6 } );
	$("#priceSlider").css( { width: innerWidth * 0.6 } );
}

function on_prod_slide (evnt) {
    //$("#prodValue").text(evnt.value);
}

function on_price_slide (evnt) {
    //$("#priceValue").text(evnt.value);
}
