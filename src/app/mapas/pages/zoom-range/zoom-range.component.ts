import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }
      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa')divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLabel: number= 10;
  center: [number, number] = [-99.18302407666204, 19.48013191332562]; 

  constructor() { 
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {

    // undefined in ngOnInit
    // console.log("on init", this.divMapa);
    
    console.log("after view init", this.divMapa);
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // 'YOUR_CONTAINER_ELEMENT_ID',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // longitu latitud, 
      zoom: this.zoomLabel, // zoom al punto inicial
    });

    this.mapa.on('zoom', ()=>{
      this.zoomLabel = this.mapa.getZoom();
    });
    
    this.mapa.on('zoomend', ()=>{
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (ev)=>{
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });

    // destruir los listeners al destruir el componente para no dejarlos en carga 

  }
  
  zoomOut(){
    //console.log("zoom out", this.divMapa);
    this.mapa.zoomOut();
    //this.zoomLabel = this.mapa.getZoom(); // toma el primer valor al animar...
  }
  zoomIn(){
    //console.log("zoom in");
    this.mapa.zoomIn();
    //this.zoomLabel = this.mapa.getZoom();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo( Number(valor) );
  }
  
}
