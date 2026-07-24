export class Node{
    constructor(_id, _value, _x, _y){
        this.id = _id;
        this.value = _value;
        this.x = _x;
        this.y = _y;

        this.state = {
            color: "white",
            selected : false
        };
    }

    setColor(_color) { this.state.color = _color}

    setSelected(_selected) { this.state.selected = _selected }
}