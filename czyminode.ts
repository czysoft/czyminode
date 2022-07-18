

//% color=190 weight=100 icon="\uf1ec" block="czy hardware"
//% groups=['hardware', 'hardware', 'others']
namespace czyminode {

	/**
     * FanOn
     */
    //% blockId=turn on fan
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
    //% blockId=turn off fan
    //% block
    export function FanOff(): void {
        const p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(false);
        const p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(true);     
    }


    /**
     * RgbLed
     */
    //% blockId=RGB light
    //% block
    export function RgbLed(rgb: number): void {

        const clock: DigitalInOutPin = new MicrobitPin(DigitalPin.P12);
        const data: DigitalInOutPin = new MicrobitPin(DigitalPin.P13);
        clock.digitalWrite(false);
        data.digitalWrite(false);


        var num: number = 24;
        var i: number;
        var rgb2: number =rgb;

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
