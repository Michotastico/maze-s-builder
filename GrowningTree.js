/**
 * Created by micho on 2/8/16.
 */

function MazeNode( _x, _y){
    this.sides = [true, true, true, true];
    this.visited = false;
    this._x = _x;
    this._y = _y;

    this.wasVisited = function(){
        return this.visited;
    }

    this.wallUp = function(){
        return this.sides[0];
    }

    this.wallDown = function(){
        return this.sides[1];
    }

    this.wallLeft = function(){
        return this.sides[2];
    }

    this.wallRight = function(){
        return this.sides[3];
    }
}

function prim( arr){
    var index = Math.floor(Math.random() * arr.length);
    var _node = arr[index];
    arr.splice(index, 1);
    return [arr, _node];
}

function recursive_backtracking( arr){
    var _node = arr.pop();
    return [arr, _node];
}

function GrowningTree( method, height, weight){

    this.active_set = [];
    this.maze = [];
    this.h = height;
    this.w = weight;
    this.method = method;

    this.run(){
        var _x = Math.floor(Math.random() * this.h);
        var _y = Math.floor(Math.random() * this.w);
        var _node = this.maze[_x][_y];
        this.active_set.push(_node);
        while(this.active_set.length != 0){
            //TODO Select node, check neighbors. etc etc.
        }
    }

    this.init = function(){
        for(var i=0; i<this.h; i++) {
            this.maze[i] = [];
            for(var j=0; j<this.w; j++) {
                this.maze[i][j] = new MazeNode(i, j);
            }
        }
    }

    this.init();



}
