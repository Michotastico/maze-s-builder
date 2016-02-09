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

    this.run = function(){
        var _x = Math.floor(Math.random() * this.h);
        var _y = Math.floor(Math.random() * this.w);
        var _node = this.maze[_x][_y];
        _node.visited = true;
        this.active_set.push(_node);
        while(this.active_set.length != 0){
            //Select the node and remove it from the active_set.
            var result = this.method(this.active_set);
            this.active_set = result[0];
            _node = result[1];
            //Set the directions of neighbors
            var directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];  //UP, DOWN, LEFT, RIGHT
            //Set the undefined neighbor, remove flag and the index.
            var neighbor = undefined;
            var remove = false;
            var _i = -1;
            // Find a valid neighbor or check the remove flag.
            while(neighbor == undefined){
                if(directions.length == 0){
                    remove = true;
                    break;
                }
                _i = Math.floor(Math.random() * directions.length);
                var _d = directions[_i]
                directions.splice(_i, 1);
                var column = this.maze[_node._x + _d[0]]
                if(column == undefined){
                    continue;
                }
                neighbor = column[_node._y + _d[1]];
                if(neighbor != undefined && neighbor.wasVisited()){
                    neighbor = undefined;
                }
            }
            if(remove){
                continue;
            }
            _node.sides[_i] = false;
            neighbor.visited = true;
            this.active_set.push(_node);
            this.active_set.push(neighbor);
        }
    }

    this.init = function(){
        for(var i=0; i<this.h; i++) {
            this.maze[i] = [];
            for(var j=0; j<this.w; j++) {
                this.maze[i][j] = new MazeNode(i, j);
            }
        }
        this.run();
        console.log(this.maze);
    }

    this.init();

}
