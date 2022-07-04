function LED_crl () {
    if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        pins.digitalWritePin(DigitalPin.P16, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
function gas_mode () {
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.UntilDone)
    } else {
        music.stopAllSounds()
    }
}
input.onButtonPressed(Button.A, function () {
    ent_passworld = "" + ent_passworld + "."
    basic.showString("A")
    basic.pause(100)
    serial.writeString("" + (ent_passworld))
    serial.writeLine("")
    I2C_LCD1602.ShowString(ent_passworld, 0, 1)
    basic.showIcon(IconNames.House)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    for (let index = 0; index < 1; index++) {
        I2C_LCD1602.clear()
    }
    I2C_LCD1602.ShowString("bye~ bye~", 0, 0)
    I2C_LCD1602.ShowString("Close the door", 0, 1)
    pins.servoWritePin(AnalogPin.P8, 0)
    basic.pause(1000)
    ent_passworld = ""
    basic.showIcon(IconNames.House)
    for (let index = 0; index < 1; index++) {
        I2C_LCD1602.clear()
    }
    I2C_LCD1602.ShowString("Enter password", 0, 0)
    strip.clear()
    strip.show()
})
function window_crl () {
    water = pins.analogReadPin(AnalogPin.P0)
    if (water > 300) {
        pins.servoWritePin(AnalogPin.P9, 100)
    } else {
        pins.servoWritePin(AnalogPin.P9, 0)
    }
}
function temp_fan () {
    TEMP = input.temperature()
    serial.writeNumber(TEMP)
    serial.writeLine("")
    if (TEMP >= 28) {
        pins.analogWritePin(AnalogPin.P12, 500)
        pins.analogWritePin(AnalogPin.P13, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P13, 0)
    }
}
input.onButtonPressed(Button.AB, function () {
    I2C_LCD1602.clear()
    if (ent_passworld == passworld) {
        basic.showIcon(IconNames.Yes)
        I2C_LCD1602.ShowString("Successful", 0, 0)
        I2C_LCD1602.ShowString("The door is open.", 0, 1)
        pins.servoWritePin(AnalogPin.P8, 180)
        strip.setBrightness(100)
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
        strip.show()
        basic.pause(500)
        basic.showIcon(IconNames.Heart)
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Welcome", 0, 0)
    } else {
        basic.showIcon(IconNames.No)
        I2C_LCD1602.ShowString("Error", 0, 0)
        I2C_LCD1602.ShowString("please again", 0, 1)
        ent_passworld = ""
        basic.pause(1000)
        basic.showIcon(IconNames.House)
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Enter password", 0, 0)
    }
})
function AutoMode () {
    window_crl()
    LED_crl()
    gas_mode()
    temp_fan()
}
input.onButtonPressed(Button.B, function () {
    ent_passworld = "" + ent_passworld + "-"
    basic.showString("B")
    basic.pause(100)
    serial.writeString("" + (ent_passworld))
    serial.writeLine("")
    I2C_LCD1602.ShowString(ent_passworld, 0, 1)
    basic.showIcon(IconNames.House)
})
let TEMP = 0
let water = 0
let strip: neopixel.Strip = null
let ent_passworld = ""
let passworld = ""
serial.redirectToUSB()
basic.showIcon(IconNames.House)
pins.servoWritePin(AnalogPin.P9, 0)
pins.servoWritePin(AnalogPin.P8, 0)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
basic.pause(100)
I2C_LCD1602.ShowString("Enter password", 0, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
passworld = "..--"
ent_passworld = ""
strip = neopixel.create(DigitalPin.P14, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.forever(function () {
    AutoMode()
})
