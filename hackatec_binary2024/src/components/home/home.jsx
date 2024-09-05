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
    animateScroll.scrollTo(120, options2);
    animateScroll.scrollTo(0, options3);
    return (
        <div className="App">
            <Element>
            <Parallax pages={2} style={{ left: "0"}} class="animation" containerId="containerElement">
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
            </Parallax>
            </Element>
        </div>
    );
}