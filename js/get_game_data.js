"use strict"

function get_game_data (callback) {
	db_access('gameData', 'GET', '', function (res){
		res = JSON.parse(res);
		window.game_data = res.message;
		callback();
	});
}

window.oldTime = 0;

function time_check () {
	db_access("timeLeft", "GET", '', time_return);
	window.setTimeout(time_check, 100);
}

function time_return (res) {
	res = JSON.parse(res);

    if(res.statusCode == 200) {
        storage.data.time_left = res.message.timeLeft;
        if(storage.data.current_round != res.message.round) {
            toggle_submit_lock(false);
            storage.data.current_round = res.message.round;
            if( res.message.round > 1 && confirm("The round has ended. Do you want to go to the performances view ?")) {
                window.location.href = "performances.html";
            }
        }
    }
    else if(res.message == "Game over") {
        window.location.href = "performances_history.html";
    }
    else {
        toggle_submit_lock(true);
    }

	get_latest_data();
}

function time_pass (time) {
	var delta = (time - oldTime) / 1000;
	oldTime = time;
	storage.data.time_left -= delta;
	requestAnimationFrame(time_pass);
}

function get_latest_data () {
    if (window["stats_return"])
        db_access("teamStats", "GET", "token=" + storage.data.token, stats_return);
}


