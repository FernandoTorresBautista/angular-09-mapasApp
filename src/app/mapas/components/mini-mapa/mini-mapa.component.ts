import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat:[number, number] = [0,0];
  @ViewChild('mapa') divMapa!:ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // 'YOUR_CONTAINER_ELEMENT_ID',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat, // longitu latitud, 
      zoom: 15, // zoom al punto inicial
      interactive: false // no se mueva, es estatico
    });

    new mapboxgl.Marker()
      .setLngLat( this.lngLat )
      .addTo( mapa );

  }

  
}
