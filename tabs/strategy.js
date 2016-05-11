"use strict"

$(document).ready(function () {

	$("#prod").slider({ id: "prodSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })
	$("#prodSlider").css( { width: innerWidth * 0.7 } );

	$("#price").slider({ id: "priceSlider", min: 0, max: 1000, value: 0, tooltip: 'always' })

	$("#prod").on("slide", function (slide_evnt) {
		$("#prodValue").text(slide_evnt.value);
	});

	$("#prrod").on("slide", function (evnt) {
		console.log(evnt.value);
		console.log(evnt);
	});

});

