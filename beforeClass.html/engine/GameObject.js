/**
 * Base class for all objects ín a scene.
 * 
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */

class GameObject {
    components = []
    hasStarted = false
    markForDelete = false
    name = "[NO NAME]"

    constructor(name) {
        this.addComponent(new Transform())
        this.name = name
    }

    start() {
        this.broadcastMessage("start", [])
    }

    update() {
        if(!this.hasStarted){
            this.hasStarted = true
            this.start()
        }
        this.broadcastMessage("update", [])
    }

    draw(ctx) {
        this.broadcastMessage("draw", [ctx])
    }

    addComponent(component, values) {
        this.components.push(component)
        component.gameObject = this
        Object.assign(component, values)
    }

    get transform() {
        return this.components[0]
    }

    destroy() {
        this.markForDelete = true
    }

    getComponent(type) {
        return this.components.find(go => go instanceof type)
    }
    
    broadcastMessage(functionName, args){
        for(const component of this.components){
            component[functionName]?.(...args)
        }
    }

    static find(name){
        return Engine.currentScene.gameObjects.find(go=>go.name == name)
    }

    static findAll(name){
        return Engine.currentScene.gameObjects.filter(go=>go.name == name)
    }
}

function destroy(gameObject){
    gameObject.markForDelete = true
}