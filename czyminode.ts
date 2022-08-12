
let TM1637PinSCK: DigitalInOutPin;
let TM1637PinSDA: DigitalInOutPin;
let OLED_GRAM: number[][] = [];

let NumberData: number[] = [ 0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f, 0x00];
let NumberDataDp: number[] = [ 0xbf, 0x86, 0xdb, 0xcf, 0xe6, 0xed, 0xfd, 0x87, 0xff, 0xef, 0x80];
let delayTime = 1;
//% color=190 weight=100 icon="\uf1ec" block="czy hardware"
//% groups=['hardware', 'hardware', 'others']
namespace czyminode {

	/**
     * FanOn
     */
    //% blockId=turn_on_fan
    //% block
    export function FanOn(ConnName: ConnNameA): void{
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;

        if (ConnName == ConnNameA.ConnNameA_A0)
        {
            p0= new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (ConnName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (ConnName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }

        p0.digitalWrite(true);
        p1.digitalWrite(false);        
    }

	/**
     * FanOff
     */
    //% blockId=turn_off_fan
    //% block
    export function FanOff(ConnName: ConnNameA): void {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;

        if (ConnName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (ConnName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (ConnName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }

        p0.digitalWrite(false);
        p1.digitalWrite(true);     
    }
    function delay(): void {
        basic.pause(1);
    }
    function delayUs(us: number): void {
        let i;
        for (i = 0; i < us; i++) {

        }
    }

    /**
     * RgbLed
     */
    //% blockId=RGB_light
    //% block
    export function RgbLed(ConnName: ConnNameD, rgb: number): void {
        let clock: DigitalInOutPin;
        let data: DigitalInOutPin;

        let num: number = 24;
        let i: number = 0;
        let rgb2: number = rgb;

        if (ConnName == ConnNameD.ConnNameD_D12) {
            clock = new MicrobitPin(DigitalPin.P12);
            data = new MicrobitPin(DigitalPin.P13);
        }
        else if (ConnName == ConnNameD.ConnNameD_D13) {
            clock = new MicrobitPin(DigitalPin.P13);
            data = new MicrobitPin(DigitalPin.P14);
        }
        else if (ConnName == ConnNameD.ConnNameD_D14) {
            clock = new MicrobitPin(DigitalPin.P14);
            data = new MicrobitPin(DigitalPin.P15);
        }
        else if (ConnName == ConnNameD.ConnNameD_D15) {
            clock = new MicrobitPin(DigitalPin.P15);
            data = new MicrobitPin(DigitalPin.P16);
        }

        clock.digitalWrite(false);
        data.digitalWrite(false);


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
        }


    }


    /**
     * SpeakerOut
     */
    //% blockId=Speaker_Out
    //% block="SpeakerOut %connName| channel %channel |volume %vol | frequency %frequency | ms %ms"
    export function SpeakerOut(ConnName: AnalogConnName, channel: SpeakerChannel, vol: number, frequency: number, ms: number): void {
        if (ConnName == AnalogConnName.Analog_A0) {
            if (channel == SpeakerChannel.SPEAKER_LEFT) {
                pins.setAudioPin(AnalogPin.P0);
                pins.analogSetPitchPin(AnalogPin.P0);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
            else if (channel == SpeakerChannel.SPEAKER_RIGHT) {
                pins.setAudioPin(AnalogPin.P1);
                pins.analogSetPitchPin(AnalogPin.P1);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
        }
        else if (ConnName == AnalogConnName.Analog_A1) {
            if (channel == SpeakerChannel.SPEAKER_LEFT) {
                pins.setAudioPin(AnalogPin.P1);
                pins.analogSetPitchPin(AnalogPin.P1);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
            else if (channel == SpeakerChannel.SPEAKER_RIGHT) {
                pins.setAudioPin(AnalogPin.P2);
                pins.analogSetPitchPin(AnalogPin.P2);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
        }
        else if (ConnName == AnalogConnName.Analog_A2) {
            if (channel == SpeakerChannel.SPEAKER_LEFT) {
                pins.setAudioPin(AnalogPin.P2);
                pins.analogSetPitchPin(AnalogPin.P2);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
            else if (channel == SpeakerChannel.SPEAKER_RIGHT) {
                pins.setAudioPin(AnalogPin.P3);
                pins.analogSetPitchPin(AnalogPin.P3);
                pins.analogSetPitchVolume(vol);
                pins.analogPitch(frequency, ms);
            }
        }
        
        return;
    }

    /**
     * Get DHT11 temperature (celsius or fahrenheit).
     */
    //% blockId=minode_dht_get_temperature block="dht11 %connName| tempreature %FanStatus" 
    export function DHTGetTemperature(connName: ConnNameD, style: DHTTemStyle): number {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        let i: number;
        let data: number;
        let temp: number;
        let temp2: number;
        let humi: number;
        //let str: string;
        //let bitarr: number[] = [0,0,0,0,0,0,0,0];
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = new MicrobitPin(DigitalPin.P12);
            p1 = new MicrobitPin(DigitalPin.P13);
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        //主机开始
        //console.log("host start");
        p0.digitalWrite(false);
        basic.pause(18);
        p0.digitalWrite(true);
        delayUs(30);

        //console.log("wait dht");
        //dht响应
        while (p0.digitalRead()) {
            delayUs(1);
        }
        //console.log("wait dht 1");
        let time: number = 0;
        while (p0.digitalRead()==false) {       //低电平计数
            time++;
        }
        //console.log("wait dht 2");
        time = 0;
        while (p0.digitalRead() == true) {       //高电平计数
            time++;
        }
        //开始传数据

        //console.log("start get data");

        time = 0;
        humi = 0;
        for (i = 0; i < 8; i++) {
            while (p0.digitalRead() == false) {       //低电平计数
                time++;
            }
            time = 0;
            while (p0.digitalRead() == true) {       //高电平计数
                time++;
            }
            //bitarr[i] = time;
            //console.log("bit time:" + time.toString());
            humi = humi << 1;
            if (time > 7)
                humi |= 1;
        }


        //str = "";
        //for (i = 0; i < 8;i++) {
        //    str += bitarr[i].toString()+ ",";
        //}
        //console.log("bit:" + str);
        //time = 0;
        //humi = 0;
        for (i = 0; i < 8; i++) {
            while (p0.digitalRead() == false) {       //低电平计数
                time++;
            }
            time = 0;
            while (p0.digitalRead() == true) {       //高电平计数
                time++;
            }
            //bitarr[i] = time;
            //console.log("bit time:" + time.toString());
           // humi = humi << 1;
            //if (time > 7)
           //     humi |= 1;
        }
        time = 0;
        temp = 0;
        for (i = 0; i < 8; i++) {
            while (p0.digitalRead() == false) {       //低电平计数
                time++;
            }
            time = 0;
            while (p0.digitalRead() == true) {       //高电平计数
                time++;
            }
            //bitarr[i] = time;
            //console.log("bit time:" + time.toString());
            temp = temp << 1;
            if (time > 7)
                temp |= 1;
        }
        time = 0;
        temp2 = 0;
        for (i = 0; i < 8; i++) {
            while (p0.digitalRead() == false) {       //低电平计数
                time++;
            }
            time = 0;
            while (p0.digitalRead() == true) {       //高电平计数
                time++;
            }
            //bitarr[i] = time;
            //console.log("bit time:" + time.toString());
            temp2 = temp2 << 1;
            if (time > 7)
                temp2 |= 1;
        }

        temp = parseFloat(temp.toString() + "." + temp2.toString());
       // console.log("humi:" + humi.toString());
        //console.log("temp:" + temp.toString());
        return temp;
    }

    /**
     * Get DHT11 Humidity.
     */
    //% blockId=minode_dht_get_humidity block="dht11 %connName| humidity"
    //% advanced=true
    export function DHTGetHumidity(connName: ConnNameD): number {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        let i: number;
        let data: number;
        let humi: number;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = new MicrobitPin(DigitalPin.P12);
            p1 = new MicrobitPin(DigitalPin.P13);
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        //主机开始
        //console.log("host start");
        p0.digitalWrite(false);
        basic.pause(18);
        p0.digitalWrite(true);
        delayUs(30);

        //console.log("wait dht");
        //dht响应
        while (p0.digitalRead()) {
            delayUs(1);
        }
        //console.log("wait dht 1");
        let time: number = 0;
        while (p0.digitalRead() == false) {       //低电平计数
            time++;
        }
        //console.log("wait dht 2");
        time = 0;
        while (p0.digitalRead() == true) {       //高电平计数
            time++;
        }
        //开始传数据

        //console.log("start get data");

        time = 0;
        humi = 0;
        for (i = 0; i < 8; i++) {
            while (p0.digitalRead() == false) {       //低电平计数
                time++;
            }
            time = 0;
            while (p0.digitalRead() == true) {       //高电平计数
                time++;
            }
            //console.log("bit time:" + time.toString());
            humi = humi << 1;
            if (time > 7)
                humi |= 1;
        }


        return humi;
    }

    /**
     * Do something when DHT11 temperature change.
     
    //% blockId=minode_on_dhttemperature_change block="dht11 %connName| on temperature change"
    //% advanced=true
    export function onDHTEvent(connName: ConnNameD, body: () => void): void {
        return;
    }
    */
    /**
     * Do something when a switch is opened/closed
     * @param switchId a switch ID .
     * @param connName MiNode Connector Name
     * @param event Event to listen
     */
    //% blockId=minode_on_switch_event block="switch %connName| on %event"
    export function onSwitchEvent(connName: ConnNameD, event: SwitchEvent, body: () => void): void {
        
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        let lastV: boolean;
        let V: boolean;
        let i: number;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = pins.P12;
            p1 = pins.P13;
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        //console.log("set switch event");
        lastV = p0.digitalRead();
        loops.everyInterval(1000, function () {
            V = pins.P12.digitalRead();
            if ((event == SwitchEvent.MINODE_SWITCH_EVT_CLOSE) && (lastV!=V) && (V== false)) {
                //console.log("switch event close");
                body();
                lastV = V;
                return;
            }
            else if ((event == SwitchEvent.MINODE_SWITCH_EVT_OPEN) && (lastV != V) && (V == true)) {
                //console.log("switch event open");
                body();
                lastV = V;
                return;
            }
            lastV = V;
            //console.log("switch check event:" + event + " V:" + pins.P12.digitalRead() + " V2:" + pins.P13.digitalRead() + " lastV:" + lastV);
        })
        return;
    }

    /**
     * Get the switch state (open or not).
     */
    //% blockId=minode_switch_is_opened block="switch %connName| is opened"
    //% advanced=true
    export function switchIsOpened(connName: ConnNameD): boolean {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = new MicrobitPin(DigitalPin.P12);
            p1 = new MicrobitPin(DigitalPin.P13);
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        return p0.digitalRead();
    }

    /**
     * Do something when MIC level change.
     */
    //% blockId=minode_on_MIC_level_change block="mic %connName| > %vol | on noise"
    //% advanced=true
    export function onMICEvent(connName: ConnNameA,vol:number, body: () => void): void {
        let p0: AnalogInPin;
        let p1: AnalogInPin;

        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }

        loops.everyInterval(50, function () {
            let v:number = p0.analogRead();
            if (Math.abs(v-518) > vol) {
                body();
                return;
            }

        });

        return;
    }

    /**
     * Get Mic Volume.
     */
    //% blockId=Mic_Get_Vol block="mic %connName| Volume"
    //% advanced=true
    export function MicGetVol(connName: ConnNameA): number {
        let p0: AnalogInPin;
        let p1: AnalogInPin;
        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }
        return p0.analogRead();
    }


    /**
     * Do something when Rotary change.
     */
    //% blockId=minode_on_ROTARY_CHANGE block="rotary %connName| on trigger"
    export function onRotaryEvent(connName: ConnNameA, body: () => void): void {
        let lastVal: number;
        let p0: AnalogInPin;
        let p1: AnalogInPin;
        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }
        lastVal = p0.analogRead();
        loops.everyInterval(200, function () {
            let v: number = p0.analogRead();
            if (Math.abs(lastVal - v) > 10) {
                lastVal = v;
                body();
                return;
            }

        });
        return;
    }

    /**
     * Get Rotary percentage.
     */
    //% blockId=minode_ROTARY_GET_Percentage block="rotary %connName| get Percentage"
    //% advanced=true
    export function RotaryGetPercentage(connName: ConnNameA): number {
        let p0: AnalogInPin;
        let p1: AnalogInPin;
        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }

        return p0.analogRead()*100/567;
    }

    /**
     * Do something when PIR triggered.
     */
    //% blockId=minode_on_PIR_trig block="pir %connName| on trigger"
    //% advanced=true
    export function onPIREvent(connName: ConnNameD, body: () => void): void {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = new MicrobitPin(DigitalPin.P12);
            p1 = new MicrobitPin(DigitalPin.P13);
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        let lastState: boolean = false;
        let state: boolean;
        loops.everyInterval(200, () => {
            state = p0.digitalRead();
            if (state == true && lastState == false) {
                body();
            }
            lastState = state;
        });
        return;
    }

    /**
     * Get the PIR state (trigger or not).
     */
    //% blockId=minode_PIR_istrig block="pir %connName| is triggered"
    //% advanced=true
    export function PIRIsTriggered(connName: ConnNameD): boolean {
        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = new MicrobitPin(DigitalPin.P12);
            p1 = new MicrobitPin(DigitalPin.P13);
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        return p0.digitalRead();
    }

    /**
     * Do something when Light level change.
     */
    //% blockId=minode_on_LightSensor_CHANGE block="light %connName| on change"
    export function onLightSensorEvent(connName: ConnNameA, body: () => void): void {
        let p0: AnalogInPin;
        let p1: AnalogInPin;
        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }
        let light: number = p0.analogRead();
        let lastlight: number = light;
        loops.everyInterval(200, () => {
            light = p0.analogRead();
            if (Math.abs(light - lastlight) > 100)
                body();
            lastlight = light;
        });
        return;
    }

    /**
     * Get Light level.from 1(brightest) to 5(darkness).
     */
    //% blockId=minode_LightSensor_GET_light_level block="light %connName| get level"
    export function LightSensorGetLevel(connName: ConnNameA): number {
        let p0: AnalogInPin;
        let p1: AnalogInPin;
        if (connName == ConnNameA.ConnNameA_A0) {
            p0 = new MicrobitPin(DigitalPin.P0);
            p1 = new MicrobitPin(DigitalPin.P1);
        }
        else if (connName == ConnNameA.ConnNameA_A1) {
            p0 = new MicrobitPin(DigitalPin.P1);
            p1 = new MicrobitPin(DigitalPin.P2);
        }
        else if (connName == ConnNameA.ConnNameA_A2) {
            p0 = new MicrobitPin(DigitalPin.P2);
            p1 = new MicrobitPin(DigitalPin.P3);
        }
        let light: number = p0.analogRead();

        return  6-Math.floor( light/(1024/6));
    }

    /**
     * relay control(open / close)
     */
    //% blockId=minode_relay_control block="relay %connName| set %status"
    //% advanced=true
    export function RelayControl(connName: ConnNameD, status: SwitchStatus): void {

        let p0: DigitalInOutPin;
        let p1: DigitalInOutPin;
        if (connName == ConnNameD.ConnNameD_D12) {
            p0 = pins.P12;
            p1 = pins.P13;
        }
        else if (connName == ConnNameD.ConnNameD_D13) {
            p0 = new MicrobitPin(DigitalPin.P13);
            p1 = new MicrobitPin(DigitalPin.P14);
        }
        else if (connName == ConnNameD.ConnNameD_D14) {
            p0 = new MicrobitPin(DigitalPin.P14);
            p1 = new MicrobitPin(DigitalPin.P15);
        }
        else if (connName == ConnNameD.ConnNameD_D15) {
            p0 = new MicrobitPin(DigitalPin.P15);
            p1 = new MicrobitPin(DigitalPin.P16);
        }
        p0.digitalWrite(status == SwitchStatus.SWITCH_OPEN);
    }

    /**
     * i2c
     */
    //% blockId=i2c_ssd1306oledInit block="i2c_ssd1306oledInit address:%address"
    //% advanced=true
    export function i2c_ssd1306oledInit(address: number): void {
        let i: number;
        let j: number;
        OLED_GRAM = [];
        for (i = 0; i < 144; i++) {
            let tmp: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

            OLED_GRAM.push(tmp);
        }

        pins.i2cWriteNumber(address, 0xae, NumberFormat.Int16BE, false);        //--turn off oled panel
        pins.i2cWriteNumber(address, 0, NumberFormat.Int16BE, false);           //---set low column address
        pins.i2cWriteNumber(address, 0x10, NumberFormat.Int16BE, false);        //---set high column address
        pins.i2cWriteNumber(address, 0x40, NumberFormat.Int16BE, false);        //--set start line address  Set Mapping RAM Display Start Line (0x00~0x3F)
        pins.i2cWriteNumber(address, 0x81, NumberFormat.Int16BE, false);        //--set contrast control register
        pins.i2cWriteNumber(address, 0xCF, NumberFormat.Int16BE, false);        // Set SEG Output Current Brightness
        pins.i2cWriteNumber(address, 0xA1, NumberFormat.Int16BE, false);        //--Set SEG/Column Mapping     0xa0左右反置 0xa1正常
        pins.i2cWriteNumber(address, 0xC8, NumberFormat.Int16BE, false);        //Set COM/Row Scan Direction   0xc0上下反置 0xc8正常
        pins.i2cWriteNumber(address, 0xA6, NumberFormat.Int16BE, false);        //--set normal display
        pins.i2cWriteNumber(address, 0xA8, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x3f, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xD3, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x00, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xd5, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x80, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xD9, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xF1, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xDA, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x12, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xDB, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x40, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x20, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x02, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x8D, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0x14, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xA4, NumberFormat.Int16BE, false);
        pins.i2cWriteNumber(address, 0xA6, NumberFormat.Int16BE, false);
        i2c_ssd1306oledClear(address);
        //pins.i2cWriteNumber(address, 0x2e, NumberFormat.Int16BE, false);        //关闭滚动
        pins.i2cWriteNumber(address, 0xAF, NumberFormat.Int16BE, false);

    }
    /**
     * i2c_ssd1306oledClear
     */
    //% blockId=i2c_ssd1306oledClear block="i2c_ssd1306oledClear address:%address"
    //% advanced=true
    export function i2c_ssd1306oledClear(address: number): void {
        let i: number;
        let j: number;
        for (i = 0; i < 144; i++) {
            for (j = 0; j < 8; j++) {
                OLED_GRAM[i][j] = 0;
            }
        }
        let buf: Buffer = Buffer.create(1 + 128);
        buf[0] = 0x40;
        for (i = 0; i < 8; i++) {
            pins.i2cWriteNumber(address, 0xb0 + i, NumberFormat.Int16BE, false);            //设置页地址
            pins.i2cWriteNumber(address, 0, NumberFormat.Int16BE, false);                   //设置低列起始地址
            pins.i2cWriteNumber(address, 0x10, NumberFormat.Int16BE, false);                //设置高列起始地址

            pins.i2cWriteBuffer(address, buf, false);
        }
    }
    /**
     * i2c_ssd1306oledRefresh
     */
    //% blockId=i2c_ssd1306oledRefresh block="i2c_ssd1306oledRefresh address:%address"
    //% advanced=true
    export function i2c_ssd1306oledRefresh(address: number): void {
        let i: number;
        let n: number;
        let buf: Buffer = Buffer.create(129);
        buf[0] = 0x40;
        for (i = 0; i < 8; i++) {
            pins.i2cWriteNumber(address, 0xb0 + i, NumberFormat.Int16BE, false);            //设置行起始地址
            pins.i2cWriteNumber(address, 0, NumberFormat.Int16BE, false);                   //设置低列起始地址
            pins.i2cWriteNumber(address, 0x10, NumberFormat.Int16BE, false);                //设置高列起始地址

            for (n = 0; n < 128; n++)
                buf[n + 1] = OLED_GRAM[n][i];
            pins.i2cWriteBuffer(address, buf, false);
        }

    }
    /**
     * i2c_ssd1306oledPixel
     */
    //% blockId=i2c_ssd1306oledPixel block="i2c_ssd1306oledPixel address:%address | x:%x | y:%y | show:%show | direct:%direct"
    //% advanced=true
    export function i2c_ssd1306oledPixel(address: number, x: number, y: number, show: boolean, direct:boolean): void {
        let i: number=y/8;
        let m: number=y%8;
        let n: number=1<<m;

        if (show) {
            OLED_GRAM[x][i] |= n;
        }
        else {
            OLED_GRAM[x][i] = ~OLED_GRAM[x][i];
            OLED_GRAM[x][i] |= n;
            OLED_GRAM[x][i] = ~OLED_GRAM[x][i];
        }
        if (direct) {
            pins.i2cWriteNumber(address, 0xb0 + i, NumberFormat.Int16BE, false);                    //设置页地址
            pins.i2cWriteNumber(address, x & 0xf, NumberFormat.Int16BE, false);                     //设置低列起始地址
            pins.i2cWriteNumber(address, 0x10 + ((x & 0xf0) >> 4), NumberFormat.Int16BE, false);                //设置高列起始地址

            pins.i2cWriteNumber(address, 0x4000 + OLED_GRAM[x][i], NumberFormat.UInt16BE, false);
        }
    }
    /**
     * i2c_ssd1306oledDrawLine
     */
    //% blockId=i2c_ssd1306oledDrawLine block="i2c_ssd1306oledDrawLine address:%address | x1:%x1 | y1:%y1 | x2:%x2 | y2:%y2 | show:%show | direct:%direct"
    //% advanced=true
    export function i2c_ssd1306oledDrawLine(address: number, x1: number, y1: number, x2: number, y2: number, show: boolean, direct: boolean): void {
        
        let t: number; 
        let xerr: number = 0, yerr: number = 0, delta_x: number, delta_y: number, distance: number;
        let incx: number, incy: number, uRow: number, uCol: number;

        delta_x = x2 - x1; //计算坐标增量 
        delta_y = y2 - y1;
        uRow = x1;//画线起点坐标
        uCol = y1;
        if (delta_x > 0)
            incx = 1; //设置单步方向 
        else if (delta_x == 0)
            incx = 0;//垂直线 
        else
        {
            incx = -1;
            delta_x = -delta_x;
        }
        if (delta_y > 0)
            incy = 1;
        else if (delta_y == 0)
            incy = 0;//水平线 
        else {
            incy = -1;
            delta_y = -delta_x;
        }
        if (delta_x > delta_y)
            distance = delta_x; //选取基本增量坐标轴 
        else
            distance = delta_y;

        for (t = 0; t < distance + 1; t++) {
            //console.log(uRow + ":" + uCol);
            i2c_ssd1306oledPixel(address,uRow, uCol,show, false);//画点
            xerr += delta_x;
            yerr += delta_y;
            if (xerr > distance) {
                xerr -= distance;
                uRow += incx;
            }
            if (yerr > distance) {
                yerr -= distance;
                uCol += incy;
            }
        }
        if (direct)
            i2c_ssd1306oledRefresh(address);
    }/**
     * i2c_ssd1306oledDrawCircle
     */
    //% blockId=i2c_ssd1306oledDrawCircle block="i2c_ssd1306oledDrawCircle address:%address | x:%x | y:%y | r:%r | show:%show | direct:%direct"
    //% advanced=true
    export function i2c_ssd1306oledDrawCircle(address: number, x: number, y: number, r: number, show: boolean, direct: boolean): void {

        let a: number, b: number, num: number;
        a = 0;
        b = r;
        while (2 * b * b >= r * r) {
            console.log((x + a) + ":" + (y - b));
            i2c_ssd1306oledPixel(address, x + a, y - b, show,false);
            i2c_ssd1306oledPixel(address, x - a, y - b, show, false);
            i2c_ssd1306oledPixel(address, x - a, y + b, show, false);
            i2c_ssd1306oledPixel(address, x + a, y + b, show, false);

            i2c_ssd1306oledPixel(address, x + b, y + a, show, false);
            i2c_ssd1306oledPixel(address, x + b, y - a, show, false);
            i2c_ssd1306oledPixel(address, x - b, y - a, show, false);
            i2c_ssd1306oledPixel(address, x - b, y + a, show, false);

            a++;
            num = (a * a + b * b) - r * r;//计算画的点离圆心的距离
            if (num > 0) {
                b--;
                a--;
            }
        }
        if (direct)
            i2c_ssd1306oledRefresh(address);
    }


    /**
     *  TM1637 Init
     */
    //% blockId=TM1637_Init block="TM1637 Init pinSCL: %pinSCL |pinSDA %pinSDA "
    export function TM1637(pinSCL: DigitalInOutPin, pinSDA: DigitalInOutPin): void {
        TM1637PinSCK = pinSCL;
        TM1637PinSDA = pinSDA;
    }
    /**
     *  TM1637 Clear
     */
    //% blockId=TM1637_Clear block="TM1637 Clear"
    export function TM1637Clear(): void {
        TM1637_DATA_ClearDisplay();
    }
    /**
     *  TM1637 Show Number
     */
    //% blockId=TM1637_Show_Number block="TM1637 Show Number %n"
    export function TM1637ShowNumber(n: number): void {
        TM1637_DATA_ClearDisplay();
        TM1637_DATA_Display(n);
    }

    function I2C_Start():void
    {
        TM1637PinSCK.digitalWrite(true);
        TM1637PinSDA.digitalWrite(true);
        delayUs(delayTime);

        TM1637PinSDA.digitalWrite(false);
        delayUs(delayTime);
        TM1637PinSCK.digitalWrite(false);
        delayUs(delayTime);
    }

    function I2C_stop(): void
    {
        TM1637PinSCK.digitalWrite(false);
        delayUs(delayTime);
        TM1637PinSDA.digitalWrite(false);
        delayUs(delayTime);

        TM1637PinSCK.digitalWrite(true);
        delayUs(delayTime);
        TM1637PinSDA.digitalWrite(true);
        delayUs(delayTime);
    }

    function TM1637_WriteBit(mBit:number): void
    {
        TM1637PinSCK.digitalWrite(false);
        delayUs(delayTime);
        if (mBit)
            TM1637PinSDA.digitalWrite(true);
        else
            TM1637PinSDA.digitalWrite(false);
        delayUs(delayTime);
        TM1637PinSCK.digitalWrite(true);
        delayUs(delayTime);
    }

    function TM1637_WriteByte(Byte: number): void
    {
        let loop: number = 0;
        for (loop = 0; loop < 8; loop++) {
            TM1637_WriteBit((Byte >> loop) & 0x01);//先写低位	
        }
        TM1637PinSCK.digitalWrite(false);
        delayUs(delayTime);
        TM1637PinSDA.digitalWrite(true);
        delayUs(delayTime);
        TM1637PinSCK.digitalWrite(true);
    }
    function TM1637_WriteCommand(mData: number): void
    {
        I2C_Start();
        TM1637_WriteByte(mData);
        I2C_stop();
    }

    function TM1637_WriteData(addr: number, mData: number): void
    {
        I2C_Start();
        TM1637_WriteByte(addr);
        TM1637_WriteByte(mData);
        I2C_stop();
    }

    function TM1637_DATA_ClearDisplay(): void
    {
        let i: number;
        TM1637_WriteCommand(0x44);
        for (i = 0; i < 4; i++) {
            TM1637_WriteData(0xc0 + i, 0);
        }
        TM1637_WriteCommand(0x88);
    }
    function TM1637_DATA_Display(n:number): void
    {
        let i: number;
        TM1637_WriteCommand(0x44);
        let str:string= n.toString();
        let l = str.length;
        let a = 0;
        for (i = 0; i < 4; i++) {
            if (i >= l) break;
            let str2 = str.substr(l - i - 1, 1);
            a = parseInt(str2);
            TM1637_WriteData(0xc0 + (3 - i), NumberData[a]);
            //(dpFlag)
            //		TM1637_WriteData(0xc1,DataDp[FB.ge]);
            //else
            //TM1637_WriteData(0xc1,buf[FB.ge]);
            //TM1637_WriteData(0xc2, buf[SB.shi]);
            //TM1637_WriteData(0xc3, buf[SB.ge]);
        }

        TM1637_WriteCommand(0x88);
    }
}
