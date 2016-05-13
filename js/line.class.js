"use strict"

window.Line = function (x0, y0, x1, y1) {

	//	y = a * x + b

	this.a = (y1 - y0) / (x1 - x0 || 1e-9); // pour les lignes 100% verticales ou horizontales
	this.b = y0 - x0 * this.a || y0; // bonus: x = x0-y0*(1/a) pour y == 0
}

Line.prototype.get_x = function (y) {

	return (y - this.b) / this.a;
};

Line.prototype.get_y = function (x) {

	return this.a * x + this.b;
};

Line.prototype.is_point_through = function (x, y) {
	
	return this.a * x + this.b == y;
};

Line.prototype.line_collision = function (other_line) {

	if (this.a == other_line.a) { // parallèles !
		return null;
	}

	var x = (this.b - other_line.b) / (other_line.a - this.a);

	return { x: x, y: this.a * x + this.b };
};

Line.prototype.line_angle = function (other_line) {

	return atan( (other_line.a - this.a) / (1 + other_line.a * this.a) );
};
