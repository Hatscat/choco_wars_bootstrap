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

function is_point_left_of_line_AB (p, a, b) {
	return (b.x - a.x) * (a.y - p.y) - (a.y - b.y) * (p.x - a.x) > 0;
}

function is_point_inside_convex_shape (p, vx) {
    for (var i = 0; i < vx.length; ++i) {
        if (is_point_left_of_line_AB(p, vx[i], (i+1 < vx.length ? vx[i+1] : vx[0])))
            return false;
    }
    return true;
}

function does_vec_collids (a, b, c, d) {
    var dABx = b.x - a.x;
    var dABy = b.y - a.y;
    var dCDx = d.x - c.x;
    var dCDy = d.y - c.y;
    var denom = dABx * dCDy - dABy * dCDx;
    if (!denom)
        return -1;
    var t = - (a.x * dCDy - c.x * dCDy - dCDx * a.y  + dCDx * c.y) / denom;
    if (t < 0 || t >= 1)
        return 0;
    var u = - (-dABx * a.y + dABx * c.y + dABy * a.x - dABy * c.x) / denom;
    if (u < 0 || u >= 1)
        return 0;
    return 1;
}

function is_point_inside_shape (p, vx) {
    var n = 0;
    var _p = { x: 10000 + Math.random() * 100, y: 10000 + Math.random() * 100 };
    for (var i = 0; i < vx.length; ++i) {
        var col = does_vec_collids(vx[i], (i+1 < vx.length ? vx[i+1] : vx[0]), _p, p);
        if (col == -1)
            return is_point_inside_shape(p, vx);
        else if (col == 1)
            ++n;
    }
    return n % 2 == 1;
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

