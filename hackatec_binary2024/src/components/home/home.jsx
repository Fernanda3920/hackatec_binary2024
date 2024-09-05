import React, {Component} from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import './home.css';
import Homebody from './home_body'

export default function Home() {
    return (
        <div className="App">
            <Parallax pages={2} style={{ left: "0"}} class="animation">
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
        </div>
    );
}