"use strict"

window.storage = {};

storage.load = function () {
    if (!storage.data) {
        if (localStorage.choco_wars) {
            try {
                storage.data = JSON.parse(localStorage.choco_wars);
            } catch (error) {
                console.error("JSON.parse error:", error);
                storage.data = {};
            }
        } else {
            storage.data = {};
        }
    }
    return storage.data;
};

storage.save = function (data) {
    if (!data && !storage.data)
        return false;
    var data_json;
    if (data && typeof data == "object") {
        storage.data = clone_obj(data);
    }
    try {
        data_json = JSON.stringify(storage.data);
    } catch (error) {
        console.error("JSON.parse error:", error);
        return false;
    }
    localStorage.choco_wars = data_json;
    return true;
};

