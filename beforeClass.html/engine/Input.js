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

    static mouseDown(event) {
        Input.mouseButtonsDown.push(event.button)
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static mouseUp(event) {
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(b => b != event.button)
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static mouseMove(event) {
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static touchStart(event) {
        Input.mouseButtonsDown.push(0)
        Input.mousePosition = new Vector2(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    }

    static touchEnd(event) {
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(b => b != 0)
        Input.mousePosition = new Vector2(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    }

    static touchMove(event) {
        Input.mousePosition = new Vector2(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    }
}