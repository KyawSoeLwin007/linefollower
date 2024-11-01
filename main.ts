input.onButtonPressed(Button.A, function () {
    run = 1
})
function SL () {
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P4, 89)
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P10, 89)
}
function BW () {
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P4, 360)
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P10, 0)
}
input.onButtonPressed(Button.B, function () {
    run = 0
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P10, 0)
})
function FW () {
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P4, 80)
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P10, 280)
}
function SR () {
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P4, 271)
    ModuleWorld_PWM.Servo(ModuleWorld_PWM.mwServoNum.P10, 271)
}
function Stop () {
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.digitalWritePin(DigitalPin.P10, 0)
}
let run = 0
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (run == 1) {
        if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            FW()
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            SL()
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
            SR()
        } else {
            Stop()
        }
    }
})
basic.forever(function () {
    if (ModuleWorld_Digital.Ultrasonic(ModuleWorld_Digital.mwDigitalNum.P0P1) < 5) {
        servos.P2.setAngle(70)
        basic.pause(5000)
    } else {
        servos.P2.setAngle(0)
        basic.pause(5000)
    }
})
