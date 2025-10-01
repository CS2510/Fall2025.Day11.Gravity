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

        //Do Collision Detection
        const gameObjectsWithColliders = this.gameObjects.filter(go=>go.getComponent(Collider))
        for(let i = 0; i < gameObjectsWithColliders.length; i++){
            for(let j = i+1; j < gameObjectsWithColliders.length; j++){
                let a = gameObjectsWithColliders[i]
                let b = gameObjectsWithColliders[j]
                let response = Collisions.inCollision(a,b)
                if(response){

                    const aHasRigidBody = a.getComponent(RigidBody)
                    const bHasRigidBody = b.getComponent(RigidBody)
                    if(aHasRigidBody){
                        if(a.transform.position.minus(b.transform.position).dot(response) < 0)
                            response = response.times(-1)
                        a.transform.position.plusEquals(response)
                    }
                    if(bHasRigidBody){
                        if(b.transform.position.minus(a.transform.position).dot(response) < 0)
                            response = response.times(-1)
                        b.transform.position.plusEquals(response)
                    }



                    for(const component of a.components){
                        component.onCollisionEnter?.(b)
                    }
                    for(const component of b.components){
                        component.onCollisionEnter?.(a)
                    }
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