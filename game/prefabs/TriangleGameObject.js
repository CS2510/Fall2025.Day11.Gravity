class TriangleGameObject extends GameObject{
    constructor(){
        super('Enemy Game Object')
        this.addComponent(new TriangleController())
        this.addComponent(new Polygon(), {fillStyle: "blue"})
        this.addComponent(new Collider())
        this.transform.scale = new Vector2(15, 15)
    }
}