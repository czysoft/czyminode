

//% color=190 weight=100 icon="\uf1ec" block="czy hardware"
//% groups=['hardware', 'hardware', 'others']
namespace czyminode {

	/**
     * FanOn
     */
    //% blockId=turn_on_fan
    //% block
    export function FanOn(): void{
        let p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(true);
        let p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(false);        
    }

	/**
     * FanOff
     */
    //% blockId=turn_off_fan
    //% block
    export function FanOff(): void {
        let p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(false);
        let p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(true);     
    }
    function delay(): void {
        basic.pause(1);
    }

    /**
     * RgbLed
     */
    //% blockId=RGB_light
    //% block
    export function RgbLed(rgb: number): void {

        let num: number = 24;
        let i: number = 0;
        let rgb2: number = rgb;
        let clock: DigitalInOutPin = new MicrobitPin(DigitalPin.P12);
        let data: DigitalInOutPin = new MicrobitPin(DigitalPin.P13);
        //console.log("RgbLed start");
        clock.digitalWrite(false);

        data.digitalWrite(false);

        //console.log("RgbLed inited");


        for (i = 0; i < 32; i++) {
            data.digitalWrite(false);

            clock.digitalWrite(true);
            delay();
            clock.digitalWrite(false);
            delay();
        }

        for (i = 0; i < num; i++) {
            if ((rgb2 & 0x800000)!=0)
                data.digitalWrite(true);
            else
                data.digitalWrite(false);
            rgb2 = rgb2 << 1;

            clock.digitalWrite(true);
            delay();
            clock.digitalWrite(false);
            delay();
            //console.log("RgbLed loop "+i.toString());
        }


    }




}
