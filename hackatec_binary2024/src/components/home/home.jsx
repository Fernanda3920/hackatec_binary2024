import React, {Component} from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import './home.css';
import Homebody from './home_body';

import { animateScroll } from 'react-scroll';
import { Element, scroller } from 'react-scroll';

const options = {
    // your options here, for example:
    duration: 0,
    smooth: false,
};
const options2 = {
    duration: 10,
    smooth: false,
    containerId: "containerElement",
    offset: 50
};
const options3 = {
    duration: 2000,
    smooth: true,
    containerId: "containerElement"
};
  
  
  export default function Home() {
    animateScroll.scrollTo(120, options);
    return (
        <div className="App">
            <Element>
            <Parallax pages={4} style={{ left: "0", top: "0", bottom: "0"}} class="animation" containerId="containerElement">
                <ParallaxLayer offset={0} speed={-1.0}>
                    <div class="animation_layer parallax" id="parallaxgeneric100"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-1.0}>
                    <div class="animation_layer parallax" id="parallaxgeneric87"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.875}>
                    <div class="animation_layer parallax" id="parallaxgeneric75"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.85}>
                    <div class="animation_layer parallax" id="parallaxgeneric50"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.825}>
                    <div class="animation_layer parallax" id="parallaxgeneric40"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.8}>
                    <div class="animation_layer parallax" id="parallaxgeneric35"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.7}>
                    <div class="animation_layer parallax" id="parallaxgeneric30"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.6}>
                    <div class="animation_layer parallax" id="parallaxgeneric25"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.5}>
                    <div class="animation_layer parallax" id="parallaxgeneric20"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.3}>
                    <div class="animation_layer parallax" id="parallaxgeneric15"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0}>
                    <div class="animation_layer parallax" id="parallaxgeneric10"></div>
                </ParallaxLayer>
                
                <ParallaxLayer offset={1} speed={0}>
                  <Homebody />
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={-0.3}>
                    <div class="animation_layer parallax" id="parallax2generic70"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={-0.25}>
                    <div class="animation_layer parallax" id="parallax2generic60"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={-0.2}>
                    <div class="animation_layer parallax" id="parallax2generic50"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={-0.15}>
                    <div class="animation_layer parallax" id="parallax2generic40"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={-0.1}>
                    <div class="animation_layer parallax" id="parallax2generic30"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={-0.05}>
                    <div class="animation_layer parallax" id="parallax2generic20"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={0}>
                    <div class="animation_layer parallax" id="parallax2generic10"></div>
                </ParallaxLayer>
                
                <ParallaxLayer offset={3} speed={0}>
                  <Homebody />
                </ParallaxLayer>
            </Parallax>
            </Element>
        </div>
    );
}