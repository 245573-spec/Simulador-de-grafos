export class Edge{
    constructor(_weigth = 0, _from, _to){
        this.weigth = _weigth;
        this.from = _from;
        this.to = _to;
        this.state = {
            color: "black",
            selected: false
        }
    }
    setColor(_color) { this.state.color = _color; }

    setSelected(_selected) { this.state.selected = _selected; }
}
