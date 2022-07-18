

//% color=190 weight=100 icon="\uf1ec" block="czy hardware"
//% groups=['hardware', 'hardware', 'others']
namespace czyminode {

	/**
     * FanOn
     */
    //% blockId=打开风扇
    //% block
    export function FanOn(): void{
        const p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(true);
        const p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(false);        
    }

	/**
     * FanOff
     */
    //% blockId=关闭风扇
    //% block
    export function FanOff(): void {
        const p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(false);
        const p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(true);     
    }


    /**
     * RGBLED
     */
    //% blockId=RGB变色灯
    //% block
    export function RGBLed(rgb: uint32): void {

        const clock: DigitalInOutPin = new MicrobitPin(DigitalPin.P12);
        const data: DigitalInOutPin = new MicrobitPin(DigitalPin.P13);
        clock.digitalWrite(false);
        data.digitalWrite(false);


        var num: number = 24;
        var i: number;
        var rgb2: uint32=rgb;

        for (i = 0; i < num; i++) {
            if (rgb2 & (1 << 23))
                data.digitalWrite(true);
            else
                data.digitalWrite(false);
            rgb2 <<= 1;

            clock.digitalWrite(true);
            clock.digitalWrite(false);
        }


    }




}
