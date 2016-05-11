"use strict"

function init_events () {
    addEventListener("beforeunload", on_beforeunload, false);
    addEventListener("mousedown", on_mouse_down, false);
    addEventListener("touchstart", on_mouse_down, false);
    addEventListener("mouseup", on_mouse_up, false);
    addEventListener("touchend", on_mouse_up, false);
    addEventListener("touchcancel", on_mouse_up, false);
    addEventListener("mousemove", on_mouse_move, false);
    addEventListener("touchmove", on_mouse_move, false);
    addEventListener("resize", on_resize, false);
}

function on_beforeunload () {
    storage.save();
}

function on_mouse_down (evnt) {
    mouse.is_down = true;
    update_mouse_coord(evnt);

    for (var i = 0; i < mouse.on_down_cbs.length; i++)
        mouse.on_down_cbs[i](evnt);
}

function on_mouse_up (evnt) {
    mouse.is_down = false;

    for (var i = 0; i < mouse.on_up_cbs.length; i++)
        mouse.on_up_cbs[i](evnt);
}

function on_mouse_move (evnt) {
    update_mouse_coord(evnt);

    for (var i = 0; i < mouse.on_move_cbs.length; i++)
        mouse.on_move_cbs[i](evnt);
}

function on_resize () {
    window.W = visible_canvas.width = buffer_canvas.width = innerWidth;
    window.H = visible_canvas.height = buffer_canvas.height = innerHeight;
    window.ratio_wh = W / H;
    window.min_size = Math.min(W, H);

    for (var i = 0; i < on_resize_cbs.length; i++)
        on_resize_cbs[i]();
}

function on_update (evnt) {
    for (var i = 0; i < on_update_cbs.length; i++)
        on_update_cbs[i](evnt);
}

function update_mouse_coord (evnt) {
    mouse.x = evnt.clientX || evnt.touches && evnt.touches[0].clientX;
    mouse.y = evnt.clientY || evnt.touches && evnt.touches[0].clientY;
}

