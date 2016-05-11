"use strict"

function lerp (from, to, t) {
	return from + (t < 0 ? 0 : t > 1 ? 1 : t) * (to - from);
}

function quadratic_out (k) {
	return k * (2 - k);
}

function sign (n) {
	return n < 0 ? -1 : 1;
}

function is_point_inside_box (p, box) {
	return p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h;
}

function dist_xy_sqr (a, b) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	return dx * dx + dy * dy;
}

function is_point_inside_circle (p, c) {
	return dist_xy_sqr(p, c) < c.r * c.r;
}

function does_circles_collides (a, b) {
	var dr = b.r - a.r;
	return dist_xy_sqr(a, b) < dr * dr;
}

function is_point_left_of_line_AB (p, A, B) {
	return (B.x - A.x) * (p.y - A.y) - (B.y - A.y) * (p.x - A.x) > 0;
}

function swap (array, i0, i1) {
    var tmp0 = array[i0];
    array[i0] = array[i1];
    array[i1] = tmp0;
}

function shuffle (o) {
	for (var j, x, i = o.length; i;) {
		j = Math.random() * i | 0;
		x = o[--i];
		o[i] = o[j];
		o[j] = x;
	}
	return o;
}

function reorder_index_0 (array, value) {
    var i = array.indexOf(value);
    return i != -1 ? [value].concat(array.slice(0, i), array.slice(i)) : null;
}

function wait (container, prop_name_to_test, prop_value, time, next) {
	if (container[prop_name_to_test] == prop_value) {
		next();
	} else {
		window.setTimeout(function () {
			wait(container, prop_name_to_test, prop_value, +time || 200, next);
		}, time);
	}
}

function loop_index (index, length) {
	return (length + (index % length)) % length;
}

function angle_interval (a, b) { // angles from 0 to Math.PI * 2
	var d = Math.abs(b - a);
	return d > Math.PI ? Math.PI - (d % Math.PI) : d;
}

function sum () {
	var sum = 0;
	for (var i = arguments.length; i--;) {
		sum += arguments[i];
	}
	return sum;
}

function average () {
	return sum.apply(null, arguments) / arguments.length;
}

function clone_obj (obj) {
    if (obj == null || typeof obj != "object" )
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

