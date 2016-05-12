"use strict";

function db_access (id, method, param, callback) { //param is a string of type application/x-www-form-urlencoded

	var url = config.api_url + id + ".php";
	if(method == "GET") {
		url += "?" + param;
		param = null;
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.withCredentials = true;
	xmlhttp.open(method, url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function (aEvt) {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status  == 200) {
				if(callback) {
					callback(xmlhttp.responseText);
				}			
			}
		}
	}
	xmlhttp.send(param);
}
