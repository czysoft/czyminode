

//% color=190 weight=100 icon="\uf1ec" block="czy hardware"
//% groups=['hardware', 'hardware', 'others']
namespace czyminode {

	/**
     * FanOn
     */
    //% blockId=fan_on
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
    //% blockId=fan_off
    //% block
    export function FanOff(): void {
        const p0: DigitalInOutPin = new MicrobitPin(DigitalPin.P0);
        p0.digitalWrite(false);
        const p1: DigitalInOutPin = new MicrobitPin(DigitalPin.P1);
        p1.digitalWrite(true);     
    }

}
