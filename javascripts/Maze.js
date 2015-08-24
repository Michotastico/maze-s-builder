"use strict";
class Maze{
	constructor(height, weight){
		this.h = height;
		this.w = weight;
		this.maze = new Matrix(this.h, this.w);
	}

	generate(){

		this.maze.changeInRange([0, 0], [0, this.h], 1);
		this.maze.changeInRange([this.w - 1, this.w], [0, this.h], 1);
		this.maze.changeInRange([0, this.w], [0, 0], 1);
		this.maze.changeInRange([0, this.w], [this.h-1, this.h], 1);

		for (var i = 0; i < this.h*this.w; i++){
			this.horizontalWork();
			this.verticalWork();
			this.corrector();
		}
		//
	}

	randomRange(a, b){
		var c = b-a+1;
		var v = Math.floor(a + Math.random() * c);
		return v;

	}

	horizontalWork(){
		var num_col = this.randomRange(1, this.w-2);
		var num_row = 1;

		var start_point = [-1, -1];
		var work = false;

		while (true){
			var vpos = this.maze.getLocal(num_row, num_col);
			var vposl = this.maze.getLocal(num_row, num_col - 1);
			var vposr = this.maze.getLocal(num_row, num_col + 1);
			var vnpos = this.maze.getLocal(num_row + 1, num_col);
			var vnposl = this.maze.getLocal(num_row + 1, num_col - 1);
			var vnposr = this.maze.getLocal(num_row + 1, num_col + 1);
			if (vpos == 0 && vposl == 0 && vposr == 0 && vnpos == 0 && vnposl == 0 && vnposr == 0){
				start_point = [num_row, num_col];
				work = true;
				break;
			}
			else{
				num_row = num_row + 1;
				if(num_row >= this.w - 1){
					break;
				}
			}
		}
		if (work == false){
			return false;
		}

		var end = [-1, -1];

		while (true){
			var vpos = this.maze.getLocal(num_row,num_col);
			var vposl = this.maze.getLocal(num_row,num_col-1);
			var vposr = this.maze.getLocal(num_row,num_col+1);
			var vnpos = this.maze.getLocal(num_row+1,num_col);
			var vnposl = this.maze.getLocal(num_row+1,num_col-1);
			var vnposr = this.maze.getLocal(num_row+1,num_col+1);
			if (vpos == 0 && vposl == 0 && vnposr == 0 && vnpos == 0 && vnposl == 0 && vnposr == 0){
				num_row =num_row + 1;
			}
			else{
				end = [num_row+1, num_col];
				break;
			}
		}
		var num_mid = this.randomRange(start_point[0], end[0]);

		this.maze.changeInRange([num_col, num_col], [start_point[0], end[0]], 1);
		this.maze.change(num_mid, num_col, 0);

		return true;
	}

	verticalWork(){
		var num_row = this.randomRange(1, this.h-2);
		var num_col = 1;

		var start = [-1,-1];
		var work = false;

		while (true){
			var vpos = this.maze.getLocal(num_row, num_col);
			var vposl = this.maze.getLocal(num_row - 1, num_col);
			var vposr = this.maze.getLocal(num_row + 1, num_col);
			var vnpos = this.maze.getLocal(num_row, num_col + 1);
			var vnposl = this.maze.getLocal(num_row - 1, num_col + 1);
			var vnposr = this.maze.getLocal(num_row + 1, num_col + 1);
			if(vpos == 0 && vposl == 0 && vposr == 0 && vnpos == 0 && vnposl == 0 && vnposr == 0){
				start = [num_row, num_col];
				work = true;
				break;
			}
			else{
				num_col = num_col + 1
				if (num_col >= this.h - 1){
					break;
				}
			}
		}
		if (work == false){
			return false;
		}
		var end = [-1, -1];
		while (true){
			var vpos = this.maze.getLocal(num_row,num_col);
			var vposl = this.maze.getLocal(num_row-1,num_col);
			var vposr = this.maze.getLocal(num_row+1,num_col);
			var vnpos = this.maze.getLocal(num_row,num_col+1);
			var vnposl = this.maze.getLocal(num_row-1,num_col+1);
			var vnposr = this.maze.getLocal(num_row+1,num_col+1);

			if(vpos == 0 && vposl == 0 && vposr == 0 && vnpos == 0 && vnposl == 0 && vnposr == 0){
				num_col = num_col + 1;
			}
			else{
				end = [num_row, num_col + 1];
				break;
			}
		}
		var num_mid = this.randomRange(start[1], end[1]);
		this.maze.changeInRange([start[1], end[1]], [num_row, num_row], 1);
		this.maze.change(num_row, num_mid, 0);
		return true;
	}

	corrector(){
		for(var i = 1; i < this.w - 1; i++){
			for(var o = 1; o < this.h - 1;  o++){
				var M = this.maze;
				if (M.getLocal(i, o) == 1){
					if (M.getLocal(i, o - 1) == 0 && M.getLocal(i - 1, o - 1) == 1 && M.getLocal(i + 1, o - 1) == 1 && M.getLocal(i - 1, o) == 0 && M.getLocal(i + 1, o) == 0){
						M.change(i, o, 0);
					}
					else if (M.getLocal(i, o + 1) == 0 && M.getLocal(i - 1, o + 1) == 1 && M.getLocal(i + 1, o + 1) == 1 && M.getLocal(i - 1, o) == 0 && M.getLocal(i + 1, o) == 0){
						M.change(i, o, 0);
					}
					else if(M.getLocal(i - 1, o) == 0 && M.getLocal(i - 1, o - 1) == 1 && M.getLocal(i - 1, o + 1) == 1 && M.getLocal(i, o + 1) == 0 && M.getLocal(i, o - 1) == 0){
						M.change(i, o, 0);
					}
					else if(M.getLocal(i + 1, o) == 0 && M.getLocal(i + 1, o - 1) == 1 && M.getLocal(i + 1, o + 1) == 1 && M.getLocal(i, o + 1) == 0 && M.getLocal(i, o - 1) == 0){
						M.change(i, o, 0);
					}
				}

			}

		}

	}

	get getMaze(){
		return this.maze;
	}

	get show(){
		var m = this.maze.show;
		return m;
	}

}
