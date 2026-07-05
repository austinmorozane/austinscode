import React from 'react';
import { NavBar } from '../common/navbar';

/* ADD GUI CONTROLS FOR USERS*/

export const Visualizer: React.FC = () => {
  const getImgPath = (imageName: string) => `${process.env.PUBLIC_URL}/fast_imgs/${imageName}`;
  type Images = Record<string, string>;
  const images: Images = {
    transformer: getImgPath('audiotransformer.JPG'),
    output: getImgPath('bipolarPSUoutput.webp'),
    oscillator: getImgPath('OSC.webp'),
    osc2: getImgPath('OSC2.webp'),
    sqr: getImgPath('Sqr.webp'),
    waterer: getImgPath('PLANT_KERNEL.mp4'),
    waterer_2: getImgPath('plantwaterer.jpg'),
    wall : getImgPath('WLED2.mp4'),
    wall_2 : getImgPath('matrix.mp4'),
    gesture: getImgPath('gesture.mp4'),
    nano2: getImgPath('nano2.mp4'),
    clock: getImgPath('LED_CLOCK.mp4'),
    animate: getImgPath('animate.mp4'),
    weather: getImgPath('ESP_WEATHER.webp'),
    weather_interface: getImgPath('WEATHER.webp')
  };

  return (
    <>
      <NavBar />

      <br/>
                 <b>
        <h1 className="hlight"> PLANT IRRIGATION SYSTEM (ESP32) </h1>
      </b>
      <br />

     <div className="projDesc">
<div className="fadeSide">


          <p> Built a <a href="https://github.com/austinhutchen/autoIrrigation32">plant waterer system </a>with an ESP32 microcontroller, I2C display, and 7V Relay water tube pump that opened or closed to push water into the plant. It made this decision depending on the moisture threshold reading from a capacative soil moisture detector. It also has an option for battery powered operation, in which a 9V battery can power the system for a full week.          </p>
</div>     
</div>
<br/>
        <div className="analogCircuits" >
        <video autoPlay src={images.waterer} playsInline webkit-playsinline loop muted controls  className="projImg" >
        </video>
        <img className="projImg" style={{maxHeight:'30svh'}}src={images.waterer_2}/>
         </div>


    <br/>
              <b>
        <h1 className="hlight"> ASYNC LED WALL(ESP32) </h1>
      </b>
      <br />

     <div className="projDesc">
<div className="fadeSide">


          <p> Flashed an ESP32 microcontroller with <a href="https://kno.wled.ge/" rel="noopener noreferrer">WLED</a> and used a custom application, along with a 16x16 LED matrix to run effects. It can run for 3 days off of a 9v battery.</p>
</div>     
</div>
<br/>
        <div className="analogCircuits" >
        <video autoPlay src={images.wall} playsInline webkit-playsinline loop muted controls  className="projImg" >
        </video>
        <video autoPlay src={images.wall_2} playsInline webkit-playsinline loop muted controls className="projImg">
        </video>
         </div>
      <br/>
                  <b>
        <h1 className="hlight"> 6.5MHZ QUARTZ CRYSTAL OSCILLATOR (CD40106BE)</h1>
      </b>  
        <div className="projDesc">
<div className="fadeSide">

          <p> Built my own 12-Volt 6MHZ Colpitts oscillator circuit with a <a href="https://www.ti.com/document-viewer/CD40106B/datasheet" rel="noopener noreferrer"> Schmidt Trigger Inverter IC </a> and a 6.5MHZ quartz crystal. Thanks to the usage of a quartz crystal, the oscillator is highly precise, and can be used as a digital reference clock for other devices. It generates a true AC square wave with zero crossings, as shown below. 
          </p>
</div>     
</div>
<br/>
      <div className="analogCircuits">
          <img loading="eager" src={images.oscillator} className="projImg" />
        <img loading="eager" src={images.osc2} id="rotate-90"  className="projImg"  />
              <img loading="eager" src={images.sqr} className="projImg"  />

      </div>
<b>
        <h1 className="hlight"> UNO R4 LED CLOCK </h1>
      </b>  
        <div className="projDesc">
<div className="fadeSide">
          <p> Flashed an arduino uno R4 Minima circuit with a clock algorithm to run on a 12x8 LED matrix. Ran several tests for accuracy and stability in different environments.</p>
</div>     
</div>
<br/>
      <div className="analogCircuits">
        <video autoPlay src={images.clock}  playsInline webkit-playsinline loop muted controls  className="projImg"></video>
      </div>
<b>
        <h1 className="hlight"> Weather Sensor Interface (ESP8266,7-Segment Display, DHT11 humidity sensor) </h1>
      </b>  
        <div className="projDesc">
<div className="fadeSide">
          <p> Flashed an ESP8266 circuit with a clock algorithm and 7-segment display writer to scale the variability of weather data from 1 ["Average"]- 8["Unusual"] from the circuit's DHT11 temperature and humidity sensor. I built a prototype mobile app using Typescript for the weather data that read directly from the ESP8266 over wifi. Ran several tests for accuracy and stability in different environments.</p>
</div>     
</div>
<br/>
      <div className="analogCircuits">
        <img  src={images.weather}    className="projImg"></img>
        <img src={images.weather_interface} className="projImg"></img>
      </div>

 <b>
        <h1 className="hlight"> Portable Gesture, Movement, RGB Sensor (Uno Nano Rev2)</h1>
      </b>  
        <div className="projDesc">
<div className="fadeSide">
          <p> Flashed an arduino uno REV2 circuit with a color and movement sensor algorithm. Ran several tests for accuracy and stability in different environments.</p>
</div>     
</div>
<br/>
      <div className="analogCircuits">
        <video autoPlay src={images.nano2}  playsInline webkit-playsinline loop muted controls  className="projImg"></video>
        <video autoPlay src={images.gesture}  playsInline webkit-playsinline loop muted controls  className="projImg"></video>
      </div>
 <b>
        <h1 className="hlight"> Remote Controlled Animation Display, Led Controller, and PROGMEM Flasher (Arduino Uno Rev3)</h1>
      </b>  
    <div className="projDesc">
<div className="fadeSide">
          <p> Flashed an arduino uno r3 circuit with a remote controller algorithm that allowed for several animations, and the controlling of an external LED on bredaboard. Ran several tests for accuracy and stability in different environments.</p>
</div>     
</div>
<br/>
      <div className="analogCircuits">
        <video autoPlay src={images.animate}  playsInline webkit-playsinline loop muted controls  className="projImg"></video>
      </div>

    </>
  );
};
