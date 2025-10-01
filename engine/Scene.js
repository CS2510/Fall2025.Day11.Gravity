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
                const a = collidingGameObjects[i]
                const b = collidingGameObjects[j]
                let mtv = Collisions.inCollision(a, b)
                if (mtv) {
                    //Check if we need to do any collision response
                    const aHasRigidBody = a.getComponent(RigidBody)
                    const bHasRigidBody = b.getComponent(RigidBody)
                    const aToB = a.transform.position.minus(b.transform.position).normalize()
                    if (aHasRigidBody || bHasRigidBody) {
                        let amount = 1
                        if (aHasRigidBody && bHasRigidBody)
                            amount = .5
                        if (aHasRigidBody) {
                            if (aToB.dot(mtv) < 0) {
                                mtv = mtv.times(-1)
                            }
                            mtv = mtv.times(amount)
                            a.transform.position.plusEquals(mtv)

                        }
                        if (bHasRigidBody) {
                            //Notice the sign is different here
                            if (aToB.dot(mtv) > 0) {
                                mtv = mtv.times(-1)
                            }
                            mtv = mtv.times(amount)
                            b.transform.position.plusEquals(mtv)
                        }
                    }
                    a.broadcastMessage("onCollisionEnter", [b])
                    b.broadcastMessage("onCollisionEnter", [a])
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

function instantiate(gameObject, position) {
    Engine.currentScene.instantiate(gameObject, position)
}