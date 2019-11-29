radio.setGroup(2)
basic.showLeds(`
    # . . . #
    # . . . #
    . . . . .
    . . . . .
    . . . . .
    `)

basic.forever(function () {
    let x = pins.analogReadPin(AnalogPin.P1);
    x = -((x / 2) - 256);

    let direction = ""

    if (x > 128) {
        direction = "forward"
    } else if (x < -128) {
        direction = "backward"
    } else {

        let y = pins.analogReadPin(AnalogPin.P2);
        y = -((y / 2) - 256);

        if (y < -128) {
            direction = "left"
        } else if (y > 128) {
            direction = "right"
        } else {
            direction = "stop"
        }
    }

    //serial.writeLine(direction)
    radio.sendString(direction)
})
