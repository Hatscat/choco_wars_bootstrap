"use strict"

function init_events () {
    window.addEventListener("beforeunload", on_beforeunload, false);
}

function on_beforeunload () {
    storage.save();
}


