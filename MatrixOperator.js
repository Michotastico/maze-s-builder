"use strict";
class Matrix{
	constructor(height,weight){
		this.h = height;
		this.w = weight;
		this.matrix = [];
		for (var i = 0; i < this.w; i++) { 
			this.matrix[i] = [];
   			for (var o = 0; o < this.h; o++){
				this.matrix[i][o] = 0;
			}
		}	
	}

	get size(){
		return [this.w, this.h];
	}

	get show(){
		var m = "";
		for (var i = 0; i < this.w; i++) {
   			for (var o = 0; o < this.h; o++){
				m = m + this.matrix[i][o];
			}
			m = m + "<br>"
		}
		return m;
	}

	changeInRange(Ry, Rx, n){
		var rx0, rx1, ry0, ry1;
		if(Rx[0]==Rx[1]){
			rx0=Rx[0]; 
			rx1=rx0+1;
		}
		else{
			rx0=Rx[0]; 
			rx1=Rx[1];
		}
		if(Ry[0]==Ry[1]){
			ry0=Ry[0]; 
			ry1=ry0+1;
		}
		else{
			ry0=Ry[0];	
			ry1=Ry[1];
		}
		for (var i = rx0; i < rx1; i++) {
   			for (var o = ry0; o < ry1; o++){
				this.matrix[i][o] = n;
			}
		}
	}

	getLocal(x, y){
		return this.matrix[x][y];
	}

	change(x, y, n){
		var prev = self.matrix[x][y];
		this.matrix[x][y] = n;
		return (prev == this.matrix[x][y]);
	}


}
