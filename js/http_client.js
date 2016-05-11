"use strict"

function post_req (url, data, cb) {

    try {
        data = JSON.stringify(data);
    } catch (error) {
        console.error("JSON.stringify error:", error);
        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onerror = on_req_error;
    xhr.onload = on_req_load.bind(cb);
    xhr.send(data);
}

function get_req (url, data, cb) {

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.open("GET", url + (data ? "/" + data : ""), true);

    xhr.onerror = on_req_error;
    xhr.onload = on_req_load.bind(cb);
    xhr.send(null);
}

function on_req_error (evnt) {
    console.error("error:", evnt);
}

function on_req_load (evnt, success_cb, fail_cb) {
    if (evnt.target.status == 200) {
        if (success_cb)
            success_cb(evnt.target.responseText);
    } else {
        console.error("req load error:", evnt.target.status, evnt.target.responseText);
        if (fail_cb)
            fail_cb(evnt.target.status, evnt.target.responseText);
        else
            alert("Http request error: " + evnt.target.status + "\n" + evnt.target.responseText);
    }
}

