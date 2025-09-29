/**
 * Base class for all scenes
 * 
 */

class Scene {
    gameObjects = []
    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
            gameObject.hasStarted = true
        }
    }
    update() {

        //Update everything
        for (const gameObject of this.gameObjects) {
            //Start if the gameObject hasn't started yet
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }
            gameObject.update()
        }

        const collidingGameObjects = this.gameObjects.filter(go => go.getComponent(Collider))

        for (let i = 0; i < collidingGameObjects.length; i++) {
            for (let j = i + 1; j < collidingGameObjects.length; j++) {
                if (Collisions.inCollision(collidingGameObjects[i], collidingGameObjects[j])) {
                    // for (const component of collidingGameObjects[i].components) {
                    //     component.onCollisionEnter?.(collidingGameObjects[j])
                    // }
                    // for (const component of collidingGameObjects[j].components) {
                    //     component?.onCollisionEnter?.(collidingGameObjects[i])
                    // }
                    collidingGameObjects[i].broadcastMessage("onCollisionEnter", [collidingGameObjects[j]])
                    collidingGameObjects[j].broadcastMessage("onCollisionEnter", [collidingGameObjects[i]])
                }
            }
        }



        //Delete what needs to be removed
        this.gameObjects = this.gameObjects.filter(go => !go.markForDelete)
    }
    draw(ctx) {
        for (const gameObject of this.gameObjects) {
            gameObject.draw(ctx)
        }
    }
    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        if (position)
            gameObject.transform.position = position
    }
}

function instantiate(gameObject, position){
    Engine.currentScene.instantiate(gameObject, position)
}