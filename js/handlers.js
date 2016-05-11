"use strict"

function login () {

    console.log("login");

    var team_name = prompt("Choose a great team name:", storage.data.team_name);
    var team_pwd = prompt("Choose a secret password:", storage.data.team_pwd);
    
    if (!team_name || !team_pwd) {
        console.warn("incorrect input");
        return;
    }

    storage.data.team_name = team_name;
    storage.data.team_pwd = team_pwd;

    struct.layers_order = reorder_index_0(struct.layers_order, "strategy");
    /* // w8 for api
    get_req(config.api_url + "/loginToken", "?teamName=" + team_name + "&pwd=" + team_pwd, function (data) {
        console.log("logged!", data);
        storage.data.token = data;
        //swap(struct.layers_order, 0, 1);
        struct.layers_order = reorder_index_0(struct.layers_order, "strategy");
    });
    */
}

function goto_board () {

    struct.layers_order = reorder_index_0(struct.layers_order, "board");
}

function goto_perfs () {

    struct.layers_order = reorder_index_0(struct.layers_order, "performances");
}

function goto_strategy () {

    struct.layers_order = reorder_index_0(struct.layers_order, "strategy");
}

