class Input {
    static keysDown = []

    static mousePosition
    static mouseButtonsDown = []


    static keydown(event) {
        if (!Input.keysDown.includes(event.code))
            Input.keysDown.push(event.code)

    }
    static keyup(event) {
        Input.keysDown = Input.keysDown.filter(k => k != event.code)
    }

    static mouseDown(event){
        Input.mouseButtonsDown.push(event.button)

    }

    static mouseUp(event){
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(b=>b!=event.button)

    }

    static mouseMove(event){
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
        
    }
}