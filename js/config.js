"use strict"

window.config = {
    font: "Arial",
    title_font: "Impact",
    font_size: 0.05,
    title_font_size: 0.15,
    bg_colors: {
        strategy: ["#ccf", "#bbe"],
        board: ["#ff7", "#ee6"],
        performances: ["#8f9", "#7e8"]
    },
    api_url: "localhost",
    ALIGN_H: 1,
    ALIGN_V: 1 << 1,
    VAR_ID: {
        PROD: 1,
        PRICE: 2,
        PROMO: 3,
        PLACE: 4,
        FIN: 5,
        COST: 6,
        FIN_PREV: 7,
        FIN_DETAILS: 8
    }
};
