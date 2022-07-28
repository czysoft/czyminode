#include "pxt.h"

#include <mbed.h>
#include <cstdint>
#include <math.h>


using namespace pxt;
using namespace pins;

enum AnalogConnName
{
    //% block="A0" enumval=0
    Analog_A0 = 0,
    //% block="A1" enumval=1
    Analog_A1 = 1,
    //% block="A2" enumval=2
    Analog_A2 = 2,
    //% block="NC" enumval=-1
    Analog_MN_NC = -1
};
enum SwitchEvent {
    //% block="open" enumval=1
    MINODE_SWITCH_EVT_OPEN = 1,
    //% block="close" enumval=2
    MINODE_SWITCH_EVT_CLOSE = 2,
};
enum DHTTemStyle {
    //% block="Celsius" enumval=1
    MINODE_DHT_CELSIUS = 1,
    //% block="Fahrenheit" enumval=2
    MINODE_FAN_FAHRENHEIT = 2,
};

enum ConnNames {
    //% block="A0" enumval=1
    A0 = 1,
    //% block="A1" enumval=2
    A1 = 2,
    //% block="A2" enumval=3
    A2 = 3,
    //% block="D12" enumval=4
    D12 = 4,
    //% block="D13" enumval=5
    D13 = 5,
    //% block="D14" enumval=6
    D14 = 6,
    //% block="D15" enumval=7
    D15 = 7,
    //% block="I2C7" enumval=8
    I2C1 = 8,
    //% block="I2C2" enumval=9
    I2C2 = 9,
    //% block="I2C3" enumval=10
    I2C3 = 10
};
enum ConnNameA {
    //% block="A0" enumval=1
    ConnNameA_A0 = 1,
    //% block="A1" enumval=2
    ConnNameA_A1 = 2,
    //% block="A2" enumval=3
    ConnNameA_A2 = 3
};
enum ConnNameD {
    //% block="D12" enumval=4
    ConnNameD_D12 = 4,
    //% block="D13" enumval=5
    ConnNameD_D13 = 5,
    //% block="D14" enumval=6
    ConnNameD_D14 = 6,
    //% block="D15" enumval=7
    ConnNameD_D15 = 7
};

enum SwitchStatus {
    //% block="open" enumval=1
    SWITCH_OPEN = 1,
    //% block="close" enumval=2
    SWITCH_CLOSE = 2,
};
enum SpeakerChannel {
    //% block="left" enumval=1
    SPEAKER_LEFT = 1,
    //% block="right" enumval=2
    SPEAKER_RIGHT = 2,
    //% block="stereo" enumval=2
    SPEAKER_STEREO = 3,
};
namespace czyminode {


	//%
	int test(int a, int b)
	{
		return a + b;
	}

	//%
	void SpeakerOut(AnalogConnName ConnName, SpeakerChannel channel, int vol, int frequency,int ms)
	{
        //bool b1 = true;
        //uBit.io.P16.getDigitalValue
        char buf[50];
        MicroBitPin* p0;
        MicroBitPin* p1;
        if (ConnName == Analog_A0) {
            p0 = getPin(MICROBIT_ID_IO_P0);
            p1 = getPin(MICROBIT_ID_IO_P1);
        }
        else if (ConnName == Analog_A1) {
            p0 = getPin(MICROBIT_ID_IO_P1);
            p1 = getPin(MICROBIT_ID_IO_P2);
        }
        else if (ConnName == Analog_A2) {
            p0 = getPin(MICROBIT_ID_IO_P2);
            p1 = getPin(MICROBIT_ID_IO_P3);
        }
        else
        {
            sprintf(buf, "ConnName:%d error\r\n", ConnName);
            uBit.serial.printf(buf);
            return;
        }
        if (channel == SPEAKER_LEFT) {
            p0->setAnalogValue(vol);
            p0->setAnalogPeriodUs(1000000 / frequency);
            sleep_us(ms * 1000);
            p0->setAnalogValue(0);
        }
        else if (channel == SPEAKER_RIGHT) {
            p1->setAnalogValue(vol);
            p1->setAnalogPeriodUs(1000000 / frequency);
            sleep_us(ms * 1000);
            p1->setAnalogValue(0);
        }
        else if (channel == SPEAKER_STEREO) {
            p0->setAnalogValue(vol);
            p0->setAnalogPeriodUs(1000000 / frequency);
            p1->setAnalogValue(vol);
            p1->setAnalogPeriodUs(1000000 / frequency);
            sleep_us(ms * 1000);
            p0->setAnalogValue(0);
            p1->setAnalogValue(0);
        }


        ////fiber_sleep(ms);
        //for (int i = 0; i < 10000; i++)
        //{
        //    p0->setAnalogValue(b1?-1000:1000);
        //    sleep_us(500);
        //    b1 = !b1;
        //}
        //
		return;
	}
}