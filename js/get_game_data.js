"use strict"

function get_game_data (callback) {
	db_access('gameData', 'GET', '', function (res){
		res = JSON.parse(res);
		config.game_data = res.message;
		callback();
	});
}