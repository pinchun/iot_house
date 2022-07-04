serial.redirect_to_usb()
basic.show_icon(IconNames.HOUSE)
pins.servo_write_pin(AnalogPin.P9, 100)
I2C_LCD1602.lcd_init(39)
I2C_LCD1602.clear()
basic.pause(100)
I2C_LCD1602.show_string("Enter password", 0, 0)
pins.digital_write_pin(DigitalPin.P16, 0)
passworld = 0
ent_passworld = 0

def on_forever():
    pass
basic.forever(on_forever)
