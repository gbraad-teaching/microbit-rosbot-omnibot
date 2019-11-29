radio.setGroup(2)
rosbot.initialize(SerialPin.P1, SerialPin.P2)
basic.forever(function () {
    basic.showLeds(`
        # . . . #
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        `)
})

let speed = 100


input.onButtonPressed(Button.B, function () {
    speed += 50
    if (speed > 255) {
        speed = 255
    }
})

input.onButtonPressed(Button.A, function () {
    speed -= 50
    if (speed < 0) {
        speed = 0
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        rosbot.MotorRunQuad(
            speed,
            speed,
            speed,
            speed
        )
    } else if (receivedString == "backward") {
        rosbot.MotorRunQuad(
            -speed,
            -speed,
            -speed,
            -speed
        )
    } else if (receivedString == "left") {
        rosbot.MotorRunQuad(
            speed,
            -speed,
            -speed,
            speed
        )
    } else if (receivedString == "right") {
        rosbot.MotorRunQuad(
            -speed,
            speed,
            speed,
            -speed
        )
    } else {
        rosbot.MotorStopAll()
    }
})

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    basic.showLeds(`
        . # # # .
        # . . . #
        . . # . .
        . # . # .
        . . . . .
        `)
})
