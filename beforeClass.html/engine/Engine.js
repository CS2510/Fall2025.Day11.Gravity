class Engine {
    //Engine-specific
    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")
        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        addEventListener("mousedown", Input.mouseDown)
        addEventListener("mouseup", Input.mouseUp)
        addEventListener("mousemove", Input.mouseMove)

        addEventListener("touchstart", Input.touchStart)
        addEventListener("touchend", Input.touchEnd)
        addEventListener("touchmove", Input.touchMove)
        //Game-specific
        Engine.currentScene.start()
        Engine.gameLoop()
    }

    //Engine-specific code
    static gameLoop() {
        Engine.update()
        Engine.draw()
        requestAnimationFrame(Engine.gameLoop)
    }



    //Engine-specific
    static update() {
        Engine.currentScene.update()
    }

    //Engine-specific
    static draw() {

        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

        //Game-specific
        Engine.ctx.fillStyle = "gray"
        Engine.ctx.beginPath()
        Engine.ctx.rect(0, 0, Engine.canvas.width, Engine.canvas.height)
        Engine.ctx.fill()

        Engine.currentScene.draw(Engine.ctx)

    }
}