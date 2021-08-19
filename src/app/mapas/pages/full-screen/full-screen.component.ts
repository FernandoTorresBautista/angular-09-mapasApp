import { Component, OnInit } from '@angular/core';

//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from "mapbox-gl"; // npm i --save-dev @types/mapbox-gl

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa{
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    // googlemaps: 19.48013191332562, -99.18302407666204 = latitud, logitud
    var map = new mapboxgl.Map({
      container: 'mapa', // 'YOUR_CONTAINER_ELEMENT_ID',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.18302407666204, 19.48013191332562], // longitu latitud, 
      zoom: 18, // zoom al punto inicial
    });

  }

}
