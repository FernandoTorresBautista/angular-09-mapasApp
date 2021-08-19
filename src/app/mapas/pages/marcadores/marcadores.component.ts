import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker,
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa')divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLabel: number= 15;
  center: [number, number] = [-99.18302407666204, 19.48013191332562]; 

  // arreglo de marcadores
  //marcadores: mapboxgl.Marker[] = [];
  marcadores: MarcadorColor[] = [];
  
  constructor() { }
  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // 'YOUR_CONTAINER_ELEMENT_ID',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // longitu latitud, 
      zoom: this.zoomLabel, // zoom al punto inicial
    });

    this.leerLocalStorage();

    // const markerHtml : HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = "Hola mundo";
    // const marker = new mapboxgl.Marker({element: markerHtml})
    // new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

  }  

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16))

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color //color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({color, marker: nuevoMarcador});

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dradend', () => {
      this.guardarMarcadoresLocalStorage()
    });
  }

  irMarcador(marcador:mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr:MarcadorColor[] = [];
    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      
      lngLatArr.push({
        color:color, 
        centro: [lng, lat],
      });
    })

    localStorage.setItem("marcadores", JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {

    if (!localStorage.getItem("marcadores")) {
      return
    }
    const lngLatArr:MarcadorColor[] = JSON.parse( localStorage.getItem("marcadores")! );

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.centro! )
        .addTo( this.mapa );

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dradend', () => {
        this.guardarMarcadoresLocalStorage()
      });
    });

  }

  borrarMarcador( i:number ) {
    
    this.marcadores[i].marker?.remove(); // borrar del mapa
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage(); // 

  }

}
