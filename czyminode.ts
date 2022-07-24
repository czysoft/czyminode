

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
    //% block="SpeakerOut %connName| volume %vol | frequency %frequency | ms %ms"
    //% shim=czyminode::SpeakerOut
    export function SpeakerOut(ConnName: ConnNameA, vol: number, frequency:number,ms:number): void {
        return;
    }

    /**
     * test
     */
    //% blockId=test
    //% block
    //% shim=czyminode::test
    export function test(a: number, b: number): number {
        console.log("test func");
        return 0;
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
}
